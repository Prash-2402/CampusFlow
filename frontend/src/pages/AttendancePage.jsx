import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useAI } from '../hooks/useAI';
import AttendanceAlert from '../components/ai/AttendanceAlert';
import Spinner from '../components/ui/Spinner';
import toast from 'react-hot-toast';
import { CalendarCheck, ShieldAlert, Award, AlertCircle } from 'lucide-react';

export default function AttendancePage() {
  const { user } = useAuth();
  const { loading, checkAttendanceRisk } = useAI();
  const [analysisResult, setAnalysisResult] = useState(null);

  const subjects = user?.subjects || [];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    // Compile attendance inputs into structured objects
    const attendanceData = subjects.map((subject, idx) => {
      const attended = parseInt(data[`attended_${idx}`], 10);
      const total = parseInt(data[`total_${idx}`], 10);
      return { subject, attended, total };
    });

    // Client-side cross field validation check
    const invalidSubject = attendanceData.find(item => item.attended > item.total);
    if (invalidSubject) {
      toast.error(`Classes attended cannot exceed total classes for ${invalidSubject.subject}.`);
      return;
    }

    try {
      const result = await checkAttendanceRisk(attendanceData);
      setAnalysisResult(result);
      toast.success('Attendance risk analysis complete! 📊');
    } catch (err) {
      // Errors handled in hooks
    }
  };

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
          <CalendarCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          Attendance Risk Alerter
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Input your attendance numbers to calculate risk parameters and AI actions for B.Tech rules (75% threshold).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Dynamic Form Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700/60 p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
            Enter Attendance Records
          </h2>

          {subjects.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Please configure tracked subjects by logging out and registering with active subjects.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                {subjects.map((subject, idx) => {
                  // Setup field validations
                  const attendedName = `attended_${idx}`;
                  const totalName = `total_${idx}`;
                  
                  return (
                    <div 
                      key={subject} 
                      className="p-4 bg-gray-50/50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-750 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-150 md:max-w-[150px] truncate">
                        {subject}
                      </span>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-24">
                          <input
                            type="number"
                            placeholder="Attended"
                            min="0"
                            className="w-full px-3 py-1.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-bold text-center"
                            {...register(attendedName, {
                              required: 'Required',
                              min: { value: 0, message: 'Must be >= 0' }
                            })}
                          />
                          {errors[attendedName] && (
                            <p className="text-[10px] font-bold text-red-500 text-center mt-1">
                              {errors[attendedName].message}
                            </p>
                          )}
                        </div>

                        <span className="text-xs text-gray-400 font-extrabold">/</span>

                        <div className="w-24">
                          <input
                            type="number"
                            placeholder="Total"
                            min="1"
                            className="w-full px-3 py-1.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-bold text-center"
                            {...register(totalName, {
                              required: 'Required',
                              min: { value: 1, message: 'Must be >= 1' }
                            })}
                          />
                          {errors[totalName] && (
                            <p className="text-[10px] font-bold text-red-500 text-center mt-1">
                              {errors[totalName].message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-650 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? <Spinner size="sm" /> : 'Analyze Risk'}
              </button>
            </form>
          )}
        </div>

        {/* Results Panel */}
        <div>
          {analysisResult ? (
            <AttendanceAlert 
              alerts={analysisResult.alerts}
              overallTip={analysisResult.overallTip}
            />
          ) : (
            /* Ground truth requested empty state for attendance page before analyze */
            <div className="p-8 text-center border border-dashed border-gray-250 dark:border-gray-750 bg-white/50 dark:bg-gray-800/30 rounded-3xl min-h-[300px] flex flex-col justify-center items-center">
              <Award className="w-12 h-12 text-gray-300 dark:text-gray-655 mb-3" />
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                Enter your attendance numbers above and click Analyze Risk.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
