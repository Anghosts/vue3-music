import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 登录接口需要加上时间戳
    if (config.url.includes('login/qr')) {
      config.params = { timestamp: Date.now() }
    }
    // 加上cookie
    if (config.url.includes('cookie=')) {
      config.url += localStorage.getItem('cookie') || '';
    } else if (config.params && config.params.cookie) {
      config.params.cookie = localStorage.getItem('cookie') || '';
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
)


export default request;