import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-b67d7.firebaseio.com/'
});

export default instance;
