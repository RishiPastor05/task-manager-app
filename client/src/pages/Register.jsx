import { useState } from 'react';
import API from '../utils/api';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      login(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-center">Register</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full border p-2 rounded" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">Register</button>
        <p className="text-sm text-center">Already have an account? <Link to="/" className="text-indigo-600">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
