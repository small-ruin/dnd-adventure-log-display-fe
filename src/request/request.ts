import axios from 'axios';
import { baseUrl, Urls } from './url';


axios.defaults.baseURL = baseUrl + 'api';

axios.interceptors.response.use(
    function(res) {
        return res
    },
    function(error) {
        const statusCode = error.response?.data.statusCode;
        setTimeout(() => {
            switch (statusCode) {
                case 404:
                    window.location.href = Urls.NOT_FOUND;
                    break;
                case 400:
                    alert(error.response?.data?.message);
                    break;
                default:
                    window.location.href = Urls.ERROR;
            }
        })

        return Promise.reject(error);
    })

const { get, post } = axios;

export {
  get, post
};
