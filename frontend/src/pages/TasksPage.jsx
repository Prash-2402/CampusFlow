import React, { useEffect, useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/tasks/TaskCard';
import AddTaskModal from '../components/tasks/AddTaskModal';
import Spinner from '../components/ui/Spinner';
import { Plus, ListFilter, ClipboardCheck, Sparkles } from 'lucide-react';

export default function TasksPage() {
  const { tasks, loading, fetchTasks, createTask, updateTaskStatus, deleteTask } = useTasks();
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'today' | 'week' | 'done'
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Date filter math utilities
  const isToday = (deadlineStr) => {
    const today = new Date();
    const date = new Date(deadlineStr);
    return (
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    );
  };

  const isThisWeek = (deadlineStr) => {
    const now = new Date();
    const date = new Date(deadlineStr);
    const timeDiff = date.getTime() - now.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDiff >= 0 && dayDiff <= 7;
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === 'done') return task.status === 'done';
    if (task.status === 'done') return false; // Hide completed items on other list tabs
    if (activeFilter === 'today') return isToday(task.deadline);
    if (activeFilter === 'week') return isThisWeek(task.deadline);
    return true; // 'all' showing all active tasks
  });

  const hasNoTasksInDB = tasks.length === 0;

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      
      {/* Header controls section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
            <ClipboardCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            Tasks & Deadlines
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track college assignments, lab submissions, and semester events.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-md shadow-indigo-100 dark:shadow-none hover:shadow-lg transition-all cursor-pointer text-sm"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      </div>

      {/* Filter Tabs */}
      {!hasNoTasksInDB && (
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
          <ListFilter className="w-4 h-4 text-gray-400 mr-2" />
          {[
            { id: 'all', label: 'All Active' },
            { id: 'today', label: 'Due Today' },
            { id: 'week', label: 'This Week' },
            { id: 'done', label: 'Completed' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                activeFilter === tab.id
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-100 dark:shadow-none'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Main content viewport */}
      {loading && tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Spinner size="lg" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 font-medium">Syncing with Supabase...</p>
        </div>
      ) : hasNoTasksInDB ? (
        /* Ground truth requested empty state for 0 tasks */
        <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-gray-200 dark:border-gray-700 rounded-3xl bg-white/50 dark:bg-gray-800/30 text-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/20 text-blue-500 flex items-center justify-center border border-blue-200 dark:border-blue-900/30 mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-150">No tasks found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-sm">
            You haven't added any tasks yet. Hit '+ Add Task' to get started.
          </p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-6 px-5 py-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/60 rounded-xl font-bold text-xs transition"
          >
            Add your first task
          </button>
        </div>
      ) : filteredTasks.length === 0 ? (
        /* Ground truth requested empty state for 0 filter matches */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-500 dark:text-gray-400 font-bold text-base">
            No tasks match this filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusToggle={updateTaskStatus}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}

      {/* Add Task Modal overlay mount */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={createTask}
      />
    </div>
  );
}
