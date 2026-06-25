import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, Bell, CalendarCheck, Zap, MessageSquare, Calendar, FolderOpen, Rocket, Briefcase, Users } from 'lucide-react';

export default function Sidebar() {
  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, mobile: true },
    { to: '/tasks', label: 'Tasks', icon: ClipboardList, mobile: true },
    { to: '/chat', label: 'Chat Hub', icon: MessageSquare, mobile: true },
    { to: '/notice', label: 'AI Study Buddy', icon: Bell, mobile: true },
    { to: '/deadline-planner', label: 'Deadline Plan', icon: Calendar },
    { to: '/knowledge', label: 'RAG Library', icon: FolderOpen },
    { to: '/placement', label: 'Placement Prep', icon: Briefcase },
    { to: '/study-groups', label: 'Study Groups', icon: Users },
    { to: '/brainspace', label: 'BrainSpace', icon: Rocket },
    { to: '/attendance', label: 'Attendance', icon: CalendarCheck },
    { to: '/automations', label: 'Automations', icon: Zap, mobile: true },
  ];

  return (
    <>
      {/* Desktop Sidebar Layout */}
      <aside className="w-64 bg-white dark:bg-gray-850 border-r border-gray-200 dark:border-gray-855 hidden md:flex flex-col min-h-screen">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
          <span className="font-extrabold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            CampusFlow🎓
          </span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                    isActive
                      ? 'bg-blue-50/70 text-blue-600 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30'
                      : 'text-gray-500 dark:text-gray-400 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </NavLink>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-center">
          <div className="text-[9px] text-gray-400 dark:text-gray-500 font-extrabold tracking-wider uppercase">
            CampusAI Hackathon 2025
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Tab Bar (renders for screens under md breakpoint) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-t border-gray-250 dark:border-gray-800 flex justify-around items-center z-50 px-2 pb-safe shadow-lg">
        {links.filter(l => l.mobile).map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 py-1 rounded-xl text-[10px] font-bold transition-all ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
