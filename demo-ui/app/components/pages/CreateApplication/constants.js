/*
 *
 * CreateApplication constants
 *
 */
import { defineActionTypes } from '@capillarytech/vulcan-react-sdk/utils';
import { NATIVE, EXTERNAL, GLOBAL } from '../App/constants';

const scope = '/Components/pages/CreateApplication';

export const INITIAL_TRANSLATION_API_CONFIG = JSON.stringify(
  {
    serviceName: 'https://test-domain.com',
    url: '/path/to/i18n/api/{{locale}}',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: {},
    query: {},
  },
  null,
  4,
);
export const REGEX_VALID_APP_NAME = /^([a-z\-_0-9]{1,30})$/;
export const REGEX_ATLEAST_ONE_ALPHABET = /^(.*[a-z]{1,}.*)$/;
export const REGEX_VALID_PREFIX_PATH = /^\/[\/a-zA-Z0-9\-_]+$/;
export const REGEX_VALID_URL = /^(http|https):\/\/[^ "]+$/;
export const REGEX_VALID_DOMAINS = /^(?:[a-zA-Z0-9-]{1,63}\.?){1,127}[a-zA-Z]{2,6}$/;
export const MODE_CREATE = 'create';
export const MODE_EDIT = 'edit';
export const APP_TYPE_NATIVE = NATIVE;
export const APP_TYPE_EXTERNAL = EXTERNAL;
export const APP_TYPE_GLOBAL = GLOBAL;
export const CAPILLARY_ORG = '0';
export const LOGIN_TYPE_OTP = 'otp';
export const LOGIN_TYPE_PASSWORD = 'password';
export const LOGIN_TYPE_DUAL = 'dual';
export const IDENTIFIER_TYPE_EMAIL = 'email';
export const IDENTIFIER_TYPE_MOBILE = 'mobile';
export const DEFAULT_LOCALE = 'en';
export const I18N_TYPES_INTOUCH = 'intouch';
export const I18N_TYPES_CUSTOM = 'custom';
export const APP_LANGUAGE_REACT = 'react';
export const STEP_BASIC = 'STEP_BASIC';
export const STEP_I18N = 'STEP_I18N';
export const STEP_AUTH = 'STEP_AUTH';

export const CONFIG_TYPE_BASIC = 'basicConfig';
export const CONFIG_TYPE_AUTH = 'authConfig';
export const CONFIG_TYPE_TRANSLATION = 'translationConfig';
export const CONFIG_TYPE_ERRORFIELDS = 'errorFields';

export const actionTypes = defineActionTypes(
  {
    DEFAULT_ACTION: 'DEFAULT_ACTION',
    CLEAR_DATA: 'CLEAR_DATA',
    VALIDATE_APPNAME_REQUEST: 'VALIDATE_APPNAME_REQUEST',
    VALIDATE_APPNAME_SUCCESS: 'VALIDATE_APPNAME_SUCCESS',
    VALIDATE_APPNAME_FAILURE: 'VALIDATE_APPNAME_FAILURE',
    VALIDATE_PREFIX_PATH_REQUEST: 'VALIDATE_PREFIX_PATH_REQUEST',
    VALIDATE_PREFIX_PATH_SUCCESS: 'VALIDATE_PREFIX_PATH_SUCCESS',
    VALIDATE_PREFIX_PATH_FAILURE: 'VALIDATE_PREFIX_PATH_FAILURE',
    VALIDATE_I18N_API_CONFIG_REQUEST: 'VALIDATE_I18N_API_CONFIG_REQUEST',
    VALIDATE_I18N_API_CONFIG_SUCCESS: 'VALIDATE_I18N_API_CONFIG_SUCCESS',
    VALIDATE_I18N_API_CONFIG_FAILURE: 'VALIDATE_I18N_API_CONFIG_FAILURE',
    CREATE_UPDATE_APPLICATION_REQUEST: 'CREATE_UPDATE_APPLICATION_REQUEST',
    CREATE_UPDATE_APPLICATION_SUCCESS: 'CREATE_UPDATE_APPLICATION_SUCCESS',
    CREATE_UPDATE_APPLICATION_FAILURE: 'CREATE_UPDATE_APPLICATION_FAILURE',
    GET_APPLICATION_DETAILS_REQUEST: 'GET_APPLICATION_DETAILS_REQUEST',
    GET_APPLICATION_DETAILS_SUCCESS: 'GET_APPLICATION_DETAILS_SUCCESS',
    GET_APPLICATION_DETAILS_FAILURE: 'GET_APPLICATION_DETAILS_FAILURE',
    GET_GLOBAL_APPS_ALLOWED_REQUEST: 'GET_GLOBAL_APPS_ALLOWED_REQUEST',
    GET_GLOBAL_APPS_ALLOWED_SUCCESS: 'GET_GLOBAL_APPS_ALLOWED_SUCCESS',
    GET_GLOBAL_APPS_ALLOWED_FAILURE: 'GET_GLOBAL_APPS_ALLOWED_FAILURE',
  },
  { prefix: CURRENT_APP_NAME, scope: scope },
);

// Define any other constants here like so...
// export const DATE_DISPLAY_FORMAT = 'D MMM YYYY, h:mm:ss A';
