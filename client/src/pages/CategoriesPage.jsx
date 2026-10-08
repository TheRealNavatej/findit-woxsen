import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchApi } from '../services/api';
import { 
  Smartphone, Laptop, Tablet, Headphones, Zap, CreditCard, Wallet, 
  Briefcase, Watch, Gem, Key, BookOpen, Shirt, Dumbbell, GlassWater, 
  Glasses, Umbrella, FileText, Box, Cpu, ChevronRight
} from 'lucide-react';

export const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await fetchApi('/meta/categories');
      if (res.success) setCategories(res.categories);
    } catch (err) {
      console.warn('Categories fallback');
    } finally {
      setLoading(false);
    }
  };

  const iconMap = {
    Cpu, Smartphone, Laptop, Tablet, Headphones, Zap, CreditCard, Wallet,
    Briefcase, Watch, Gem, Key, BookOpen, Shirt, Dumbbell, GlassWater,
    Glasses, Umbrella, FileText, Box
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Item Categories
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore lost &amp; found items by specific campus category at Woxsen University.
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const IconComp = iconMap[cat.icon] || Box;
          return (
            <Link
              key={cat.id}
              to={`/browse?category=${encodeURIComponent(cat.name)}`}
              className="group bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-hover hover:-translate-y-1 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <IconComp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    {cat.count} Active Items
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </Link>
          );
        })}
      </div>

    </div>
  );
};
