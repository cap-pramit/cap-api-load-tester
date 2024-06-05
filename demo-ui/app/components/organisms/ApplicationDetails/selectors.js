import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { initialState } from './reducer';

/**
 * Direct selector to the applicationDetails state domain
 */

const selectApplicationDetailsDomain = (state = fromJS({})) => state.get(`${CURRENT_APP_NAME}-applicationDetails`, initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ApplicationDetails
 */

const makeSelectApplicationDetails = () =>
  createSelector(selectApplicationDetailsDomain, ((substate = fromJS({})) => 
    substate.toJS()));

export default makeSelectApplicationDetails;
export { selectApplicationDetailsDomain };
