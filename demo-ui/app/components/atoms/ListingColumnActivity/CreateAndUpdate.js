import React from 'react';
import moment from 'moment';
import { CapRow, CapColumn, CapDivider } from '@capillarytech/cap-ui-library';
import { makeSelectOrgUsers } from '../../pages/Cap/selectors';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import messages from './messages';
import { ACTIVITY_DATE_TIME_FORMAT } from './constants';
import { DATE_TIME_FORMAT_NL } from '../../pages/App/constants';
import styles from './styles';
import { withStyles } from '@capillarytech/vulcan-react-sdk/utils';
function CreationAndUpdate(props) {
  const {
    orgUsersMap,
    formatMessage,
    updatedBy,
    updatedAt,
    createdAt,
    createdBy,
    className,
  } = props;

  // const createdById = Number(createdBy);
  const updatedById = Number(updatedBy);

  return (
    <CapRow className={className}>
      {/* <CapColumn>
        {formatMessage(messages.createdBy)}
        {orgUsersMap.get(createdById)}
      </CapColumn>
      <CapColumn>
        {formatMessage(messages.createdOn)}
        {moment(createdAt).format(DATE_TIME_FORMAT)}
      </CapColumn>
      <CapDivider />
      <CapColumn>
        {' '}
        {formatMessage(messages.updatedBy)}
        {orgUsersMap.get(updatedById)}
      </CapColumn>
      <CapColumn>
        {formatMessage(messages.updatedOn)}
        {moment(updatedAt).format(DATE_TIME_FORMAT)}
      </CapColumn> */}
      <CapColumn style={{ maxWidth: '13ch', marginLeft: 14 }}>
        {moment(updatedAt).format(DATE_TIME_FORMAT_NL)}
      </CapColumn>
    </CapRow>
  );
}

const mapStateTolistData = createStructuredSelector({
  orgUsersMap: makeSelectOrgUsers(),
});

const withConnect = connect(mapStateTolistData);

const CreateAndUpdateComponent = compose(withConnect)(CreationAndUpdate);
export default withStyles(CreateAndUpdateComponent, styles);
