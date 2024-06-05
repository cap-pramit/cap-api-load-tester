import { call, put, all, takeLatest } from 'redux-saga/effects';
import { actionTypes } from './constants';
import * as Api from '../../../services/api';
import { formatErrorMessage } from '../../../utils/errorDisplayUtils';
// Individual exports for testing
export function* defaultSaga() {
  console.log(
    'this is default Saga. You can make api calls etc from here and dispatch a action using "put"',
  );
}

export function* getApplicationDetails(action) {
  try {
    let res = yield call(Api.getApplicationDetails, action?.applicationId);
    if (res.success) {
      yield put({
        type: actionTypes.GET_APPLICATION_DETAILS_SUCCESS,
        data: res?.result,
      });
    }else{
      yield put({ type: actionTypes.GET_APPLICATION_DETAILS_FAILURE, error: res?.error });
      formatErrorMessage(action.formatMessage, res?.message);
    }
  } catch (error) {
    yield put({ type: actionTypes.GET_APPLICATION_DETAILS_FAILURE, error });
  }
}

// Individual exports for testing
export function* watchForDefaultSaga() {
  yield takeLatest(actionTypes.DEFAULT_ACTION, defaultSaga);
}

export function* watchForGetApplicationDetails() {
  yield takeLatest(
    actionTypes.GET_APPLICATION_DETAILS_REQUEST,
    getApplicationDetails,
  );
}

export default function*() {
  yield all([watchForDefaultSaga(), watchForGetApplicationDetails()]);
}
