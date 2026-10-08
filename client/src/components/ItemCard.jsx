import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Sparkles, Tag, Shield, User } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export const ItemCard = ({ item }) => {
  const isLost = item.type === 'lost';
  const locationString = typeof item.location === 'object'
    ? `${item.location?.building || 'Main Campus'} ${item.location?.floor ? `(${item.location.floor})` : ''}`
    : item.location;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      
      {/* Image & Header Badges */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={item.images?.[0] || (isLost ? '/images/item_wallet_1791180978617.jpg' : '/images/item_smartphone_1791181014540.jpg')}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Type Badge: LOST or FOUND */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className={`px-2.5 py-1 rounded-full text-xs font-black tracking-wider uppercase shadow-md ${
            isLost 
              ? 'bg-rose-600 text-white' 
              : 'bg-emerald-600 text-white'
          }`}>
            {isLost ? 'LOST' : 'FOUND'}
          </span>
          <span className="bg-slate-900/80 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[10px] font-mono">
            {item.reportId}
          </span>
        </div>

        {/* Smart Match % Badge */}
        {item.matchPercentage > 60 && (
          <div className="absolute top-3 right-3 bg-purple-900/90 backdrop-blur-md text-purple-200 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-purple-500/30 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            {item.matchPercentage}% Match
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          
          {/* Category & Status */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md inline-flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {item.category}
            </span>
            <StatusBadge status={item.status} collectionDetails={item.collectionDetails} size="small" />
          </div>

          {/* Item Name */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {item.name}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Location & Date details */}
          <div className="space-y-1.5 pt-1 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 text-slate-700 font-medium">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="line-clamp-1">{locationString}</span>
            </div>
            <div className="flex items-center justify-between text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                {item.date} {item.time && `• ${item.time}`}
              </span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <User className="w-3 h-3" />
                {item.postedBy?.name?.split(' ')[0] || 'User'}
              </span>
            </div>
          </div>
        </div>

        {/* Security Collection Highlight */}
        {item.collectionDetails?.isCollected && (
          <div className="bg-indigo-50/80 border border-indigo-100 rounded-xl p-2.5 text-[11px] text-indigo-950 flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-600 shrink-0" />
            <div className="leading-tight">
              <span className="font-bold">Secured at Desk: </span>
              <span className="text-indigo-800">{item.collectionDetails.lockerNumber || 'Security Office'}</span>
            </div>
          </div>
        )}

        {/* Details Link CTA */}
        <Link
          to={`/item/${item._id}`}
          className="w-full py-2.5 px-4 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-bold text-xs rounded-xl transition-all text-center flex items-center justify-center gap-1.5 group-hover:bg-blue-600 group-hover:text-white"
        >
          View Full Lifecycle & Claim
        </Link>

      </div>
    </div>
  );
};
