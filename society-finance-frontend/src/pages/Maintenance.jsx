import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { FiTrash2, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function Maintenance() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    date: '',
    monthYear: '',
    receiptNo: '',
    flatNo: '',
    paymentAmount: '',
    sinkingFees: '',
    parkingFees: false,
    nonOccupancyFees: '',
    lateFees: false,
    finalAmount: ''
  });

  const navigate = useNavigate();

  useEffect(() => { fetchRecords(); }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/maintenance');
      setRecords(res.data);
    } catch {
      toast.error('Failed to fetch records');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/maintenance', {
        ...form,
        flat: { flatNo: form.flatNo },
      });
      toast.success('Record added!');
      setShowForm(false);
      setForm({ date: '', monthYear: '', receiptNo: '', flatNo: '', paymentAmount: '', sinkingFees: '', parkingFees: false, nonOccupancyFees: '', lateFees: false, finalAmount: '' });
      fetchRecords();
    } catch {
      toast.error('Failed to add record');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      await axios.delete(`/maintenance/${id}`);
      toast.success('Record deleted!');
      fetchRecords();
    } catch {
      toast.error('Failed to delete record');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow flex justify-between items-center px-6 py-4 mb-8">
        <h1 className="text-2xl font-bold text-indigo-700">Maintenance Records</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition"><FiLogOut /> Logout</button>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Maintenance Records</h1>
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded">
            {showForm ? 'Cancel' : 'Add Record'}
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleAdd} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="date" type="date" value={form.date} onChange={handleChange} placeholder="Date" className="border p-2 rounded" required />
            <input name="monthYear" value={form.monthYear} onChange={handleChange} placeholder="Month/Year" className="border p-2 rounded" />
            <input name="receiptNo" value={form.receiptNo} onChange={handleChange} placeholder="Receipt No" className="border p-2 rounded" />
            <input name="flatNo" value={form.flatNo} onChange={handleChange} placeholder="Flat No" className="border p-2 rounded" required />
            <input name="paymentAmount" value={form.paymentAmount} onChange={handleChange} placeholder="Payment Amount" className="border p-2 rounded" />
            <input name="sinkingFees" value={form.sinkingFees} onChange={handleChange} placeholder="Sinking Fees" className="border p-2 rounded" />
            <label className="flex items-center space-x-2">
              <input name="parkingFees" type="checkbox" checked={form.parkingFees} onChange={handleChange} />
              <span>Parking Fees</span>
            </label>
            <input name="nonOccupancyFees" value={form.nonOccupancyFees} onChange={handleChange} placeholder="Non-Occupancy Fees" className="border p-2 rounded" />
            <label className="flex items-center space-x-2">
              <input name="lateFees" type="checkbox" checked={form.lateFees} onChange={handleChange} />
              <span>Late Fees</span>
            </label>
            <input name="finalAmount" value={form.finalAmount} onChange={handleChange} placeholder="Final Amount" className="border p-2 rounded" />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded md:col-span-2">Add Record</button>
          </form>
        )}
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Month/Year</th>
                <th className="p-2 text-left">Receipt No</th>
                <th className="p-2 text-left">Flat No</th>
                <th className="p-2 text-left">Payment</th>
                <th className="p-2 text-left">Sinking</th>
                <th className="p-2 text-left">Parking</th>
                <th className="p-2 text-left">Non-Occupancy</th>
                <th className="p-2 text-left">Late</th>
                <th className="p-2 text-left">Final</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={11} className="text-center p-4">Loading...</td></tr>
              ) : records.length === 0 ? (
                <tr><td colSpan={11} className="text-center p-4">No records found.</td></tr>
              ) : records.map(rec => (
                <tr key={rec.id} className="border-b">
                  <td className="p-2">{rec.date}</td>
                  <td className="p-2">{rec.monthYear}</td>
                  <td className="p-2">{rec.receiptNo}</td>
                  <td className="p-2">{rec.flat?.flatNo}</td>
                  <td className="p-2">{rec.paymentAmount}</td>
                  <td className="p-2">{rec.sinkingFees}</td>
                  <td className="p-2">{rec.parkingFees ? 'Yes' : 'No'}</td>
                  <td className="p-2">{rec.nonOccupancyFees}</td>
                  <td className="p-2">{rec.lateFees ? 'Yes' : 'No'}</td>
                  <td className="p-2">{rec.finalAmount}</td>
                  <td className="p-2">
                    <button onClick={() => handleDelete(rec.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full transition" title="Delete Record">
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

export default Maintenance; 