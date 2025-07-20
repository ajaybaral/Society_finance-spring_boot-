import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

function Dashboard() {
  const [stats, setStats] = useState({
    flats: 0,
    maintenance: 0,
    funds: 0,
    vouchers: 0
  });
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem('username') || 'User';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [flats, maintenance, funds, vouchers] = await Promise.all([
          axios.get('/flats'),
          axios.get('/maintenance'),
          axios.get('/funds'),
          axios.get('/vouchers')
        ]);
        setStats({
          flats: flats.data.length,
          maintenance: maintenance.data.length,
          funds: funds.data.length,
          vouchers: vouchers.data.length
        });
      } catch (e) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow flex justify-between items-center px-6 py-4 mb-8">
        <h1 className="text-2xl font-bold text-indigo-700">Welcome, {username}!</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition"><FiLogOut /> Logout</button>
      </div>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Flats" value={stats.flats} loading={loading} color="bg-blue-100" />
          <StatCard title="Maintenance" value={stats.maintenance} loading={loading} color="bg-green-100" />
          <StatCard title="Funds" value={stats.funds} loading={loading} color="bg-yellow-100" />
          <StatCard title="Vouchers" value={stats.vouchers} loading={loading} color="bg-purple-100" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickLink to="/flats" label="Manage Flats" icon="🏢" />
          <QuickLink to="/maintenance" label="Maintenance" icon="🔧" />
          <QuickLink to="/funds" label="Funds" icon="💰" />
          <QuickLink to="/vouchers" label="Vouchers" icon="📋" />
          <QuickLink to="/contact" label="Contact Us" icon="📞" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, loading, color }) {
  return (
    <div className={`rounded shadow p-4 ${color}`}>
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-2xl font-bold mt-2">{loading ? '...' : value}</div>
    </div>
  );
}

function QuickLink({ to, label, icon }) {
  return (
    <Link to={to} className="flex items-center p-4 bg-white rounded shadow hover:bg-gray-50 transition">
      <span className="text-2xl mr-3">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}

export default Dashboard; 