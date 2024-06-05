/*
 *
 * ApplicationDetails actions
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

export function getApplicationDetails(applicationId, formatMessage) {
  return {
    type: actionTypes.GET_APPLICATION_DETAILS_REQUEST,
    applicationId,
    formatMessage,
  };
}
