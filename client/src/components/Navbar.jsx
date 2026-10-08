import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Search, Plus, Bell, MessageSquare, Shield, Sparkles, User, LogOut, 
  Menu, X, Layers, LayoutDashboard
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout, unreadNotifications } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & University Subtitle */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
                  Find<span className="gradient-text">It</span>
                </span>
                <span className="text-[10px] font-bold tracking-wider text-blue-700 uppercase">
                  Woxsen University
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link to="/" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/') ? 'text-blue-600 bg-blue-50/80 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}`}>
                Home
              </Link>
              <Link to="/browse" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/browse') ? 'text-blue-600 bg-blue-50/80 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}`}>
                Lost & Found
              </Link>
              <Link to="/categories" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/categories') ? 'text-blue-600 bg-blue-50/80 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}`}>
                Categories
              </Link>
              <Link to="/smart-matches" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${isActive('/smart-matches') ? 'text-purple-600 bg-purple-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}`}>
                <Sparkles className="w-4 h-4 text-purple-600" />
                Matches
              </Link>
              <Link to="/security-desk" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${isActive('/security-desk') ? 'text-indigo-600 bg-indigo-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}`}>
                <Shield className="w-4 h-4 text-indigo-600" />
                Security Desk
              </Link>
              
              {user?.role === 'admin' && (
                <Link to="/admin" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${isActive('/admin') ? 'text-rose-600 bg-rose-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'}`}>
                  <LayoutDashboard className="w-4 h-4 text-rose-600" />
                  Admin
                </Link>
              )}
            </nav>
          </div>

          {/* Right Action Icons & Controls */}
          <div className="hidden md:flex items-center gap-3">

            {/* Notifications Icon */}
            <Link to="/notifications" className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
              )}
            </Link>

            {/* Messages Icon */}
            <Link to="/messages" className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
              <MessageSquare className="w-5 h-5" />
            </Link>

            {/* Post Item Button CTA */}
            <Link
              to="/post"
              className="gradient-brand text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-lg hover:opacity-95 transition-all transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              Post an Item
            </Link>

            {/* User Profile / Auth State */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <Link to="/profile" className="flex items-center gap-2 group">
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/30 group-hover:ring-blue-500 transition-all"
                  />
                  <div className="hidden xl:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-800 leading-tight">{user.name}</span>
                    <span className="text-[10px] text-slate-500 capitalize">{user.role}</span>
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/signin"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-xl text-xs font-bold gradient-brand text-white shadow-sm hover:opacity-95 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link to="/post" className="gradient-brand text-white p-2 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm">
              <Plus className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            {user ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2.5">
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-blue-500/30"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-800">{user.name}</div>
                    <div className="text-[10px] text-slate-500 capitalize font-medium">{user.role}</div>
                  </div>
                </div>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="px-2.5 py-1 text-xs text-rose-600 bg-rose-50 rounded-lg font-semibold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <Link
                  to="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-bold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2 text-xs font-bold text-white gradient-brand rounded-xl"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium bg-slate-50 text-slate-800">
              Home
            </Link>
            <Link to="/browse" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium bg-slate-50 text-slate-800">
              Lost & Found
            </Link>
            <Link to="/categories" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium bg-slate-50 text-slate-800">
              Categories
            </Link>
            <Link to="/smart-matches" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium bg-purple-50 text-purple-700 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Matches
            </Link>
            <Link to="/security-desk" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium bg-indigo-50 text-indigo-700 flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> Security Desk
            </Link>
            <Link to="/my-reports" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium bg-slate-50 text-slate-800">
              My Reports
            </Link>
            <Link to="/messages" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium bg-slate-50 text-slate-800">
              Messages
            </Link>
            <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-sm font-medium bg-slate-50 text-slate-800">
              Profile
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
