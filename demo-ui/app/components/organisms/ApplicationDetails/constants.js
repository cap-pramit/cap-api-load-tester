/*
 *
 * ApplicationDetails constants
 *
 */
import { defineActionTypes } from '@capillarytech/vulcan-react-sdk/utils';
import get from 'lodash/get';
const scope = '/Components/pages/ApplicationDetails';
import isEmpty from 'lodash/isEmpty';

export const actionTypes = defineActionTypes(
  {
    DEFAULT_ACTION: 'DEFAULT_ACTION',
    CLEAR_DATA: 'CLEAR_DATA',
    GET_APPLICATION_DETAILS_REQUEST: 'GET_APPLICATION_DETAILS_REQUEST',
    GET_APPLICATION_DETAILS_SUCCESS: 'GET_APPLICATION_DETAILS_SUCCESS',
    GET_APPLICATION_DETAILS_FAILURE: 'GET_APPLICATION_DETAIS_FAILURE',
  },
  { prefix: CURRENT_APP_NAME, scope: scope },
);

// Define any other constants here like so...
// export const DATE_DISPLAY_FORMAT = 'D MMM YYYY, h:mm:ss A';

export const APP_DETAIL_FIELDS = [
  {
    field: 'name',
    label: 'appName',
    type: 'text',
  },
  { field: '_id', label: 'appId', type: 'text' },
  { field: 'description', label: 'appDescription', type: 'text' },
  // { field: 'isActive', label: 'appIsActive', type: 'bool' },
  { field: 'prefixPath', label: 'appPrefixPath', type: 'text' },
  { field: 'readmeLink', label: 'appReadmeLink', type: 'link' },
  {
    field: 'language',
    label: 'appLanguage',
    type: 'tags',
  },
  {
    field: 'type',
    label: 'appType',
    type: 'tags',
  },
  {
    field: 'accessibleOrgs',
    label: 'accessibleOrgs',
    type: 'orgList',
  },
  { field: 'customDomain', label: 'customDomain', type: 'text' },
  { field: 'deployments.uat.url', label: 'uatUrl', type: 'link' },
  {
    label: 'uatEnabledOn',
    type: 'timeAndUser',
    fields: {
      user: 'deployments.uat.enabledBy',
      time: 'deployments.uat.enabledAt',
    },
  },
  { field: 'deployments.prod.url', label: 'prodUrl', type: 'link' },
  {
    field: 'deployments.prod.customDomainUrl',
    label: 'customDomainUrl',
    type: 'link',
    when: obj => !isEmpty(obj.customDomain),
  },
  {
    label: 'prodEnabledOn',
    type: 'timeAndUser',
    fields: {
      user: 'deployments.prod.enabledBy',
      time: 'deployments.prod.enabledAt',
    },
  },
  { 
    field: 'config.authentication.type', 
    label: 'appAuthType', 
    type: 'text', 
    customClassName: 'capitalize-text',
  },
  {
    field: 'config.authentication.identifier',
    label: 'appAuthIdentifier',
    type: 'text',
    customClassName: 'capitalize-text',
  },
  {
    field: 'config.translations.enabled',
    label: 'appTranslationsEnabled',
    type: 'bool',
  },
  {
    field: 'config.translations.type',
    label: 'appTranslationsType',
    type: 'text',
    customClassName: 'capitalize-text',
    when: obj => {
      return get(obj, 'config.translations.enabled') === true;
    },
  },
  {
    field: 'config.translations.locizeConfig.projectName',
    label: 'appLocizeProjectName',
    type: 'text',
    when: obj => {
      return (
        get(obj, 'config.translations.enabled') === true &&
        get(obj, 'config.translations.type') === 'intouch'
      );
    },
  },
  {
    field: 'config.translations.api.serviceName',
    label: 'appTranslationApiServiceName',
    type: 'link',
    when: obj => {
      return (
        get(obj, 'config.translations.enabled') === true &&
        get(obj, 'config.translations.type') !== 'intouch'
      );
    },
  },
  {
    label: 'appCreatedAt',
    type: 'timeAndUser',
    fields: {
      user: 'createdBy',
      time: 'createdAt',
    },
  },
  {
    label: 'appUpdatedAt',
    type: 'timeAndUser',
    fields: {
      user: 'updatedBy',
      time: 'updatedAt',
    },
  },
];

export const APPLICATION_DISPLAY_DATE_FORMAT = 'D MMM YYYY, h:mm:ss A';
export const MAX_ACCESSIBLE_ORGS_DISPLAY = 5;
