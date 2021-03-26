import axios from 'axios';
import { baseUrl } from './url';

axios.defaults.baseURL = baseUrl + '/api';

axios.interceptors.response.use(
    function(res) {
        return res
    },
    function(error) {
        if (error.response?.status === 400) {
            alert(error.response?.data?.message);
        }
        return Promise.reject(error);
    })

const { get, post } = axios;

export {
  get, post
};
