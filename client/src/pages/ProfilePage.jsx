import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, BookOpen, Calendar, Award, Phone, CheckCircle2 } from 'lucide-react';

export const ProfilePage = () => {
  const { user } = useAuth();

  const currentUser = user || {
    name: 'Aarav Sharma',
    email: 'student@woxsen.edu.in',
    role: 'student',
    studentId: 'WX2024ST091',
    course: 'B.Tech Computer Science',
    year: '3rd Year',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    itemsLostCount: 2,
    itemsFoundCount: 1,
    itemsReturnedCount: 1
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-500/20 shadow-md"
          />
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900">{currentUser.name}</h1>
              <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-500">{currentUser.course} • {currentUser.year}</p>
            <div className="text-xs font-mono font-semibold text-slate-600">ID: {currentUser.studentId}</div>
          </div>
        </div>

        {/* User Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 text-center">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
            <div className="text-2xl font-black text-rose-600 font-mono">{currentUser.itemsLostCount || 2}</div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Items Lost</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
            <div className="text-2xl font-black text-emerald-600 font-mono">{currentUser.itemsFoundCount || 1}</div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Items Found</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
            <div className="text-2xl font-black text-indigo-600 font-mono">{currentUser.itemsReturnedCount || 1}</div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Items Returned</div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
            <div className="text-2xl font-black text-purple-600 font-mono">100%</div>
            <div className="text-[11px] font-bold text-slate-500 uppercase">Trust Score</div>
          </div>
        </div>

      </div>

      {/* Account Details & Security Settings */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">University Contact &amp; Security Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-bold block uppercase">University Email</span>
            <span className="font-semibold text-slate-900">{currentUser.email}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-bold block uppercase">Phone Number</span>
            <span className="font-semibold text-slate-900">{currentUser.phone || '+91 98765 43210'}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-bold block uppercase">Institution</span>
            <span className="font-semibold text-slate-900">Woxsen University Campus</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-bold block uppercase">Privacy Shield</span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Phone Number Masked Publicly
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
