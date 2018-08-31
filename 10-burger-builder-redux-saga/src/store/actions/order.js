import * as actionTypes from './actionTypes';

// Purchase burger
export const purchaseBurgerSuccess = (orderId, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId,
  orderData,
});

export const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error,
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = orderData => ({
  type: actionTypes.PURCHASE_BURGER,
  orderData,
});

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});

// Fetch orders
export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders,
});

export const fetchOrdersFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error,
});

export const fetchOrderStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrders = () => ({
  type: actionTypes.FETCH_ORDERS,
});
