import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { FiTrash2, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function Vouchers() {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    date: '',
    receiptId: '',
    name: '',
    amount: '',
    reason: '',
    description: ''
  });

  const navigate = useNavigate();

  useEffect(() => { fetchVouchers(); }, []);

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/vouchers');
      setVouchers(res.data);
    } catch {
      toast.error('Failed to fetch vouchers');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/vouchers', form);
      toast.success('Voucher added!');
      setShowForm(false);
      setForm({ date: '', receiptId: '', name: '', amount: '', reason: '', description: '' });
      fetchVouchers();
    } catch {
      toast.error('Failed to add voucher');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this voucher?')) return;
    try {
      await axios.delete(`/vouchers/${id}`);
      toast.success('Voucher deleted!');
      fetchVouchers();
    } catch {
      toast.error('Failed to delete voucher');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow flex justify-between items-center px-6 py-4 mb-8">
        <h1 className="text-2xl font-bold text-indigo-700">Voucher Claims</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition"><FiLogOut /> Logout</button>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Voucher Claims</h1>
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded">
            {showForm ? 'Cancel' : 'Add Voucher'}
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleAdd} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="date" type="date" value={form.date} onChange={handleChange} placeholder="Date" className="border p-2 rounded" required />
            <input name="receiptId" value={form.receiptId} onChange={handleChange} placeholder="Receipt ID" className="border p-2 rounded" />
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
            <input name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" className="border p-2 rounded" />
            <input name="reason" value={form.reason} onChange={handleChange} placeholder="Reason" className="border p-2 rounded" />
            <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded md:col-span-2" />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded md:col-span-2">Add Voucher</button>
          </form>
        )}
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Receipt ID</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Reason</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center p-4">Loading...</td></tr>
              ) : vouchers.length === 0 ? (
                <tr><td colSpan={7} className="text-center p-4">No vouchers found.</td></tr>
              ) : vouchers.map(v => (
                <tr key={v.id} className="border-b">
                  <td className="p-2">{v.date}</td>
                  <td className="p-2">{v.receiptId}</td>
                  <td className="p-2">{v.name}</td>
                  <td className="p-2">{v.amount}</td>
                  <td className="p-2">{v.reason}</td>
                  <td className="p-2">{v.description}</td>
                  <td className="p-2">
                    <button onClick={() => handleDelete(v.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full transition" title="Delete Voucher">
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Vouchers; 