import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  register: (data: any) => 
    api.post('/auth/register', data),
  getProfile: () => 
    api.get('/auth/me')
};

export const orders = {
  create: (orderData: any) => 
    api.post('/orders', orderData),
  getMyOrders: () => 
    api.get('/orders/my-orders'),
  updateStatus: (orderId: string, status: string) => 
    api.patch(`/orders/${orderId}/status`, { status })
};

export default api;