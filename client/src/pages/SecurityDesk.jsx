import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { 
  Shield, CheckCircle2, Clock, MapPin, Package, FileText, 
  Search, Lock, Calendar, AlertCircle, Eye, UserCheck, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SecurityDesk = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('queue'); // 'queue' | 'collected' | 'handovers'

  // Locker Assignment Modal
  const [collectModalOpen, setCollectModalOpen] = useState(false);
  const [selectedItemForCollect, setSelectedItemForCollect] = useState(null);
  const [lockerNum, setLockerNum] = useState('Locker 04');

  // Verify Claim Modal
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [verifyNote, setVerifyNote] = useState('');

  useEffect(() => {
    loadSecurityData();
  }, []);

  const loadSecurityData = async () => {
    setLoading(true);
    try {
      const res = await fetchApi('/security/dashboard');
      if (res.success) {
        setData(res);
      }
    } catch (err) {
      console.warn('Security dashboard fallback');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyClaimAction = async (claimId, status) => {
    try {
      const res = await fetchApi(`/claims/${claimId}/verify`, {
        method: 'PUT',
        body: JSON.stringify({
          status, // 'Claim Approved' | 'Rejected'
          adminNotes: verifyNote || `Processed by Security Staff ${user?.name || 'Officer Verma'}`
        })
      });

      if (res.success) {
        if (status === 'Claim Approved') confetti();
        setVerifyModalOpen(false);
        loadSecurityData();
      }
    } catch (err) {
      alert(err.message || 'Action failed');
    }
  };

  const handleCompleteHandover = async (itemId) => {
    try {
      const res = await fetchApi(`/handover/complete/${itemId}`, {
        method: 'POST',
        body: JSON.stringify({
          returnedToName: 'Verified Student Owner',
          verifiedByNote: 'In-person ID verification passed'
        })
      });

      if (res.success) {
        confetti();
        loadSecurityData();
      }
    } catch (err) {
      alert(err.message || 'Handover failed');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 font-medium">Loading Woxsen Security Operations Dashboard...</p>
      </div>
    );
  }

  const stats = data?.stats || {
    openLostReports: 12,
    collectedItemsCount: 8,
    pendingClaimsCount: 3,
    handoversTodayCount: 2,
    returnedItemsCount: 248
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* SECURITY DESK BANNER */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 hidden md:block">
          <img src="/images/security_desk_hq_1791180718778.jpg" alt="Security HQ" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Security Status: ● ONLINE
            </span>
            <span className="text-xs text-slate-400">Main Gate Office HQ</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white">
            Woxsen Security Desk Operations
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Centralized custody log for collected belongings, locker storage assignments, claim proof verification queue, and student handovers.
          </p>
        </div>
      </div>

      {/* STATS COUNTERS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-2xl font-black text-rose-600 font-mono">{stats.openLostReports}</div>
          <div className="text-xs font-bold text-slate-700">Open Lost Reports</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-2xl font-black text-indigo-600 font-mono">{stats.collectedItemsCount}</div>
          <div className="text-xs font-bold text-slate-700">Collected in Lockers</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-2xl font-black text-amber-600 font-mono">{stats.pendingClaimsCount}</div>
          <div className="text-xs font-bold text-slate-700">Claims Pending</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-2xl font-black text-cyan-600 font-mono">{stats.handoversTodayCount}</div>
          <div className="text-xs font-bold text-slate-700">Handovers Today</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1 col-span-2 lg:col-span-1">
          <div className="text-2xl font-black text-emerald-600 font-mono">{stats.returnedItemsCount}</div>
          <div className="text-xs font-bold text-slate-700">Items Returned</div>
        </div>

      </div>

      {/* OPERATIONS TABS & TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-6">
        
        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 p-2 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'queue' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🔐 Verification Queue ({data?.pendingClaims?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('collected')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'collected' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📦 Locker Storage ({data?.collectedItems?.length || 0})
          </button>
        </div>

        {/* TAB 1: VERIFICATION QUEUE */}
        {activeTab === 'queue' && (
          <div className="p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Pending Ownership Claims</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-4">Claim ID</th>
                    <th className="py-3 px-4">Target Item</th>
                    <th className="py-3 px-4">Claimant Student</th>
                    <th className="py-3 px-4">Submitted Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {data?.pendingClaims?.map((claim) => (
                    <tr key={claim._id} className="hover:bg-slate-50/80">
                      <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">{claim.claimId}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{claim.itemName}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold">{claim.claimant?.name}</div>
                        <div className="text-[11px] text-slate-400">{claim.claimant?.studentId}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">{new Date(claim.submittedAt).toLocaleDateString()}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-200 text-[11px]">
                          {claim.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedClaim(claim);
                            setVerifyModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg gradient-brand text-white font-bold text-xs shadow-sm"
                        >
                          Review Private Answers
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: LOCKER STORAGE */}
        {activeTab === 'collected' && (
          <div className="p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Security Office Vault &amp; Locker Assignments</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.collectedItems?.map((item) => (
                <div key={item._id} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                      {item.collectionDetails?.lockerNumber || 'Locker 04'}
                    </span>
                    <StatusBadge status={item.status} size="small" />
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Found: {item.location?.building || 'Campus'}</span>
                    <button
                      onClick={() => handleCompleteHandover(item._id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                    >
                      Mark Returned
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* PRIVATE ANSWER REVIEW MODAL FOR SECURITY */}
      <Modal
        isOpen={verifyModalOpen}
        onClose={() => setVerifyModalOpen(false)}
        title={`Review Private Claim Answers: ${selectedClaim?.claimId}`}
      >
        {selectedClaim && (
          <div className="space-y-4">
            <div className="bg-slate-50 p-3 rounded-xl text-xs space-y-1">
              <div><span className="font-bold text-slate-500">Student:</span> {selectedClaim.claimant?.name} ({selectedClaim.claimant?.studentId})</div>
              <div><span className="font-bold text-slate-500">Item:</span> {selectedClaim.itemName}</div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase text-slate-400">Private Verification Answers:</span>
              {selectedClaim.verificationAnswers?.map((ans, idx) => (
                <div key={idx} className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 space-y-1 text-xs">
                  <div className="font-bold text-blue-900">{ans.question}</div>
                  <div className="text-slate-800 font-medium bg-white p-2 rounded border border-blue-100">{ans.answer}</div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                onClick={() => handleVerifyClaimAction(selectedClaim._id, 'Rejected')}
                className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs"
              >
                Reject Claim
              </button>
              <button
                onClick={() => handleVerifyClaimAction(selectedClaim._id, 'Claim Approved')}
                className="px-6 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs shadow-md"
              >
                Approve Claim &amp; Schedule Handover
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
