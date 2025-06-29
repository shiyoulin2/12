import axios from 'axios';

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // API基础路径
  timeout: 5000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前添加token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.error('响应错误:', error);
    // 处理401未授权错误
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response.data || '未知错误');
  }
);

// 获取所有动物
export const getAnimals = () => {
  return service.get('/animals');
};

// 获取单个动物
export const getAnimalById = (id) => {
  return service.get(`/animals/${id}`);
};

// 创建动物
export const createAnimal = (animalData) => {
  return service.post('/animals', animalData);
};

// 更新动物
export const updateAnimal = (id, animalData) => {
  return service.put(`/animals/${id}`, animalData);
};

// 删除动物
export const deleteAnimal = (id) => {
  return service.delete(`/animals/${id}`);
};    