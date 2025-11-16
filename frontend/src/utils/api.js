import axios from 'axios';

// Ensure API URL ends with /api
const getApiUrl = () => {
  const url = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  // If URL doesn't end with /api, add it
  return url.endsWith('/api') ? url : url.endsWith('/') ? url + 'api' : url + '/api';
};

const API_URL = getApiUrl();

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me')
};

// Blog API
export const blogAPI = {
  getAll: () => api.get('/blogs'),
  getMyBlogs: () => api.get('/blogs/my-blogs'),
  getById: (id) => api.get(`/blogs/${id}`),
  create: (formData) => api.post('/blogs', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => api.put(`/blogs/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/blogs/${id}`)
};

export default api;



