import * as actionTypes from './actionTypes';
import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
const API_KEY = 'AIzaSyBZlRboWPOjGRR0HxFF1li2Q4tqNfieGf8';

const authStart = () => ({
  type: actionTypes.AUTH_START,
});

const authSuccess = (idToken, localId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  userId: localId,
});

const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const authLogout = () => {
  localStorage.clear();
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthTimeout = expirationTime => dispatch => {
  setTimeout(() => {
    dispatch(authLogout());
  }, expirationTime * 1000);
};

export const auth = (email, password, isSignup) => dispatch => {
  dispatch(authStart());
  const authData = { email, password, returnSecureToken: true };
  let url = isSignup
    ? `${BASE_URL}/signupNewUser?key=${API_KEY}`
    : `${BASE_URL}/verifyPassword?key=${API_KEY}`;
  axios
    .post(url, authData)
    .then(res => {
      console.log(res);
      const { idToken, localId, expiresIn } = res.data;
      localStorage.setItem('token', idToken);
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch(authSuccess(idToken, localId));
      dispatch(checkAuthTimeout(expiresIn));
    })
    .catch(err => {
      console.log(err);
      dispatch(authFail(err.response.data.error));
    });
};

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
        .catch(err => console.log(err));
    } else dispatch(authLogout());
  }
};
