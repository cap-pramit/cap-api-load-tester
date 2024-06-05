import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { initialState } from './reducer';

/**
 * Direct selector to the viewApplication state domain
 */

const selectViewApplicationDomain = (state = fromJS({})) => state.get(`${CURRENT_APP_NAME}-viewApplication`, initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ViewApplication
 */

const makeSelectViewApplication = () =>
  createSelector(selectViewApplicationDomain, ((substate = fromJS({})) => 
    substate.toJS()));

export default makeSelectViewApplication;
export { selectViewApplicationDomain };
