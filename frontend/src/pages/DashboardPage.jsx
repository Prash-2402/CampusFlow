import React, { useState, useEffect } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, BookOpen, AlertCircle, Clock, CheckCircle2, ChevronDown, MessageCircle, ArrowRight, Activity, Flame, CheckSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import Tilt from 'react-parallax-tilt';

// ----------------------------------------
// Custom Toast: WhatsApp Notification
// ----------------------------------------
const triggerWhatsAppToast = () => {
  toast.custom((t) => (
    <motion.div
      initial={{ opacity: 0, y: 50, x: 50 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-sm w-full bg-surface/90 backdrop-blur-xl shadow-2xl rounded-2xl pointer-events-auto flex ring-1 ring-white/10 overflow-hidden border border-borderColor`}
    >
      <div className="p-4 flex items-start w-full">
        <div className="flex-shrink-0 pt-0.5">
          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 ring-1 ring-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            <MessageCircle size={20} />
          </div>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-semibold text-primary">Automation Succeeded</p>
          <p className="mt-1 text-xs text-textSecondary leading-relaxed">
            WhatsApp message sent with your personalized AI study plan for DBMS.
          </p>
        </div>
      </div>
    </motion.div>
  ), { duration: 4000 });
};

// ----------------------------------------
// Bento Box Components
// ----------------------------------------

const CopilotHeader = () => (
  <motion.div 
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    className="col-span-1 md:col-span-3 lg:col-span-4"
  >
    <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} scale={1.01} transitionSpeed={2000} className="h-full">
      <div className="h-full bg-gradient-to-br from-accentPrimary/10 via-surface/80 to-surface/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 relative overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
    {/* Animated background blur */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-accentPrimary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-accentPrimary/20 transition-colors duration-700" />
    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accentSecondary/10 rounded-full blur-[80px] pointer-events-none" />
    
    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
      <div className="flex gap-6 items-center">
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-accentPrimary to-accentSecondary text-textOnAccent flex items-center justify-center shadow-lg shadow-accentPrimary/25 transform rotate-3 transition-transform group-hover:rotate-6">
            <Sparkles size={28} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-[3px] border-surface flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-1 tracking-tight">Good morning, Prajwal</h2>
          <p className="text-textSecondary text-lg font-light max-w-xl leading-relaxed">
            You have <span className="text-primary font-medium">2 assignments</span> due this week. Based on your schedule, I recommend studying DBMS tonight.
          </p>
        </div>
      </div>
      
      <div className="flex gap-3 w-full md:w-auto shrink-0">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 md:flex-none bg-accentPrimary text-[var(--text-on-accent)] px-6 py-3.5 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          Schedule Block
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </div>
    </div>
    </Tilt>
  </motion.div>
);

const MetricBento = ({ title, value, subtext, icon: Icon, trend }) => (
  <motion.div 
    variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
    className="col-span-1"
  >
    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable glareMaxOpacity={0.15} glareColor="#ffffff" glarePosition="all" transitionSpeed={2000} className="h-full">
      <div className="h-full bg-surface/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex flex-col hover:border-accentPrimary/40 transition-colors relative overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.05)] inset-shadow">
    <div className="absolute -right-6 -top-6 w-24 h-24 bg-accentPrimary/5 rounded-full blur-2xl group-hover:bg-accentPrimary/10 transition-colors" />
    
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 rounded-2xl bg-primary border border-borderColor flex items-center justify-center text-textSecondary group-hover:text-accentPrimary group-hover:border-accentPrimary/30 transition-all shadow-sm">
        <Icon size={22} />
      </div>
      {trend && (
        <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold tracking-wide">
          {trend}
        </span>
      )}
    </div>
    
    <div className="mt-auto">
      <h3 className="text-4xl font-bold tracking-tight mb-1">{value}</h3>
      <p className="text-sm font-medium text-primary">{title}</p>
      <p className="text-xs text-textSecondary mt-1.5 line-clamp-1">{subtext}</p>
    </div>
      </div>
    </Tilt>
  </motion.div>
);

const UpcomingDeadlineBento = () => {
  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      className="col-span-1 md:col-span-2 row-span-2"
    >
      <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} glareEnable glareMaxOpacity={0.1} transitionSpeed={2000} className="h-full">
        <div className="h-full bg-gradient-to-b from-surface/80 to-primary/80 backdrop-blur-xl border border-white/10 rounded-3xl p-1 relative overflow-hidden group shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
      <div className="absolute inset-0 bg-gradient-to-br from-accentPrimary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="bg-surface rounded-[22px] h-full p-6 flex flex-col relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accentSecondary/10 flex items-center justify-center text-accentSecondary">
              <Flame size={16} />
            </div>
            <h3 className="font-semibold text-lg tracking-tight">Priority Deadline</h3>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-accentPrimary bg-accentPrimary/10 px-3 py-1.5 rounded-full">Due in 2 days</span>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
          <div className="w-20 h-20 bg-primary border border-borderColor rounded-2xl shadow-xl shadow-black/5 flex items-center justify-center mb-6 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
            <BookOpen size={32} className="text-accentPrimary" />
          </div>
          <h4 className="text-2xl font-bold mb-2">DBMS Assignment 3</h4>
          <p className="text-sm text-textSecondary max-w-sm mx-auto leading-relaxed mb-6">
            SQL Query Optimization and Normalization practices. 
          </p>
          
          <div className="w-full bg-primary border border-borderColor rounded-xl p-4 text-left flex items-start gap-3 mt-auto">
             <Sparkles size={18} className="text-accentGold shrink-0 mt-0.5" />
             <div>
               <p className="text-sm font-semibold mb-1">AI Suggestion</p>
               <p className="text-xs text-textSecondary leading-relaxed">
                 Start by reviewing Chapter 4 tonight. You have a free block at 4 PM tomorrow for practicals.
               </p>
             </div>
          </div>
        </div>
      </div>
      </div>
      </Tilt>
    </motion.div>
  );
};

const ScheduleBento = () => {
  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
      className="col-span-1 md:col-span-2 row-span-2"
    >
      <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} transitionSpeed={2000} className="h-full">
        <div className="h-full bg-surface/50 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-semibold text-lg tracking-tight">Today's Schedule</h3>
        <button className="text-xs font-medium text-textSecondary hover:text-primary transition-colors">View All</button>
      </div>
      
      <div className="relative space-y-6">
        <div className="absolute left-[11px] top-2 bottom-4 w-[2px] bg-borderColor" />
        
        {/* Past Event */}
        <div className="relative pl-8 opacity-50">
          <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-surface border-2 border-borderColor flex items-center justify-center z-10">
            <CheckCircle2 size={12} className="text-textSecondary" />
          </div>
          <p className="text-xs font-bold text-textSecondary mb-1 tracking-wider uppercase">09:00 AM</p>
          <div className="bg-primary rounded-2xl p-4 border border-borderColor">
            <p className="text-sm font-semibold">Database Systems</p>
            <p className="text-xs text-textSecondary mt-1 flex items-center gap-1"><Clock size={12}/> Room 402</p>
          </div>
        </div>

        {/* Current/Next Event */}
        <div className="relative pl-8">
          <div className="absolute left-[-2px] top-1.5 w-[30px] h-[30px] rounded-full bg-accentPrimary/20 flex items-center justify-center z-10 animate-pulse">
            <div className="w-3 h-3 rounded-full bg-accentPrimary shadow-[0_0_10px_var(--accent-primary)]" />
          </div>
          <p className="text-xs font-bold text-accentPrimary mb-1 tracking-wider uppercase">11:30 AM</p>
          <div className="bg-gradient-to-r from-accentPrimary/10 to-transparent rounded-2xl p-4 border border-accentPrimary/20 shadow-sm shadow-accentPrimary/5">
            <p className="text-sm font-semibold text-primary">Machine Learning</p>
            <p className="text-xs text-textSecondary mt-1 flex items-center gap-1"><Clock size={12}/> Lab 2</p>
          </div>
        </div>

        {/* Future Event */}
        <div className="relative pl-8">
          <div className="absolute left-[7px] top-1.5 w-2.5 h-2.5 rounded-full bg-surface border-2 border-borderColor z-10" />
          <p className="text-xs font-bold text-textSecondary mb-1 tracking-wider uppercase">02:00 PM</p>
          <div className="bg-primary rounded-2xl p-4 border border-borderColor hover:border-textSecondary/30 transition-colors cursor-pointer">
            <p className="text-sm font-semibold">Study Session</p>
            <p className="text-xs text-textSecondary mt-1 flex items-center gap-1"><Clock size={12}/> Library</p>
          </div>
        </div>
      </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const ActivityStreamBento = () => {
  const [events, setEvents] = useState([
    { id: 1, text: "WhatsApp message sent", type: "success" },
    { id: 2, text: "Calendar event created", type: "info" },
  ]);

  useEffect(() => {
    // Simulate live incoming events
    const timer = setTimeout(() => {
      setEvents(prev => [{ id: Date.now(), text: "Reminder scheduled", type: "warning" }, ...prev]);
      triggerWhatsAppToast();
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      className="col-span-1 md:col-span-4"
    >
      <Tilt tiltMaxAngleX={1} tiltMaxAngleY={1} transitionSpeed={2000} className="h-full">
        <div className="h-full bg-surface/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 lg:p-8 flex flex-col md:flex-row gap-8 items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-4 min-w-[200px]">
        <div className="w-12 h-12 rounded-full bg-accentPrimary/10 flex items-center justify-center text-accentPrimary">
          <Activity size={24} />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Live Stream</h3>
          <p className="text-xs text-textSecondary">Real-time automation logs</p>
        </div>
      </div>
      
      <div className="flex-1 w-full flex flex-col justify-center">
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {events.slice(0, 3).map((evt, idx) => (
              <motion.div 
                key={evt.id}
                initial={{ opacity: 0, height: 0, x: -20 }}
                animate={{ opacity: 1, height: 'auto', x: 0 }}
                transition={{ type: 'spring', bounce: 0.3 }}
                className={`flex items-center gap-3 p-3 rounded-xl border ${idx === 0 ? 'bg-primary border-borderColor shadow-sm' : 'border-transparent opacity-60'}`}
              >
                <CheckCircle2 size={16} className={idx === 0 ? 'text-accentPrimary' : 'text-textSecondary'} />
                <span className="text-sm font-medium text-primary">{evt.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
        </div>
      </Tilt>
    </motion.div>
  );
};


export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="pb-12 pt-4">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,_auto)]"
        >
          
          {/* Top Banner */}
          <CopilotHeader />

          {/* Metrics */}
          <MetricBento title="Tasks Due" value="3" subtext="2 High Priority" icon={CheckSquare} delay={0.1} trend="URGENT" />
          <MetricBento title="Exam Countdown" value="14" subtext="Midterms in 2 weeks" icon={Calendar} delay={0.15} />
          
          {/* Main Content Area */}
          <UpcomingDeadlineBento />
          <ScheduleBento />

          {/* Bottom Stream */}
          <ActivityStreamBento />

        </motion.div>
      </div>
    </AppLayout>
  );
}
