import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? { token } : {}; // If token exists in localStorage, set it in state
  });

  const navigate = useNavigate();

  const login = (token) => {
    localStorage.setItem('token', token); // Save token in localStorage
    setAuth({ token });
    navigate('/dashboard', { replace: true });
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setAuth({}); // Clear auth state
    navigate('/'); // Navigate back to login page after logout
  };

  return { auth, login, logout };
};

export default useAuth;
