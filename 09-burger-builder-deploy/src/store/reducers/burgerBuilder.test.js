import each from 'jest-each';

import reducer from './burgerBuilder';
import * as actionTypes from '../actions/actionTypes';

describe('burger builder reducer', () => {
  const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should set state to initial values on reset', () => {
    expect(
      reducer(
        {
          ingredients: {
            bacon: 1,
            cheese: 2,
            salad: 3,
            meat: 4,
          },
          totalPrice: 1,
          error: true,
          building: true,
        },
        {
          type: actionTypes.SET_INGREDIENTS,
          ingredients: { bacon: 0, cheese: 0, salad: 0, meat: 0 },
        }
      )
    ).toEqual({
      ...initialState,
      ingredients: { bacon: 0, cheese: 0, salad: 0, meat: 0 },
    });
  });

  it('should set error to true if fetching ingredient fails', () => {
    expect(
      reducer(initialState, { type: actionTypes.FETCH_INGREDIENTS_FAILED })
    ).toEqual({ ...initialState, error: true });
  });

  const initialIngredients = { bacon: 1, salad: 1, cheese: 1, meat: 1 };

  each([
    [
      'bacon',
      { ingredients: { ...initialIngredients, bacon: 2 }, totalPrice: 4.7 },
    ],
    [
      'cheese',
      { ingredients: { ...initialIngredients, cheese: 2 }, totalPrice: 4.4 },
    ],
    [
      'salad',
      { ingredients: { ...initialIngredients, salad: 2 }, totalPrice: 4.5 },
    ],
    [
      'meat',
      { ingredients: { ...initialIngredients, meat: 2 }, totalPrice: 5.3 },
    ],
  ]).test(
    'should increment the ingredient by one, increase the price, and set building to true upon adding an ingredient',
    (ingName, expected) => {
      expect(
        reducer(
          { ...initialState, ingredients: initialIngredients },
          {
            type: actionTypes.ADD_INGREDIENT,
            name: ingName,
          }
        )
      ).toEqual({
        ...initialState,
        ...expected,
        building: true,
      });
    }
  );

  each([
    [
      'bacon',
      { ingredients: { ...initialIngredients, bacon: 0 }, totalPrice: 3.3 },
    ],
    [
      'cheese',
      { ingredients: { ...initialIngredients, cheese: 0 }, totalPrice: 3.6 },
    ],
    [
      'salad',
      { ingredients: { ...initialIngredients, salad: 0 }, totalPrice: 3.5 },
    ],
    [
      'meat',
      { ingredients: { ...initialIngredients, meat: 0 }, totalPrice: 2.7 },
    ],
  ]).test(
    'should decrement the ingredient by one, decrease the price, and set building to true upon adding an ingredient',
    (ingName, expected) => {
      expect(
        reducer(
          { ...initialState, ingredients: initialIngredients },
          {
            type: actionTypes.REMOVE_INGREDIENT,
            name: ingName,
          }
        )
      ).toEqual({
        ...initialState,
        ...expected,
        building: true,
      });
    }
  );
});
