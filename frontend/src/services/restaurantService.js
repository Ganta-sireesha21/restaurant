import api from './api';
import { authHeader } from './api';

export const fetchRestaurants = async () => {
  const response = await api.get('/restaurants');
  return response.data;
};

export const fetchRestaurant = async (id) => {
  const response = await api.get(`/restaurants/${id}`);
  return response.data;
};

export const createRestaurant = async (restaurant, token) => {
  const response = await api.post('/restaurants', restaurant, { headers: authHeader(token) });
  return response.data;
};

export const updateRestaurant = async (id, restaurant, token) => {
  const response = await api.put(`/restaurants/${id}`, restaurant, { headers: authHeader(token) });
  return response.data;
};

export const deleteRestaurant = async (id, token) => {
  const response = await api.delete(`/restaurants/${id}`, { headers: authHeader(token) });
  return response.data;
};
