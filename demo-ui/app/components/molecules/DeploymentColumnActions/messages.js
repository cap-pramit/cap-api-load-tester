/*
 * Dashboard Messages
 *
 * This contains all the text for the Dashboard container.
 */
import { defineMessages } from 'react-intl';

export const scope =
  'vulcanWebapp.components.molecules.DeploymentColumnActions';

export default defineMessages({
  promoteBuild: {
    id: `${scope}.promoteBuild`,
    defaultMessage: 'Promote Build',
  },
  demoteBuild: {
    id: `${scope}.demoteBuild`,
    defaultMessage: 'Demote Build',
  },
  enableUat: {
    id: `${scope}.enableUat`,
    defaultMessage: 'Enable UAT',
  },
  disableUat: {
    id: `${scope}.disableUat`,
    defaultMessage: 'Disable UAT',
  },
  enableProd: {
    id: `${scope}.enableProd`,
    defaultMessage: 'Enable Prod',
  },
  disableProd: {
    id: `${scope}.disableProd`,
    defaultMessage: 'Disable Prod',
  },
  deleteBuild: {
    id: `${scope}.deleteBuild`,
    defaultMessage: 'Delete Build',
  },
  promotingBuild: {
    id: `${scope}.promotingBuild`,
    defaultMessage: 'Promoting Build',
  },
  demotingBuild: {
    id: `${scope}.demotingBuild`,
    defaultMessage: 'Demoting Build',
  },
  enablingUat: {
    id: `${scope}.enablingUat`,
    defaultMessage: 'Enabling UAT',
  },
  disablingUat: {
    id: `${scope}.disablingUat`,
    defaultMessage: 'Disabling UAT',
  },
  enablingProd: {
    id: `${scope}.enablingProd`,
    defaultMessage: 'Enabling Prod',
  },
  disablingProd: {
    id: `${scope}.disablingProd`,
    defaultMessage: 'Disabling Prod',
  },
  deletingBuild: {
    id: `${scope}.deletingBuild`,
    defaultMessage: 'Deleting Build',
  },
  cannotPromoteBuildMsg: {
    id: `${scope}.cannotPromoteBuildMsg`,
    defaultMessage: `You cannot promote a build if deployment is ongoing or has failed`,
  },
  cannotDemoteBuildMsg: {
    id: `${scope}.cannotDemoteBuildMsg`,
    defaultMessage: `You can't demote a build if it is enabled on Prod.`,
  },
  cannotEnableUatMsg: {
    id: `${scope}.cannotEnableUatMsg`,
    defaultMessage: 'You cannot enable UAT if deployment is ongoing or has failed.',
  },
  cannotEnableProdMsg: {
    id: `${scope}.cannotEnableProdMsg`,
    defaultMessage:
      `You cannot enable prod if deployment is ongoing, failed, or hasn't been promoted yet.`,
  },
  cannotDeleteBuildMsg: {
    id: `${scope}.cannotDeleteBuildMsg`,
    defaultMessage:
      `You cannot delete a build in progress or if it's already promoted or in use for UAT or prod.`,
  },
  promoteBuildSuccess: {
    id: `${scope}.promoteBuildSuccess`,
    defaultMessage: 'Promoted Build Successfully',
  },
  demoteBuildSuccess: {
    id: `${scope}.demoteBuildSuccess`,
    defaultMessage: 'Demoted Build Successfully',
  },
  enableUatSuccess: {
    id: `${scope}.enableUatSuccess`,
    defaultMessage: 'Enabled UAT Successfully',
  },
  disableUatSuccess: {
    id: `${scope}.disableUatSuccess`,
    defaultMessage: 'Disabled UAT Successfully',
  },
  enableProdSuccess: {
    id: `${scope}.enableProdSuccess`,
    defaultMessage: 'Enabled Prod Successfully',
  },
  disableProdSuccess: {
    id: `${scope}.disableProdSuccess`,
    defaultMessage: 'Disabled Prod Successfully',
  },
});
