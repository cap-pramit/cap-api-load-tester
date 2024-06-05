/*
 *
 * ApplicationDetails reducer
 *
 */

import { fromJS } from 'immutable';
import { actionTypes } from './constants';
import { INITIAL, SUCCESS, FAILURE, REQUEST } from '../../pages/App/constants';

export const initialState = fromJS({
  appData: {},
  getApplicationDetailsStatus: INITIAL,
});

const applicationDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DEFAULT_ACTION:
      return state;
    case actionTypes.CLEAR_DATA:
      return initialState;
    case actionTypes.GET_APPLICATION_DETAILS_REQUEST:
      return state.set('getApplicationDetailsStatus', REQUEST);
    case actionTypes.GET_APPLICATION_DETAILS_SUCCESS:
      return state
        .set('appData', fromJS(action.data))
        .set('getApplicationDetailsStatus', SUCCESS);
    case actionTypes.GET_APPLICATION_DETAILS_FAILURE:
      return state
        .set('getApplicationDetailsStatus', FAILURE)
        .set('appData', fromJS({}));
    default:
      return state;
  }
};

export default applicationDetailsReducer;
