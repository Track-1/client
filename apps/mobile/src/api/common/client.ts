import axios, { AxiosRequestConfig } from 'axios';
import { getCookie, removeCookie, setCookie } from '../../utils/common/cookie';

//서버통신 함수
export const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {},
  withCredentials: true,
});

client.interceptors.request.use(
  (config: any) => {
    const token = getCookie('accessToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.request.use(function (config: any) {
  const token = getCookie('accessToken');

  if (!token) {
    config.headers['accessToken'] = null;
    return config;
  }

  if (config.headers && token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  }
  return config;
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originConfig = error.config;

    if (error.response && error.response.status === 401) {
      try {
        const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/etc/refresh`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
          withCredentials: true,
        });
        if (data) {
          setCookie('accessToken', data.data.data, {});
          return await client.request(originConfig);
        }
      } catch (error: any) {
        if (error.response.data.message === '새롭게 로그인 필요') {
          alert('Token expired, please log in again.\n토큰이 만료되어 다시 로그인 바랍니다.');
          removeCookie('accessToken', { path: '/' });
          window.location.replace('/login');
        }
        removeCookie('accessToken', { path: '/' });
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
