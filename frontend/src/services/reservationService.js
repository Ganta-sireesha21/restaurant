import api from './api';
import { authHeader } from './api';

export const createReservation = async (reservation, token) => {
  const response = await api.post('/reservations', reservation, { headers: authHeader(token) });
  return response.data;
};

export const fetchReservations = async (token) => {
  const response = await api.get('/reservations', { headers: authHeader(token) });
  return response.data;
};

export const fetchUserReservations = async (userId, token) => {
  const response = await api.get(`/reservations/user/${userId}`, { headers: authHeader(token) });
  return response.data;
};

export const updateReservation = async (id, reservation, token) => {
  const response = await api.put(`/reservations/${id}`, reservation, { headers: authHeader(token) });
  return response.data;
};

export const deleteReservation = async (id, token) => {
  const response = await api.delete(`/reservations/${id}`, { headers: authHeader(token) });
  return response.data;
};
