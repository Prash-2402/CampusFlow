import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';

const MiniDashboardPreview = ({ themeId, name, isActive, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Hardcode color values for previews so they look correct regardless of active theme
  const previewColors = {
    'sovereign-gold': { bg: '#1A1200', surface: '#2A1E00', accent: '#A06A00', text: '#F0D98A', gold: '#C9A84C' },
    'chalk-rose': { bg: '#ffffff', surface: '#FDF8F8', accent: '#C0446A', text: '#1a1a1a', gold: '#C9A84C' },
    'aurora': { bg: '#0B1120', surface: '#121A2F', accent: '#8B5CF6', text: '#F8FAFC', gold: '#38BDF8' },
    'rose-midnight': { bg: '#120A0F', surface: '#1A1117', accent: '#BCA4A6', text: '#FCE7F3', gold: '#E5C5C7' },
    'eclipse': { bg: '#000000', surface: '#0A0A0A', accent: '#FFFFFF', text: '#FAFAFA', gold: '#A3A3A3' },
    'sage': { bg: '#0B1410', surface: '#111C16', accent: '#34D399', text: '#ECFDF5', gold: '#FCE7F3' },
    'ember': { bg: '#170A0B', surface: '#221011', accent: '#E11D48', text: '#FFF1F2', gold: '#C9A84C' },
  }[themeId] || { bg: '#000000', surface: '#111111', accent: '#ffffff', text: '#ffffff', gold: '#ffffff' };

  return (
    <button
      onClick={() => onSelect(themeId)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group w-full flex items-center p-2 rounded-xl transition-all duration-200 border text-left
        ${isActive ? 'bg-surface border-accentPrimary' : 'border-transparent hover:bg-surface/50'}
      `}
    >
      <div 
        className="w-16 h-12 rounded-md overflow-hidden relative shrink-0 border border-borderColor/50 shadow-sm"
        style={{ backgroundColor: previewColors.bg }}
      >
        {/* Sidebar Mini */}
        <div className="absolute left-0 top-0 bottom-0 w-3 border-r border-white/5 flex flex-col items-center py-1 gap-1" style={{ backgroundColor: previewColors.surface }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: previewColors.accent }} />
          <div className="w-1 h-1 rounded-full opacity-30" style={{ backgroundColor: previewColors.text }} />
          <div className="w-1 h-1 rounded-full opacity-30" style={{ backgroundColor: previewColors.text }} />
        </div>
        
        {/* Content Mini */}
        <div className="absolute left-4 top-1 right-1 bottom-1 flex flex-col gap-1">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="w-4 h-1 rounded-full opacity-80" style={{ backgroundColor: previewColors.text }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: previewColors.gold }} />
          </div>
          
          {/* Dashboard Cards Mini */}
          <div className="flex gap-1 mt-0.5">
            <div className="flex-1 h-4 rounded-sm flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: previewColors.surface }}>
               <motion.div 
                 animate={{ height: isHovered ? '60%' : '30%' }}
                 className="absolute bottom-0 left-1 w-1 rounded-t-[1px]"
                 style={{ backgroundColor: previewColors.accent }}
               />
               <motion.div 
                 animate={{ height: isHovered ? '80%' : '50%' }}
                 className="absolute bottom-0 right-1 w-1 rounded-t-[1px]"
                 style={{ backgroundColor: previewColors.gold }}
               />
            </div>
            <div className="flex-1 h-4 rounded-sm overflow-hidden relative" style={{ backgroundColor: previewColors.surface }}>
              {/* Mini timeline */}
              <motion.div 
                 animate={{ x: isHovered ? 4 : 0 }}
                 className="absolute top-1 left-1 w-2 h-[1px] opacity-50"
                 style={{ backgroundColor: previewColors.text }}
              />
              <motion.div 
                 animate={{ width: isHovered ? 6 : 3 }}
                 className="absolute top-2 left-1 h-[1px]"
                 style={{ backgroundColor: previewColors.accent }}
              />
            </div>
          </div>
          
          {/* Feed */}
          <div className="w-full h-2 rounded-sm mt-auto" style={{ backgroundColor: previewColors.surface }} />
        </div>
      </div>
      
      <div className="ml-3 flex-1">
        <span className="text-sm font-medium block leading-tight">{name}</span>
        <span className="text-[10px] text-textSecondary uppercase tracking-wider">{themeId.replace('-', ' ')}</span>
      </div>

      {isActive && (
        <Check size={16} className="text-accentPrimary mr-1 shrink-0" />
      )}
    </button>
  );
};

export default function ThemeSelector() {
  const { themes, activeTheme, setActiveTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-full hover:bg-surface text-textSecondary hover:text-primary transition-colors flex items-center gap-2"
        aria-label="Select Theme"
      >
        <Palette size={18} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-64 bg-primary border border-borderColor rounded-2xl shadow-2xl p-2 origin-top-right"
          >
            <div className="px-3 py-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-textSecondary">Select Workspace</span>
            </div>
            
            <div className="space-y-1">
              {themes.map((theme) => (
                <MiniDashboardPreview
                  key={theme.id}
                  themeId={theme.id}
                  name={theme.name}
                  isActive={activeTheme === theme.id}
                  onSelect={(id) => {
                    setActiveTheme(id);
                    // don't close immediately so they can see it apply, or maybe do close. Let's keep it open for quick comparison.
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
