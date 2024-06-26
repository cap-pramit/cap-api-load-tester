/*
 *
 * DeploymentDetails constants
 *
 */
import { defineActionTypes } from '@capillarytech/vulcan-react-sdk/utils';

const scope = '/Components/pages/DeploymentDetails';

export const actionTypes = defineActionTypes(
  {
    DEFAULT_ACTION: 'DEFAULT_ACTION',
    CLEAR_DATA: 'CLEAR_DATA',
    GET_DEPLOYMENT_LISTING_DATA_REQUEST: 'GET_DEPLOYMENT_LISTING_DATA_REQUEST',
    GET_DEPLOYMENT_LISTING_DATA_SUCCESS: 'GET_DEPLOYMENT_LISTING_DATA_SUCCESS',
    GET_DEPLOYMENT_LISTING_DATA_FAILURE: 'GET_DEPLOYMENT_LISTING_DATA_FAILURE',
    ENABLE_DISABLE_UAT_OR_PROD_REQUEST: 'ENABLE_DISABLE_UAT_OR_PROD_REQUEST',
    ENABLE_DISABLE_UAT_OR_PROD_SUCCESS: 'ENABLE_DISABLE_UAT_OR_PROD_SUCCESS',
    ENABLE_DISABLE_UAT_OR_PROD_FAILURE: 'ENABLE_DISABLE_UAT_OR_PROD_FAILURE',
    PROMOTE_DEMOTE_BUILD_REQUEST: 'PROMOTE_DEMOTE_BUILD_REQUEST',
    PROMOTE_DEMOTE_BUILD_SUCCESS: 'PROMOTE_DEMOTE_BUILD_SUCCESS',
    PROMOTE_DEMOTE_BUILD_FAILURE: 'PROMOTE_DEMOTE_BUILD_FAILURE',
    INITIATE_DELETE_BUILD_REQUEST: 'INITIATE_DELETE_BUILD_REQUEST',
    INITIATE_DELETE_BUILD_SUCCESS: 'INITIATE_DELETE_BUILD_SUCCESS',
    INITIATE_DELETE_BUILD_FAILURE: 'INITIATE_DELETE_BUILD_FAILURE',
    DELETE_BUILD_REQUEST: 'DELETE_BUILD_REQUEST',
    DELETE_BUILD_SUCCESS: 'DELETE_BUILD_SUCCESS',
    DELETE_BUILD_FAILURE: 'DELETE_BUILD_FAILURE',
    UPLOAD_BUILD_REQUEST: 'UPLOAD_BUILD_REQUEST',
    UPLOAD_BUILD_SUCCESS: 'UPLOAD_BUILD_SUCCESS',
    UPLOAD_BUILD_FAILURE: 'UPLOAD_BUILD_FAILURE',
    OPEN_UPLOAD_SLIDE_BOX: 'OPEN_UPLOAD_SLIDE_BOX',
    CLOSE_UPLOAD_SLIDE_BOX: 'CLOSE_UPLOAD_SLIDE_BOX',
    GET_DEPLOYMENT_BY_DEPLOYMENT_ID_REQUEST:
      'GET_DEPLOYMENT_BY_DEPLOYMENT_ID_REQUEST',
    GET_DEPLOYMENT_BY_DEPLOYMENT_ID_SUCCESS:
      'GET_DEPLOYMENT_BY_DEPLOYMENT_ID_SUCCESS',
    GET_DEPLOYMENT_BY_DEPLOYMENT_ID_FAILURE:
      'GET_DEPLOYMENT_BY_DEPLOYMENT_ID_FAILURE',
    UAT_PROD_ENABLEMENT_POLL_STATUS_REQUEST: 'UAT_PROD_ENABLEMENT_POLL_STATUS_REQUEST',
    UAT_PROD_ENABLEMENT_POLL_STATUS_SUCCESS: 'UAT_PROD_ENABLEMENT_POLL_STATUS_SUCCESS',
    UAT_PROD_ENABLEMENT_POLL_STATUS_FAILURE: 'UAT_PROD_ENABLEMENT_POLL_STATUS_FAILURE',
  },
  { prefix: CURRENT_APP_NAME, scope: scope },
);

// Define any other constants here like so...
// export const DATE_DISPLAY_FORMAT = 'D MMM YYYY, h:mm:ss A';
export const DEPLOYMENTS_DATE_TIME_FORMAT = 'D MMM YYYY, h:mm:ss A';
export const UPLOADED_BUILD_POLL_INTERVAL = 10000; //10 seconds
export const UPLOADED_BUILD_MAX_POLL_COUNT = 15; // poll max of 15 times
