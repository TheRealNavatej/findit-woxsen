import React from 'react';
import { CheckCircle2, Clock, ShieldCheck, UserCheck, PackageCheck } from 'lucide-react';

export const Timeline = ({ events = [] }) => {
  if (!events || events.length === 0) return null;

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={eventIdx}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3 items-start">
                <div>
                  <span className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center ring-8 ring-white shadow-sm font-bold text-xs">
                    {eventIdx + 1}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {event.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {event.description}
                    </p>
                    {event.actor && (
                      <span className="inline-block mt-1 text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        By {event.actor}
                      </span>
                    )}
                  </div>
                  <div className="whitespace-nowrap text-right text-xs text-slate-400 font-mono">
                    {event.date}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
