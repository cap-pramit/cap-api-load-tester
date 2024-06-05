import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { initialState } from './reducer';

/**
 * Direct selector to the createApplication state domain
 */

const selectCreateApplicationDomain = (state = fromJS({})) => state.get(`${CURRENT_APP_NAME}-createApplication`, initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CreateApplication
 */

const makeSelectCreateApplication = () =>
  createSelector(selectCreateApplicationDomain, ((substate = fromJS({})) =>
    substate.toJS()));

const makeSelectValidateAppName = () =>
  createSelector(selectCreateApplicationDomain, ((substate = fromJS({})) =>
  ({
    validAppId: substate.get('validAppId'),
    validateAppNameStatus: substate.get('validateAppNameStatus'),
  })));

const makeSelectValidatePrefixPath = () =>
  createSelector(selectCreateApplicationDomain, ((substate = fromJS({})) =>
  ({
    validPrefixPath: substate.get('validPrefixPath'),
    validateAppPrefixPathStatus: substate.get('validateAppPrefixPathStatus'),
    validateAppPrefixPathError: substate.get('validateAppPrefixPathError'),
  })));


const makeSelectValidateI18nApiConfig = () =>
  createSelector(selectCreateApplicationDomain, ((substate = fromJS({})) =>
  ({
    i18nApiConfigValid: substate.get('i18nApiConfigValid'),
    validateI18nApiConfigStatus: substate.get('validateI18nApiConfigStatus'),
    validateI18nApiConfigError: substate.get('validateI18nApiConfigError'),
    i18nIntouchConfigValid: substate.get('i18nIntouchConfigValid'),
  })));

const makeSelectApplicationData = () =>
  createSelector(selectCreateApplicationDomain, ((substate = fromJS({})) =>
  ({
    getApplicationByAppIdStatus: substate.get('getApplicationByAppIdStatus'),
    applicationData: substate.get('applicationData'),
  })));

const makeSelectCheckGlobalAppsAllowed = () =>
  createSelector(selectCreateApplicationDomain, ((substate = fromJS({})) =>
  ({
    checkGlobalAppsAllowedStatus: substate.get('checkGlobalAppsAllowedStatus'),
    globalAppsAllowed: substate.get('globalAppsAllowed'),
  })));


export default makeSelectCreateApplication;
export {
  selectCreateApplicationDomain,
  makeSelectValidateAppName,
  makeSelectValidatePrefixPath,
  makeSelectValidateI18nApiConfig,
  makeSelectApplicationData,
  makeSelectCheckGlobalAppsAllowed,
};
