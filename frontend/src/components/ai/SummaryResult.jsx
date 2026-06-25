import React from 'react';
import { Calendar, FileText, Sparkles } from 'lucide-react';

export default function SummaryResult({ summary = [], eventTitle, eventDate }) {
  if (!summary || summary.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 shadow-sm space-y-4 transition-all duration-200">
      
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-750 pb-3">
        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
          Notice Summary
          <Sparkles className="w-4 h-4 text-amber-500" />
        </h3>
      </div>

      {/* 3 Animated Bullet Points */}
      <ul className="space-y-3">
        {summary.map((point, index) => (
          <li 
            key={index} 
            className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300 font-semibold"
          >
            <span className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 text-xs font-bold border border-blue-100 dark:border-blue-900/30">
              {index + 1}
            </span>
            <span className="pt-0.5 leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>

      {/* Extracted Calendar Details Box */}
      {(eventTitle || eventDate) && (
        <div className="mt-4 p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30 rounded-xl space-y-2">
          <div className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            Detected Calendar Event
          </div>
          
          <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
            {eventTitle || 'College Event'}
          </div>
          
          {eventDate && (
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Date: {new Date(eventDate).toLocaleString(undefined, {
                dateStyle: 'medium',
                timeStyle: 'short'
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
