import { call, put, all, takeLatest } from 'redux-saga/effects';
import { actionTypes } from './constants';
import * as Api from '../../../services/api';
import CapNotification from '@capillarytech/cap-ui-library/CapNotification';
import { formatErrorMessage } from '../../../utils/errorDisplayUtils';
export function* defaultSaga() {
  console.log('this is default Saga. You can make api calls etc from here and dispatch a action using "put"')
}

export function* validateAppName({ appName, callback, formatMessage }) {
  try {
    const res = yield call(Api.validateAppName, appName);
    if (res?.success) {
      yield [
        put({
          type: actionTypes.VALIDATE_APPNAME_SUCCESS,
          data: res?.result,
        }),
        put({
          type: actionTypes.VALIDATE_PREFIX_PATH_REQUEST,
          appPrefixPath: `/${res?.result?.applicationId}/ui`,
        }),
      ]
    } else {
      yield put({
        type: actionTypes.VALIDATE_APPNAME_FAILURE,
        error: res?.message?.message | res?.error,
      });
      formatErrorMessage(formatMessage, res?.message)
    }
    callback && callback(res);
  } catch (error) {
    yield put({ type: actionTypes.VALIDATE_APPNAME_FAILURE, error });
  }
}

export function* validatePrefixPath({ appPrefixPath, formatMessage }) {
  try {
    const res = yield call(Api.validatePrefixPath, appPrefixPath);
    if (res?.success) {
      yield put({
        type: actionTypes.VALIDATE_PREFIX_PATH_SUCCESS,
        data: res?.result,
      });
    } else {
      yield put({
        type: actionTypes.VALIDATE_PREFIX_PATH_FAILURE,
        error: res?.message?.message || res?.error || res?.message,
      });
      formatErrorMessage(formatMessage, res?.message);
    }
  } catch (error) {
    yield put({ type: actionTypes.VALIDATE_PREFIX_PATH_FAILURE, error });
  }
}

export function* validateI18nApiConfig({ config, callback }) {
  try {
    const newConfig = { ...config };
    delete newConfig?.formatMessage;
    const res = yield call(Api.validateI18nApiConfig, newConfig);
    if (res?.success) {
      yield put({
        type: actionTypes.VALIDATE_I18N_API_CONFIG_SUCCESS,
        data: { ...res?.result, validationType: config?.type },
      });
    } else {
      yield put({
        type: actionTypes.VALIDATE_I18N_API_CONFIG_FAILURE,
        error: res?.message?.message || res?.error,
      });
      formatErrorMessage(config.formatMessage, res?.message);
    }
    callback && callback(res);
  } catch (error) {
    yield put({ type: actionTypes.VALIDATE_I18N_API_CONFIG_FAILURE, error });
  }
}

export function* createOrUpdateApplication({ payload, appId, successMsg, history, formatMessage }) {
  try {
    const res = yield call(Api.createOrUpdateApplication, { payload, appId });
    if (res?.success) {
      yield put({
        type: actionTypes.CREATE_UPDATE_APPLICATION_SUCCESS,
        data: res?.result,
      });
      CapNotification.success({
        message: successMsg,
        duration: 2,
      });
      history.push('/');
    } else {
      yield put({
        type: actionTypes.CREATE_UPDATE_APPLICATION_FAILURE,
        error: res?.message?.message || res?.error,
      });
      formatErrorMessage(formatMessage, res?.message);
      CapNotification.error({
        message: res?.message?.message || res.message,
      });
    }
  } catch (error) {
    yield put({ type: actionTypes.CREATE_UPDATE_APPLICATION_FAILURE, error });
    CapNotification.error({
      message: error,
    });
  }
}

export function* getApplicationDetails({ appId, formatMessage }) {
  try {
    const res = yield call(Api.getApplicationDetails, appId);
    if (res?.success) {
      yield put({
        type: actionTypes.GET_APPLICATION_DETAILS_SUCCESS,
        data: res?.result,
      });
    } else {
      yield put({
        type: actionTypes.GET_APPLICATION_DETAILS_FAILURE,
        error: res?.message?.message || res?.error,
      });
      formatErrorMessage(formatMessage, res?.message);
    }
  } catch (error) {
    yield put({ type: actionTypes.GET_APPLICATION_DETAILS_FAILURE, error });
  }
}

export function* checkGlobalAppsAllowed() {
  try {
    const res = yield call(Api.checkGlobalAppsAllowed);
    if (res?.success) {
      yield put({
        type: actionTypes.GET_GLOBAL_APPS_ALLOWED_SUCCESS,
        data: res?.result?.allowGlobalApps,
      });
    } else {
      yield put({
        type: actionTypes.GET_GLOBAL_APPS_ALLOWED_FAILURE,
        error: res?.message?.message || res?.error,
      });
    }
  } catch (error) {
    yield put({ type: actionTypes.GET_GLOBAL_APPS_ALLOWED_FAILURE, error });
  }
}

// Individual exports for testing
export function* watchForDefaultSaga() {
  yield takeLatest(actionTypes.DEFAULT_ACTION, defaultSaga);
}

export function* watchForValidateAppName() {
  yield takeLatest(actionTypes.VALIDATE_APPNAME_REQUEST, validateAppName);
}

export function* watchForCheckGlobalAppsAllowed() {
  yield takeLatest(actionTypes.GET_GLOBAL_APPS_ALLOWED_REQUEST, checkGlobalAppsAllowed);
}

export function* watchForValidatePrefixPath() {
  yield takeLatest(actionTypes.VALIDATE_PREFIX_PATH_REQUEST, validatePrefixPath);
}

export function* watchForValidateI18nConfig() {
  yield takeLatest(actionTypes.VALIDATE_I18N_API_CONFIG_REQUEST, validateI18nApiConfig);
}

export function* watchForCreateUpdateApplication() {
  yield takeLatest(actionTypes.CREATE_UPDATE_APPLICATION_REQUEST, createOrUpdateApplication);
}

export function* watchForGetApplicationByAppId() {
  yield takeLatest(actionTypes.GET_APPLICATION_DETAILS_REQUEST, getApplicationDetails);
}

export default function* () {
  yield all([
    watchForDefaultSaga(),
    watchForValidateAppName(),
    watchForValidatePrefixPath(),
    watchForValidateI18nConfig(),
    watchForCreateUpdateApplication(),
    watchForGetApplicationByAppId(),
    watchForCheckGlobalAppsAllowed(),
  ]);
}