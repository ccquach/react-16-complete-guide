import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseInit = state => ({
  ...state,
  purchased: false
});

const start = state => ({
  ...state,
  loading: true
});

const purchaseBurgerSuccess = (state, action) => ({
  ...state,
  loading: false,
  purchased: true,
  orders: [...state.orders, { ...action.orderData, id: action.orderId }]
});

const fetchOrdersSuccess = (state, action) => ({
  ...state,
  orders: action.orders,
  loading: false
});

const fail = state => ({
  ...state,
  loading: false
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);
    case actionTypes.PURCHASE_BURGER_START:
    case actionTypes.FETCH_ORDERS_START:
      return start(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
    case actionTypes.FETCH_ORDERS_FAIL:
      return fail(state);
    default:
      return state;
  }
};

export default reducer;
