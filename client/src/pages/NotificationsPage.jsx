import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchApi } from '../services/api';
import { Bell, Sparkles, Shield, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await fetchApi('/notifications');
      if (res.success) setNotifications(res.notifications);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  const markAllRead = async () => {
    try {
      await fetchApi('/notifications/read-all', { method: 'PUT' });
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Bell className="w-8 h-8 text-blue-600" />
            Notification Center
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time updates regarding your reported items, smart matches, claims, and handovers.
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n._id}
            className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
              !n.read ? 'bg-white border-blue-200 shadow-sm ring-1 ring-blue-500/10' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">{n.title}</h4>
                <span className="text-[10px] text-slate-400 font-mono">
                  {new Date(n.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-slate-600">{n.message}</p>
              {n.link && (
                <Link to={n.link} className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 pt-1">
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
