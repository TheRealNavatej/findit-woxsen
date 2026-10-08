import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Shield, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white shadow-lg">
                <Search className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-white tracking-tight">
                  Find<span className="text-blue-400">It</span>
                </span>
                <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase">
                  Woxsen University
                </span>
              </div>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              "Lost it? Found it? Find it."<br />
              Connecting Woxsen students with what matters through a centralized, secure campus Lost & Found coordination platform.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Managed by Woxsen Campus Security & Student Affairs</span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/browse" className="hover:text-blue-400 transition-colors">Lost & Found Marketplace</Link></li>
              <li><Link to="/categories" className="hover:text-blue-400 transition-colors">Item Categories</Link></li>
              <li><Link to="/smart-matches" className="hover:text-blue-400 transition-colors">Smart Matching Engine</Link></li>
              <li><Link to="/security-desk" className="hover:text-blue-400 transition-colors">Security Desk HQ</Link></li>
              <li><Link to="/post" className="hover:text-blue-400 transition-colors">Report Lost / Found Item</Link></li>
            </ul>
          </div>

          {/* Life Cycle & Help */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Campus Locations</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-slate-400">Vithal Gandhi Centre</span></li>
              <li><span className="text-slate-400">Trade Tower & Labs</span></li>
              <li><span className="text-slate-400">Academic & Lecture Complex</span></li>
              <li><span className="text-slate-400">Oval Dining & Cafeterias</span></li>
              <li><span className="text-slate-400">SportX & R.A.C.E Arenas</span></li>
            </ul>
          </div>

          {/* Security Hotline Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Security Desk</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Main Gate Security Office, Woxsen University Campus, Kamkole, Sanga Reddy</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-white font-mono font-medium">+91 84488 11000 (Helpline)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span>security@woxsen.edu.in</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Woxsen University. Campus Lost & Found Coordination Platform.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400">Privacy Policy</span>
            <span className="hover:text-slate-400">Campus Safety Guidelines</span>
            <span className="hover:text-slate-400 flex items-center gap-1">
              Woxsen Portal <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
