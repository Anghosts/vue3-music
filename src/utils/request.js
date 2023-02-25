import axios from 'axios';

const request = axios.create({
  baseURL: 'http://200.163.9.56:3000',
  timeout: 5000,
});

request.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

request.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
)


export default request;