import { useState } from 'react';
import API from '../utils/api';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      login(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">Login</button>
        <p className="text-sm text-center">Don't have an account? <Link to="/register" className="text-indigo-600">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
