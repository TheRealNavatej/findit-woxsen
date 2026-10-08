import React from 'react';
import { Search, Sparkles, Inbox, ShieldCheck, Bell, MessageSquare } from 'lucide-react';

export const EmptyState = ({
  title = "No items found",
  description = "Try adjusting your search keywords or filters to locate items.",
  iconType = "search",
  actionButton
}) => {
  const getIcon = () => {
    switch (iconType) {
      case 'matches':
        return <Sparkles className="w-10 h-10 text-purple-600" />;
      case 'claims':
        return <ShieldCheck className="w-10 h-10 text-emerald-600" />;
      case 'notifications':
        return <Bell className="w-10 h-10 text-blue-600" />;
      case 'messages':
        return <MessageSquare className="w-10 h-10 text-indigo-600" />;
      default:
        return <Search className="w-10 h-10 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm my-6">
      <div className="w-20 h-20 mx-auto rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 shadow-inner">
        {getIcon()}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
        {description}
      </p>
      {actionButton && (
        <div className="flex justify-center">
          {actionButton}
        </div>
      )}
    </div>
  );
};
