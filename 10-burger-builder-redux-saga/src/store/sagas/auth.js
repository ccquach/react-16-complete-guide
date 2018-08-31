import { delay } from 'redux-saga';
import { put, all } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';

const BASE_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
const API_KEY = process.env.REACT_APP_API_KEY;

export function* authLogoutSaga(action) {
  localStorage.clear();
  yield put(actions.authLogoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.authLogout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url = action.isSignup
    ? `${BASE_URL}/signupNewUser?key=${API_KEY}`
    : `${BASE_URL}/verifyPassword?key=${API_KEY}`;
  try {
    const res = yield axios.post(url, authData);
    const { idToken, localId, expiresIn } = res.data;
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    localStorage.setItem('token', idToken);
    localStorage.setItem('expirationDate', expirationDate);
    yield all([
      put(actions.authSuccess(idToken, localId)),
      put(actions.checkAuthTimeout(expiresIn)),
    ]);
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = localStorage.getItem('token');
  if (!token) yield put(actions.authLogout());
  else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate > new Date()) {
      try {
        const res = yield axios.post(
          `${BASE_URL}/getAccountInfo?key=${API_KEY}`,
          { idToken: token }
        );
        const localId = res.data.users[0].localId;
        yield all([
          put(actions.authSuccess(token, localId)),
          put(actions.checkAuthTimeout((expirationDate - new Date()) / 1000)),
        ]);
      } catch (err) {
        return;
      }
    } else yield put(actions.authLogout());
  }
}
