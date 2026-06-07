import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://restaurant-v397.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authHeader = (token) => ({
  Authorization: `Bearer ${token}`
});

export default api;
