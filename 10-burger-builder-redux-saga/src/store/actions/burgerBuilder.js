import * as actionTypes from './actionTypes';

export const addIngredient = name => ({
  type: actionTypes.ADD_INGREDIENT,
  name,
});

export const removeIngredient = name => ({
  type: actionTypes.REMOVE_INGREDIENT,
  name,
});

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients,
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

export const initIngredients = () => ({
  type: actionTypes.INIT_INGREDIENTS,
});
