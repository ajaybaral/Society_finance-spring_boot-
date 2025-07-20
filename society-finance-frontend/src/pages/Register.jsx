import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ username: '', password: '', role: 'USER' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl mb-4">Register</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <input type="text" name="username" placeholder="Username" className="border p-2 w-full mb-3"
               value={form.username} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="border p-2 w-full mb-3"
               value={form.password} onChange={handleChange} />
        <select name="role" className="border p-2 w-full mb-3" value={form.role} onChange={handleChange}>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Register</button>
      </form>
    </div>
  );
}

export default Register; 