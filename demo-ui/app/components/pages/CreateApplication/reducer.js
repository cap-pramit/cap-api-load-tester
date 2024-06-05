/*
 *
 * CreateApplication reducer
 *
 */

import { fromJS } from 'immutable';
import { I18N_TYPES_CUSTOM, actionTypes } from './constants';
import { REQUEST, SUCCESS, FAILURE } from '../App/constants';

export const initialState = fromJS({
  validateAppNameStatus: null,
  validAppId: null,
  validateAppNameError: null,
  validateAppPrefixPathStatus: null,
  validPrefixPath: null,
  validateAppPrefixPathError: null,
  validateI18nApiConfigStatus: null,
  i18nApiConfigValid: null,
  i18nIntouchConfigValid: null,
  validateI18nApiConfigError: null,
  createOrUpdateApplicationStatus: null,
  createOrUpdateApplicationError: null,
  createOrUpdateApplicationData: null,
  getApplicationByAppIdStatus: null,
  getApplicationByAppIdError: null,
  applicationData: null,
  checkGlobalAppsAllowedStatus: null,
  globalAppsAllowed: null,
  checkGlobalAppsAllowedError: null,
});

const createApplicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VALIDATE_APPNAME_REQUEST:
      return state
        .set('validateAppNameStatus', REQUEST)
        .set('validateAppNameError', null)
        .set('validAppId', null);
    case actionTypes.VALIDATE_APPNAME_SUCCESS:
      return state
        .set('validateAppNameStatus', SUCCESS)
        .set('validAppId', action?.data?.applicationId);
    case actionTypes.VALIDATE_APPNAME_FAILURE:
      return state
        .set('validateAppNameStatus', FAILURE)
        .set('validateAppNameError', fromJS(action.error));
    case actionTypes.VALIDATE_PREFIX_PATH_REQUEST:
      return state
        .set('validateAppPrefixPathStatus', REQUEST)
        .set('validateAppPrefixPathError', null)
        .set('validPrefixPath', null);
    case actionTypes.VALIDATE_PREFIX_PATH_SUCCESS:
      return state
        .set('validateAppPrefixPathStatus', SUCCESS)
        .set('validPrefixPath', action?.data);
    case actionTypes.VALIDATE_PREFIX_PATH_FAILURE:
      return state
        .set('validateAppPrefixPathStatus', FAILURE)
        .set('validateAppPrefixPathError', fromJS(action.error));
    case actionTypes.VALIDATE_I18N_API_CONFIG_REQUEST:
      return state
        .set('validateI18nApiConfigStatus', REQUEST)
        .set('validateI18nApiConfigError', null)
        .set('i18nApiConfigValid', null)
        .set('i18nIntouchConfigValid', null);
    case actionTypes.VALIDATE_I18N_API_CONFIG_SUCCESS:
      const { validationType } = action?.data;
      return state
        .set('validateI18nApiConfigStatus', SUCCESS)
        .set(validationType === I18N_TYPES_CUSTOM ? 'i18nApiConfigValid' : 'i18nIntouchConfigValid', action?.data)
    case actionTypes.VALIDATE_I18N_API_CONFIG_FAILURE:
      return state
        .set('validateI18nApiConfigStatus', FAILURE)
        .set('validateI18nApiConfigError', fromJS(action.error));
    case actionTypes.CREATE_UPDATE_APPLICATION_REQUEST:
      return state
        .set('createOrUpdateApplicationStatus', REQUEST)
        .set('createOrUpdateApplicationError', null)
        .set('createOrUpdateApplicationData', null);
    case actionTypes.CREATE_UPDATE_APPLICATION_SUCCESS:
      return state
        .set('createOrUpdateApplicationStatus', SUCCESS)
        .set('createOrUpdateApplicationData', action?.data);
    case actionTypes.CREATE_UPDATE_APPLICATION_FAILURE:
      return state
        .set('createOrUpdateApplicationStatus', FAILURE)
        .set('createOrUpdateApplicationError', fromJS(action.error));
    case actionTypes.GET_APPLICATION_DETAILS_REQUEST:
      return state
        .set('getApplicationByAppIdStatus', REQUEST)
        .set('getApplicationByAppIdError', null)
        .set('applicationData', null);
    case actionTypes.GET_APPLICATION_DETAILS_SUCCESS:
      return state
        .set('getApplicationByAppIdStatus', SUCCESS)
        .set('applicationData', action?.data);
    case actionTypes.GET_APPLICATION_DETAILS_FAILURE:
      return state
        .set('getApplicationByAppIdStatus', FAILURE)
        .set('getApplicationByAppIdError', fromJS(action.error));
    case actionTypes.GET_GLOBAL_APPS_ALLOWED_REQUEST:
      return state
        .set('checkGlobalAppsAllowedStatus', REQUEST)
        .set('checkGlobalAppsAllowedError', null)
        .set('globalAppsAllowed', null);
    case actionTypes.GET_GLOBAL_APPS_ALLOWED_SUCCESS:
      return state
        .set('checkGlobalAppsAllowedStatus', SUCCESS)
        .set('globalAppsAllowed', action?.data);
    case actionTypes.GET_GLOBAL_APPS_ALLOWED_FAILURE:
      return state
        .set('checkGlobalAppsAllowedStatus', FAILURE)
        .set('checkGlobalAppsAllowedError', fromJS(action.error));
    case actionTypes.DEFAULT_ACTION:
      return state;
    case actionTypes.CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};

export default createApplicationReducer;

