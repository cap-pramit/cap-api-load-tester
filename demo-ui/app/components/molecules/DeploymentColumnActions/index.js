import React from 'react';
import {
  CapRow,
  CapMenu,
  CapDropdown,
  CapIcon,
  CapTooltipWithInfo,
  CapNotification,
} from '@capillarytech/cap-ui-library';
import { withStyles } from '@capillarytech/vulcan-react-sdk/utils';
import messages from './messages';
import styles from './styles';
import { DEPLOYMENT_COMPLETED_STATUS } from './constants';
import { Auth } from '@capillarytech/cap-ui-utils';
import RbacTooltipWrapper from '../../atoms/RbacTooltipWrapper';
import { VULCAN_ENABLE_DEPLOYMENT_PROD, VULCAN_ENABLE_DEPLOYMENT_UAT, VULCAN_UPDATE_DEPLOYMENT } from '../../pages/App/constants';

function DeploymentColumnActions({
  record,
  formatMessage,
  actions,
  applicationId,
}) {
  const { promoteOrDemoteBuild, enableDisableUatOrProd, initiateDeleteBuild } =
    actions || {};

  const {
    isPromoted,
    uatActive,
    prodActive,
    _id: deploymentId,
    state: { status: deploymentStatus, success: deploymentSuccess } = {},
  } = record || {};

  const isDeploymentCompleteAndSuccessful =
    deploymentStatus === DEPLOYMENT_COMPLETED_STATUS && deploymentSuccess;

  const isDeploymentComplete = deploymentStatus === DEPLOYMENT_COMPLETED_STATUS;

  const handleRowClick = e => e.domEvent.stopPropagation();

  const preClickCB = label => {
    CapNotification.info({
      message: formatMessage(messages[label]),
      duration: 1,
    });
  };

  const generateMenuItem = ({
    label,
    preClickLabel,
    onClick,
    disabled,
    tooltipKey,
    actionIcon,
    permission,
  }) => (
    <CapMenu.Item
      key={label}
      disabled={disabled}
      onClick={e => {
        preClickCB(preClickLabel);
        onClick(e);
      }}
    >
      <RbacTooltipWrapper permission={permission}>
        <CapRow type="flex" align="middle" justify="space-between">
          {formatMessage(messages[label])}
          {disabled ? (
            <CapTooltipWithInfo
              className="deployment-action-icon"
              title={formatMessage(messages[tooltipKey])}
            />
          ) : (
            <CapIcon
              className="deployment-action-icon"
              type={actionIcon}
              size="s"
            />
          )}
        </CapRow>
      </RbacTooltipWrapper>
    </CapMenu.Item>
  );

  const menuItems = [
    {
      label: isPromoted ? 'demoteBuild' : 'promoteBuild',
      preClickLabel: isPromoted ? 'demotingBuild' : 'promotingBuild',
      onClick: () =>
        isDeploymentCompleteAndSuccessful &&
        promoteOrDemoteBuild({
          applicationId,
          deploymentId,
          isPromoted: !isPromoted,
          successMsg: formatMessage(
            isPromoted
              ? messages.demoteBuildSuccess
              : messages.promoteBuildSuccess,
          ),
          formatMessage,
        }),
      disabled: !isDeploymentCompleteAndSuccessful || (isPromoted && prodActive) || !Auth.hasAccess(VULCAN_UPDATE_DEPLOYMENT),
      tooltipKey: isPromoted ? 'cannotDemoteBuildMsg' : 'cannotPromoteBuildMsg',
      actionIcon: isPromoted ? 'stop' : 'check-circle',
      permission: VULCAN_UPDATE_DEPLOYMENT,
    },
    {
      label: uatActive ? 'disableUat' : 'enableUat',
      preClickLabel: uatActive ? 'disablingUat' : 'enablingUat',
      onClick: () =>
        enableDisableUatOrProd({
          applicationId,
          deploymentId,
          environment: 'uat',
          action: uatActive ? 'disable' : 'enable',
          successMsg: formatMessage(
            uatActive ? messages.disableUatSuccess : messages.enableUatSuccess,
          ),
          formatMessage,
        }),
      disabled: !isDeploymentCompleteAndSuccessful || !Auth.hasAccess(VULCAN_ENABLE_DEPLOYMENT_UAT),
      tooltipKey: 'cannotEnableUatMsg',
      actionIcon: uatActive ? 'stop' : 'check-circle',
      permission: VULCAN_ENABLE_DEPLOYMENT_UAT,
    },
    {
      label: prodActive ? 'disableProd' : 'enableProd',
      preClickLabel: prodActive ? 'disablingProd' : 'enablingProd',
      onClick: () =>
        isDeploymentCompleteAndSuccessful &&
        enableDisableUatOrProd({
          applicationId,
          deploymentId,
          environment: 'prod',
          action: prodActive ? 'disable' : 'enable',
          successMsg: formatMessage(
            prodActive
              ? messages.disableProdSuccess
              : messages.enableProdSuccess,
          ),
          formatMessage,
        }),
      disabled: !isDeploymentCompleteAndSuccessful || !isPromoted || !Auth.hasAccess(VULCAN_ENABLE_DEPLOYMENT_PROD),
      tooltipKey: 'cannotEnableProdMsg',
      actionIcon: prodActive ? 'stop' : 'check-circle',
      permission: VULCAN_ENABLE_DEPLOYMENT_PROD,
    },
    {
      label: 'deleteBuild',
      preClickLabel: 'deletingBuild',
      onClick: () =>
        isDeploymentComplete &&
        !uatActive &&
        !prodActive &&
        initiateDeleteBuild({ deploymentId, version: record?.version }),
      disabled: !isDeploymentComplete || uatActive || prodActive || !Auth.hasAccess(VULCAN_UPDATE_DEPLOYMENT),
      tooltipKey: 'cannotDeleteBuildMsg',
      actionIcon: 'delete',
      permission: VULCAN_UPDATE_DEPLOYMENT,
    },
  ];

  const renderMenuItem = item => generateMenuItem(item);

  const menu = (
    <CapMenu onClick={handleRowClick}>{menuItems.map(renderMenuItem)}</CapMenu>
  );

  const handleDropdownClick = e => e.stopPropagation();

  return (
    <CapRow>
      <CapDropdown onClick={handleDropdownClick} overlay={menu}>
        <CapIcon type="more" aria-label="Action menu icon" />
      </CapDropdown>
    </CapRow>
  );
}

export default withStyles(DeploymentColumnActions, styles);
