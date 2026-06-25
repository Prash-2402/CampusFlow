import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Clock, MessageSquare, Calendar, CheckCircle2, 
  XCircle, Workflow, Search, Play, Settings, Bell, RefreshCw 
} from 'lucide-react';

const tabs = ['Workflows', 'Logs', 'Integrations'];

const WorkflowsTab = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
    <div className="space-y-4">
      <h3 className="font-semibold text-lg mb-4">Academic Triggers</h3>
      
      <div className="bg-surface/40 backdrop-blur-xl border border-borderColor rounded-2xl p-5 flex items-center justify-between group hover:border-accentPrimary/50 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-accentPrimary/10 flex items-center justify-center text-accentPrimary">
            <Clock size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-sm">24h Deadline Reminder</h4>
            <p className="text-xs text-textSecondary mt-0.5">Sends a WhatsApp alert 24h before submission.</p>
          </div>
        </div>
        <div className="w-12 h-6 bg-accentPrimary rounded-full p-1 cursor-pointer flex justify-end transition-all">
          <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-sm" />
        </div>
      </div>
      
      <div className="bg-surface/40 backdrop-blur-xl border border-borderColor rounded-2xl p-5 flex items-center justify-between group hover:border-accentPrimary/50 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
            <Zap size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-sm">1h Urgent Alert</h4>
            <p className="text-xs text-textSecondary mt-0.5">High-priority alert when time is running out.</p>
          </div>
        </div>
        <div className="w-12 h-6 bg-accentPrimary rounded-full p-1 cursor-pointer flex justify-end transition-all">
          <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-sm" />
        </div>
      </div>
      
      <div className="bg-surface/40 backdrop-blur-xl border border-borderColor rounded-2xl p-5 flex items-center justify-between group hover:border-accentPrimary/50 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
            <Bell size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Notice Broadcasts</h4>
            <p className="text-xs text-textSecondary mt-0.5">Forward AI summarized notices to WhatsApp.</p>
          </div>
        </div>
        <div className="w-12 h-6 bg-accentPrimary rounded-full p-1 cursor-pointer flex justify-end transition-all">
          <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-sm" />
        </div>
      </div>
    </div>
    
    <div className="space-y-4">
      <h3 className="font-semibold text-lg mb-4">Placement & Events</h3>
      
      <div className="bg-surface/40 backdrop-blur-xl border border-borderColor rounded-2xl p-5 flex items-center justify-between group hover:border-accentPrimary/50 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
            <Calendar size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Auto-Calendar Sync</h4>
            <p className="text-xs text-textSecondary mt-0.5">Create Google Calendar events from deadlines.</p>
          </div>
        </div>
        <div className="w-12 h-6 bg-accentPrimary rounded-full p-1 cursor-pointer flex justify-end transition-all">
          <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-sm" />
        </div>
      </div>
      
      <div className="bg-surface/40 backdrop-blur-xl border border-borderColor rounded-2xl p-5 flex items-center justify-between group hover:border-accentPrimary/50 transition-colors opacity-60">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-surface border border-borderColor flex items-center justify-center text-textSecondary">
            <MessageSquare size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-textSecondary">Placement Reminders</h4>
            <p className="text-xs text-textSecondary mt-0.5">Interview scheduling and prep alerts.</p>
          </div>
        </div>
        <div className="w-12 h-6 bg-surface border border-borderColor rounded-full p-1 cursor-pointer flex justify-start transition-all">
          <motion.div layout className="w-4 h-4 bg-primary rounded-full shadow-sm" />
        </div>
      </div>
    </div>
  </div>
);

const LogsTab = () => (
  <div className="w-full bg-surface/40 backdrop-blur-xl border border-borderColor rounded-3xl p-6 shadow-sm overflow-hidden flex flex-col h-[500px]">
    <div className="flex justify-between items-center mb-6">
      <h3 className="font-semibold">Execution Logs (n8n)</h3>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-primary px-3 py-1.5 rounded-lg border border-borderColor">
          <Search size={14} className="text-textSecondary" />
          <input type="text" placeholder="Search logs..." className="bg-transparent text-xs outline-none w-32" />
        </div>
        <button className="p-2 border border-borderColor rounded-lg text-textSecondary hover:text-primary transition-colors"><RefreshCw size={14} /></button>
      </div>
    </div>
    
    <div className="flex-1 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-borderColor text-xs uppercase tracking-wider text-textSecondary">
            <th className="pb-3 pl-4 font-semibold">Status</th>
            <th className="pb-3 font-semibold">Workflow</th>
            <th className="pb-3 font-semibold">Timestamp</th>
            <th className="pb-3 font-semibold">Trigger Data</th>
            <th className="pb-3 pr-4 text-right font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {[
            { status: 'success', name: '24h Deadline Reminder', time: 'Just now', data: 'Assignment 3 (DBMS)' },
            { status: 'success', name: 'Calendar Sync', time: '10 mins ago', data: 'DBMS Mid-Term Event' },
            { status: 'error', name: 'Notice Broadcast', time: '1 hour ago', data: 'Notice ID #4092' },
            { status: 'success', name: 'Auto-Calendar Sync', time: '3 hours ago', data: 'Study Session (OS)' },
            { status: 'success', name: '1h Urgent Alert', time: 'Yesterday', data: 'Lab Record Submission' },
          ].map((log, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-primary/30 transition-colors">
              <td className="py-4 pl-4">
                {log.status === 'success' 
                  ? <div className="flex items-center gap-2 text-green-500"><CheckCircle2 size={16}/> <span className="text-xs">Success</span></div>
                  : <div className="flex items-center gap-2 text-red-500"><XCircle size={16}/> <span className="text-xs">Failed</span></div>
                }
              </td>
              <td className="py-4 font-medium">{log.name}</td>
              <td className="py-4 text-textSecondary text-xs">{log.time}</td>
              <td className="py-4 text-textSecondary text-xs">{log.data}</td>
              <td className="py-4 pr-4 text-right">
                <button className="text-accentPrimary text-xs hover:underline">View Log</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const IntegrationsTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
    <div className="bg-surface/40 backdrop-blur-xl border border-borderColor rounded-3xl p-6 shadow-sm flex flex-col justify-between h-48">
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 bg-[#25D366]/10 text-[#25D366] rounded-xl flex items-center justify-center text-2xl">
          <MessageSquare size={24} />
        </div>
        <span className="bg-[#25D366]/10 text-[#25D366] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">Connected</span>
      </div>
      <div>
        <h4 className="font-semibold text-lg">WhatsApp Meta API</h4>
        <p className="text-xs text-textSecondary mt-1">Number: +91 98765 43210</p>
      </div>
    </div>
    
    <div className="bg-surface/40 backdrop-blur-xl border border-borderColor rounded-3xl p-6 shadow-sm flex flex-col justify-between h-48">
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center text-2xl">
          <Calendar size={24} />
        </div>
        <span className="bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">Connected</span>
      </div>
      <div>
        <h4 className="font-semibold text-lg">Google Calendar</h4>
        <p className="text-xs text-textSecondary mt-1">Syncing to primary calendar.</p>
      </div>
    </div>

    <div className="bg-surface/40 backdrop-blur-xl border border-dashed border-borderColor rounded-3xl p-6 shadow-sm flex flex-col justify-center items-center h-48 cursor-pointer hover:border-accentPrimary/50 group transition-colors">
      <div className="w-12 h-12 bg-surface text-textSecondary group-hover:text-accentPrimary rounded-xl flex items-center justify-center mb-3 transition-colors">
        <Plus size={24} />
      </div>
      <h4 className="font-semibold text-sm group-hover:text-accentPrimary transition-colors">Add Integration</h4>
      <p className="text-xs text-textSecondary mt-1 text-center">Notion, Slack, Discord</p>
    </div>
  </div>
);

export default function AutomationsPage() {
  const [activeTab, setActiveTab] = useState('Workflows');

  return (
    <AppLayout>
      <div className="pb-12 pt-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold mb-2 tracking-tight flex items-center gap-3">
              Automations <span className="bg-accentPrimary/10 text-accentPrimary text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">n8n Powered</span>
            </h2>
            <p className="text-textSecondary text-lg font-light">Control center for your AI-driven workflows.</p>
          </div>
          <button className="hidden md:flex bg-surface border border-borderColor text-primary px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary transition-colors items-center gap-2">
            <Settings size={16}/> n8n Settings
          </button>
        </div>

        {/* Custom Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-surface/50 p-1.5 rounded-2xl w-max border border-borderColor backdrop-blur-md">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                activeTab === tab ? 'text-textOnAccent' : 'text-textSecondary hover:text-primary'
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="automations-tab"
                  className="absolute inset-0 bg-accentPrimary rounded-xl shadow-[0_4px_15px_var(--accent-primary)] shadow-opacity-40"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0 }}
            className="w-full"
          >
            {activeTab === 'Workflows' && <WorkflowsTab />}
            {activeTab === 'Logs' && <LogsTab />}
            {activeTab === 'Integrations' && <IntegrationsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
