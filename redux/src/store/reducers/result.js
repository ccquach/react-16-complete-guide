import * as actionTypes from '../actions';

const initialState = {
  results: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        // results: state.results.concat(state.counter)
        results: [
          ...state.results,
          {
            id: new Date(),
            value: action.result
          }
        ]
      };
    case actionTypes.DELETE_RESULT:
      return {
        ...state,
        results: state.results.filter(obj => obj.id !== action.id)
      };
    default:
      return state;
  }
};

export default reducer;
