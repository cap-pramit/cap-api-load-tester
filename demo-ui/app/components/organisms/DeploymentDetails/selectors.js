import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { initialState } from './reducer';

/**
 * Direct selector to the deploymentDetails state domain
 */

const selectDeploymentDetailsDomain = (state = fromJS({})) => state.get(`${CURRENT_APP_NAME}-deploymentDetails`, initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by DeploymentDetails
 */

const makeSelectDeploymentDetails = () =>
  createSelector(selectDeploymentDetailsDomain, ((substate = fromJS({})) => 
    substate.toJS()));

export default makeSelectDeploymentDetails;
export { selectDeploymentDetailsDomain };
