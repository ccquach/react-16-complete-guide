import { put } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

export function* authLogoutSaga(action) {
  yield localStorage.clear();
  yield put({
    type: actionTypes.AUTH_LOGOUT,
  });
}
