import { take, call, put, select, all, takeLatest } from 'redux-saga/effects';
import { actionTypes } from './constants';

// Individual exports for testing
export function* defaultSaga() {
  console.log('this is default Saga. You can make api calls etc from here and dispatch a action using "put"')
}

// Individual exports for testing
export function* watchForDefaultSaga() {
  yield takeLatest(actionTypes.DEFAULT_ACTION, defaultSaga);
}

export default function*() {
  yield all([watchForDefaultSaga()]);
}