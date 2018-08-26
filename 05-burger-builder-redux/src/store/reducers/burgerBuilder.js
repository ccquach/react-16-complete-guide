import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.name]: state.ingredients[action.name] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.name]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.name]: state.ingredients[action.name] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.name]
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        /* 
        Default alphabetical order of display determined
        by data returned from Firebase.
        Hard code ingredients to desired order of display.
        Limits flexibility of number of ingredients, but 
        already limited by CSS code being used
        */
        ingredients: {
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          salad: action.ingredients.salad,
          meat: action.ingredients.meat
        },
        error: false
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
