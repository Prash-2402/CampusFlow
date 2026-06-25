import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { 
  Building2, ChevronRight, Play, FileText, Code2, 
  Lightbulb, Activity, CheckCircle2, TrendingUp,
  UploadCloud, Search, Star, AlertCircle, Plus,
  MoreVertical, Calendar, Sparkles
} from 'lucide-react';

const tabs = ['Applications', 'Interview Prep', 'Resume', 'DSA', 'Startup'];

const ApplicationsTab = () => (
  <div className="w-full">
    <div className="flex justify-between items-center mb-6">
      <h3 className="font-semibold text-lg">Job & Internship Tracker</h3>
      <button className="bg-surface border border-borderColor text-primary px-4 py-2 rounded-xl font-medium text-sm shadow-sm hover:bg-primary transition-colors flex items-center gap-2">
        <Plus size={16} /> Add Application
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto pb-4">
      {['Applied', 'Assessment', 'Interview', 'Offer'].map((stage, i) => (
        <div key={stage} className="bg-surface/30 backdrop-blur-md border border-borderColor rounded-3xl p-5 min-w-[280px]">
          <div className="flex items-center justify-between mb-5">
            <h4 className="font-semibold">{stage}</h4>
            <span className="bg-surface border border-borderColor text-xs px-2 py-0.5 rounded-md text-textSecondary">{i === 0 ? 3 : i === 1 ? 1 : 0}</span>
          </div>
          
          <div className="space-y-3">
            {i === 0 && (
              <>
                <div className="bg-primary border border-borderColor p-4 rounded-2xl shadow-sm hover:border-accentPrimary/50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-surface border border-borderColor flex items-center justify-center font-bold text-blue-500">G</div>
                    <button className="text-textSecondary hover:text-primary"><MoreVertical size={14}/></button>
                  </div>
                  <h4 className="font-semibold mb-1 group-hover:text-accentPrimary transition-colors">Software Engineer Intern</h4>
                  <p className="text-xs text-textSecondary mb-4">Google • Summer 2027</p>
                  <div className="flex items-center justify-between text-xs text-textSecondary">
                    <span className="flex items-center gap-1"><Calendar size={12}/> Applied 2d ago</span>
                  </div>
                </div>
                
                <div className="bg-primary border border-borderColor p-4 rounded-2xl shadow-sm hover:border-accentPrimary/50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-surface border border-borderColor flex items-center justify-center font-bold text-orange-500">A</div>
                    <button className="text-textSecondary hover:text-primary"><MoreVertical size={14}/></button>
                  </div>
                  <h4 className="font-semibold mb-1 group-hover:text-accentPrimary transition-colors">SDE 1</h4>
                  <p className="text-xs text-textSecondary mb-4">Amazon • Full-Time</p>
                  <div className="flex items-center justify-between text-xs text-textSecondary">
                    <span className="flex items-center gap-1"><Calendar size={12}/> Applied 5d ago</span>
                  </div>
                </div>
              </>
            )}
            {i === 1 && (
              <div className="bg-primary border border-borderColor p-4 rounded-2xl shadow-sm hover:border-accentPrimary/50 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-borderColor flex items-center justify-center font-bold text-blue-400">M</div>
                  <button className="text-textSecondary hover:text-primary"><MoreVertical size={14}/></button>
                </div>
                <h4 className="font-semibold mb-1 group-hover:text-accentPrimary transition-colors">SWE Intern</h4>
                <p className="text-xs text-textSecondary mb-4">Microsoft • Summer 2027</p>
                <div className="bg-accentPrimary/10 border border-accentPrimary/20 rounded-lg p-2 text-[10px] text-accentPrimary font-medium flex items-center gap-1">
                  <AlertCircle size={12}/> OA Due Tomorrow
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const InterviewPrepTab = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
    <div className="bg-surface/40 backdrop-blur-xl border border-borderColor rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 rounded-3xl bg-accentPrimary/10 flex items-center justify-center mb-6 border border-accentPrimary/20">
        <Activity size={32} className="text-accentPrimary" />
      </div>
      <h3 className="text-2xl font-bold mb-3">AI Mock Interviews</h3>
      <p className="text-textSecondary max-w-sm mb-8 leading-relaxed">
        Practice technical & behavioral rounds with our Voice-AI. Get real-time feedback on your answers and confidence levels.
      </p>
      
      <div className="w-full space-y-4 max-w-sm text-left mb-8">
        <div>
          <label className="text-[11px] font-semibold text-textSecondary ml-1 mb-1.5 block uppercase tracking-wider">Company Target</label>
          <select className="w-full bg-primary border border-borderColor rounded-xl px-4 py-3 text-sm outline-none">
            <option>Google (Standard SWE)</option>
            <option>Amazon (Leadership Principles)</option>
            <option>Startups (Full-Stack)</option>
          </select>
        </div>
      </div>
      
      <button className="bg-accentPrimary text-textOnAccent px-8 py-4 rounded-2xl font-semibold shadow-xl shadow-accentPrimary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
        <Play size={20} /> Start Audio Session
      </button>
    </div>
    
    <div className="space-y-6">
      <div className="bg-surface/40 backdrop-blur-xl border border-borderColor rounded-3xl p-6 shadow-sm">
        <h4 className="font-semibold mb-4">Recent Feedback</h4>
        <div className="bg-primary border border-borderColor rounded-2xl p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium">Google Technical Round</span>
            <span className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded-md font-bold">8.5/10</span>
          </div>
          <p className="text-xs text-textSecondary mb-3">"Great explanation of Time Complexity for Dijkstra's. Needs improvement on communicating edge cases before coding."</p>
          <button className="text-accentPrimary text-xs font-medium hover:underline">Review Recording</button>
        </div>
      </div>
      
      <div className="bg-surface/40 backdrop-blur-xl border border-borderColor rounded-3xl p-6 shadow-sm">
        <h4 className="font-semibold mb-4 flex items-center gap-2"><Star size={16} className="text-accentSecondary"/> Top Strengths</h4>
        <div className="flex flex-wrap gap-2">
          <span className="bg-surface border border-borderColor text-xs px-3 py-1.5 rounded-lg text-primary">System Design Basics</span>
          <span className="bg-surface border border-borderColor text-xs px-3 py-1.5 rounded-lg text-primary">Dynamic Programming</span>
          <span className="bg-surface border border-borderColor text-xs px-3 py-1.5 rounded-lg text-primary">Communication</span>
        </div>
      </div>
    </div>
  </div>
);

const ResumeTab = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
    <div className="lg:col-span-2 bg-surface/40 backdrop-blur-xl border border-borderColor rounded-3xl p-8 flex flex-col">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-xl font-bold mb-2">ATS Analyzer</h3>
          <p className="text-sm text-textSecondary">Upload your resume to see how robots read it.</p>
        </div>
        <button className="bg-surface border border-borderColor text-primary px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-primary transition-colors">
          <FileText size={16}/> View Current
        </button>
      </div>
      
      <div className="flex-1 border-2 border-dashed border-borderColor rounded-2xl flex flex-col items-center justify-center p-12 bg-primary/20 group hover:border-accentPrimary/50 transition-colors cursor-pointer text-center">
        <UploadCloud size={40} className="text-textSecondary group-hover:text-accentPrimary mb-4 transition-colors" />
        <h4 className="font-medium mb-1">Drag & Drop Resume</h4>
        <p className="text-xs text-textSecondary">PDF format, max 5MB</p>
      </div>
    </div>
    
    <div className="bg-surface/40 backdrop-blur-xl border border-borderColor rounded-3xl p-6 flex flex-col items-center">
      <h4 className="font-semibold self-start mb-6 w-full">Current ATS Score</h4>
      
      <div className="w-40 h-40 rounded-full border-8 border-primary relative flex items-center justify-center mb-8 shadow-inner">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none" stroke="var(--accent-primary)" strokeWidth="8" strokeDasharray="289" strokeDashoffset="80" strokeLinecap="round" />
        </svg>
        <div className="text-center flex flex-col items-center">
          <span className="text-4xl font-bold text-accentPrimary">72</span>
          <p className="text-[10px] text-textSecondary font-bold mt-1 uppercase tracking-wider">/ 100</p>
        </div>
      </div>
      
      <div className="w-full space-y-3">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-xs text-red-500 flex items-start gap-2">
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          <p>Missing keywords: <b>Kubernetes</b>, <b>CI/CD</b>, <b>System Design</b></p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-xs text-green-500 flex items-start gap-2">
          <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
          <p>Action verbs utilized well (85% sentences start with verbs)</p>
        </div>
      </div>
    </div>
  </div>
);

const DSATab = () => (
  <div className="w-full flex flex-col items-center justify-center min-h-[500px] bg-surface/30 backdrop-blur-xl border border-borderColor rounded-[2rem] p-12 text-center relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
    <div className="w-24 h-24 rounded-3xl bg-accentPrimary/10 border border-accentPrimary/20 flex items-center justify-center mb-8 shadow-inner relative z-10">
      <Code2 size={40} className="text-accentPrimary" />
    </div>
    <h3 className="text-3xl font-bold mb-4 tracking-tight relative z-10">AI DSA Question Generator</h3>
    <p className="text-textSecondary text-lg max-w-xl font-light leading-relaxed mb-8 relative z-10">
      Stop doing LeetCode blind. Our AI analyzes your past performance and generates dynamic questions targeting your exact weak points.
    </p>
    <div className="flex gap-4 relative z-10">
      <select className="bg-surface border border-borderColor rounded-xl px-4 py-3 text-sm outline-none">
        <option>Topic: Graphs</option>
        <option>Topic: Dynamic Programming</option>
        <option>Topic: Trees</option>
      </select>
      <button className="bg-accentPrimary text-textOnAccent px-8 py-3 rounded-xl font-semibold shadow-xl shadow-accentPrimary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
        <Sparkles size={18} /> Generate Question
      </button>
    </div>
  </div>
);

const StartupTab = () => (
  <div className="w-full space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-surface/40 backdrop-blur-xl border border-borderColor rounded-3xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-accentPrimary/10 flex items-center justify-center text-accentPrimary">
            <Lightbulb size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold tracking-tight">BrainSpace Validation</h3>
            <p className="text-sm text-textSecondary">Test your startup ideas against AI-driven market analysis.</p>
          </div>
        </div>
        
        <div className="relative group">
          <textarea 
            placeholder="Describe your startup idea (e.g. Uber for Tutors)..."
            className="w-full h-32 bg-primary border border-borderColor rounded-2xl p-4 text-sm outline-none focus:border-accentPrimary transition-colors resize-none mb-4"
          />
          <button className="absolute bottom-6 right-2 bg-accentPrimary text-textOnAccent px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-md hover:scale-105 transition-all">
            <Sparkles size={16}/> Analyze Idea
          </button>
        </div>
      </div>
      
      <div className="bg-surface/40 backdrop-blur-xl border border-borderColor rounded-3xl p-6 flex flex-col justify-center">
        <h4 className="font-semibold text-center mb-6">Feasibility Score</h4>
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full border-8 border-primary relative flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="var(--accent-secondary)" strokeWidth="8" strokeDasharray="289" strokeDashoffset="120" strokeLinecap="round" />
            </svg>
            <span className="text-2xl font-bold text-accentSecondary">58%</span>
          </div>
        </div>
        <p className="text-xs text-center text-textSecondary">Based on current market saturation and technical complexity.</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-surface/30 backdrop-blur-md border border-borderColor rounded-3xl p-6">
        <h4 className="font-semibold mb-4">SWOT Analysis</h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
            <span className="font-bold text-green-500 block mb-1">Strengths</span>
            <ul className="list-disc pl-4 text-textSecondary space-y-1">
              <li>Low initial capital</li>
              <li>High student demand</li>
            </ul>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
            <span className="font-bold text-red-500 block mb-1">Weaknesses</span>
            <ul className="list-disc pl-4 text-textSecondary space-y-1">
              <li>Tutor retention</li>
              <li>Quality control</li>
            </ul>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
            <span className="font-bold text-blue-500 block mb-1">Opportunities</span>
            <ul className="list-disc pl-4 text-textSecondary space-y-1">
              <li>AI tutor integration</li>
              <li>B2B college tie-ups</li>
            </ul>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3">
            <span className="font-bold text-orange-500 block mb-1">Threats</span>
            <ul className="list-disc pl-4 text-textSecondary space-y-1">
              <li>ChatGPT / AI</li>
              <li>Existing edtech apps</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-surface/30 backdrop-blur-md border border-borderColor rounded-3xl p-6">
        <h4 className="font-semibold mb-4">Market Size (TAM/SAM/SOM)</h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1 font-medium"><span className="text-primary">TAM (Total Addressable Market)</span><span>$12B</span></div>
            <div className="w-full bg-primary h-8 rounded-lg overflow-hidden border border-borderColor"><div className="bg-surface h-full w-full opacity-50" /></div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1 font-medium"><span className="text-primary">SAM (Serviceable Addressable Market)</span><span>$400M</span></div>
            <div className="w-full bg-primary h-8 rounded-lg overflow-hidden border border-borderColor"><div className="bg-accentSecondary/50 h-full w-[45%]" /></div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1 font-medium"><span className="text-primary">SOM (Serviceable Obtainable Market)</span><span>$10M</span></div>
            <div className="w-full bg-primary h-8 rounded-lg overflow-hidden border border-borderColor"><div className="bg-accentPrimary h-full w-[15%]" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function CareerPage() {
  const [activeTab, setActiveTab] = useState('Applications');

  return (
    <AppLayout>
      <div className="pb-12 pt-4">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2 tracking-tight">Career</h2>
          <p className="text-textSecondary text-lg font-light">Placement preparation and applications.</p>
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
                  layoutId="career-tab"
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
            {activeTab === 'Applications' && <ApplicationsTab />}
            {activeTab === 'Interview Prep' && <InterviewPrepTab />}
            {activeTab === 'Resume' && <ResumeTab />}
            {activeTab === 'DSA' && <DSATab />}
            {activeTab === 'Startup' && <StartupTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
