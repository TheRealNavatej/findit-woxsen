import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/StatusBadge';
import { Timeline } from '../components/Timeline';
import { Modal } from '../components/Modal';
import { 
  MapPin, Calendar, Clock, Tag, User, Shield, Sparkles, MessageSquare, 
  CheckCircle2, AlertTriangle, ArrowLeft, Lock, FileText, Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ItemDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [smartMatches, setSmartMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  // Claim modal state
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [claimAnswers, setClaimAnswers] = useState({
    answer1: '',
    answer2: '',
    answer3: ''
  });
  const [submittingClaim, setSubmittingClaim] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  useEffect(() => {
    loadItemDetails();
  }, [id]);

  const loadItemDetails = async () => {
    setLoading(true);
    try {
      const res = await fetchApi(`/items/${id}`);
      if (res.success) {
        setItem(res.item);
        setSmartMatches(res.smartMatches || []);
      }
    } catch (err) {
      console.error('Failed to load item details', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    setSubmittingClaim(true);
    try {
      const res = await fetchApi('/claims', {
        method: 'POST',
        body: JSON.stringify({
          itemId: item._id,
          verificationAnswers: [
            { question: 'What sticker or unique mark is on the item?', answer: claimAnswers.answer1 || 'N/A' },
            { question: 'What is inside or written on the item?', answer: claimAnswers.answer2 || 'N/A' },
            { question: 'What is your Student ID / proof detail?', answer: claimAnswers.answer3 || 'N/A' }
          ]
        })
      });

      if (res.success) {
        setClaimSuccess(true);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setTimeout(() => {
          setClaimModalOpen(false);
          loadItemDetails();
        }, 2000);
      }
    } catch (err) {
      alert(err.message || 'Failed to submit claim');
    } finally {
      setSubmittingClaim(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 font-medium">Loading item lifecycle details...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Item Not Found</h2>
        <Link to="/browse" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Sign In Required to View Item Details &amp; Claims
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Specific details, verification questions, and recovery handovers are protected. Please sign in with your Woxsen University account.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/signin"
            className="w-full sm:w-auto px-7 py-3 rounded-xl gradient-brand text-white font-bold text-xs shadow-md"
          >
            Sign In to Account
          </Link>
          <Link
            to="/signup"
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold text-xs"
          >
            Register Student Account
          </Link>
        </div>
      </div>
    );
  }

  const isLost = item.type === 'lost';
  const locationString = typeof item.location === 'object'
    ? `${item.location?.building} • ${item.location?.floor} ${item.location?.roomArea ? `(${item.location.roomArea})` : ''}`
    : item.location;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Back Button */}
      <Link to="/browse" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Lost &amp; Found Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: GALLERY & PRIMARY SPECS */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Photo Gallery */}
          <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
              <img
                src={item.images?.[selectedImage] || (isLost ? '/images/item_wallet_1791180978617.jpg' : '/images/item_smartphone_1791181014540.jpg')}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase shadow-md ${
                  isLost ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                }`}>
                  {isLost ? 'LOST' : 'FOUND'}
                </span>
                <span className="bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-xs font-mono">
                  {item.reportId}
                </span>
              </div>
            </div>

            {/* Thumbnail selector if multiple images */}
            {item.images && item.images.length > 1 && (
              <div className="flex gap-2">
                {item.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detailed Item Description & Specs */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900">Description &amp; Key Features</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium block">Color</span>
                <span className="font-bold text-slate-800">{item.color || 'N/A'}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-medium block">Brand / Make</span>
                <span className="font-bold text-slate-800">{item.brand || 'N/A'}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                <span className="text-slate-400 font-medium block">Distinctive Mark</span>
                <span className="font-bold text-slate-800 line-clamp-1">{item.distinctiveFeatures || 'None'}</span>
              </div>
            </div>

            {/* Security Collection Details Banner */}
            {item.collectionDetails?.isCollected && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                  <Shield className="w-5 h-5 text-indigo-600" />
                  Collected by Woxsen Security Desk
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-indigo-950 pt-2 border-t border-indigo-100">
                  <div><span className="font-semibold">Collector:</span> {item.collectionDetails.collectedBy}</div>
                  <div><span className="font-semibold">Storage Location:</span> {item.collectionDetails.lockerNumber}</div>
                  <div><span className="font-semibold">Office Desk:</span> Main Entrance Security Desk</div>
                  <div><span className="font-semibold">Collected On:</span> {new Date(item.collectionDetails.collectionDate).toLocaleDateString()}</div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: ACTION DASHBOARD & TIMELINE */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Action Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" /> {item.category}
                </span>
                <StatusBadge status={item.status} collectionDetails={item.collectionDetails} />
              </div>

              <h1 className="text-2xl font-extrabold text-slate-900">{item.name}</h1>
            </div>

            {/* Location & Time specs */}
            <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Campus Location</span>
                  <span>{locationString}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900">Date &amp; Time: </span>
                  <span>{item.date} {item.time && `at ${item.time}`}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900">Posted By: </span>
                  <span>{item.postedBy?.name} ({item.postedBy?.role})</span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              
              {/* Submit Claim Button */}
              {item.status !== 'Returned' && (
                <button
                  onClick={() => setClaimModalOpen(true)}
                  className="w-full py-3.5 px-4 rounded-xl gradient-brand text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Submit Ownership Claim
                </button>
              )}

              {/* Contact Finder or Security */}
              <Link
                to={`/messages?itemId=${item._id}&recipientId=${item.postedBy?._id}`}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                {item.collectionDetails?.isCollected ? 'Contact Security Desk' : 'Contact Finder'}
              </Link>

              <button
                onClick={() => alert('Reported incorrect information to Woxsen Moderation Team.')}
                className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-rose-600 transition-colors flex items-center justify-center gap-1"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Report Incorrect Information
              </button>

            </div>

          </div>

          {/* ITEM LIFECYCLE TIMELINE */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Item Lifecycle Activity Timeline
            </h3>
            <Timeline events={item.historyTimeline} />
          </div>

        </div>

      </div>

      {/* PRIVATE CLAIM VERIFICATION MODAL */}
      <Modal
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
        title={`Submit Ownership Claim for ${item.name}`}
      >
        {claimSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Claim Verification Submitted!</h4>
            <p className="text-xs text-slate-500">
              Your secret answers were securely routed to Officer Verma at the Woxsen Security Desk. You will be notified once approved.
            </p>
          </div>
        ) : (
          <form onSubmit={handleClaimSubmit} className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Strict Privacy:</strong> Your answers below will NOT be visible to the public. Only Woxsen Security Desk &amp; Administrators can review these details for verification.
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  1. What sticker, engraving, scratch or unique mark is on the item?
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Small scratch on bottom left, GitHub sticker"
                  value={claimAnswers.answer1}
                  onChange={(e) => setClaimAnswers({ ...claimAnswers, answer1: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  2. What was inside or what is the serial number/wallpaper?
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Last 4 digits of ID card inside, or wallpaper description"
                  value={claimAnswers.answer2}
                  onChange={(e) => setClaimAnswers({ ...claimAnswers, answer2: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  3. Your Woxsen Student ID / Identity Proof Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. WX2024ST091"
                  value={claimAnswers.answer3}
                  onChange={(e) => setClaimAnswers({ ...claimAnswers, answer3: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-blue-500"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setClaimModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingClaim}
                className="px-6 py-2.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:opacity-95 flex items-center gap-1.5"
              >
                {submittingClaim ? 'Submitting...' : 'Submit Claim to Security'}
              </button>
            </div>
          </form>
        )}
      </Modal>

    </div>
  );
};
