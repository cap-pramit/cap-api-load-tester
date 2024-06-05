import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as Api from '../../../services/api';
import { actionTypes } from './constants';

export function* listingsRequest(action) {
  try {
    let res = yield call(Api.getListingData, action?.filtersObj);
    if (res.success) {
      yield put({
        type: actionTypes.GET_LISTING_DATA_SUCCESS,
        data: res?.result?.applications,
        total: res?.result?.totalLength,
      });
    } else {
      yield put({
        type: actionTypes.GET_LISTING_DATA_FAILURE,
        error: res.error,
      });
    }
  } catch (error) {
    yield put({ type: actionTypes.GET_LISTING_DATA_FAILURE, error });
  }
}

export function* watchForListingsRequest() {
  yield takeLatest(actionTypes.GET_LISTING_DATA_REQUEST, listingsRequest);
}

export default function*() {
  yield all([watchForListingsRequest()]);
}
