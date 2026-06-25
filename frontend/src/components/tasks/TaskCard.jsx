import React from 'react';
import { Badge } from '../ui/Badge';
import { Trash2, Calendar, CheckSquare, Square, MessageCircle, AlertCircle } from 'lucide-react';
import { getDeadlineLabel } from '../../utils/deadline';

export default function TaskCard({ task, onStatusToggle, onDelete }) {
  const isDone = task.status === 'done';
  const deadlineInfo = getDeadlineLabel(task.deadline);
  const isOverdue = deadlineInfo.label === 'OVERDUE';

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      onDelete(task.id);
    }
  };

  return (
    <div className={`p-5 rounded-2xl border bg-white dark:bg-gray-800 transition-all flex flex-col justify-between h-full gap-4 ${
      isDone 
        ? 'border-gray-200 dark:border-gray-700/50 opacity-70' 
        : isOverdue 
          ? 'border-red-250 dark:border-red-900/50 shadow-sm shadow-red-50/50 dark:shadow-none' 
          : 'border-gray-200 dark:border-gray-700/70 hover:shadow-md'
    }`}>
      <div className="space-y-3">
        {/* Header row: Subject badge + Icons */}
        <div className="flex items-center justify-between">
          <Badge subject={task.subject} />
          
          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
            {/* Google Calendar status indicator */}
            {task.add_to_calendar && (
              <Calendar 
                className="w-4 h-4 text-blue-500 dark:text-blue-400" 
                title="Google Calendar Integration Active" 
              />
            )}
            
            {/* Twilio WhatsApp delivery status indicator */}
            {task.n8n_triggered ? (
              <MessageCircle 
                className="w-4 h-4 text-emerald-500 dark:text-emerald-400" 
                title="WhatsApp Reminder Set in n8n ✅" 
              />
            ) : (
              <MessageCircle 
                className="w-4 h-4 text-gray-300 dark:text-gray-600" 
                title="WhatsApp Reminder Pending n8n trigger" 
              />
            )}
          </div>
        </div>

        {/* Task Title */}
        <h3 className={`text-base font-bold text-gray-900 dark:text-gray-100 ${
          isDone ? 'line-through text-gray-400 dark:text-gray-500' : ''
        }`}>
          {task.title}
        </h3>
      </div>

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-750">
        {/* Status Toggle & Deadline Countdown */}
        <div className="flex flex-col gap-1">
          <span className={`text-[11px] font-bold uppercase tracking-wider ${
            isDone ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'
          }`}>
            {isDone ? 'Completed' : 'Pending'}
          </span>
          <div className={`text-xs ${deadlineInfo.cls}`}>
            {isOverdue && <AlertCircle className="w-3 h-3 inline mr-1" />}
            {deadlineInfo.label}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Status Checkbox toggle button */}
          <button
            type="button"
            onClick={() => onStatusToggle(task.id, isDone ? 'pending' : 'done')}
            className={`p-2 rounded-xl border transition-all ${
              isDone
                ? 'bg-green-50 border-green-200 text-green-600 dark:bg-green-950/20 dark:border-green-900/30 dark:text-green-400'
                : 'bg-white border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-200 dark:bg-gray-750 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-400'
            }`}
            title={isDone ? 'Mark as Pending' : 'Mark as Done'}
          >
            {isDone ? <CheckSquare className="w-4.5 h-4.5" /> : <Square className="w-4.5 h-4.5" />}
          </button>

          {/* Delete Action button */}
          <button
            type="button"
            onClick={handleDeleteClick}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-red-650 hover:border-red-200 dark:hover:text-red-400 dark:hover:border-red-900/30 dark:bg-gray-750 transition-all"
            title="Delete Task"
          >
            <Trash2 className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
