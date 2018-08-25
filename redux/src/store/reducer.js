import * as actionTypes from './actions';

const initialState = {
  counter: 0,
  results: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      };
    case actionTypes.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };
    case actionTypes.ADD:
      return {
        ...state,
        counter: state.counter + action.value
      };
    case actionTypes.SUBTRACT:
      return {
        ...state,
        counter: state.counter - action.value
      };
    case actionTypes.STORE_RESULT:
      return {
        ...state,
        // results: state.results.concat(state.counter)
        results: [
          ...state.results,
          {
            id: new Date(),
            value: state.counter
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
