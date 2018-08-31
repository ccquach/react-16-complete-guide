import { takeEvery, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
  authLogoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

const watchAuth = [
  takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authLogoutSaga),
  takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
  takeEvery(actionTypes.AUTH_USER, authUserSaga),
  takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
];

const watchBurgerBuilder = [
  takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga),
];

const watchOrder = [
  takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga),
  takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga),
];

export default function* watchAll() {
  yield all([...watchAuth, ...watchBurgerBuilder, ...watchOrder]);
}
