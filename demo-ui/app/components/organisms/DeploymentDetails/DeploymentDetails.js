/**
 *
 * DeploymentDetails
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { injectIntl } from 'react-intl';
import { injectSaga } from '@capillarytech/vulcan-react-sdk/utils';
import {
  injectReducer,
  clearDataOnUnmount,
} from '@capillarytech/vulcan-react-sdk/utils';
import makeSelectDeploymentDetails from './selectors';
import { makeSelectOrgUsers } from '../../pages/Cap/selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import * as constants from '../../pages/App/constants';
import UploadBuildContainer from '../../molecules/UploadBuildContainer';
import { UPLOADED_BUILD_POLL_INTERVAL } from './constants';

import DeleteConfirmationModal from '../../molecules/DeleteConfirmationModal';
const { REQUEST, INITIAL, SUCCESS, VULCAN_CREATE_DEPLOYMENT } = constants;
import {
  CapRow,
  CapColumn,
  CapInput,
  CapButton,
  CapTable,
  CapTooltip,
  CapHeading,
  CapSpin,
  CapIcon,
  CapSlideBox,
} from '@capillarytech/cap-ui-library';
import { withRouter } from 'react-router';
import getColumns from './columns';
import styles from './styles';
import { withStyles } from '@capillarytech/vulcan-react-sdk/utils';
import EmptyStateIllustration from '../../atoms/EmptyStateIllustration';
import RbacTooltipWrapper from '../../atoms/RbacTooltipWrapper';
import { Auth } from '@capillarytech/cap-ui-utils';

function DeploymentDetails(props) {
  const {
    actions,
    applicationId,
    deploymentDetails,
    intl,
    orgUsersMap,
    className,
    history,
  } = props;
  const { formatMessage } = intl;

  React.useEffect(
    () => {
      actions.getDeploymentsList(applicationId, formatMessage);
    },
    [actions, applicationId],
  );

  React.useEffect(
    () => {
      if (
        deploymentDetails?.uploadedBuildDeploymentId &&
        deploymentDetails?.uploadedBuildRemainingPollFrequency > 0
      ) {
        const timeout = setTimeout(() => {
          actions.getDeploymentByDeploymentId(
            deploymentDetails?.uploadedBuildDeploymentId,
            formatMessage,
          );
        }, UPLOADED_BUILD_POLL_INTERVAL);
        return () => clearTimeout(timeout);
      }
    },
    [
      deploymentDetails?.uploadedBuildDeploymentId,
      deploymentDetails?.uploadedBuildRemainingPollFrequency,
    ],
  );

  React.useEffect(
    () => {
      const { enableUatProdDeploymentId, enableUatRemainingPollFrequency, enableDeploymentEnvironment, successMsg } = deploymentDetails || {};
      if (enableUatProdDeploymentId && enableUatRemainingPollFrequency > 0) {
        const timeout = setTimeout(() => {
          actions.pollForUatProdEnablementStatus({
            deploymentId: enableUatProdDeploymentId,
            formatMessage,
            environment: enableDeploymentEnvironment,
            applicationId,
            successMsg,
          });
        }, UPLOADED_BUILD_POLL_INTERVAL);
        return () => clearTimeout(timeout);
      }
    },
    [
      deploymentDetails?.enableUatProdDeploymentId,
      deploymentDetails?.enableUatRemainingPollFrequency,
    ],
  );

  const handleDeploymentsRefresh = () => {
    if (
      deploymentDetails?.fetchingDeploymentsData === REQUEST ||
      deploymentDetails?.fetchingDeploymentsData === INITIAL
    ) {
      return;
    }
    actions.getDeploymentsList(applicationId, formatMessage);
  };

  const columns = getColumns({
    formatMessage,
    history: history,
    orgUsersMap,
    actions: {
      enableDisableUatOrProd: actions.enableDisableUatOrProd,
      initiateDeleteBuild: actions.initiateDeleteBuild,
      promoteOrDemoteBuild: actions.promoteOrDemoteBuild,
    },
    applicationId,
  });

  const noDeploymentsPresent =
    deploymentDetails?.fetchingDeploymentsData === SUCCESS &&
    deploymentDetails?.deploymentsList?.length === 0;

  const onDeleteDeploymentCb = () =>
    actions.deleteBuild({
      applicationId,
      deploymentId: deploymentDetails?.initiateDeleteBuildForId,
      successMsg: formatMessage(messages.deleteBuildSuccess),
      formatMessage,
    });

  return (
    <div className={className}>
      <CapRow type="flex" justify="end" gutter={16}>
        <CapColumn>
          <CapTooltip title={formatMessage(messages.refreshDeployments)}>
            <CapIcon
              className="refresh-deployments"
              onClick={handleDeploymentsRefresh}
              type="refreshCircle"
              size="s"
            />
          </CapTooltip>
        </CapColumn>
        <RbacTooltipWrapper permission={VULCAN_CREATE_DEPLOYMENT}>
          <span>
            <CapButton
              disabled={!Auth.hasAccess(VULCAN_CREATE_DEPLOYMENT)}
              onClick={actions.openUploadSlideBox}
            >
              {intl.formatMessage(messages.uploadBuild)}
            </CapButton>
          </span>
        </RbacTooltipWrapper>
      </CapRow>
      <br />
      {noDeploymentsPresent ? (
        <EmptyStateIllustration
          emptyIllustrationText={formatMessage(messages.noDeploymentsFound)}
        />
      ) : (
        <CapTable
          columns={columns}
          dataSource={deploymentDetails?.deploymentsList}
          id="deployments-table"
          showLoader={deploymentDetails?.fetchingDeploymentsData === REQUEST}
          loading={deploymentDetails?.fetchingDeploymentsData === REQUEST}
          pagination={{ pageSize: 5 }}
        />
      )}

      {deploymentDetails?.initiateDeleteBuildForId && (
        <DeleteConfirmationModal
          modalTitle={formatMessage(messages.deleteBuildConfirmationTitle)}
          modalContentMsg={formatMessage(
            messages.deleteBuildConfirmationContent,
            {
              value: deploymentDetails?.initiateDeleteBuildForVersion,
            },
          )}
          noCb={actions.cancelInitiateDeleteBuild}
          yesCb={onDeleteDeploymentCb}
        />
      )}
      {deploymentDetails?.openUploadSlideBox && (
        <CapSlideBox
          showShadow
          show={true}
          size="size-r"
          header={
            <CapHeading type="h2">
              {formatMessage(messages.uploadBuild)}
            </CapHeading>
          }
          handleClose={actions.closeUploadSlideBox}
          content={
            <UploadBuildContainer
              formatMessage={formatMessage}
              applicationId={applicationId}
              uploadBuildAction={actions.uploadBuild}
              uploadBuildStatus={deploymentDetails?.uploadBuildStatus}
            />
          }
        />
      )}
    </div>
  );
}

DeploymentDetails.propTypes = {};

const mapStateToProps = createStructuredSelector({
  deploymentDetails: makeSelectDeploymentDetails(),
  orgUsersMap: makeSelectOrgUsers(),
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
  key: `${CURRENT_APP_NAME}-deploymentDetails`,
  reducer,
});
//Do not remote your appName hash from here.
const withSaga = injectSaga({
  key: `${CURRENT_APP_NAME}-deploymentDetails`,
  saga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withRouter(injectIntl(clearDataOnUnmount(withStyles(DeploymentDetails, styles)))));
