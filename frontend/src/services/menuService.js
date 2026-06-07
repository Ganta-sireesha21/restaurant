import api from './api';
import { authHeader } from './api';

export const fetchMenus = async () => {
  const response = await api.get('/menus');
  return response.data;
};

export const fetchMenusForRestaurant = async (restaurantId) => {
  const response = await api.get(`/menus/${restaurantId}`);
  return response.data;
};

export const createMenuItem = async (menu, token) => {
  const response = await api.post('/menus', menu, { headers: authHeader(token) });
  return response.data;
};

export const updateMenuItem = async (id, menu, token) => {
  const response = await api.put(`/menus/${id}`, menu, { headers: authHeader(token) });
  return response.data;
};

export const deleteMenuItem = async (id, token) => {
  const response = await api.delete(`/menus/${id}`, { headers: authHeader(token) });
  return response.data;
};
