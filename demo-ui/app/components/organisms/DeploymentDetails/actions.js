/*
 *
 * DeploymentDetails actions
 *
 */

import { actionTypes } from './constants';

export function defaultAction() {
  return {
    type: actionTypes.DEFAULT_ACTION,
  };
}

export function clearData() {
  return {
    type: actionTypes.CLEAR_DATA,
  };
}

export function getDeploymentsList(applicationId, formatMessage) {
  return {
    type: actionTypes.GET_DEPLOYMENT_LISTING_DATA_REQUEST,
    applicationId,
    formatMessage,
  };
}

export function enableDisableUatOrProd({
  applicationId,
  deploymentId,
  environment,
  action,
  successMsg,
  formatMessage,
}) {
  return {
    type: actionTypes.ENABLE_DISABLE_UAT_OR_PROD_REQUEST,
    applicationId,
    deploymentId,
    environment,
    action,
    successMsg,
    formatMessage,
  };
}

export function promoteOrDemoteBuild({
  applicationId,
  deploymentId,
  isPromoted,
  successMsg,
  formatMessage,
}) {
  return {
    type: actionTypes.PROMOTE_DEMOTE_BUILD_REQUEST,
    applicationId,
    deploymentId,
    isPromoted,
    successMsg,
    formatMessage,
  };
}

export function initiateDeleteBuild({ deploymentId, version }) {
  return {
    type: actionTypes.INITIATE_DELETE_BUILD_REQUEST,
    deploymentId,
    version,
  };
}

export function cancelInitiateDeleteBuild() {
  return {
    type: actionTypes.INITIATE_DELETE_BUILD_FAILURE,
  };
}

export function deleteBuild({ applicationId, deploymentId, successMsg, formatMessage }) {
  return {
    type: actionTypes.DELETE_BUILD_REQUEST,
    applicationId,
    deploymentId,
    successMsg,
    formatMessage,
  };
}

export function uploadBuild({
  applicationId,
  file,
  description,
  successMsg,
  errorMsg,
  formatMessage
}) {
  return {
    type: actionTypes.UPLOAD_BUILD_REQUEST,
    file,
    description,
    applicationId,
    successMsg,
    errorMsg,
    formatMessage
  };
}

export function openUploadSlideBox() {
  return {
    type: actionTypes.OPEN_UPLOAD_SLIDE_BOX,
  };
}

export function closeUploadSlideBox() {
  return {
    type: actionTypes.CLOSE_UPLOAD_SLIDE_BOX,
  };
}

export function getDeploymentByDeploymentId(deploymentId, formatMessage) {
  return {
    type: actionTypes.GET_DEPLOYMENT_BY_DEPLOYMENT_ID_REQUEST,
    deploymentId,
    formatMessage,
  };
}

export function pollForUatProdEnablementStatus({ deploymentId, formatMessage, environment, applicationId, successMsg }) {
  return {
    type: actionTypes.UAT_PROD_ENABLEMENT_POLL_STATUS_REQUEST,
    deploymentId,
    formatMessage,
    environment,
    applicationId,
    successMsg
  };
}
