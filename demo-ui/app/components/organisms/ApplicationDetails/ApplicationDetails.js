/**
 *
 * ApplicationDetails
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import { injectSaga } from '@capillarytech/vulcan-react-sdk/utils';
import {
  injectReducer,
  clearDataOnUnmount,
} from '@capillarytech/vulcan-react-sdk/utils';
import makeSelectApplicationDetails from './selectors';
import { makeSelectOrgUsers, makeSelectGlobal } from '../../pages/Cap/selectors';

import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import FieldValueDisplay from '../../molecules/FieldValueDisplay';
import ListingColumnActions from '../../atoms/ListingColumnActions';
import moment from 'moment';

import { DATE_TIME_FORMAT, VULCAN_VIEW_APPLICATION_MODE } from '../../pages/App/constants';

import {
  CapRow,
  CapColumn,
  CapSkeleton,
  CapHeading,
  CapTooltip,
} from '@capillarytech/cap-ui-library';
import styles from './styles';

import { withStyles } from '@capillarytech/vulcan-react-sdk/utils';
import ColoredTags from '../../atoms/ColoredTags';
import {
  APP_DETAIL_FIELDS,
  APPLICATION_DISPLAY_DATE_FORMAT,
  MAX_ACCESSIBLE_ORGS_DISPLAY,
} from './constants';
import { SUCCESS, REQUEST, FAILURE } from '../../pages/App/constants';
import get from 'lodash/get';
import keyBy from 'lodash/keyBy';
import classnames from 'classnames';

function ApplicationDetails(props) {
  const {
    actions,
    applicationDetails,
    intl,
    orgUsersMap,
    className,
    global,
    history,
  } = props;
  const { formatMessage } = intl;

  React.useEffect(
    () => {
      actions.getApplicationDetails(props?.applicationId, formatMessage);
    },
    [props?.applicationId],
  );

  const renderField = item => {
    const label = formatMessage(messages[item.label]);
    let value = '-';

    switch (item.type) {
      case 'tags':
        value = (
          <ColoredTags
            tagValue={get(applicationDetails?.appData, item.field, '-')}
          />
        );
        break;
      case 'timeAndUser': {
        const { time, user } = item.fields;
        const timeValue = moment(
          get(applicationDetails?.appData, time, '-'),
        ).format(DATE_TIME_FORMAT);
        const userId = Number(get(applicationDetails?.appData, user));
        value =
          !timeValue || !userId
            ? '-'
            : formatMessage(messages.onBy, {
                time: timeValue,
                user: orgUsersMap.get(userId),
              });
        break;
      }
      case 'orgList': {
        value = get(applicationDetails?.appData, item.field, '-');
        if (value === '-') break;
        const proxyOrgList = get(global, 'user.proxyOrgList', []);
        const orgIdMap = keyBy(proxyOrgList, 'orgID');
        const orgList = value.map(orgId => orgIdMap[orgId]?.orgName ?? orgId);
        let orgListDisplay = '';
        if (orgList?.length > MAX_ACCESSIBLE_ORGS_DISPLAY) {
          orgListDisplay = (
            <>
              {`${orgList.slice(0, MAX_ACCESSIBLE_ORGS_DISPLAY).join(', ')}`}
              &nbsp;
              <CapTooltip
                className="accessible-orgs-tooltip"
                overlayClassName="accessible-orgs-tooltip-overlay"
                title={orgList
                  .slice(MAX_ACCESSIBLE_ORGS_DISPLAY, orgList.length)
                  .join(', ')}
                placement="right"
              >
                {formatMessage(messages.more, {
                  count: orgList.length - MAX_ACCESSIBLE_ORGS_DISPLAY,
                })}
              </CapTooltip>
            </>
          );
        } else {
          orgListDisplay = orgList.join(', ');
        }
        value = orgListDisplay;
        break;
      }

      default:
        value = get(applicationDetails?.appData, item.field, '-');
    }

    return (
      <div key={item.label}>
        <FieldValueDisplay label={label} value={value} type={item.type} className={item.customClassName} />
      </div>
    );
  };

  const renderFields = fields =>
    fields.map(
      item =>
        item?.when && !item.when(applicationDetails?.appData)
          ? null
          : renderField(item),
    );

  return (
    <div className={classnames(className, 'fade-in')}>
      {applicationDetails?.getApplicationDetailsStatus === SUCCESS && (
        <>
          <div className="application-actions">
            <ListingColumnActions
              record={applicationDetails?.appData}
              history={history}
              mode={VULCAN_VIEW_APPLICATION_MODE}
            />
          </div>
          {renderFields(APP_DETAIL_FIELDS)}
        </>
      )}
      {applicationDetails?.getApplicationDetailsStatus === REQUEST && (
        <CapSkeleton paragraph={{ rows: 15 }} active />
      )}
      {applicationDetails?.getApplicationDetailsStatus === FAILURE && (
        <CapRow
          type="flex"
          justify="center"
          align="middle"
          className="error-section"
        >
          <CapColumn>
            <CapHeading type="h3">
              {formatMessage(messages.issueLoadingAppDetails)}
            </CapHeading>
          </CapColumn>
        </CapRow>
      )}
    </div>
  );
}

ApplicationDetails.propTypes = {
  applicationId: PropTypes.string,
  applicationDetails: PropTypes.object,
  orgUsersMap: PropTypes.object,
  global: PropTypes.object,
  history: PropTypes.object,
  className: PropTypes.string,
  actions: PropTypes.object,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  applicationDetails: makeSelectApplicationDetails(),
  orgUsersMap: makeSelectOrgUsers(),
  global: makeSelectGlobal(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

//Do not remote your appName hash from here.
const withReducer = injectReducer({
  key: `${CURRENT_APP_NAME}-applicationDetails`,
  reducer,
});
//Do not remote your appName hash from here.
const withSaga = injectSaga({
  key: `${CURRENT_APP_NAME}-applicationDetails`,
  saga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(injectIntl(clearDataOnUnmount(withStyles(ApplicationDetails, styles))));
