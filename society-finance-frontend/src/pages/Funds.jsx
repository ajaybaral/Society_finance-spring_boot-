import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { FiTrash2 } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function Funds() {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('ALL');
  const [form, setForm] = useState({
    type: 'CREDIT',
    amount: '',
    date: '',
    reason: '',
    flatNo: '',
    remarks: ''
  });

  const navigate = useNavigate();

  useEffect(() => { fetchFunds(); }, [filter]);

  const fetchFunds = async () => {
    setLoading(true);
    try {
      let res;
      if (filter === 'ALL') {
        res = await axios.get('/funds');
      } else {
        res = await axios.get(`/funds/type/${filter}`);
      }
      setFunds(res.data);
    } catch (e) {
      toast.error('Failed to fetch funds');
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
      await axios.post('/funds', form);
      toast.success('Transaction added!');
      setShowForm(false);
      setForm({ type: 'CREDIT', amount: '', date: '', reason: '', flatNo: '', remarks: '' });
      fetchFunds();
    } catch {
      toast.error('Failed to add transaction');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transaction?')) return;
    try {
      await axios.delete(`/funds/${id}`);
      toast.success('Transaction deleted!');
      fetchFunds();
    } catch {
      toast.error('Failed to delete transaction');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow flex justify-between items-center px-6 py-4 mb-8">
        <h1 className="text-2xl font-bold text-indigo-700">Fund Transactions</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition"><FiLogOut /> Logout</button>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <label className="mr-2 font-medium">Filter by Type:</label>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="border p-2 rounded">
            <option value="ALL">All</option>
            <option value="CREDIT">Credit</option>
            <option value="DEBIT">Debit</option>
          </select>
        </div>
        {showForm && (
          <form onSubmit={handleAdd} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="type" value={form.type} onChange={handleChange} className="border p-2 rounded">
              <option value="CREDIT">Credit</option>
              <option value="DEBIT">Debit</option>
            </select>
            <input name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" className="border p-2 rounded" required />
            <input name="date" type="date" value={form.date} onChange={handleChange} placeholder="Date" className="border p-2 rounded" />
            <input name="reason" value={form.reason} onChange={handleChange} placeholder="Reason" className="border p-2 rounded" />
            <input name="flatNo" value={form.flatNo} onChange={handleChange} placeholder="Flat No (optional)" className="border p-2 rounded" />
            <input name="remarks" value={form.remarks} onChange={handleChange} placeholder="Remarks" className="border p-2 rounded md:col-span-2" />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded md:col-span-2">Add Transaction</button>
          </form>
        )}
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Reason</th>
                <th className="p-2 text-left">Flat No</th>
                <th className="p-2 text-left">Remarks</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center p-4">Loading...</td></tr>
              ) : funds.length === 0 ? (
                <tr><td colSpan={7} className="text-center p-4">No transactions found.</td></tr>
              ) : funds.map(fund => (
                <tr key={fund.id} className="border-b">
                  <td className="p-2">{fund.type}</td>
                  <td className="p-2">{fund.amount}</td>
                  <td className="p-2">{fund.date}</td>
                  <td className="p-2">{fund.reason}</td>
                  <td className="p-2">{fund.flatNo}</td>
                  <td className="p-2">{fund.remarks}</td>
                  <td className="p-2">
                    <button onClick={() => handleDelete(fund.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full transition" title="Delete Transaction">
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

export default Funds; 