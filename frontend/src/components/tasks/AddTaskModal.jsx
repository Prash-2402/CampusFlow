import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { X, Calendar, MessageSquare, AlertTriangle } from 'lucide-react';

export default function AddTaskModal({ isOpen, onClose, onAdd }) {
  const { user } = useAuth();
  const subjects = user?.subjects || [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      subject: '',
      deadline: '',
      add_to_calendar: true,
      whatsapp_reminder: true // UI only, backend automates this by design
    }
  });

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      const payload = {
        title: data.title,
        subject: data.subject,
        deadline: new Date(data.deadline).toISOString(),
        add_to_calendar: data.add_to_calendar
      };
      
      await onAdd(payload);
      reset();
      onClose();
    } catch (err) {
      // Errors handled by parent hook toast
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-850 rounded-3xl border border-gray-150 dark:border-gray-800 shadow-2xl max-w-md w-full overflow-hidden transition-all transform animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-150 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <span>🎓</span> Add Task or Deadline
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-150 dark:hover:bg-gray-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {subjects.length === 0 ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/20 text-amber-500 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-900/30">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">No Subjects Linked</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Your profile has no subjects listed. Please register an account with active B.Tech subjects.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-105 hover:bg-gray-150 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl text-xs transition"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                Task Title
              </label>
              <input
                type="text"
                placeholder="DBMS Lab Assignment 2"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:border-blue-500 text-sm"
                {...register('title', { required: 'Task title is required' })}
              />
              {errors.title && (
                <p className="mt-1 text-xs font-bold text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Subject Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                Subject
              </label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 text-sm"
                {...register('subject', { required: 'Please choose a subject' })}
              >
                <option value="">Choose subject</option>
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <p className="mt-1 text-xs font-bold text-red-500">{errors.subject.message}</p>
              )}
            </div>

            {/* Deadline Date Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                Deadline Date & Time
              </label>
              <input
                type="datetime-local"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 text-sm"
                {...register('deadline', { required: 'Deadline date is required' })}
              />
              {errors.deadline && (
                <p className="mt-1 text-xs font-bold text-red-500">{errors.deadline.message}</p>
              )}
            </div>

            {/* Toggles */}
            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4.5 h-4.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                  {...register('add_to_calendar')}
                />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  Add to Google Calendar
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4.5 h-4.5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 dark:bg-gray-800 dark:border-gray-700"
                  {...register('whatsapp_reminder')}
                />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  Send WhatsApp reminder (24h before)
                </span>
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-750 font-bold rounded-xl text-sm transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-indigo-100 dark:shadow-none cursor-pointer"
              >
                Create Task
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
