import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchApi } from '../services/api';
import { ItemCard } from '../components/ItemCard';
import { EmptyState } from '../components/EmptyState';
import { 
  Search, Filter, RefreshCw, SlidersHorizontal, MapPin, Tag, Calendar, 
  Lock, Shield, CheckCircle2, KeyRound 
} from 'lucide-react';

export const BrowseItems = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);

  // Filter state initialized from URL params
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'all');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'all');
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || 'all');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('newest');

  // Keep state in sync with URL changes
  useEffect(() => {
    const cat = searchParams.get('category');
    const t = searchParams.get('type');
    const loc = searchParams.get('location');
    const s = searchParams.get('search');
    
    if (cat !== null) setCategoryFilter(cat);
    if (t !== null) setTypeFilter(t);
    if (loc !== null) setLocationFilter(loc);
    if (s !== null) setSearchQuery(s);
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      loadMetaAndItems();
    } else {
      setLoading(false);
    }
  }, [user, typeFilter, categoryFilter, locationFilter, statusFilter, sortBy]);

  const loadMetaAndItems = async () => {
    setLoading(true);
    try {
      const [locRes, catRes, itemsRes] = await Promise.all([
        fetchApi('/meta/locations'),
        fetchApi('/meta/categories'),
        fetchApi(`/items?type=${typeFilter}&category=${encodeURIComponent(categoryFilter)}&location=${encodeURIComponent(locationFilter)}&status=${statusFilter}&sort=${sortBy}&search=${encodeURIComponent(searchQuery)}`)
      ]);

      if (locRes.success) setLocations(locRes.locations);
      if (catRes.success) setCategories(catRes.categories);
      if (itemsRes.success) setItems(itemsRes.items);
    } catch (err) {
      console.error('Error fetching items marketplace', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (user) {
      loadMetaAndItems();
    }
  };

  const clearFilters = () => {
    setTypeFilter('all');
    setCategoryFilter('all');
    setLocationFilter('all');
    setStatusFilter('all');
    setSearchQuery('');
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Lost &amp; Found Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Active reports, verified lost belongings, and security desk collections at Woxsen University.
          </p>
        </div>

        {/* Type Toggle Pills: Only active when logged in */}
        {user && (
          <div className="inline-flex p-1 rounded-xl bg-slate-200/80 border border-slate-300/60 shadow-inner">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                typeFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Items ({items.length})
            </button>
            <button
              onClick={() => setTypeFilter('lost')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                typeFilter === 'lost' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:text-rose-600'
              }`}
            >
              LOST Only
            </button>
            <button
              onClick={() => setTypeFilter('found')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                typeFilter === 'found' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-emerald-600'
              }`}
            >
              FOUND Only
            </button>
          </div>
        )}
      </div>

      {/* IF NOT LOGGED IN: SHOW UNIVERSITY AUTHENTICATION REQUIREMENT GATE */}
      {!user ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">
              University Login Required to View Items
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
              To protect student privacy, prevent false ownership claims, and safeguard personal belongings across campus, viewing the active Lost &amp; Found item directory is reserved for verified Woxsen University members.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-slate-600">Verified student &amp; faculty profiles only</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-slate-600">Anti-theft secret question verification</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-slate-600">Physical Security Desk locker audit trail</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/signin"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:opacity-95 transition-all text-center"
            >
              Sign In with University ID
            </Link>
            <Link
              to="/signup"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold text-xs shadow-sm transition-all text-center"
            >
              Register Account
            </Link>
          </div>
        </div>
      ) : (
        /* AUTHENTICATED USERS: FULL SEARCH, FILTERS & ITEMS GRID */
        <>
          {/* SEARCH BAR & FILTERS TOOLBAR */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
            
            {/* Top Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search lost or found items (e.g. Smartwatch, MacBook, Hostel Keys, AirPods, Hydro Flask)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-28 py-3.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm font-medium transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 rounded-lg gradient-brand text-white font-bold text-xs shadow-sm hover:opacity-95"
              >
                Search
              </button>
            </form>

            {/* Filter Dropdowns Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2">
              
              {/* Category Filter */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setSearchParams(prev => {
                      if (e.target.value === 'all') prev.delete('category');
                      else prev.set('category', e.target.value);
                      return prev;
                    });
                  }}
                  className="w-full py-2 px-3 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 focus:border-blue-500 bg-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Location</label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 focus:border-blue-500 bg-white"
                >
                  <option value="all">All Woxsen Locations</option>
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.name}>{loc.name}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 focus:border-blue-500 bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="Reported">Reported</option>
                  <option value="Looking for Owner">Still Looking</option>
                  <option value="Collected">Collected by Security</option>
                  <option value="Claim Under Review">Claim Under Review</option>
                  <option value="Handover Scheduled">Handover Scheduled</option>
                  <option value="Returned">Returned Successfully</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 focus:border-blue-500 bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="match">Highest Smart Match</option>
                </select>
              </div>

              {/* Reset button */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Filters
                </button>
              </div>

            </div>

          </div>

          {/* MARKETPLACE ITEMS LISTINGS GRID */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                <div key={n} className="bg-white rounded-2xl border border-slate-200 p-4 h-72 animate-pulse flex flex-col justify-between">
                  <div className="w-full h-40 bg-slate-200 rounded-xl"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4 mt-3"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No lost or found items matched your criteria"
              description="Try broadening your location/category filters or search keywords."
              actionButton={
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 rounded-xl gradient-brand text-white font-bold text-xs"
                >
                  Clear All Filters
                </button>
              }
            />
          )}
        </>
      )}

    </div>
  );
};
