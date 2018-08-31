import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = name => ({
  type: actionTypes.ADD_INGREDIENT,
  name
});

export const removeIngredient = name => ({
  type: actionTypes.REMOVE_INGREDIENT,
  name
});

const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients
});

const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => dispatch => {
  axios
    .get('/ingredients.json')
    .then(res => dispatch(setIngredients(res.data)))
    .catch(err => dispatch(fetchIngredientsFailed()));
};
