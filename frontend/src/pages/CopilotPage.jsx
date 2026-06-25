import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Mic, User, Bot, Plus, History } from 'lucide-react';

const modes = ['General', 'Study', 'Career', 'Startup', 'Creator'];

const sampleHistory = [
  { role: 'user', content: 'Can you summarize the syllabus for DBMS unit 3?' },
  { role: 'assistant', content: 'Certainly! Unit 3 of DBMS focuses on **Normalization and Database Design**. Here are the key concepts:\n\n1. **Functional Dependencies**: Understanding how attributes relate to each other.\n2. **1NF, 2NF, 3NF**: The standard forms to reduce redundancy.\n3. **BCNF**: A stronger version of 3NF.\n4. **Lossless Join Decomposition**: Ensuring no data is lost when breaking tables apart.\n\nWould you like me to generate a quick quiz on these topics?' },
  { role: 'user', content: 'Yes, give me 3 MCQs on BCNF.' },
  { role: 'assistant', content: 'Here are 3 MCQs on BCNF:\n\n**Q1. A relation is in BCNF if and only if:**\nA) Every determinant is a candidate key.\nB) It has no multi-valued dependencies.\nC) It is in 4NF.\nD) All attributes are atomic.\n\n**Q2. Which normal form is strictly stronger than 3NF?**\nA) 1NF\nB) 2NF\nC) BCNF\nD) 4NF\n\n**Q3. If a relation is in BCNF, is it always in 3NF?**\nA) Yes\nB) No\n\nLet me know your answers!' },
];

export default function CopilotPage() {
  const [activeMode, setActiveMode] = useState('Study');
  const [messages, setMessages] = useState(sampleHistory);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, { role: 'user', content: inputValue }]);
    setInputValue('');
  };

  return (
    <AppLayout>
      <div className="pb-12 pt-4 h-[calc(100vh-80px)] flex flex-col">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-3xl font-semibold mb-2 tracking-tight">Copilot</h2>
            <p className="text-textSecondary text-lg font-light">Your intelligent AI assistant for every domain.</p>
          </div>
        </div>

        {/* Chat Interface Container */}
        <div className="flex-1 flex gap-6 overflow-hidden">
          
          {/* Persona & History Sidebar */}
          <div className="w-64 flex flex-col gap-6 shrink-0 hidden lg:flex">
            {/* Personas */}
            <div className="bg-surface/40 backdrop-blur-3xl border border-white/5 rounded-3xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-textSecondary mb-4 ml-2">AI Personas</h4>
              <div className="space-y-1">
                {modes.map(mode => (
                  <button
                    key={mode}
                    onClick={() => setActiveMode(mode)}
                    className={`w-full text-left px-4 py-3 rounded-2xl transition-all font-medium text-sm flex items-center gap-3 relative ${
                      activeMode === mode ? 'text-accentPrimary bg-accentPrimary/10' : 'text-textSecondary hover:bg-surface/50 hover:text-primary'
                    }`}
                  >
                    {activeMode === mode && (
                      <motion.div
                        layoutId="active-persona"
                        className="absolute left-0 w-1 h-6 bg-accentPrimary rounded-r-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Sparkles size={16} className={activeMode === mode ? 'text-accentPrimary' : 'opacity-50'}/>
                    {mode} Mode
                  </button>
                ))}
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 bg-surface/40 backdrop-blur-3xl border border-white/5 rounded-3xl p-4 flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="flex items-center justify-between mb-4 ml-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-textSecondary">Recent Chats</h4>
                <button className="text-textSecondary hover:text-primary"><Plus size={16}/></button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2">
                <div className="p-3 bg-surface border border-borderColor rounded-xl text-xs font-medium cursor-pointer hover:border-accentPrimary/30 transition-colors truncate">
                  DBMS Unit 3 Summary
                </div>
                <div className="p-3 bg-transparent text-textSecondary hover:bg-surface border border-transparent rounded-xl text-xs cursor-pointer transition-colors truncate">
                  Google SWE Interview Prep
                </div>
                <div className="p-3 bg-transparent text-textSecondary hover:bg-surface border border-transparent rounded-xl text-xs cursor-pointer transition-colors truncate">
                  Analyze startup idea: Uber...
                </div>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 bg-surface/40 backdrop-blur-3xl border border-white/5 rounded-3xl flex flex-col overflow-hidden relative shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
            
            {/* Top Bar for Mobile */}
            <div className="lg:hidden p-4 border-b border-borderColor flex gap-2 overflow-x-auto">
               {modes.map(mode => (
                  <button
                    key={mode}
                    onClick={() => setActiveMode(mode)}
                    className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold ${
                      activeMode === mode ? 'bg-accentPrimary text-textOnAccent' : 'bg-surface text-textSecondary border border-borderColor'
                    }`}
                  >
                    {mode}
                  </button>
               ))}
            </div>

            {/* Chat History Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar scroll-smooth">
               {messages.length === 0 ? (
                 <div className="flex-1 flex flex-col items-center justify-center">
                   <motion.div 
                     animate={{ y: [0, -10, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="relative mb-8"
                   >
                     <div className="absolute inset-0 bg-accentPrimary/20 blur-2xl rounded-full" />
                     <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-accentPrimary to-accentSecondary text-textOnAccent flex items-center justify-center shadow-xl shadow-accentPrimary/20 transform rotate-3">
                       <Sparkles size={36} />
                     </div>
                   </motion.div>
                   <h3 className="text-2xl font-bold mb-3 tracking-tight">CampusFlow Copilot <span className="text-accentPrimary font-light">({activeMode})</span></h3>
                   <p className="text-textSecondary text-center max-w-sm font-light leading-relaxed">
                     What do you want to accomplish today? I can help you with {activeMode.toLowerCase()} related tasks.
                   </p>
                 </div>
               ) : (
                 <>
                   {messages.map((msg, idx) => (
                     <motion.div 
                       key={idx}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                     >
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                         msg.role === 'user' ? 'bg-surface border border-borderColor text-primary' : 'bg-gradient-to-tr from-accentPrimary to-accentSecondary text-textOnAccent shadow-md'
                       }`}>
                         {msg.role === 'user' ? <User size={16}/> : <Bot size={16}/>}
                       </div>
                       
                       <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                         msg.role === 'user' 
                          ? 'bg-surface border border-borderColor text-primary rounded-tr-sm' 
                          : 'bg-primary border border-borderColor text-primary rounded-tl-sm shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
                       }`}>
                         {msg.content}
                       </div>
                     </motion.div>
                   ))}
                 </>
               )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-surface/30 backdrop-blur-md">
              <div className="max-w-4xl mx-auto relative group">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-accentPrimary/50 to-accentSecondary/50 rounded-[1.3rem] opacity-0 group-focus-within:opacity-100 transition-opacity blur-sm duration-500" />
                <div className="relative flex items-center bg-surface border border-white/10 rounded-2xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]">
                  <button className="pl-4 pr-2 text-textSecondary hover:text-accentPrimary transition-colors">
                    <Mic size={20} />
                  </button>
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={`Ask Copilot anything about ${activeMode.toLowerCase()}...`}
                    className="flex-1 bg-transparent py-4 px-2 outline-none text-primary placeholder-textSecondary text-sm"
                  />
                  <button 
                    onClick={handleSend}
                    className="mr-2 ml-2 w-10 h-10 shrink-0 flex items-center justify-center bg-accentPrimary text-textOnAccent rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                    disabled={!inputValue.trim()}
                  >
                    <Send size={16} className="-ml-0.5 mt-0.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
