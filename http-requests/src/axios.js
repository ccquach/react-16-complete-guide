import axios from 'axios';

/* 
FLEXIBILITY: 
Create instance if not all requests made to same URL.
Define default baseURL in index.js for common requests
and only import instance in components that make
requests to unique URL.
*/
const instance = axios.create({
  baseURL: 'http://jsonplaceholder.typicode.com'
});

// Override default configurations
instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// instance.interceptors.request...

export default instance;
