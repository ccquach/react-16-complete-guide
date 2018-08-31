import each from 'jest-each';

import reducer from './order';
import * as actionTypes from '../actions/actionTypes';

describe('order reducer', () => {
  const initialState = {
    orders: [],
    loading: false,
    purchased: false,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should reset purchased state on purchase initialization', () => {
    expect(
      reducer(
        {
          ...initialState,
          purchased: true,
        },
        {
          type: actionTypes.PURCHASE_INIT,
        }
      )
    ).toEqual({
      ...initialState,
      purchased: false,
    });
  });

  each([
    { type: actionTypes.PURCHASE_BURGER_START },
    { type: actionTypes.FETCH_ORDERS_START },
  ]).test('should start loading on task start', type => {
    expect(reducer(initialState, type)).toEqual({
      ...initialState,
      loading: true,
    });
  });

  each([
    { type: actionTypes.PURCHASE_BURGER_FAIL },
    { type: actionTypes.FETCH_ORDERS_FAIL },
  ]).test('should stop loading on task end', type => {
    expect(reducer(initialState, type)).toEqual({
      ...initialState,
      loading: false,
    });
  });

  it('should add a new order to the orders collection and stop loading upon purchase', () => {
    expect(
      reducer(
        {
          ...initialState,
          loading: true,
          orders: [{ id: '12345', ingredients: {}, price: 4, orderData: {} }],
        },
        {
          type: actionTypes.PURCHASE_BURGER_SUCCESS,
          orderId: '12346',
          orderData: { ingredients: {}, price: 4, orderData: {} },
        }
      )
    ).toEqual({
      ...initialState,
      loading: false,
      purchased: true,
      orders: [
        { id: '12345', ingredients: {}, price: 4, orderData: {} },
        { id: '12346', ingredients: {}, price: 4, orderData: {} },
      ],
    });
  });

  it('should overwrite orders collection and stop loading on fetch', () => {
    expect(
      reducer(
        {
          ...initialState,
          loading: true,
        },
        {
          type: actionTypes.FETCH_ORDERS_SUCCESS,
          orders: [{ id: '12345', ingredients: {} }],
        }
      )
    ).toEqual({
      ...initialState,
      loading: false,
      orders: [{ id: '12345', ingredients: {} }],
    });
  });
});
