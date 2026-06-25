import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, BookOpen, Loader2, ArrowRight, X, ChevronDown, GraduationCap, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CustomSelect = ({ value, onChange, options, placeholder, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-soft border border-borderColor text-primary rounded-xl py-3 pl-10 pr-10 outline-none hover:border-accentPrimary transition-all text-sm flex items-center justify-between"
      >
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          {Icon && <Icon size={16} className={`transition-colors ${isOpen ? 'text-accentPrimary' : 'text-secondary'}`} />}
        </div>
        <span className={selectedOption ? 'text-primary' : 'text-secondary/50'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={16} className={`text-secondary transition-transform ${isOpen ? 'rotate-180 text-accentPrimary' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-surface border border-borderColor rounded-xl shadow-xl overflow-hidden py-1"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-primary/50 ${value === opt.value ? 'bg-accentPrimary/10 text-accentPrimary font-medium' : 'text-primary'}`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="relative group min-h-[46px] w-full bg-soft border border-borderColor rounded-xl pl-10 pr-4 py-2 focus-within:border-accentPrimary focus-within:ring-1 focus-within:ring-accentPrimary transition-all flex flex-wrap gap-2 items-center">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none h-[46px]">
        <BookOpen size={16} className="text-secondary group-focus-within:text-accentPrimary transition-colors" />
      </div>
      
      {tags.map((tag, index) => (
        <span key={index} className="bg-accentPrimary/15 text-accentPrimary text-xs font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-accentPrimary/20">
          {tag}
          <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
            <X size={12} />
          </button>
        </span>
      ))}
      
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? "Type subject and press Enter" : ""}
        className="flex-1 bg-transparent min-w-[120px] outline-none text-sm text-primary placeholder:text-secondary/50"
      />
    </div>
  );
};

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    branch: '',
    year: '',
    subjects: [],
    email: '',
    google_email: '',
    password: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCustomChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.branch) {
      toast.error('Please select your branch.');
      return;
    }
    if (!formData.year) {
      toast.error('Please select your year of study.');
      return;
    }
    if (formData.subjects.length === 0) {
      toast.error('Please enter at least one subject to track.');
      return;
    }

    const payload = {
      ...formData,
      year: parseInt(formData.year, 10),
      google_email: formData.google_email || null
    };

    setIsSubmitting(true);
    try {
      await register(payload);
      toast.success('Registration successful! Welcome to CampusFlow.');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Registration failed. Please check your inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full bg-soft border border-borderColor text-primary rounded-xl py-3 pl-10 pr-4 outline-none focus:border-accentPrimary focus:ring-1 focus:ring-accentPrimary transition-all placeholder:text-secondary/50 text-sm";
  const labelClass = "text-[11px] font-semibold uppercase tracking-wider text-secondary ml-1 mb-1 block";

  const branchOptions = [
    { value: 'CSE', label: 'Computer Science' },
    { value: 'ECE', label: 'Electronics & Comm.' },
    { value: 'EEE', label: 'Electrical & Electronics' },
    { value: 'ME', label: 'Mechanical Engineering' },
    { value: 'CE', label: 'Civil Engineering' },
    { value: 'IT', label: 'Information Tech' }
  ];

  const yearOptions = [
    { value: '1', label: '1st Year' },
    { value: '2', label: '2nd Year' },
    { value: '3', label: '3rd Year' },
    { value: '4', label: '4th Year' }
  ];

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center relative overflow-hidden font-sans text-primary py-12">
      <div className="absolute inset-0 pointer-events-none opacity-10"
           style={{
             backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)',
             backgroundSize: '40px 40px',
             backgroundPosition: 'center center'
           }}
      />
      
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: 'var(--accent-secondary)', opacity: 0.1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 w-full max-w-2xl p-8 md:p-10 rounded-[2rem] shadow-2xl backdrop-blur-xl border relative"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold tracking-tight mb-2"
          >
            Create your Workspace
          </motion.div>
          <p className="text-secondary text-sm">
            Sign up to configure your academic automations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User size={16} className="text-secondary group-focus-within:text-accentPrimary transition-colors" />
                </div>
                <input type="text" required name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Rahul Sharma" />
              </div>
            </div>
            
            <div>
              <label className={labelClass}>WhatsApp Phone</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Phone size={16} className="text-secondary group-focus-within:text-accentPrimary transition-colors" />
                </div>
                <input type="text" required name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+919876543210" pattern="^\+[1-9]\d{9,14}$" title="Must use format +91XXXXXXXXXX" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Branch</label>
              <CustomSelect
                value={formData.branch}
                onChange={(val) => handleCustomChange('branch', val)}
                options={branchOptions}
                placeholder="Select Branch"
                icon={Building2}
              />
            </div>
            
            <div>
              <label className={labelClass}>Year of Study</label>
              <CustomSelect
                value={formData.year}
                onChange={(val) => handleCustomChange('year', val)}
                options={yearOptions}
                placeholder="Select Year"
                icon={GraduationCap}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Tracked Subjects (Press Enter)</label>
            <TagInput 
              tags={formData.subjects} 
              setTags={(newTags) => handleCustomChange('subjects', newTags)} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail size={16} className="text-secondary group-focus-within:text-accentPrimary transition-colors" />
                </div>
                <input type="email" required name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="name@college.edu" />
              </div>
            </div>
            
            <div>
              <label className={labelClass}>Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock size={16} className="text-secondary group-focus-within:text-accentPrimary transition-colors" />
                </div>
                <input type="password" required name="password" value={formData.password} onChange={handleChange} className={inputClass} placeholder="••••••••" minLength={6} />
              </div>
            </div>
          </div>

          <div>
            <label className={labelClass}>Google Email (Optional - for Calendar)</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail size={16} className="text-secondary group-focus-within:text-accentPrimary transition-colors" />
              </div>
              <input type="email" name="google_email" value={formData.google_email} onChange={handleChange} className={inputClass} placeholder="name@gmail.com" />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
            style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}
          >
            {isSubmitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                Create Account <ArrowRight size={18} />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="font-medium hover:underline" style={{ color: 'var(--accent-primary)' }}>
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
