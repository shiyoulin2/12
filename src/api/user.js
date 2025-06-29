import axios from 'axios';

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // API基础路径
  timeout: 5000 // 请求超时时间
});

// 用户注册
export const register = (userData) => {
  return service.post('/users/register', userData);
};

// 用户登录
export const login = (userData) => {
  return service.post('/users/login', userData);
};    