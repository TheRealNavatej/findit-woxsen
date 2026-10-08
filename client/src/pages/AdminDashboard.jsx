import React, { useState, useEffect } from 'react';
import { fetchApi } from '../services/api';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { 
  LayoutDashboard, Users, FileText, Shield, CheckCircle2, 
  MapPin, Tag, Sliders, ChevronRight, Layers, Settings, MessageSquare
} from 'lucide-react';

export const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'users'

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [dashRes, usersRes] = await Promise.all([
        fetchApi('/admin/dashboard'),
        fetchApi('/admin/users')
      ]);

      if (dashRes.success) setData(dashRes);
      if (usersRes.success) setUsersList(usersRes.users);
    } catch (err) {
      console.warn('Admin fetch fallback');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetchApi(`/admin/users/${userId}/role`, {
        method: 'PUT',
        body: JSON.stringify({ role: newRole })
      });
      if (res.success) {
        setUsersList(usersList.map(u => u.id === userId ? { ...u, role: newRole } : u));
      }
    } catch (err) {
      alert('Failed to update role');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 font-medium">Loading Woxsen University Admin Analytics...</p>
      </div>
    );
  }

  const stats = data?.stats || {
    totalUsers: 1844,
    totalItems: 436,
    lostCount: 222,
    foundCount: 214,
    collectedCount: 148,
    returnedCount: 248,
    pendingClaimsCount: 3,
    successRate: '96%'
  };

  const monthlyData = data?.charts?.monthlyActivity || [
    { month: 'May', lost: 42, found: 38, returned: 35 },
    { month: 'Jun', lost: 55, found: 50, returned: 48 },
    { month: 'Jul', lost: 68, found: 64, returned: 60 },
    { month: 'Aug', lost: 80, found: 76, returned: 72 },
    { month: 'Sep', lost: 95, found: 90, returned: 86 },
    { month: 'Oct', lost: 120, found: 110, returned: 105 }
  ];

  const categoryData = data?.charts?.categoryChart || [
    { name: 'Wallets', value: 14 },
    { name: 'Phones', value: 12 },
    { name: 'ID Cards', value: 35 },
    { name: 'Laptops', value: 6 },
    { name: 'Earbuds', value: 15 }
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Woxsen Admin Console
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
            Campus Lost &amp; Found Intelligence
          </h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview' ? 'gradient-brand text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            Analytics &amp; Charts
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'users' ? 'gradient-brand text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200'
            }`}
          >
            User Roles Management
          </button>
        </div>
      </div>

      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-bold text-slate-400 uppercase">Total Members</div>
          <div className="text-3xl font-black text-slate-900 font-mono">{stats.totalUsers}</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-bold text-slate-400 uppercase">Items Returned</div>
          <div className="text-3xl font-black text-emerald-600 font-mono">{stats.returnedCount}</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-bold text-slate-400 uppercase">Match Success Rate</div>
          <div className="text-3xl font-black text-purple-600 font-mono">{stats.successRate}</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-bold text-slate-400 uppercase">Collected at Vault</div>
          <div className="text-3xl font-black text-indigo-600 font-mono">{stats.collectedCount}</div>
        </div>

      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* MONTHLY RECOVERY TREND CHART */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Monthly Recovery Activity Trend</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="lost" fill="#3b82f6" name="Lost Items" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="found" fill="#8b5cf6" name="Found Items" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="returned" fill="#10b981" name="Returned" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CATEGORY BREAKDOWN PIE CHART */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900">Items by Category</h3>
            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

      {/* USER ROLE MANAGEMENT TAB */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Registered Campus Accounts &amp; Role Permissions</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold uppercase text-slate-400">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Student ID / Code</th>
                  <th className="py-3 px-4">Current Role</th>
                  <th className="py-3 px-4 text-right">Role Modifier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {usersList.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{u.name}</td>
                    <td className="py-3.5 px-4 text-slate-600">{u.email}</td>
                    <td className="py-3.5 px-4 font-mono">{u.studentId}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                        u.role === 'admin' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        u.role === 'security' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                        'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="p-1.5 rounded-lg border border-slate-200 text-xs font-bold"
                      >
                        <option value="student">Student</option>
                        <option value="security">Security Staff</option>
                        <option value="admin">Admin Moderator</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
