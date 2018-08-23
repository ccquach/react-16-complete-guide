import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

/* 
Default Global Configuration 
*/

axios.defaults.baseURL = 'http://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/* 
Interceptors: global error handlers
*/

axios.interceptors.request.use(
  req => {
    console.log(req);
    // Edit request config
    return req;
  },
  err => {
    // Global handler (e.g. log error on file sent to server)
    console.log(err);
    // Forward error to local catch block to update UI informing user of error
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  res => {
    console.log(res);
    // Edit response config
    return res;
  },
  err => {
    // Global handler (e.g. log error on file sent to server)
    console.log(err);
    // Forward error to local catch block to update UI informing user of error
    return Promise.reject(err);
  }
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
