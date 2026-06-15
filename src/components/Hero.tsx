import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';
import { ChevronDown, Monitor, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const CYAN = '#00f0ff';
const PINK = '#ff0055';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0.97, 1, 1, 0.97]);

  return (
    <motion.section
      id="hero"
      ref={containerRef}
      style={{ opacity, scale, background: 'transparent' }}
      className="relative min-h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden pt-32 pb-20"
    >
      <ParticleCanvas
        mode="converge"
        particleCount={100}
        color={isDark ? "rgba(0, 240, 255, 0.3)" : "rgba(99,102,241,0.3)"}
        connections
      />

      <div className="z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl w-full">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '32px',
            padding: '6px 16px',
            borderRadius: '100px',
            background: isDark ? 'rgba(0,240,255,0.05)' : 'rgba(99,102,241,0.06)',
            border: isDark ? '1px solid rgba(0,240,255,0.22)' : '1px solid rgba(99,102,241,0.25)',
            color: isDark ? CYAN : '#6366f1',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
          }}
        >
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: isDark ? CYAN : '#6366f1',
            boxShadow: isDark ? `0 0 8px ${CYAN}` : '0 0 8px #6366f1',
            flexShrink: 0,
          }} />
          SDES Ecosystem Showcase
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '24px',
            fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
            letterSpacing: '-0.02em',
            color: isDark ? '#ffffff' : '#1e293b'
          }}
        >
          SDES V3: The Relentless <br />
          <span style={{ color: isDark ? CYAN : '#4f46e5' }}>Focus Engine</span>
          {' '}&amp; Digital Bodyguard
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            color: isDark ? '#94a3b8' : '#64748b',
            lineHeight: 1.65,
            maxWidth: '680px',
            marginBottom: '40px',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          }}
        >
          A strict system-level discipline enforcement engine engineered to eliminate digital distractions, manage active study workflows, and force absolute focus.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', width: '100%', maxWidth: '580px' }}
        >
          <a href="#" onClick={e => { e.preventDefault(); document.getElementById('download-section')?.scrollIntoView({ behavior: 'smooth' }); }} style={{
            flex: '1 1 240px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            padding: '15px 28px', borderRadius: '14px',
            fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '15px',
            color: isDark ? '#ffffff' : '#1e1b4b',
            textDecoration: 'none', transition: 'all 0.3s',
            background: isDark
              ? 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(0,240,255,0.05))'
              : 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.06))',
            border: isDark ? '1px solid rgba(0,240,255,0.4)' : '1px solid rgba(99,102,241,0.4)',
            backdropFilter: 'blur(12px)',
          }}>
            <Monitor size={18} /> Download Desktop App
          </a>
          <a href="#" onClick={e => { e.preventDefault(); document.getElementById('download-section')?.scrollIntoView({ behavior: 'smooth' }); }} style={{
            flex: '1 1 240px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            padding: '15px 28px', borderRadius: '14px',
            fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '15px',
            color: isDark ? '#ffffff' : '#7f1d1d',
            textDecoration: 'none', transition: 'all 0.3s',
            background: isDark
              ? 'linear-gradient(135deg, rgba(255,0,85,0.12), rgba(255,0,85,0.04))'
              : 'linear-gradient(135deg, rgba(239,68,68,0.12), rgba(239,68,68,0.05))',
            border: isDark ? '1px solid rgba(255,0,85,0.35)' : '1px solid rgba(239,68,68,0.35)',
            backdropFilter: 'blur(12px)',
          }}>
            <Globe size={18} /> Get Browser Enforcer
          </a>
        </motion.div>
      </div>

      <motion.div
        style={{ position: 'absolute', bottom: '32px', color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)' }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </motion.section>
  );
}
