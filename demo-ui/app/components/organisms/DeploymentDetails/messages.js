/*
 * DeploymentDetails Messages
 *
 * This contains all the text for the DeploymentDetails component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'vulcanWebapp.components.organisms.DeploymentDetails';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the DeploymentDetails component!',
  },
  version: {
    id: `${scope}.version`,
    defaultMessage: 'Version',
  },
  status: {
    id: `${scope}.status`,
    defaultMessage: 'Status',
  },
  promoted: {
    id: `${scope}.promoted`,
    defaultMessage: 'Promoted',
  },
  uploadDuration: {
    id: `${scope}.uploadDuration`,
    defaultMessage: 'Upload duration',
  },
  uploadStartedAtCompletedAt: {
    id: `${scope}.uploadStartedAtCompletedAt`,
    defaultMessage: 'Upload started at  {startTime} and completed at {endTime}',
  },
  uploadStatsNotAvailable: {
    id: `${scope}.uploadStatsNotAvailable`,
    defaultMessage: 'Upload stats not available',
  },
  completed: {
    id: `${scope}.completedStatus`,
    defaultMessage: 'Completed',
  },
  in_progress: {
    id: `${scope}.inProgressStatus`,
    defaultMessage: 'In Progress',
  },
  statusUnknown: {
    id: `${scope}.statusUnknown`,
    defaultMessage: 'Status Unknown',
  },
  promotionStatus: {
    id: `${scope}.promotionStatus`,
    defaultMessage: 'Promoted',
  },
  promotedOnBy: {
    id: `${scope}.promotedOnBy`,
    defaultMessage: 'Promoted on {date} by {user}',
  },
  uatEnabled: {
    id: `${scope}.uatEnabled`,
    defaultMessage: 'UAT enabled',
  },
  uatEnabledOnBy: {
    id: `${scope}.uatEnabledOnBy`,
    defaultMessage: 'UAT enabled on {date} by {user}',
  },
  prodEnabled: {
    id: `${scope}.prodEnabled`,
    defaultMessage: 'Prod enabled',
  },
  prodEnabledOnBy: {
    id: `${scope}.prodEnabledOnBy`,
    defaultMessage: 'Prod enabled on {date} by {user}',
  },
  refreshDeployments: {
    id: `${scope}.refreshDeployments`,
    defaultMessage: 'Refresh Deployments',
  },
  actions: {
    id: `${scope}.actions`,
    defaultMessage: 'Actions',
  },
  deleteBuildSuccess: {
    id: `${scope}.deleteBuildSuccess`,
    defaultMessage: 'Deleted Build Successfully',
  },
  deleteBuildConfirmationTitle: {
    id: `${scope}.deleteBuildConfirmationTitle`,
    defaultMessage: 'Delete Build',
  },
  deleteBuildConfirmationContent: {
    id: `${scope}.deleteBuildConfirmationContent`,
    defaultMessage:
      'Are you sure you want to delete this build version {value}?',
  },
  uploadBuild: {
    id: `${scope}.uploadBuild`,
    defaultMessage: 'Upload build',
  },
  noDeploymentsFound: {
    id: `${scope}.noDeploymentsFound`,
    defaultMessage:
      'No deployments found. Click on upload build to upload a new build.',
  },
});
