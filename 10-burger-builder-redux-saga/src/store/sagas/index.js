import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
  authLogoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from './auth';
import { initIngredientsSaga } from './burgerBuilder';

const watchAuth = [
  takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authLogoutSaga),
  takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
  takeEvery(actionTypes.AUTH_USER, authUserSaga),
  takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
];

const watchBurgerBuilder = [
  takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga),
];

export default function* watchAll() {
  yield all([...watchAuth, ...watchBurgerBuilder]);
}
