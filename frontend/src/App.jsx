import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import AcademicsPage from './pages/AcademicsPage';
import CareerPage from './pages/CareerPage';
import CopilotPage from './pages/CopilotPage';
import AutomationsPage from './pages/AutomationsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Toaster } from 'react-hot-toast';

import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/layout/PageTransition';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><IntroPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
        <Route path="/onboarding" element={<PageTransition><OnboardingPage /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
        <Route path="/academics" element={<PageTransition><AcademicsPage /></PageTransition>} />
        <Route path="/career" element={<PageTransition><CareerPage /></PageTransition>} />
        <Route path="/copilot" element={<PageTransition><CopilotPage /></PageTransition>} />
        <Route path="/automations" element={<PageTransition><AutomationsPage /></PageTransition>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          className: 'bg-surface/80 backdrop-blur-xl text-primary border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-[1.25rem]',
          duration: 4000
        }} 
      />
      <AnimatedRoutes />
    </Router>
  );
}
