import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchApi } from '../services/api';
import { EmptyState } from '../components/EmptyState';
import { Sparkles, CheckCircle2, XCircle, MessageSquare, ArrowRight, ShieldCheck, MapPin, Tag, Lock } from 'lucide-react';

export const SmartMatches = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadMatches();
    else setLoading(false);
  }, [user]);

  const loadMatches = async () => {
    setLoading(true);
    try {
      // Fetch item_101 details which has match calculation
      const res = await fetchApi('/items/item_101');
      if (res.success && res.smartMatches) {
        setMatches(res.smartMatches);
      }
    } catch (err) {
      console.warn('Smart matches load fallback');
    } finally {
      setLoading(false);
    }
  };

  const handleRejectMatch = (id) => {
    setMatches(matches.filter(m => m.candidate._id !== id));
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center mx-auto shadow-sm">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Sign In Required to View Smart Matches
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
            FindIt's AI matching engine calculates correlation scores for reported campus belongings. Please sign in with your Woxsen account to inspect match candidates.
          </p>
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
            Register Student Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold mb-2">
            <Sparkles className="w-4 h-4 text-purple-600" /> Transparent Weighted Matching Algorithm
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Your Smart Matches
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            FindIt evaluates Category (25%), Location (25%), Description (20%), Color (10%), Brand (10%), and Date Proximity (10%).
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-purple-200 bg-purple-900 text-white p-4 hidden lg:flex items-center gap-4">
          <img src="/images/smart_matching_nodes_1791180753977.jpg" alt="AI Nodes" className="w-16 h-16 rounded-xl object-cover" />
          <div className="text-xs">
            <div className="font-bold text-purple-200">Algorithmic Confidence</div>
            <div className="text-[11px] text-purple-300">Weighted heuristic engine • No false ML claims</div>
          </div>
        </div>
      </div>

      {/* MATCH CARDS FEED */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map(n => (
            <div key={n} className="bg-white rounded-3xl p-6 border border-slate-200 h-44 animate-pulse"></div>
          ))}
        </div>
      ) : matches.length > 0 ? (
        <div className="space-y-6">
          {matches.map(({ candidate, matchScore, reasons }) => (
            <div key={candidate._id} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img
                      src={candidate.images?.[0] || '/images/item_smartphone_1791181014540.jpg'}
                      alt={candidate.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {candidate.type} ITEM
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">{candidate.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{candidate.description}</p>
                  </div>
                </div>

                {/* Score Pill */}
                <div className="bg-purple-900 text-white px-5 py-2.5 rounded-2xl text-center shadow-lg border border-purple-500/30">
                  <div className="text-2xl font-black text-purple-300 font-mono">{matchScore}%</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-purple-200">Match Score</div>
                </div>

              </div>

              {/* Match Reasons Breakdown */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Match Compatibility Factors:</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {reasons.map((reason, idx) => (
                    <span key={idx} className="bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                      {reason}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
                
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Found at: <strong>{candidate.location?.building || 'Campus'}</strong></span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleRejectMatch(candidate._id)}
                    className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-600 font-bold text-xs transition-colors flex items-center gap-1"
                  >
                    <XCircle className="w-4 h-4" /> Not My Item
                  </button>

                  <Link
                    to={`/messages?itemId=${candidate._id}`}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" /> Message User
                  </Link>

                  <Link
                    to={`/item/${candidate._id}`}
                    className="px-5 py-2 rounded-xl gradient-brand text-white font-bold text-xs shadow-md flex items-center gap-1.5"
                  >
                    View Match <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>

            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No smart matches detected yet"
          description="Our algorithm continuously runs in the background to pair lost and found reports as soon as new items are published."
          iconType="matches"
        />
      )}

    </div>
  );
};
