import { fromJS } from 'immutable';
import { actionTypes } from './constants';
import * as constants from '../App/constants';

const { REQUEST, SUCCESS, FAILURE, INITIAL } = constants;

export const initialState = fromJS({
  listingData: [],
  fetchingListingData: INITIAL,
  totalLength: 0,
  limit: 10,
  offset: 0,
  endOfList: false,
});

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_DATA:
      return initialState;
    case actionTypes.GET_LISTING_DATA_REQUEST:
      const { offset = 0 } = action.filtersObj;
      const newOffset = Number(offset) + state.get('limit');
      const shouldClearData = offset === 0;
      return state.merge({
        fetchingListingData: REQUEST,
        endOfList: false,
        offset: newOffset,
        listingData: shouldClearData ? fromJS([]) : state.get('listingData'),
      });
    case actionTypes.GET_LISTING_DATA_SUCCESS:
      const { data, total } = action;
      const newData = data.map(item => ({ ...item, key: item._id }));

      return state.merge({
        fetchingListingData: SUCCESS,
        endOfList:
          newData.length === 0 ||
          total <= state.get('offset'),
        totalLength: total,
        listingData: state.get('listingData').concat(fromJS(newData)),
      });
    case actionTypes.GET_LISTING_DATA_FAILURE:
      return state.merge({
        fetchingListingData: FAILURE,
        endOfList: true,
        offset: 0,
      });
    default:
      return state;
  }
};

export default dashboardReducer;
