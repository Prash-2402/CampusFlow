import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, GraduationCap, Briefcase, Sparkles, Workflow, User, LogOut, Bell, X, FileText, Calendar } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ThemeSelector from '../theme/ThemeSelector';

const navItems = [
  { icon: LayoutGrid, label: 'Home', path: '/dashboard' },
  { icon: GraduationCap, label: 'Academics', path: '/academics' },
  { icon: Briefcase, label: 'Career', path: '/career' },
  { icon: Sparkles, label: 'Copilot', path: '/copilot' },
  { icon: Workflow, label: 'Automations', path: '/automations' },
];

export default function AppLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isNoticesOpen, setIsNoticesOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-primary text-primary flex overflow-hidden relative">
      {/* Noise Texture Overlay for Premium Matte Feel */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Floating Glass Sidebar */}
      <aside className="w-20 lg:w-64 fixed left-4 top-4 bottom-4 z-50 rounded-[2rem] border border-white/5 bg-surface/40 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] flex flex-col items-center lg:items-start py-6 transition-all duration-300">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accentPrimary to-accentSecondary text-textOnAccent flex items-center justify-center mb-8 lg:mx-6 flex-shrink-0 shadow-lg shadow-accentPrimary/20">
          <span className="font-bold text-xl">C</span>
        </div>
        
        <nav className="flex-1 w-full px-3 lg:px-4 space-y-2 flex flex-col items-center lg:items-stretch">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.label} 
                to={item.path}
                className={`relative flex items-center gap-3 p-3 lg:px-4 rounded-2xl transition-all duration-300 group ${isActive ? 'text-accentPrimary' : 'text-textSecondary hover:text-primary'}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute inset-0 bg-accentPrimary/10 border border-accentPrimary/20 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {/* Active Indicator Pill */}
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute left-0 w-1 h-6 bg-accentPrimary rounded-r-full shadow-[0_0_10px_var(--accent-primary)]"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon size={20} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
                <span className="hidden lg:block relative z-10 font-medium text-sm tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="w-full px-3 lg:px-4 space-y-2 mt-auto">
          <button className="w-full flex items-center gap-3 p-3 lg:px-4 rounded-2xl text-textSecondary hover:text-primary hover:bg-surface/50 transition-all">
            <User size={20} />
            <span className="hidden lg:block font-medium text-sm">Profile</span>
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 lg:px-4 rounded-2xl text-textSecondary hover:text-red-500 hover:bg-red-500/10 transition-all">
            <LogOut size={20} />
            <span className="hidden lg:block font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-transparent relative z-10 pl-[calc(5rem+2rem)] lg:pl-[calc(16rem+2rem)] transition-all duration-300">
        {/* Top Header */}
        <header className="h-24 flex items-center justify-between px-8 shrink-0 relative z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold tracking-tight capitalize">
              {location.pathname.substring(1) || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeSelector />
            <button 
              onClick={() => setIsNoticesOpen(true)}
              className="w-10 h-10 rounded-full bg-surface border border-borderColor flex items-center justify-center text-textSecondary hover:text-primary transition-colors relative"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-surface animate-pulse" />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accentPrimary to-accentSecondary ml-2 shrink-0 shadow-lg shadow-accentPrimary/20 cursor-pointer hover:scale-105 transition-transform"></div>
          </div>
        </header>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar relative z-10">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>

      {/* AI Notice Summarizer Slide-Out */}
      <AnimatePresence>
        {isNoticesOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNoticesOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-surface/90 backdrop-blur-3xl border-l border-white/10 z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-borderColor flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accentPrimary/10 flex items-center justify-center text-accentPrimary">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">Notice Summarizer</h2>
                    <p className="text-xs text-textSecondary">AI extracted insights</p>
                  </div>
                </div>
                <button onClick={() => setIsNoticesOpen(false)} className="p-2 rounded-full hover:bg-primary/50 text-textSecondary transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {/* Notice Card 1 */}
                <div className="bg-primary/50 border border-borderColor rounded-2xl p-5 hover:border-accentPrimary/30 transition-colors group">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-accentPrimary bg-accentPrimary/10 px-2.5 py-1 rounded-md">Urgent</span>
                    <span className="text-xs text-textSecondary flex items-center gap-1"><Calendar size={12}/> Today</span>
                  </div>
                  <h3 className="font-semibold mb-2">Revised Mid-Term Schedule</h3>
                  <p className="text-sm text-textSecondary mb-4 leading-relaxed">
                    Exams postponed by 1 week. DBMS is now on the 14th, OS on the 16th.
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-surface border border-borderColor py-2 rounded-xl text-xs font-medium hover:bg-accentPrimary/10 hover:text-accentPrimary transition-colors flex items-center justify-center gap-1.5">
                      <Calendar size={14} /> Add to Calendar
                    </button>
                  </div>
                </div>

                {/* Notice Card 2 */}
                <div className="bg-primary/50 border border-borderColor rounded-2xl p-5 hover:border-accentPrimary/30 transition-colors group">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-md">Placement</span>
                    <span className="text-xs text-textSecondary flex items-center gap-1"><Calendar size={12}/> Yesterday</span>
                  </div>
                  <h3 className="font-semibold mb-2">Google SWE Intern 2027</h3>
                  <p className="text-sm text-textSecondary mb-4 leading-relaxed">
                    Applications open tomorrow. Requires 8.0+ CGPA. Resume shortlisting starts next week.
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-surface border border-borderColor py-2 rounded-xl text-xs font-medium hover:bg-accentPrimary/10 hover:text-accentPrimary transition-colors flex items-center justify-center gap-1.5">
                      <FileText size={14} /> View Original
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
