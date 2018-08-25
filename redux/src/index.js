import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

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

// Create redux store
const store = createStore(rootReducer);

ReactDOM.render(
  // Connect app to redux store
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
