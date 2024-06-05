import React from 'react';
import { CapNotification } from '@capillarytech/cap-ui-library';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Api from '../../../services/api';
import { actionTypes } from './constants';
import { actionTypes as applicationDetailActionTypes } from '../ApplicationDetails/constants';
import { formatErrorMessage } from '../../../utils/errorDisplayUtils';
import { isEmpty } from 'lodash';
import { DEPLOYMENT_COMPLETED_STATUS } from '../../molecules/DeploymentColumnActions/constants';
export function* deploymentsListingRequest(action) {
  try {
    let res = yield call(Api.getDeploymentsList, action?.applicationId);
    if (res.success) {
      yield put({
        type: actionTypes.GET_DEPLOYMENT_LISTING_DATA_SUCCESS,
        data: res?.result?.deployments,
      });
    } else {
      yield put({
        type: actionTypes.GET_DEPLOYMENT_LISTING_DATA_FAILURE,
        error: result.message,
      });
      formatErrorMessage(action.formatMessage, res?.message);
    }
  } catch (error) {
    yield put({ type: actionTypes.GET_DEPLOYMENT_LISTING_DATA_FAILURE, error });
  }
}

export function* enableDisableUatOrProdRequest(action = {}) {
  try {
    let res = yield call(Api.enableDisableUatOrProd, action);
    const { success, result: { deploymentId } = {}, message } = res;
    if (success) {
      yield [
        put({
          type: actionTypes.UAT_PROD_ENABLEMENT_POLL_STATUS_REQUEST,
          deploymentId,
          environment: action.environment,
          resetPollCount: true,
          formatMessage: action.formatMessage,
          successMsg: action.successMsg,
        }),
      ];
    } else {
      formatErrorMessage(action.formatMessage, message);
    }
  } catch (error) {
    yield put({ type: actionTypes.ENABLE_DISABLE_UAT_OR_PROD_FAILURE, error });
  }
}

export function* promoteOrDemoteBuild(action) {
  try {
    let res = yield call(Api.promoteOrDemoteBuild, action);
    if (res.success) {
      if (action?.successMsg) {
        CapNotification.success({
          message: action?.successMsg,
          duration: 2,
        });
      }
      yield put({
        type: actionTypes.PROMOTE_DEMOTE_BUILD_SUCCESS,
        deploymentId: action?.deploymentId,
        isPromoted: action?.isPromoted,
      });
    } else {
      formatErrorMessage(action.formatMessage, res?.message);
    }
  } catch (error) {
    yield put({ type: actionTypes.PROMOTE_DEMOTE_BUILD_FAILURE, error });
  }
}

export function* deleteBuild(action) {
  try {
    let res = yield call(Api.deleteBuild, action);
    if (res.success) {
      if (action?.successMsg) {
        CapNotification.success({
          message: action?.successMsg,
          duration: 2,
        });
      }
      yield put({
        type: actionTypes.DELETE_BUILD_SUCCESS,
        deploymentId: action?.deploymentId,
      });
    } else {
      formatErrorMessage(action.formatMessage, res?.message);
    }
  } catch (error) {
    yield put({ type: actionTypes.DELETE_BUILD_FAILURE, error });
  }
}

export function* uploadBuild({
  file,
  applicationId,
  description,
  successMsg,
  errorMsg,
  formatMessage,
}) {
  try {
    const result = yield call(Api.uploadBuild, {
      file,
      applicationId,
      description,
    });
    if (result.success) {
      yield [
        put({
          type: actionTypes.UPLOAD_BUILD_SUCCESS,
          deploymentId: result?.result?.deploymentId,
        }),
        put({
          type: actionTypes.GET_DEPLOYMENT_LISTING_DATA_REQUEST,
          applicationId,
        }),
      ];

      CapNotification.success({
        message: successMsg,
        duration: 1.5,
      });
    } else {
      yield put({
        type: actionTypes.UPLOAD_BUILD_FAILURE,
        error: result.message,
      });
      formatErrorMessage(formatMessage, result?.message)
    }
  } catch (error) {
    yield [
      put({
        type: actionTypes.UPLOAD_BUILD_FAILURE,
        data: error,
      }),
    ];
  }
}

export function* getDeploymentByDeploymentId(action) {
  try {
    let res = yield call(Api.getDeploymentByDeploymentId, action?.deploymentId);
    if (res.success) {
      yield put({
        type: actionTypes.GET_DEPLOYMENT_BY_DEPLOYMENT_ID_SUCCESS,
        data: res?.result,
        deploymentId: action?.deploymentId,
      });
    } else {
      formatErrorMessage(action.formatMessage, res?.message);
    }
  } catch (error) {
    yield put({
      type: actionTypes.GET_DEPLOYMENT_BY_DEPLOYMENT_ID_FAILURE,
      error,
    });
  }
}

export function* getUatProdEnablementStatus(action = {}) {
  try {
    const { deploymentId, environment, successMsg, applicationId, formatMessage } = action;
    let res = yield call(Api.getDeploymentByDeploymentId, deploymentId);
    const { success, result: { deploymentState = {} } = {}, message } = res || {};
    if (success) {
      if (deploymentState?.[environment]?.status !== DEPLOYMENT_COMPLETED_STATUS) {
        yield put({
          type: actionTypes.UAT_PROD_ENABLEMENT_POLL_STATUS_SUCCESS,
          data: res?.result,
          deploymentId,
          environment,
          successMsg,
        });
      } else if (deploymentState?.[environment]?.status === DEPLOYMENT_COMPLETED_STATUS && !deploymentState?.[environment]?.success) {
        if (!isEmpty(deploymentState?.[environment]?.error)) CapNotification.error({ message: deploymentState?.[environment]?.error, duration: 2 });
        yield [
          put({
            type: actionTypes.UAT_PROD_ENABLEMENT_POLL_STATUS_FAILURE,
            error: deploymentState?.[environment]?.error,
          }),
          put({
            type: actionTypes.GET_DEPLOYMENT_LISTING_DATA_REQUEST,
            applicationId,
          }),
        ];
      } else {
        if (successMsg) CapNotification.success({ message: successMsg, duration: 2 });
        yield [
          put({
            type: actionTypes.GET_DEPLOYMENT_LISTING_DATA_REQUEST,
            applicationId,
          }),
          put({
            type: applicationDetailActionTypes.GET_APPLICATION_DETAILS_REQUEST,
            applicationId: action?.applicationId,
          }),
        ];
      }
    } else {
      formatErrorMessage(formatMessage, message);
    }
  } catch (error) {
    put({
      type: actionTypes.UAT_PROD_ENABLEMENT_POLL_STATUS_FAILURE,
      error
    });
  }
}

export function* watchForDeploymentListing() {
  yield takeLatest(
    actionTypes.GET_DEPLOYMENT_LISTING_DATA_REQUEST,
    deploymentsListingRequest,
  );
}

export function* watchForEnableDisableUatOrProdRequest() {
  yield takeLatest(
    actionTypes.ENABLE_DISABLE_UAT_OR_PROD_REQUEST,
    enableDisableUatOrProdRequest,
  );
}

export function* watchForPromoteOrDemoteBuildRequest() {
  yield takeLatest(
    actionTypes.PROMOTE_DEMOTE_BUILD_REQUEST,
    promoteOrDemoteBuild,
  );
}

export function* watchForDeleteBuildRequest() {
  yield takeLatest(actionTypes.DELETE_BUILD_REQUEST, deleteBuild);
}

export function* watchForUploadBuild() {
  yield takeLatest(actionTypes.UPLOAD_BUILD_REQUEST, uploadBuild);
}

export function* watchForGetDeploymentByDeploymentId() {
  yield takeLatest(
    actionTypes.GET_DEPLOYMENT_BY_DEPLOYMENT_ID_REQUEST,
    getDeploymentByDeploymentId,
  );
}

export function* watchForUatProdEnablementPollStatus() {
  yield takeLatest(
    actionTypes.UAT_PROD_ENABLEMENT_POLL_STATUS_REQUEST,
    getUatProdEnablementStatus,
  );
}

export default function* () {
  yield all([
    watchForDeploymentListing(),
    watchForEnableDisableUatOrProdRequest(),
    watchForPromoteOrDemoteBuildRequest(),
    watchForDeleteBuildRequest(),
    watchForUploadBuild(),
    watchForGetDeploymentByDeploymentId(),
    watchForUatProdEnablementPollStatus(),
  ]);
}
