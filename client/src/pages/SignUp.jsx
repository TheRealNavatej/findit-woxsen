import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, User, Mail, Lock, CheckCircle2, Sparkles, Eye, EyeOff } from 'lucide-react';

const MALE_AVATARS = [
  { id: 'm1', label: 'Style 1', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250' },
  { id: 'm2', label: 'Style 2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250' },
  { id: 'm3', label: 'Style 3', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250' }
];

const FEMALE_AVATARS = [
  { id: 'f1', label: 'Style 1', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250' },
  { id: 'f2', label: 'Style 2', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250' },
  { id: 'f3', label: 'Style 3', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250' }
];

export const SignUp = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState('male');
  const [avatar, setAvatar] = useState(MALE_AVATARS[0].url);
  const [studentId, setStudentId] = useState('');
  const [course, setCourse] = useState('B.Tech Computer Science');
  const [year, setYear] = useState('1st Year');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle gender selection and automatically switch avatar to matching gender picture
  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
    if (selectedGender === 'female') {
      setAvatar(FEMALE_AVATARS[0].url);
    } else {
      setAvatar(MALE_AVATARS[0].url);
    }
  };

  const currentAvatarList = gender === 'female' ? FEMALE_AVATARS : MALE_AVATARS;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register({
        name,
        email,
        password,
        studentId,
        course,
        year,
        gender,
        avatar
      });
      navigate('/browse');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12 space-y-6">
      
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center text-white mx-auto shadow-lg">
          <Search className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create Woxsen Account</h1>
        <p className="text-xs text-slate-500">Register to report and track lost &amp; found belongings</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        {error && (
          <div className="mb-4 p-3 bg-rose-50 text-rose-600 text-xs font-semibold rounded-xl border border-rose-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Aarav Sharma / Priya Reddy"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* University Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">University Email *</label>
            <input
              type="email"
              required
              placeholder="your.name@woxsen.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-3 pr-10 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* GENDER SELECTION & DYNAMIC AVATAR */}
          <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 space-y-3">
            <label className="block text-xs font-bold text-slate-800">
              Gender &amp; Profile Picture *
            </label>
            
            {/* Male / Female Options */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleGenderChange('male')}
                className={`py-2.5 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  gender === 'male'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-base">👨</span>
                <span>Male</span>
                {gender === 'male' && <CheckCircle2 className="w-4 h-4 text-white ml-auto" />}
              </button>

              <button
                type="button"
                onClick={() => handleGenderChange('female')}
                className={`py-2.5 px-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  gender === 'female'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-500/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-base">👩</span>
                <span>Female</span>
                {gender === 'female' && <CheckCircle2 className="w-4 h-4 text-white ml-auto" />}
              </button>
            </div>

            {/* Dynamic Assigned Picture Preview */}
            <div className="pt-2 flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200/80">
              <div className="relative">
                <img
                  src={avatar}
                  alt={`${gender} profile preview`}
                  className={`w-14 h-14 rounded-full object-cover ring-3 shadow-sm ${
                    gender === 'female' ? 'ring-rose-400' : 'ring-blue-400'
                  }`}
                />
                <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center shadow ${
                  gender === 'female' ? 'bg-rose-500' : 'bg-blue-500'
                }`}>
                  {gender === 'female' ? '♀' : '♂'}
                </span>
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Assigned {gender === 'female' ? 'Female' : 'Male'} Picture</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  {gender === 'female' ? 'Female student profile photo' : 'Male student profile photo'}
                </div>
                
                {/* Thumbnails to choose specific variation */}
                <div className="flex items-center gap-2 pt-1">
                  {currentAvatarList.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setAvatar(item.url)}
                      className={`relative rounded-full transition-all ${
                        avatar === item.url
                          ? 'ring-2 ring-blue-600 scale-105'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.label}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Student ID */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Student ID / Employee Code</label>
            <input
              type="text"
              placeholder="e.g. WX2024ST091"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Course & Year */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Course</label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Year</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:opacity-95 transition-all disabled:opacity-50 mt-2"
          >
            {loading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/signin" className="font-bold text-blue-600 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
