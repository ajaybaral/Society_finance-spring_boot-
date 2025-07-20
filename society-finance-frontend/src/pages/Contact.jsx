import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { FiTrash2, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isAdmin, setIsAdmin] = useState(false); // Set this based on your auth/role logic

  const navigate = useNavigate();

  useEffect(() => {
    // Example: check role from localStorage or JWT
    const role = localStorage.getItem('role');
    setIsAdmin(role === 'ADMIN');
    if (role === 'ADMIN') fetchMessages();
    setLoading(false);
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/contact');
      setMessages(res.data);
    } catch {
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/contact', form);
      toast.success('Message sent!');
      setForm({ name: '', email: '', message: '' });
    } catch {
      toast.error('Failed to send message');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await axios.delete(`/contact/${id}`);
      toast.success('Message deleted!');
      fetchMessages();
    } catch {
      toast.error('Failed to delete message');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow flex justify-between items-center px-6 py-4 mb-8">
        <h1 className="text-2xl font-bold text-indigo-700">Contact Us</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition"><FiLogOut /> Logout</button>
      </div>
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" className="border p-2 rounded w-full" required />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Your Email" className="border p-2 rounded w-full" required />
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="border p-2 rounded w-full" required />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
        </form>
        {isAdmin && (
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Messages</h2>
            {loading ? <div>Loading...</div> : messages.length === 0 ? <div>No messages found.</div> : (
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Name</th>
                    <th className="p-2 text-left">Email</th>
                    <th className="p-2 text-left">Message</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map(msg => (
                    <tr key={msg.id} className="border-b">
                      <td className="p-2">{msg.name}</td>
                      <td className="p-2">{msg.email}</td>
                      <td className="p-2">{msg.message}</td>
                      <td className="p-2">
                        <button onClick={() => handleDelete(msg.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full transition" title="Delete Message">
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact; 