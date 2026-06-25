import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full flex items-center justify-between px-8 py-6 max-w-7xl mx-auto"
    >
      <Link to="/" className="flex items-center gap-2 text-primary hover:text-accentPrimary transition-colors">
        <div className="w-8 h-8 rounded-lg bg-accentPrimary/10 flex items-center justify-center text-accentPrimary">
          <GraduationCap size={20} />
        </div>
        <span className="font-semibold text-xl tracking-tight">CampusFlow</span>
      </Link>
      
      <div className="flex items-center gap-6">
        <Link to="/login" className="text-sm font-medium text-textSecondary hover:text-primary transition-colors">
          Sign In
        </Link>
        <Link 
          to="/onboarding" 
          className="text-sm font-medium bg-accentPrimary hover:bg-accentSecondary text-white px-5 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(var(--accent-primary),0.3)] hover:shadow-[0_0_25px_rgba(var(--accent-primary),0.5)] transform hover:-translate-y-0.5"
        >
          Get Started
        </Link>
      </div>
    </motion.nav>
  );
}
