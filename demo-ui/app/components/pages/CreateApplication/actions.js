/*
 *
 * CreateApplication actions
 *
 */

import { actionTypes } from './constants';

export const validateAppName = (appName, formatMessage) => {
  return {
    type: actionTypes.VALIDATE_APPNAME_REQUEST,
    appName,
    formatMessage,
  };
};

export const validatePrefixPath = (prefixPath, formatMessage) => {
  return {
    type: actionTypes.VALIDATE_PREFIX_PATH_REQUEST,
    appPrefixPath: prefixPath,
    formatMessage
  };
};

export const validateI18nApiConfig = (config, callback) => {
  return {
    type: actionTypes.VALIDATE_I18N_API_CONFIG_REQUEST,
    config,
    callback,
  };
};

export const createOrUpdateApplication = ({ payload, appId, successMsg, history, formatMessage }) => {
  return {
    type: actionTypes.CREATE_UPDATE_APPLICATION_REQUEST,
    payload,
    appId,
    successMsg,
    history,
    formatMessage,
  };
};

export const getApplicationDetails = (appId, formatMessage) => {
  return {
    type: actionTypes.GET_APPLICATION_DETAILS_REQUEST,
    appId,
    formatMessage,
  };
};

export const checkGlobalAppsAllowed = () => {
  return {
    type: actionTypes.GET_GLOBAL_APPS_ALLOWED_REQUEST,
  };
};

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