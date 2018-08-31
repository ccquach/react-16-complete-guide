import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';

import * as actions from '../actions';

export function* authLogoutSaga(action) {
  yield localStorage.clear();
  yield put(actions.authLogoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.authLogout());
}
