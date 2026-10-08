import React, { useState, useEffect } from 'react';
import { fetchApi } from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { Shield, Lock, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export const CollectedItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCollected();
  }, []);

  const loadCollected = async () => {
    try {
      const res = await fetchApi('/security/collected');
      if (res.success) setItems(res.items);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <Shield className="w-8 h-8 text-indigo-600" />
          Security Vault &amp; Collected Belongings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Items currently logged and stored in Woxsen Security Desk Lockers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
                {item.collectionDetails?.lockerNumber || 'Security Locker'}
              </span>
              <StatusBadge status={item.status} size="small" />
            </div>

            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={item.images?.[0] || '/images/item_smartphone_1791181014540.jpg'}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 mt-1">{item.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
              <div><span className="font-semibold text-slate-900">Found At:</span> {item.location?.building || 'Campus'}</div>
              <div><span className="font-semibold text-slate-900">Collected By:</span> {item.collectionDetails?.collectedBy || 'Security Desk'}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
