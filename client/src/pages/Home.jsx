import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchApi } from '../services/api';
import { ItemCard } from '../components/ItemCard';
import { 
  Search, Plus, Shield, Sparkles, ArrowRight, CheckCircle2, 
  MapPin, Clock, Users, PackageCheck, FileText, ChevronRight,
  Lock, KeyRound, Building, HeartHandshake, EyeOff, Bot, Database
} from 'lucide-react';

export const Home = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    itemsReported: 486,
    itemsFound: 390,
    itemsCollected: 280,
    itemsReturned: 248,
    matchPercentage: 96,
    campusMembers: '1.8K',
    avgResponse: '12 min'
  });
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
  }, [user]);

  const loadHomeData = async () => {
    try {
      const statsRes = await fetchApi('/items/stats');
      if (statsRes.success) setStats(statsRes.stats);

      // Only fetch and load items list if user is authenticated
      if (user) {
        const itemsRes = await fetchApi('/items?limit=6');
        if (itemsRes.success) setRecentItems(itemsRes.items.slice(0, 4));
      }
    } catch (err) {
      console.warn('Backend loading fallback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-8 sm:pt-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide">
                <Shield className="w-4 h-4 text-blue-600" />
                Official Woxsen University Lost &amp; Found Coordination Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Lost it? Found it?<br />
                <span className="gradient-text">Find it.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                A verified, centralized coordination ecosystem connecting Woxsen University students, faculty, and Campus Security to recover misplaced belongings safely and swiftly.
              </p>

              {/* Action Buttons: Conditional based on Authentication */}
              {user ? (
                /* Authenticated User Quick Actions */
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700 flex items-center justify-center lg:justify-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Logged in as <span className="text-blue-600 font-extrabold">{user.name}</span> ({user.role})</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
                    <Link
                      to="/post?type=lost"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg shadow-rose-600/20 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Report Lost Item
                    </Link>

                    <Link
                      to="/post?type=found"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Report Found Item
                    </Link>

                    <Link
                      to="/browse"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      Browse Campus Items
                    </Link>
                  </div>
                </div>
              ) : (
                /* Guest Visitor Call-To-Actions */
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                    <Link
                      to="/signin"
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl gradient-brand text-white font-bold text-sm shadow-lg shadow-blue-600/20 hover:shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      Sign In to Access Directory
                    </Link>

                    <Link
                      to="/signup"
                      className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <KeyRound className="w-4 h-4 text-blue-600" />
                      Register Student Account
                    </Link>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    * Woxsen University login required to view and report lost items for campus safety &amp; student privacy.
                  </p>
                </div>
              )}

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Security Desk Handover
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-500" /> AI-Weighted Smart Matcher
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-blue-500" /> Private Proof-of-Ownership
                </span>
              </div>

            </div>

            {/* Right Column: Campus Hero Illustration */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/woxsen_campus_hero_1791180691115.jpg"
                  alt="Woxsen University Campus"
                  className="w-full h-[380px] sm:h-[450px] object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Security Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-slate-900">Security Office HQ</div>
                      <div className="text-[11px] text-slate-500">Main Entrance • Online Dispatch</div>
                    </div>
                  </div>
                  <Link to={user ? "/security-desk" : "/signin"} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors">
                    {user ? 'Check Desk' : 'Sign In'}
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DYNAMIC STATISTICS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center relative z-10">
            
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono">
                {stats.itemsReturned || 248}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-300">Items Returned</div>
              <div className="text-[11px] text-slate-400">Safely reunited with owners</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                {stats.matchPercentage || 96}%
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-300">Successful Matches</div>
              <div className="text-[11px] text-slate-400">AI-assisted smart correlation</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-mono">
                {stats.campusMembers || '1.8K'}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-300">Campus Members</div>
              <div className="text-[11px] text-slate-400">Students, faculty &amp; staff</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">
                {stats.avgResponse || '12 min'}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-300">Average Response</div>
              <div className="text-[11px] text-slate-400">Security desk verification</div>
            </div>

          </div>
        </div>
      </section>

      {/* AUTHENTICATED USERS: SHOW LIVE RECENT RECOVERY FEED */}
      {user ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Live Directory</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Recently Reported &amp; Found Items</h2>
              <p className="text-xs sm:text-sm text-slate-500">Live campus activity across Woxsen buildings</p>
            </div>
            <Link to="/browse" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Browse All Listings <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentItems.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        </section>
      ) : (
        /* GUEST USERS: SHOW ACCESS REQUIREMENT BANNER INSTEAD OF ITEMS LIST */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold">
                <Lock className="w-3.5 h-3.5" /> Privacy &amp; Anti-Theft Protection
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                Campus Items Directory is Protected
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                To prevent false ownership claims and safeguard student information, active lost and found items (such as keys, smartwatches, wallets, and ID cards) are visible only to verified Woxsen accounts.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <Link
                to="/signin"
                className="w-full sm:w-auto px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold text-xs shadow-md transition-all text-center"
              >
                Sign In to View Items
              </Link>
              <Link
                to="/signup"
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs shadow-md transition-all text-center"
              >
                Register Account
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: WHY WE BUILT FINDIT (PURPOSE & MOTIVATION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Background &amp; Campus Context
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Why We Built FindIt
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Woxsen University's expansive 200-acre residential campus is home to thousands of students, faculty, and international visitors. Here is why a dedicated digital platform was essential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center font-bold">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">The 200-Acre Campus Scale</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              With 25+ buildings, sprawling sports complexes (R.A.C.E, ICC Ground), the Vithal Gandhi Centre, and 6 hostel blocks, students frequently leave items behind across lecture halls, dining areas, and shuttle stops without knowing where they were taken.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center font-bold">
              <EyeOff className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">End Disorganized Group Chats</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Before FindIt, lost item notices were scattered across hundreds of informal WhatsApp and Telegram groups. Notices were drowned in spam, items remained unclaimed in desk drawers, and there was no systematic tracking or record keeping.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-bold">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Official Security Desk Integration</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              FindIt integrates directly with Officer Verma and the Main Gate Security Office. Physical items are locked in tagged security lockers, and digital handover codes ensure that property is returned strictly to the authentic student owner.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: PLATFORM PURPOSE & MISSION */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Our Mission
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              The Purpose of FindIt
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              FindIt transforms campus lost and found from an informal rumor mill into a transparent, secure, and respectful community utility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="text-sm font-bold text-slate-900">100% Item Lifecycle Audit</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every item follows an audited 10-stage progression: Reported → Matched → Security Custody → Verified → Handover → Returned.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="text-sm font-bold text-slate-900">Student Privacy Shield</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Contact information, serial numbers, and private identifiers are never displayed to unauthenticated visitors or rival claimants.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="text-sm font-bold text-slate-900">Anti-Theft Verification</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Finders specify secret security questions (lock screen image, scratches, serial code) that only the rightful owner can answer.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                4
              </div>
              <h4 className="text-sm font-bold text-slate-900">Campus Honesty Culture</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fosters civic integrity and community helpfulness across students, housekeeping staff, security guards, and faculty members.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: KEY USES & CAPABILITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Platform Capabilities
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Key Uses &amp; Core Features
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Built with modern technology tailored specifically to the daily campus life of Woxsen University.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">AI-Assisted Smart Matcher</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When a student reports a lost item, FindIt's 6-factor algorithm instantly compares Category (25%), Location (25%), Date proximity (20%), Keywords (10%), Color (10%), and Brand (10%) to highlight probable matches.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Security Desk Locker Vault</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Campus security maintains physical lockers (Locker A1 through D4). Finders hand items over to Officer Verma at the Main Entrance, where digital locker codes and handover logs ensure zero loss in transit.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Proof-of-Ownership Q&amp;A</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prevents unauthorized claims. Finders set private questions (e.g. "What sticker is on the laptop?" or "What color is the pouch inside?"). Only correct answers unlock the secure handover token.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Precise Woxsen Locations</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pre-configured with 20+ authentic Woxsen landmarks: Academic Blocks (Floors 1-4), Vithal Gandhi Centre, Oval Dining, Hostel A-F, Rise Cafe, Care &amp; Cure Clinic, and the ICC Sports Ground.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">FindIt AI Assistant &amp; Chat</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Built-in conversational AI assistant guides students through campus recovery procedures, security office timings, and answers questions 24/7 without exposing personal phone numbers.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">20 Categorized Item Types</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Structured filters for Electronics, Mobile Phones, Laptops, Earbuds, ID Cards, Keys, Books, Water Bottles, Smartwatches, and Umbrellas so students can pinpoint items in seconds.
            </p>
          </div>

        </div>

      </section>

      {/* SECTION: STEP-BY-STEP WORKFLOW */}
      <section className="bg-white border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Safe Protocol
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              How Campus Recovery Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Three clear stages designed for student convenience and institutional accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">Report &amp; Smart Match</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Log in and submit a lost or found report with building, date, photo, and details. The weighted matcher immediately surfaces matching items.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">Security Locker Storage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Found items are deposited at the Main Gate Security Office and safely logged into a designated physical security locker.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">Verification &amp; Handover</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The owner answers secret verification questions, receives a digital handover OTP, and claims the item with campus security.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      {!user && (
        <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl gradient-brand text-white flex items-center justify-center mx-auto shadow-lg">
            <Search className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Have You Lost or Found an Item on Campus?
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Join 1,800+ Woxsen University members. Sign in with your university credentials or register a student account to view listings, post items, and track claims.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/signin"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-lg hover:opacity-95 transition-all"
            >
              Sign In to FindIt
            </Link>
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold text-xs shadow-sm transition-all"
            >
              Register Account
            </Link>
          </div>
        </section>
      )}

    </div>
  );
};
