import { actionTypes } from './constants';

export const clearData = () => ({
  type: actionTypes.CLEAR_DATA,
});

export const getListingData = (filtersObj = {}) => ({
  type: actionTypes.GET_LISTING_DATA_REQUEST,
  filtersObj,
});
