import axios from 'axios';

const api = axios.create({
  baseURL: 'https://the-locals-9rzy9sh2cykj.deno.dev/',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
