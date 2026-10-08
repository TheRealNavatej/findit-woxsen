import React from 'react';
import { CheckCircle2, ShieldCheck, Clock, Search, AlertCircle, PackageCheck, Calendar, ArrowRightLeft } from 'lucide-react';

export const StatusBadge = ({ status, collectionDetails, size = 'normal' }) => {
  const isSmall = size === 'small';

  const badgeConfigs = {
    'Reported': {
      bg: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Search,
      label: 'Reported'
    },
    'Looking for Owner': {
      bg: 'bg-sky-50 text-sky-700 border-sky-200',
      icon: Search,
      label: '● Still Looking'
    },
    'Possible Match': {
      bg: 'bg-purple-50 text-purple-700 border-purple-200 animate-pulse',
      icon: SparklesIcon,
      label: '✨ Possible Match'
    },
    'Found': {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: CheckCircle2,
      label: 'FOUND'
    },
    'Collected': {
      bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: ShieldCheck,
      label: '✓ Collected by Security'
    },
    'Claim Under Review': {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: Clock,
      label: '◉ Verification Pending'
    },
    'Claim Approved': {
      bg: 'bg-teal-50 text-teal-700 border-teal-200',
      icon: ShieldCheck,
      label: '✓ Claim Approved'
    },
    'Handover Scheduled': {
      bg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      icon: Calendar,
      label: '📅 Handover Scheduled'
    },
    'Returned': {
      bg: 'bg-green-50 text-green-700 border-green-200',
      icon: PackageCheck,
      label: '✓ Successfully Returned'
    },
    'Closed': {
      bg: 'bg-slate-100 text-slate-600 border-slate-200',
      icon: AlertCircle,
      label: 'Closed'
    }
  };

  const config = badgeConfigs[status] || badgeConfigs['Reported'];
  const IconComponent = config.icon;

  return (
    <div className="inline-flex flex-col gap-1">
      <span className={`inline-flex items-center gap-1.5 font-semibold border rounded-full ${
        isSmall ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      } ${config.bg}`}>
        <IconComponent className={isSmall ? 'w-3 h-3' : 'w-4 h-4'} />
        {config.label}
      </span>

      {collectionDetails?.isCollected && status === 'Collected' && (
        <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1 pl-1">
          <ShieldCheck className="w-3 h-3 text-indigo-600" />
          Location: {collectionDetails.lockerNumber || 'Security Office Desk'}
        </span>
      )}
    </div>
  );
};

const SparklesIcon = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);
