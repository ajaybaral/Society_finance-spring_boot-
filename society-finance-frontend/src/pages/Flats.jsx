import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiLogOut, FiPlus } from 'react-icons/fi';

function Flats() {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    flatNo: '',
    totalMonths: '',
    totalPaymentAmount: '',
    totalSinkingFees: '',
    totalParkingFees: '',
    totalLateFees: '',
    totalNonOccupancyFees: '',
    totalFinalAmount: ''
  });
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlats();
  }, []);

  const fetchFlats = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/flats');
      setFlats(res.data);
    } catch {
      toast.error('Failed to fetch flats');
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
      await axios.post('/flats', form);
      toast.success('Flat added!');
      setShowForm(false);
      setForm({
        flatNo: '', totalMonths: '', totalPaymentAmount: '', totalSinkingFees: '',
        totalParkingFees: '', totalLateFees: '', totalNonOccupancyFees: '', totalFinalAmount: ''
      });
      fetchFlats();
    } catch {
      toast.error('Failed to add flat');
    }
  };

  const handleDelete = async (flatNo) => {
    if (!window.confirm('Delete this flat?')) return;
    try {
      await axios.delete(`/flats/${flatNo}`);
      toast.success('Flat deleted!');
      fetchFlats();
    } catch {
      toast.error('Failed to delete flat');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="sticky top-0 z-10 bg-white shadow flex justify-between items-center px-6 py-4 mb-8">
        <h1 className="text-2xl font-bold text-indigo-700">Flats</h1>
        <div className="flex gap-2 items-center">
          {role === 'ADMIN' && (
            <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
              <FiPlus /> {showForm ? 'Cancel' : 'Add Flat'}
            </button>
          )}
          <button onClick={handleLogout} className="flex items-center gap-2 bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition"><FiLogOut /> Logout</button>
        </div>
      </div>
      <div className="max-w-5xl mx-auto">
        {showForm && role === 'ADMIN' && (
          <form onSubmit={handleAdd} className="bg-white p-6 rounded shadow mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="flatNo" value={form.flatNo} onChange={handleChange} placeholder="Flat No" className="border p-2 rounded" required />
            <input name="totalMonths" value={form.totalMonths} onChange={handleChange} placeholder="Total Months" className="border p-2 rounded" />
            <input name="totalPaymentAmount" value={form.totalPaymentAmount} onChange={handleChange} placeholder="Total Payment Amount" className="border p-2 rounded" />
            <input name="totalSinkingFees" value={form.totalSinkingFees} onChange={handleChange} placeholder="Total Sinking Fees" className="border p-2 rounded" />
            <input name="totalParkingFees" value={form.totalParkingFees} onChange={handleChange} placeholder="Total Parking Fees" className="border p-2 rounded" />
            <input name="totalLateFees" value={form.totalLateFees} onChange={handleChange} placeholder="Total Late Fees" className="border p-2 rounded" />
            <input name="totalNonOccupancyFees" value={form.totalNonOccupancyFees} onChange={handleChange} placeholder="Total Non-Occupancy Fees" className="border p-2 rounded" />
            <input name="totalFinalAmount" value={form.totalFinalAmount} onChange={handleChange} placeholder="Total Final Amount" className="border p-2 rounded" />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded md:col-span-2 hover:bg-green-700 transition">Add Flat</button>
          </form>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-2 text-center p-8 text-lg text-gray-500">Loading...</div>
          ) : flats.length === 0 ? (
            <div className="col-span-2 text-center p-8 text-lg text-gray-500">No flats found.</div>
          ) : flats.map(flat => (
            <div key={flat.flatNo} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 relative group hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-semibold text-indigo-700">Flat {flat.flatNo}</span>
                {role === 'ADMIN' && (
                  <button onClick={() => handleDelete(flat.flatNo)} className="text-red-500 hover:text-red-700 p-2 rounded-full transition" title="Delete Flat">
                    <FiTrash2 size={20} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm">
                <div><span className="font-medium">Months:</span> {flat.totalMonths}</div>
                <div><span className="font-medium">Payment:</span> {flat.totalPaymentAmount}</div>
                <div><span className="font-medium">Sinking:</span> {flat.totalSinkingFees}</div>
                <div><span className="font-medium">Parking:</span> {flat.totalParkingFees}</div>
                <div><span className="font-medium">Late:</span> {flat.totalLateFees}</div>
                <div><span className="font-medium">Non-Occupancy:</span> {flat.totalNonOccupancyFees}</div>
                <div><span className="font-medium">Final:</span> {flat.totalFinalAmount}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Flats; 