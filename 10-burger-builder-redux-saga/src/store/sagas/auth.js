import { put } from 'redux-saga/effects';

import * as actions from '../actions';

export function* authLogoutSaga(action) {
  yield localStorage.clear();
  yield put(actions.authLogoutSucceed());
}
