import * as actionTypes from './actionTypes';

import axios from 'axios';
const BASE_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
const API_KEY = process.env.REACT_APP_API_KEY;

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (idToken, localId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId: localId,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const authLogout = () => ({
  type: actionTypes.AUTH_INITIATE_LOGOUT,
});

export const authLogoutSucceed = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

export const checkAuthTimeout = expirationTime => ({
  type: actionTypes.AUTH_CHECK_TIMEOUT,
  expirationTime,
});

export const auth = (email, password, isSignup) => ({
  type: actionTypes.AUTH_USER,
  email,
  password,
  isSignup,
});

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const authCheckState = () => dispatch => {
  const token = localStorage.getItem('token');
  if (!token) dispatch(authLogout());
  else {
    /* 
    localStorage returns items as strings, so need to convert expiration date 
    to date type in order to make valid comparisons
    */
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate > new Date()) {
      axios
        .post(`${BASE_URL}/getAccountInfo?key=${API_KEY}`, { idToken: token })
        .then(res => {
          const localId = res.data.users[0].localId;
          dispatch(authSuccess(token, localId));
          dispatch(checkAuthTimeout((expirationDate - new Date()) / 1000));
        })
        .catch(err => {});
    } else dispatch(authLogout());
  }
};
