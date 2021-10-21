import { all, fork } from 'redux-saga/effects'
import { AppSaga } from './sagas';
export function* rootSaga() {
  yield all([
    fork(AppSaga),
  ]);
}