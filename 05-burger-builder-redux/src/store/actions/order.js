import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// Purchase burger
const purchaseBurgerSuccess = (orderId, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId,
  orderData
});

const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error
});

const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseBurger = orderData => dispatch => {
  dispatch(purchaseBurgerStart());
  axios
    .post('/orders.json', orderData)
    .then(res => dispatch(purchaseBurgerSuccess(res.data.name, orderData)))
    .catch(err => dispatch(purchaseBurgerFail(err)));
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT
});

// Fetch orders
const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders
});

const fetchOrdersFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error
});

const fetchOrderStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = () => dispatch => {
  dispatch(fetchOrderStart());
  axios
    .get('/orders.json')
    .then(res => {
      // build array of orders from data object returned by Firebase
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(err => dispatch(fetchOrdersFail(err)));
};
