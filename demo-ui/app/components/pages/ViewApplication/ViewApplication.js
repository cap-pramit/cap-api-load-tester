/**
 *
 * ViewApplication
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { injectIntl } from 'react-intl';
import {
  injectSaga,
  injectReducer,
  clearDataOnUnmount,
  withStyles,
} from '@capillarytech/vulcan-react-sdk/utils';
import makeSelectViewApplication from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { withRouter } from 'react-router';

import {
  CapStepsAccordian,
  CapHeader,
  CapIcon,
  CapRow,
  CapColumn,
} from '@capillarytech/cap-ui-library';

import styles from './styles';
import ApplicationDetails from '../../organisms/ApplicationDetails';
import DeploymentDetails from '../../organisms/DeploymentDetails';

import { APPLICATION_DETAILS_STEP, DEPLOYMENTS_STEP } from './constants';

function ViewApplication(props) {
  const { actions, className, match, history } = props;
  const { formatMessage } = props.intl;

  const { applicationId } = match?.params;

  const goBack = () => {
    history.push('/');
  };

  return (
    <div className={className}>
      <Helmet>
        <title>View Application</title>
        <meta name="description" content="View Application" />
      </Helmet>
      <CapRow type="flex">
        <CapHeader
          titleClass="create-application-header"
          title={formatMessage(messages.viewApplication)}
          prefix={
            <CapIcon type="back" data-testid="back-icon" onClick={goBack} />
          }
        />
        <CapColumn className="view-app-accordion">
          <CapStepsAccordian
            defaultActiveKey={[APPLICATION_DETAILS_STEP]}
            accordion={false}
            items={[
              {
                header: (
                  <CapHeader
                    size="regular"
                    title={formatMessage(messages.applicationDetails)}
                  />
                ),
                content: (
                  <ApplicationDetails
                    applicationId={applicationId}
                    history={history}
                  />
                ),
                key: APPLICATION_DETAILS_STEP,
              },
              {
                header: (
                  <CapHeader
                    size="regular"
                    title={formatMessage(messages.deployments)}
                  />
                ),
                content: <DeploymentDetails applicationId={applicationId} />,
                key: DEPLOYMENTS_STEP,
              },
            ]}
          />
        </CapColumn>
      </CapRow>
    </div>
  );
}

ViewApplication.propTypes = {};

const mapStateToProps = createStructuredSelector({
  viewApplication: makeSelectViewApplication(),
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
  key: `${CURRENT_APP_NAME}-viewApplication`,
  reducer,
});
//Do not remote your appName hash from here.
const withSaga = injectSaga({
  key: `${CURRENT_APP_NAME}-viewApplication`,
  saga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(
  withRouter(
    injectIntl(clearDataOnUnmount(withStyles(ViewApplication, styles))),
  ),
);
