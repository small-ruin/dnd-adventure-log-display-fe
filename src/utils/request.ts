import axios from 'axios';

axios.defaults.baseURL = '/api';

const { get, post } = axios;

export {
  get, post
};