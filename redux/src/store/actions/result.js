import * as actionTypes from './actionTypes';

const saveResult = result => ({
  type: actionTypes.STORE_RESULT,
  result
});

export const storeResult = result => {
  // setTimeout to simulate reaching out to server prior to dispatching action
  return (dispatch, getState) => {
    setTimeout(() => {
      const oldCounter = getState().ctr.counter;
      console.log(oldCounter);
      dispatch(saveResult(result));
    }, 2000);
  };
};

export const deleteResult = id => ({
  type: actionTypes.DELETE_RESULT,
  id
});
