import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => ({
  type: actionTypes.AUTH_START
});

const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  authData
});

const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error
});

export const auth = (email, password) => dispatch => {
  dispatch(authStart());
  const authData = { email, password, returnSecureToken: true };
  axios
    .post(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBZlRboWPOjGRR0HxFF1li2Q4tqNfieGf8`,
      authData
    )
    .then(res => {
      console.log(res);
      dispatch(authSuccess(res.data));
    })
    .catch(err => {
      console.log(err);
      dispatch(authFail(err));
    });
};
