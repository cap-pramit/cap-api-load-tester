import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { initialState } from './reducer';

/**
 * Direct selector to the Dashboard state domain
 */

const selectListingDomain = (state = fromJS({})) =>
  state.get('listingReducer', initialState);

/**
 * Default selector used by Dashboard
 */

const makeSelectListing = () =>
  createSelector(selectListingDomain, (substate = fromJS({})) =>
    substate.toJS(),
  );

export {
  selectListingDomain,
  makeSelectListing,
};
