import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

// Combine reducers
const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultReducer
});

// Middleware
const logger = store => {
  return next => {
    return action => {
      console.log(`[Middleware] Dispatching`, action);
      const result = next(action);
      console.log(`[Middleware] next state`, store.getState());
      return result;
    };
  };
};

// Create redux store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

ReactDOM.render(
  // Connect app to redux store
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
