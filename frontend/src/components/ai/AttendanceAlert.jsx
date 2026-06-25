import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function AttendanceAlert({ alerts = [], overallTip }) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="space-y-6 transition-all duration-200">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Analysis Results</h3>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {alerts.map((alert, idx) => {
          const { subject, currentPercent, classesNeeded, isAtRisk } = alert;

          return isAtRisk ? (
            /* Red Card: Under 75% */
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/40 text-red-650 dark:text-red-400 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-red-900 dark:text-red-300 text-sm">{subject}</h4>
                <div className="text-2xl font-black text-red-950 dark:text-red-200">
                  {currentPercent.toFixed(1)}%
                </div>
                <p className="text-xs font-semibold text-red-700 dark:text-red-450 leading-relaxed">
                  ⚠️ At risk! You need to attend at least <span className="font-bold text-red-900 dark:text-red-300">{classesNeeded}</span> more classes (without missing any) to reach 75%.
                </p>
              </div>
            </div>
          ) : (
            /* Green Card: Safe Above 75% */
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/40 text-green-650 dark:text-green-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-green-900 dark:text-green-300 text-sm">{subject}</h4>
                <div className="text-2xl font-black text-green-950 dark:text-green-200">
                  {currentPercent.toFixed(1)}%
                </div>
                <p className="text-xs font-semibold text-green-700 dark:text-green-405">
                  ✅ Attendance is safe. Keep attending regularly!
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* overallTip AI Message Box */}
      {overallTip && (
        <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-650 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-blue-900 dark:text-blue-300 text-sm">Academic Advisor Advice</h4>
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 leading-relaxed">
              "{overallTip}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
