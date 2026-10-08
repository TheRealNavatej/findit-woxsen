import React, { useState, useEffect } from 'react';
import { fetchApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ItemCard } from '../components/ItemCard';
import { StatusBadge } from '../components/StatusBadge';
import { FileText, Search, PackageCheck, Sparkles, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MyReports = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('lost'); // 'lost' | 'found' | 'claims' | 'returned'

  useEffect(() => {
    loadUserReports();
  }, []);

  const loadUserReports = async () => {
    setLoading(true);
    try {
      const [itemsRes, claimsRes] = await Promise.all([
        fetchApi('/items'),
        fetchApi('/claims')
      ]);

      if (itemsRes.success) setItems(itemsRes.items);
      if (claimsRes.success) setClaims(claimsRes.claims);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  const myLost = items.filter(i => i.type === 'lost');
  const myFound = items.filter(i => i.type === 'found');
  const myReturned = items.filter(i => i.status === 'Returned');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          My Belongings &amp; Reports Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your lost item filings, found reports, verification claims, and handover schedules.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('lost')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'lost' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          My Lost Items ({myLost.length})
        </button>

        <button
          onClick={() => setActiveTab('found')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'found' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          My Found Reports ({myFound.length})
        </button>

        <button
          onClick={() => setActiveTab('claims')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'claims' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          My Claims ({claims.length})
        </button>

        <button
          onClick={() => setActiveTab('returned')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'returned' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Returned History ({myReturned.length})
        </button>
      </div>

      {/* TAB CONTENT GRID */}
      {activeTab === 'lost' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myLost.map(item => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}

      {activeTab === 'found' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myFound.map(item => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}

      {activeTab === 'claims' && (
        <div className="space-y-4">
          {claims.map(claim => (
            <div key={claim._id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
                  {claim.claimId}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  {claim.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{claim.itemName}</h3>
              <p className="text-xs text-slate-500">Submitted on {new Date(claim.submittedAt).toLocaleDateString()}</p>
              <div className="pt-2 border-t border-slate-100 flex justify-end">
                <Link to={`/item/${claim.itemId}`} className="text-xs font-bold text-blue-600 flex items-center gap-1">
                  View Item Details &amp; Lifecycle <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'returned' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myReturned.map(item => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}

    </div>
  );
};
