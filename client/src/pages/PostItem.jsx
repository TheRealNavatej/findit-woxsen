import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchApi } from '../services/api';
import { 
  Plus, Upload, MapPin, Calendar, Clock, Tag, Shield, 
  CheckCircle2, ArrowRight, ArrowLeft, Image as ImageIcon, Sparkles, Lock 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PostItem = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [itemType, setItemType] = useState(searchParams.get('type') || 'lost');
  
  // Locations and categories metadata
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    description: '',
    color: 'Black',
    brand: '',
    distinctiveFeatures: '',
    building: 'Vithal Gandhi Centre / Central Library',
    floor: 'Floor 1',
    roomArea: 'Quiet Study Zone',
    specificLocation: '',
    date: new Date().toISOString().split('T')[0],
    time: '14:30',
    isWithFinder: true,
    handedToSecurity: false,
    images: []
  });

  const [submitting, setSubmitting] = useState(false);
  const [resultId, setResultId] = useState(null);

  useEffect(() => {
    fetchMeta();
  }, []);

  const fetchMeta = async () => {
    try {
      const [locRes, catRes] = await Promise.all([
        fetchApi('/meta/locations'),
        fetchApi('/meta/categories')
      ]);
      if (locRes.success) setLocations(locRes.locations);
      if (catRes.success) setCategories(catRes.categories);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const defaultImage = itemType === 'lost' 
        ? '/images/item_wallet_1791180978617.jpg' 
        : '/images/item_smartphone_1791181014540.jpg';

      const payload = {
        type: itemType,
        name: formData.name,
        category: formData.category,
        description: formData.description,
        color: formData.color,
        brand: formData.brand,
        distinctiveFeatures: formData.distinctiveFeatures,
        location: {
          building: formData.building,
          floor: formData.floor,
          roomArea: formData.roomArea,
          specificLocation: formData.specificLocation
        },
        date: formData.date,
        time: formData.time,
        images: formData.images.length > 0 ? formData.images : [defaultImage],
        isWithFinder: formData.isWithFinder,
        handedToSecurity: formData.handedToSecurity
      };

      const res = await fetchApi('/items', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (res.success) {
        setResultId(res.reportId);
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      }
    } catch (err) {
      alert(err.message || 'Error submitting report');
    } finally {
      setSubmitting(false);
    }
  };

  // LOGIN REQUIREMENT GATE
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Sign In Required to Report Items
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
            To maintain university verification, secure physical security custody, and notify rightful owners, reporting lost or found items requires an authenticated Woxsen University account.
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

  // SUCCESS SCREEN AFTER SUBMISSION
  if (resultId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900">Report Successfully Filed!</h1>
          <p className="text-sm text-slate-500">
            Your {itemType} item report has been logged into the Woxsen University FindIt system.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm max-w-md mx-auto space-y-3">
          <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Generated Report Reference</div>
          <div className="text-3xl font-black gradient-text font-mono tracking-wider">{resultId}</div>
          <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">
            Smart Matching algorithm is scanning opposite listings for candidate matches.
          </p>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/browse')}
            className="px-6 py-3 rounded-xl gradient-brand text-white font-bold text-sm shadow-md"
          >
            Browse Marketplace
          </button>
          <button
            onClick={() => navigate('/smart-matches')}
            className="px-6 py-3 rounded-xl bg-purple-50 text-purple-700 font-bold text-sm border border-purple-200 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" /> Check Smart Matches
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Report a Belonging at Woxsen
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Complete the multi-step form to file a verified lost or found report across campus.
        </p>
      </div>

      {/* Step Progress Bar */}
      <div className="flex items-center justify-between max-w-xl mx-auto px-4">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
              currentStep === step 
                ? 'bg-blue-600 text-white shadow-md ring-4 ring-blue-100' 
                : currentStep > step 
                ? 'bg-emerald-600 text-white' 
                : 'bg-slate-200 text-slate-600'
            }`}>
              {currentStep > step ? '✓' : step}
            </div>
            {step < 6 && (
              <div className={`w-8 sm:w-12 h-1 mx-1 ${currentStep > step ? 'bg-emerald-600' : 'bg-slate-200'}`}></div>
            )}
          </div>
        ))}
      </div>

      {/* MULTI-STEP FORM CONTAINER */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
        
        {/* STEP 1: CHOOSE LOST VS FOUND */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 text-center">
              Step 1: What would you like to report?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              
              <div
                onClick={() => setItemType('lost')}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all space-y-3 ${
                  itemType === 'lost'
                    ? 'border-rose-600 bg-rose-50/50 shadow-md ring-2 ring-rose-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                  🔍
                </div>
                <h3 className="text-lg font-bold text-slate-900">I Lost Something</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  I misplaced my item at a Woxsen building, classroom, hostel, cafe or arena.
                </p>
              </div>

              <div
                onClick={() => setItemType('found')}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all space-y-3 ${
                  itemType === 'found'
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  📦
                </div>
                <h3 className="text-lg font-bold text-slate-900">I Found Something</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  I found an item on campus and want to help return it to its rightful owner.
                </p>
              </div>

            </div>

            <div className="flex justify-end pt-6">
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl gradient-brand text-white font-bold text-sm shadow-md flex items-center gap-2"
              >
                Continue to Photo Upload <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PHOTO SELECTION */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">
              Step 2: Upload Item Photo
            </h2>
            <p className="text-xs text-slate-500">
              Select or upload clear photos of the item for visual verification.
            </p>

            {/* Photo Selection Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { name: 'Black Wallet', url: '/images/item_wallet_1791180978617.jpg' },
                { name: 'Blue Phone', url: '/images/item_smartphone_1791181014540.jpg' },
                { name: 'Woxsen Campus', url: '/images/woxsen_campus_hero_1791180691115.jpg' },
                { name: 'Security HQ', url: '/images/security_desk_hq_1791180718778.jpg' },
                { name: 'Smart Matching', url: '/images/smart_matching_nodes_1791180753977.jpg' }
              ].map((imgObj, idx) => (
                <div
                  key={idx}
                  onClick={() => setFormData({ ...formData, images: [imgObj.url] })}
                  className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 cursor-pointer ${
                    formData.images.includes(imgObj.url) ? 'border-blue-600 ring-4 ring-blue-500/20' : 'border-slate-200'
                  }`}
                >
                  <img src={imgObj.url} alt={imgObj.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 bg-slate-900/80 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                    {imgObj.name}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <button onClick={handlePrev} className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">
                Back
              </button>
              <button onClick={handleNext} className="px-6 py-3 rounded-xl gradient-brand text-white font-bold text-sm shadow-md flex items-center gap-2">
                Continue to Details <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ITEM INFORMATION */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">
              Step 3: Item Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Item Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Black Leather Wallet, iPhone 15, AirPods Pro"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-white focus:border-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide details such as color, contents, condition, brand, and stickers..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Color</label>
                <input
                  type="text"
                  placeholder="e.g. Black, Blue, Silver"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Brand / Make</label>
                <input
                  type="text"
                  placeholder="e.g. Apple, Nike, WildHorn"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <button onClick={handlePrev} className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">
                Back
              </button>
              <button onClick={handleNext} className="px-6 py-3 rounded-xl gradient-brand text-white font-bold text-sm shadow-md flex items-center gap-2">
                Continue to Location <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: WOXSEN UNIVERSITY LOCATION SELECTOR */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">
              Step 4: Woxsen Campus Location
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Campus Building / Zone *</label>
                <select
                  value={formData.building}
                  onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-white"
                >
                  {locations.map(loc => (
                    <option key={loc.id} value={loc.name}>{loc.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Floor Level</label>
                <input
                  type="text"
                  placeholder="e.g. Ground Floor, Floor 1, Floor 2"
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Room or Specific Area</label>
                <input
                  type="text"
                  placeholder="e.g. Room 204, Reading Zone 3"
                  value={formData.roomArea}
                  onChange={(e) => setFormData({ ...formData, roomArea: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Exact Spot Note</label>
                <input
                  type="text"
                  placeholder="e.g. Left near charging dock station"
                  value={formData.specificLocation}
                  onChange={(e) => setFormData({ ...formData, specificLocation: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <button onClick={handlePrev} className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">
                Back
              </button>
              <button onClick={handleNext} className="px-6 py-3 rounded-xl gradient-brand text-white font-bold text-sm shadow-md flex items-center gap-2">
                Continue to Date/Time <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: DATE, TIME & HANDOVER STATUS */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">
              Step 5: Date, Time &amp; Security Status
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Date Lost / Found *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Approximate Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            {itemType === 'found' && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-800">Is the item currently handed to Security Desk?</span>
                  <input
                    type="checkbox"
                    checked={formData.handedToSecurity}
                    onChange={(e) => setFormData({ ...formData, handedToSecurity: e.target.checked })}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <button onClick={handlePrev} className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">
                Back
              </button>
              <button onClick={handleNext} className="px-6 py-3 rounded-xl gradient-brand text-white font-bold text-sm shadow-md flex items-center gap-2">
                Review &amp; Submit <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: REVIEW & SUBMIT */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">
              Step 6: Review Summary
            </h2>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3 text-xs">
              <div><span className="font-bold text-slate-500">Type:</span> <span className="uppercase font-extrabold text-blue-600">{itemType}</span></div>
              <div><span className="font-bold text-slate-500">Item Name:</span> <span className="font-bold text-slate-900">{formData.name || 'Untitled'}</span></div>
              <div><span className="font-bold text-slate-500">Category:</span> {formData.category}</div>
              <div><span className="font-bold text-slate-500">Location:</span> {formData.building}, {formData.floor}</div>
              <div><span className="font-bold text-slate-500">Date/Time:</span> {formData.date} at {formData.time}</div>
              <div><span className="font-bold text-slate-500">Description:</span> {formData.description}</div>
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <button onClick={handlePrev} className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-8 py-3 rounded-xl gradient-brand text-white font-bold text-sm shadow-lg hover:opacity-95 flex items-center gap-2"
              >
                {submitting ? 'Filing Report...' : 'Submit Report Now'}
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
