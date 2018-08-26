import * as actionTypes from './actionTypes';

export const increment = () => ({
  type: actionTypes.INCREMENT
});

export const decrement = () => ({
  type: actionTypes.DECREMENT
});

export const add = value => ({
  type: actionTypes.ADD,
  value
});

export const subtract = value => ({
  type: actionTypes.SUBTRACT,
  value
});
