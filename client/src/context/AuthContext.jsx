import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  const checkLoggedInUser = async () => {
    const token = localStorage.getItem('findit_token');
    if (!token || token === 'undefined' || token === 'null') {
      localStorage.removeItem('findit_token');
      setLoading(false);
      return;
    }

    try {
      const res = await fetchApi('/auth/me');
      if (res && res.success) {
        setUser(res.user);
      }
    } catch (err) {
      console.warn('Session expired or invalid token');
      localStorage.removeItem('findit_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      if (res && res.success) {
        localStorage.setItem('findit_token', res.token);
        setUser(res.user);
        return res.user;
      } else {
        throw new Error(res?.message || 'Invalid email or password');
      }
    } catch (error) {
      localStorage.removeItem('findit_token');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const res = await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });

      if (res && res.success) {
        localStorage.setItem('findit_token', res.token);
        setUser(res.user);
        return res.user;
      } else {
        throw new Error(res?.message || 'Registration failed');
      }
    } catch (error) {
      localStorage.removeItem('findit_token');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('findit_token');
    setUser(null);
  };

  // Quick switch role helper for live PBL presentation & testing
  const quickLoginAs = async (role) => {
    const credentials = {
      student: { email: 'student@woxsen.edu.in', password: 'Woxsen#Student2026!' },
      security: { email: 'security@woxsen.edu.in', password: 'Woxsen#SecurityHQ99!' },
      admin: { email: 'admin@woxsen.edu.in', password: 'Woxsen#AdminDean2026*' }
    };

    const cred = credentials[role] || credentials.student;
    try {
      return await login(cred.email, cred.password);
    } catch (err) {
      console.error('Quick login failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      quickLoginAs,
      unreadNotifications,
      setUnreadNotifications
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
