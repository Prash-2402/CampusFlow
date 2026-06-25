import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Smartphone, GraduationCap, BookOpen, MessageCircle, Calendar, LayoutGrid } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const steps = [
  { id: 'workspace', title: 'Workspace', icon: LayoutGrid },
  { id: 'identity', title: 'Identity', icon: GraduationCap },
  { id: 'subjects', title: 'Subjects', icon: BookOpen },
  { id: 'connectivity', title: 'Connectivity', icon: Smartphone },
];

const themes = [
  { id: 'scholar', name: 'Scholar', desc: 'Academic & Prestigious', colors: 'from-[#7C6FE0] to-[#C9A84C]' },
  { id: 'aurora', name: 'Aurora', desc: 'Creative & Energetic', colors: 'from-[#8B5CF6] to-[#2DD4BF]' },
  { id: 'rose-midnight', name: 'Rose Midnight', desc: 'Luxury & Elegant', colors: 'from-[#1a1525] to-[#BCA4A6]' },
  { id: 'eclipse', name: 'Eclipse', desc: 'Monochrome & Minimal', colors: 'from-[#000000] to-[#FFFFFF]' },
  { id: 'sage', name: 'Sage', desc: 'Calm & Focused', colors: 'from-[#0F172A] to-[#34D399]' },
  { id: 'ember', name: 'Ember', desc: 'University Premium', colors: 'from-[#4C0519] to-[#E11D48]' },
];

const MiniDashboard = ({ colors }) => (
  <div className="w-full h-32 bg-surface rounded-xl p-2 flex flex-col gap-2 overflow-hidden border border-borderColor shadow-inner pointer-events-none group-hover:scale-105 transition-transform duration-500">
    {/* Header */}
    <div className="w-full h-4 rounded-md bg-gradient-to-r opacity-20" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
    <div className="flex gap-2 h-full">
      {/* Sidebar */}
      <div className="w-8 rounded-md bg-primary border border-borderColor flex flex-col gap-1 p-1">
        <div className="w-full h-2 rounded bg-textSecondary/20" />
        <div className="w-full h-2 rounded bg-textSecondary/20" />
        <div className="w-full h-2 rounded bg-textSecondary/20" />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex gap-2 h-10">
           <div className={`flex-1 rounded-md bg-gradient-to-br ${colors} opacity-80`} />
           <div className="flex-1 rounded-md bg-primary border border-borderColor" />
        </div>
        <div className="flex-1 rounded-md bg-primary border border-borderColor flex p-1.5 gap-1">
          <div className="w-2/3 h-full rounded bg-textSecondary/10" />
          <div className="w-1/3 h-full rounded bg-textSecondary/10" />
        </div>
      </div>
    </div>
  </div>
);

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const navigate = useNavigate();
  const { activeTheme, setActiveTheme } = useTheme();

  const toggleSubject = (subject) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 300 : -300, opacity: 0 })
  };

  return (
    <div className="min-h-screen bg-primary text-primary flex flex-col overflow-hidden relative">
      <div className="w-full absolute top-0 left-0 h-1 bg-surface">
        <motion.div 
          className="h-full bg-accentPrimary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      <div className="flex-1 max-w-4xl w-full mx-auto flex flex-col justify-center p-8">
        <div className="flex items-center justify-center gap-4 mb-12 px-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === currentStep;
            const isCompleted = idx < currentStep;
            return (
              <div key={step.id} className="flex items-center gap-3">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300
                    ${isActive ? 'bg-accentPrimary text-[var(--text-on-accent)]' : 
                      isCompleted ? 'bg-surface text-accentPrimary border-2 border-accentPrimary' : 
                      'bg-surface text-textSecondary'}
                  `}
                >
                  {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-8 h-[2px] transition-colors duration-300 ${isCompleted ? 'bg-accentPrimary' : 'bg-surface'}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="relative min-h-[400px] w-full perspective-[1000px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "tween", duration: 0.22, ease: "easeOut" }, opacity: { duration: 0.22 } }}
              className="absolute w-full h-full left-0 top-0 px-4"
            >
              
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-semibold mb-2 tracking-tight">Choose your workspace</h2>
                    <p className="text-textSecondary text-sm">Select the personality of your CampusFlow OS.</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {themes.map(theme => (
                      <div 
                        key={theme.id}
                        onClick={() => setActiveTheme(theme.id)}
                        className={`group relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${activeTheme === theme.id ? 'border-accentPrimary bg-accentPrimary/5' : 'border-borderColor bg-surface/50 hover:border-textSecondary/30'}`}
                      >
                        <MiniDashboard colors={theme.colors} />
                        <div className="mt-4 flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-sm">{theme.name}</p>
                            <p className="text-xs text-textSecondary">{theme.desc}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${activeTheme === theme.id ? 'border-accentPrimary bg-accentPrimary' : 'border-textSecondary/30'}`}>
                            {activeTheme === theme.id && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div>
                    <h2 className="text-3xl font-semibold mb-2 tracking-tight">Who are you?</h2>
                    <p className="text-textSecondary text-sm">Let's personalize your workspace.</p>
                  </div>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="First Name" 
                      className="w-full bg-surface border border-borderColor rounded-xl px-4 py-3 text-primary focus:border-accentPrimary transition-colors outline-none"
                    />
                    <input 
                      type="text" 
                      placeholder="University / Branch / Year" 
                      className="w-full bg-surface border border-borderColor rounded-xl px-4 py-3 text-primary focus:border-accentPrimary transition-colors outline-none"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div>
                    <h2 className="text-3xl font-semibold mb-2 tracking-tight">What are you studying?</h2>
                    <p className="text-textSecondary text-sm">We'll use this to build your schedule.</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {['Computer Science', 'Mathematics', 'Physics', 'Design', 'Business', 'Literature'].map(subject => {
                      const isSelected = selectedSubjects.includes(subject);
                      return (
                        <button 
                          key={subject} 
                          onClick={() => toggleSubject(subject)}
                          className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors
                            ${isSelected 
                              ? 'border-accentPrimary bg-accentPrimary/10 text-accentPrimary' 
                              : 'border-borderColor bg-surface hover:border-accentPrimary text-primary'
                            }`}
                        >
                          {subject}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div>
                    <h2 className="text-3xl font-semibold mb-2 tracking-tight">Connect your life</h2>
                    <p className="text-textSecondary text-sm">CampusFlow works best when it can automate things for you.</p>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 rounded-xl border border-borderColor bg-surface hover:border-green-500/50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                          <MessageCircle size={20} />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">WhatsApp</p>
                          <p className="text-xs text-textSecondary">Receive instant notifications</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 bg-surface rounded text-textSecondary group-hover:text-green-500 transition-colors">Connect</span>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 rounded-xl border border-borderColor bg-surface hover:border-blue-500/50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                          <Calendar size={20} />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">Google Calendar</p>
                          <p className="text-xs text-textSecondary">Sync classes and deadlines</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 bg-surface rounded text-textSecondary group-hover:text-blue-500 transition-colors">Connect</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-12 px-4 max-w-2xl mx-auto w-full z-10">
          <button 
            onClick={handleBack}
            className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg hover:bg-surface transition-colors ${currentStep === 0 ? 'invisible' : 'visible'}`}
          >
            <ArrowLeft size={16} />
            Back
          </button>
          
          <button 
            onClick={handleNext}
            className="flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-full bg-accentPrimary hover:bg-accentSecondary text-[var(--text-on-accent)] shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            {currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
            {currentStep !== steps.length - 1 && <ArrowRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
