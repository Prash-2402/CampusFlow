import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Calendar, Sparkles, ArrowRight, Clock, AlertCircle, ArrowDown } from 'lucide-react';
import CanvasSequence from '../components/landing/CanvasSequence';

const C = {
  bg: '#0F0A12',
  surface: '#17101C',
  primary: '#C0446A',
  secondary: '#903050',
  gold: '#C9A84C',
  text: '#FFFFFF',
  dim: 'rgba(255,255,255,0.65)',
  border: 'rgba(255,255,255,0.08)',
};

// Fast, snappy enter. mode="wait" means exit must finish before enter starts.
// Exit is only 80ms, so total lag = 80ms — imperceptible.
const ENTER_TX = { duration: 0.28, ease: [0.22, 1, 0.36, 1] };
const EXIT_TX = { duration: 0.08, ease: 'easeIn' };

const FRAMES = [1, 40, 80, 120, 192, 192, 192, 192, 192, 192, 192];
const OPACITY = [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0];

// Shared motion props for all slides
const SLIDE = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function IntroPage() {
  const [phase, setPhase] = useState(0);
  const navigate = useNavigate();
  const phaseRef = useRef(0);
  const cooldown = useRef(false);
  const accumRef = useRef(0);
  const lastDirRef = useRef(null); // track direction to reset accumulator on reversal
  const touchY = useRef(0);

  useEffect(() => { phaseRef.current = phase; }, [phase]);

  useEffect(() => {
    function advancePhase(dir) {
      // Already in cooldown — ignore completely
      if (cooldown.current) return;
      cooldown.current = true;
      accumRef.current = 0; // flush accumulator

      const next = dir === 'down'
        ? Math.min(phaseRef.current + 1, 10)
        : Math.max(phaseRef.current - 1, 0);

      phaseRef.current = next;
      setPhase(next);

      // ONE-SHOT cooldown: 700ms, never reset by momentum.
      // After 700ms, also flush accumulator so leftover momentum
      // can't immediately trigger the next slide.
      setTimeout(() => {
        cooldown.current = false;
        accumRef.current = 0;
      }, 700);
    }

    function onWheel(e) {
      e.preventDefault();

      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 30;
      if (e.deltaMode === 2) delta *= 500;

      const dir = delta > 0 ? 'down' : 'up';

      // Direction reversal: user changed mind — reset accumulator so
      // the new direction starts fresh (prevents carry-over momentum)
      if (lastDirRef.current && lastDirRef.current !== dir) {
        accumRef.current = 0;
      }
      lastDirRef.current = dir;

      if (cooldown.current) {
        accumRef.current = 0;
        return;
      }

      accumRef.current += delta;

      // Threshold 100px: catches a mouse wheel click and deliberate trackpad swipe.
      // High enough that decaying momentum rarely re-crosses it after cooldown.
      if (Math.abs(accumRef.current) >= 100) {
        advancePhase(dir);
      }
    }

    function onTouchStart(e) { touchY.current = e.touches[0].clientY; }
    function onTouchMove(e) {
      const dy = touchY.current - e.touches[0].clientY;
      if (Math.abs(dy) >= 35) {
        touchY.current = e.touches[0].clientY; // reset anchor
        advancePhase(dy > 0 ? 'down' : 'up');
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []); // empty: all logic uses refs only

  function Slide({ children, k, className = '' }) {
    return (
      <motion.div
        key={k}
        {...SLIDE}
        transition={ENTER_TX}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className="w-full h-screen overflow-hidden relative select-none"
      style={{ background: C.bg, color: C.text, fontFamily: 'sans-serif' }}
    >
      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        opacity: 0.09,
        backgroundImage: `linear-gradient(${C.border} 1px,transparent 1px),linear-gradient(90deg,${C.border} 1px,transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Ambient glow */}
      <div className="absolute rounded-full pointer-events-none" style={{
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 580, height: 580, background: C.primary, filter: 'blur(100px)',
        opacity: (phase >= 7 && phase <= 8) ? 0.12 : 0.04, transition: 'opacity 600ms ease',
      }} />

      {/* Cinematic dark overlay — fades in when transitioning from canvas → UI cards.
           This prevents the abrupt canvas-disappears-then-cards-appear jump.
           At phase 0-4 it's transparent; at phase 5+ it darkens to create a
           smooth "fade to black → fade in cards" feel. */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(15,10,18,0.3) 0%, rgba(15,10,18,0.75) 100%)',
          opacity: phase >= 5 ? 1 : phase === 4 ? 0.5 : 0,
          transition: 'opacity 700ms ease',
        }}
      />

      {/* Canvas background */}
      <CanvasSequence
        targetFrameIndex={FRAMES[phase] ?? 1}
        opacity={OPACITY[phase] ?? 0}
      />

      {/* ─── Slides ─────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center z-[2]">
        <AnimatePresence mode="wait">

          {phase === 0 && (
            <motion.div key="s0" {...SLIDE} transition={ENTER_TX}
              className="flex flex-col items-center gap-5 text-center px-4 z-10">
              <h1 style={{ fontSize: 'clamp(2.5rem,8vw,5rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1 }}>
                CampusFlow
              </h1>
              <p style={{ fontSize: 'clamp(1rem,2.5vw,1.5rem)', fontWeight: 300, color: C.dim }}>
                The Student Operating System
              </p>
            </motion.div>
          )}

          {phase === 1 && (
            <motion.h2 key="s1" {...SLIDE} transition={ENTER_TX}
              className="z-10 max-w-4xl text-center px-6"
              style={{
                fontSize: 'clamp(1.5rem,5vw,3.5rem)', fontWeight: 600, lineHeight: 1.25,
                textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,0.6)'
              }}>
              The average student loses hours every week...
            </motion.h2>
          )}

          {phase === 2 && (
            <motion.h2 key="s2" {...SLIDE} transition={ENTER_TX}
              className="z-10 max-w-4xl text-center px-6"
              style={{
                fontSize: 'clamp(1.5rem,5vw,3.5rem)', fontWeight: 600, lineHeight: 1.25,
                textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,0.6)'
              }}>
              ...searching for information.
            </motion.h2>
          )}

          {phase === 3 && (
            <motion.h2 key="s3" {...SLIDE} transition={ENTER_TX}
              className="z-10 max-w-4xl text-center px-6"
              style={{
                fontSize: 'clamp(1.5rem,5vw,3.5rem)', fontWeight: 600, lineHeight: 1.25,
                textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,0.6)'
              }}>
              ...CampusFlow organizes the chaos.
            </motion.h2>
          )}

          {phase === 4 && (
            <motion.h2 key="s4" {...SLIDE} transition={ENTER_TX}
              className="z-10 text-center uppercase"
              style={{
                fontSize: 'clamp(1.4rem,3.5vw,2.8rem)',
                fontWeight: 300,
                letterSpacing: '0.35em',
                color: 'rgba(255,255,255,0.95)',
                textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)',
              }}>
              Everything. Calm.
            </motion.h2>
          )}

          {phase === 5 && (
            <motion.div key="s5" {...SLIDE} transition={ENTER_TX}
              className="z-10 flex flex-col gap-3 w-full px-4"
              style={{ maxWidth: 360 }}>
              <div style={{ alignSelf: 'flex-start', maxWidth: 260, padding: '12px 20px', borderRadius: 18, borderTopLeftRadius: 4, fontSize: 14, background: C.surface, border: `1px solid ${C.border}` }}>
                Lab submission extended till friday, pls inform everyone.
              </div>
              <div style={{ alignSelf: 'flex-end', maxWidth: 260, padding: '12px 20px', borderRadius: 18, borderBottomRightRadius: 4, fontSize: 14, background: C.surface, border: `1px solid ${C.border}` }}>
                CIA 2 schedule updated on notice board!! Check fast.
              </div>
              <div style={{ padding: '16px 24px', borderRadius: 18, borderBottomLeftRadius: 4, background: C.surface, border: `1px solid ${C.primary}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.primary }}>CSE Group</span>
                  <span style={{ fontSize: 10, color: C.dim }}>11:59 PM</span>
                </div>
                <p style={{ margin: 0, fontWeight: 500 }}>OS Assignment 3 is due tomorrow night!</p>
              </div>
            </motion.div>
          )}

          {phase === 6 && (
            <motion.div key="s6" {...SLIDE} transition={ENTER_TX}
              className="z-10 flex flex-col items-center" style={{ gap: 20 }}>
              <div style={{ padding: '16px 24px', borderRadius: 18, width: 300, background: '#1B1E36', border: `1px solid ${C.primary}`, boxShadow: `0 0 40px ${C.primary}40` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.primary }}>CSE Group</span>
                  <span style={{ fontSize: 10, color: C.dim }}>11:59 PM</span>
                </div>
                <p style={{ margin: 0, fontWeight: 500 }}>OS Assignment 3 is due tomorrow night!</p>
              </div>
              <p style={{ fontSize: 13, letterSpacing: '0.15em', fontFamily: 'monospace', color: C.secondary }}>
                CampusFlow AI is analyzing...
              </p>
            </motion.div>
          )}

          {phase === 7 && (
            <motion.div key="s7" {...SLIDE} transition={ENTER_TX}
              className="z-10 flex flex-col gap-4"
              style={{ width: 320, borderRadius: 24, padding: 24, background: C.surface, border: `1px solid ${C.primary}55`, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sparkles size={15} color={C.primary} />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: C.primary }}>AI Summary</span>
              </div>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>OS Assignment 3</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <InfoRow icon={<Clock size={13} color={C.gold} />} label="Deadline" value="Tomorrow, 11:59 PM" />
                <InfoRow icon={<AlertCircle size={13} color={C.primary} />} label="Action" value="Schedule Study Block" />
              </div>
            </motion.div>
          )}

          {phase === 8 && (
            <motion.div key="s8" {...SLIDE} transition={ENTER_TX}
              className="z-10 flex" style={{ gap: 16 }}>
              <AutoCard icon={<MessageCircle size={18} color="#22c55e" />}
                iconBg="rgba(34,197,94,0.1)" border="rgba(34,197,94,0.4)"
                title="WhatsApp" badge="Reminder Sent" badgeColor="#4ade80" />
              <AutoCard icon={<Calendar size={18} color={C.gold} />}
                iconBg={`${C.gold}18`} border={`${C.gold}50`}
                title="Google Calendar" badge="Event Created" badgeColor={C.gold} />
            </motion.div>
          )}

          {phase === 9 && (
            <motion.div key="s9" {...SLIDE} transition={ENTER_TX}
              className="z-10 flex flex-col" style={{ width: 'min(820px,95vw)', height: 460, borderRadius: 28, padding: 28, background: C.bg, border: `1px solid ${C.border}`, boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20, borderBottom: `1px solid ${C.border}`, marginBottom: 20 }}>
                <div style={{ width: 144, height: 28, borderRadius: 10, background: C.surface }} />
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: C.surface }} />
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: C.surface }} />
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', gap: 20 }}>
                <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ flex: 1, borderRadius: 20, background: C.surface }} />
                  <div style={{ flex: 1.5, borderRadius: 20, background: C.surface, display: 'flex', padding: 16, gap: 12 }}>
                    <div style={{ flex: 1, borderRadius: 12, background: C.bg, border: `1px solid ${C.border}` }} />
                    <div style={{ flex: 1, borderRadius: 12, background: C.bg, border: `1px solid ${C.border}` }} />
                  </div>
                </div>
                <div style={{ flex: 1, borderRadius: 20, background: C.surface, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[40, 52, 52, 52].map((h, i) => <div key={i} style={{ height: h, borderRadius: 10, background: C.bg }} />)}
                </div>
              </div>
            </motion.div>
          )}

          {phase === 10 && (
            <motion.div key="s10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-auto"
              style={{ background: 'rgba(13,10,18,0.85)', backdropFilter: 'blur(16px)' }}>
              <motion.div
                initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.12, ...ENTER_TX }}
                className="text-center flex flex-col items-center">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, marginBottom: 28, background: `${C.primary}22`, color: C.primary }}>
                  <Sparkles size={13} />
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ready</span>
                </div>
                <h1 style={{ fontSize: 'clamp(2rem,6vw,3.5rem)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 16 }}>Welcome to CampusFlow</h1>
                <p style={{ fontSize: 'clamp(1rem,2vw,1.25rem)', fontWeight: 300, marginBottom: 40, color: C.dim, maxWidth: 420 }}>
                  The operating system for student life.
                </p>
                <button
                  onClick={() => navigate('/dashboard')}
                  style={{ padding: '16px 32px', borderRadius: 99, fontWeight: 600, fontSize: 18, display: 'inline-flex', alignItems: 'center', gap: 12, background: C.text, color: C.bg, border: 'none', cursor: 'pointer', transition: 'transform 120ms ease, box-shadow 120ms ease', boxShadow: '0 0 0 0 rgba(255,255,255,0)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,255,255,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  Enter Workspace <ArrowRight size={18} />
                </button>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {phase < 10 && (
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 pointer-events-none" style={{ opacity: 0.4 }}>
          <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.15em', color: C.dim }}>Scroll</span>
          <ArrowDown size={11} color={C.dim} />
        </div>
      )}
    </div>
  );
}

/* ── Helper components ─────────────────────────────── */
function InfoRow({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.2)' }}>
      {icon}
      <div>
        <p style={{ margin: 0, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.5)' }}>{label}</p>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{value}</p>
      </div>
    </div>
  );
}

function AutoCard({ icon, iconBg, border, title, badge, badgeColor }) {
  return (
    <div style={{ width: 185, height: 138, borderRadius: 24, padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: '#17101C', border: `1px solid ${border}` }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, background: iconBg }}>
        {icon}
      </div>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{title}</p>
      <p style={{ margin: 0, marginTop: 4, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: badgeColor }}>{badge}</p>
    </div>
  );
}
