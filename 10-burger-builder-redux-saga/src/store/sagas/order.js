import { put, select } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  const state = yield select();
  const { token, userId } = state.auth;
  try {
    const res = yield axios.post(`/orders.json?auth=${token}`, {
      ...action.orderData,
      userId,
    });
    yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData));
  } catch (err) {
    yield put(actions.purchaseBurgerFail(err));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrderStart());
  const state = yield select();
  const { token, userId } = state.auth;
  const queryParams = `auth=${token}&orderBy="userId"&equalTo="${userId}"`;
  try {
    const res = yield axios.get(`/orders.json?${queryParams}`);
    const fetchedOrders = [];
    for (let key in res.data) {
      fetchedOrders.push({
        ...res.data[key],
        id: key,
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (err) {
    yield put(actions.fetchOrdersFail(err));
  }
}
