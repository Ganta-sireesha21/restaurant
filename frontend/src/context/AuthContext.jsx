import { createContext, useEffect, useState } from 'react';
import { loginUser, registerUser } from '../services/authService';

export const AuthContext = createContext(null);

const TOKEN_KEY = 'reservation_token';
const USER_KEY = 'reservation_user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  }, [token]);

  const signIn = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(credentials);
      setUser(response.user);
      setToken(response.token);
      return response;
    } catch (err) {
      setError(err.message || 'Unable to login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerUser(credentials);
      setUser(response.user);
      setToken(response.token);
      return response;
    } catch (err) {
      setError(err.message || 'Unable to register');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, signIn, signUp, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
