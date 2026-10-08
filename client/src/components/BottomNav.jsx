import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Plus, Sparkles, User } from 'lucide-react';

export const BottomNav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around relative">
        
        {/* Home */}
        <Link
          to="/"
          className={`flex flex-col items-center py-1.5 px-3 rounded-xl text-[11px] font-medium transition-colors ${
            isActive('/') ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </Link>

        {/* Browse */}
        <Link
          to="/browse"
          className={`flex flex-col items-center py-1.5 px-3 rounded-xl text-[11px] font-medium transition-colors ${
            isActive('/browse') ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span>Browse</span>
        </Link>

        {/* Floating Center Post Button */}
        <div className="relative -top-5">
          <Link
            to="/post"
            className="w-13 h-13 rounded-full gradient-brand text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all ring-4 ring-white"
            title="Report Lost or Found Item"
          >
            <Plus className="w-7 h-7 stroke-[2.5]" />
          </Link>
        </div>

        {/* Smart Matches */}
        <Link
          to="/smart-matches"
          className={`flex flex-col items-center py-1.5 px-3 rounded-xl text-[11px] font-medium transition-colors ${
            isActive('/smart-matches') ? 'text-purple-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-5 h-5 mb-0.5 text-purple-600" />
          <span>Matches</span>
        </Link>

        {/* Profile */}
        <Link
          to="/profile"
          className={`flex flex-col items-center py-1.5 px-3 rounded-xl text-[11px] font-medium transition-colors ${
            isActive('/profile') ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span>Profile</span>
        </Link>

      </div>
    </div>
  );
};
