import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Apple, Terminal, Globe, Smartphone } from 'lucide-react';
import { Routes, Route } from 'react-router-dom';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import GlobalBackground from './components/GlobalBackground';
import DownloadCard from './components/DownloadCard';
import Hero from './components/Hero';
import WorkflowSection from './components/WorkflowSection';
import CanvasSequence from './components/CanvasSequence';
import Navbar from './components/Navbar';
import SetupGuidePage from './pages/SetupGuidePage';

function SectionBadge({ text, color }: { text: string; color: string }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      marginBottom: '20px', padding: '6px 16px', borderRadius: '100px',
      background: `${color}08`, border: `1px solid ${color}30`, color,
      fontFamily: "'JetBrains Mono', monospace", fontSize: '11px',
      fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const,
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}`, flexShrink: 0 }} />
      {text}
    </div>
  );
}

function TextSection({ badge, badgeColor, title, accentWord, accentColor, paragraphs, id }: {
  badge: string; badgeColor: string; title: string; accentWord: string; accentColor: string; paragraphs: string[]; id?: string;
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id={id} style={{
      position: 'relative', minHeight: '100svh', width: '100%',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '120px 6vw', background: 'transparent',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '1200px', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '8vh', width: '100%' }}
        >
          <SectionBadge text={badge} color={badgeColor} />
          <h2 style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 900,
            fontSize: 'clamp(3rem, 6vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1.05,
            color: isDark ? '#ffffff' : '#0f172a',
            marginTop: '24px'
          }}>
            {title}{' '}
            <span style={{ color: accentColor }}>{accentWord}</span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px', width: '100%'
        }}>
          {paragraphs.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: '40px', borderRadius: '24px',
                background: isDark ? 'rgba(10,10,18,0.4)' : 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.6)',
                boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,0,0,0.05)',
                display: 'flex', alignItems: 'center'
              }}
            >
              <p style={{
                fontFamily: "'Inter', sans-serif",
                color: isDark ? '#94a3b8' : '#334155',
                lineHeight: '1.8', fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
                fontWeight: 400
              }}>{p}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const CYAN = '#00f0ff';
  const PINK = '#ff0055';

  return (
    <div style={{
      color: isDark ? '#ffffff' : '#1e293b',
      transition: 'color 0.3s ease',
    }}>
      <Hero />
      
      <div id="workflow">
        <WorkflowSection />
      </div>

      <div id="sdes-main" style={{ position: 'relative' }}>
        <CanvasSequence folderPath="/frames/SDES_FRAMES_MAIN" frameCount={150} pinDuration={3000} />
        <TextSection badge="Discipline Enforcement OS" badgeColor={CYAN} title="SDES V3: The Full" accentWord="System" accentColor={CYAN}
          paragraphs={["SDES is not a productivity app. It is a personal enforcement operating system — built for those who are tired of managing themselves manually.", "SDES manages it for you. Automatically, relentlessly, without negotiation. Four systems. One mission. Total focus. Total discipline. Total control.", "Your goals do not wait for motivation. SDES makes sure you never have to wait either."]} />
      </div>

      <CanvasSequence folderPath="/frames/STRICT_FRAMES" frameCount={120} pinDuration={2500} />
      <TextSection badge="Enforcement Layer 01" badgeColor={CYAN} title="S - Strict" accentWord="Mode" accentColor={CYAN}
        paragraphs={["You are now in a restricted environment. Think of it as a locked room built entirely for one purpose — your work.", "No social media. No entertainment. No browser tabs that don't serve your mission. SDES enforces this boundary automatically.", "You will sit. You will focus. You will complete what you started. Not because you feel motivated, but because the system leaves you no other option.", "This is not restriction. This is the architecture of achievement."]} />

      <CanvasSequence folderPath="/frames/DISCIPLINE_FRAMES" frameCount={120} pinDuration={2500} />
      <TextSection badge="Consistency Protocol" badgeColor="#a5b4fc" title="D - Discipline" accentWord="Engine" accentColor={isDark ? '#a5b4fc' : '#6366f1'}
        paragraphs={["Motivation is a feeling. Feelings are unreliable. Systems are not.", "SDES does not ask how you feel today. It asks what is scheduled for today. Then it makes sure you do it.", "Every day you open SDES — your schedule is already waiting. Your tasks are already loaded. Your session has already begun.", "One session builds a habit. One habit builds an identity. One identity changes everything. You will not miss a day."]} />

      <CanvasSequence folderPath="/frames/EGO_FRAMES" frameCount={150} pinDuration={3000} />
      <TextSection badge="Threat Termination" badgeColor={PINK} title="E - EGO" accentWord="Enforcer" accentColor={PINK}
        paragraphs={["Your schedule is protected by EGO. EGO does not negotiate. EGO does not warn twice.", "Your time is not a resource to be wasted. Your mission cannot afford interruption.", "EGO treats every distraction as a threat — and eliminates every threat without mercy.", "This is not parental control. This is your own ambition, enforced by code."]} />

      <CanvasSequence folderPath="/frames/SYSTEM_FRAMES" frameCount={150} pinDuration={3000} />
      <TextSection badge="Core System Status" badgeColor="#00FF41" title="S - The Full" accentWord="System" accentColor="#00FF41"
        paragraphs={["Strict, Discipline, Ego — all running. The system is not four features. It is one organism.", "You open your laptop — SDES is already waiting. You open your browser — SDES is already watching.", "There is no gap between sessions. There is no gap between your goals and your execution.", "SDES is not something you use. SDES is something you live inside."]} />

      {/* ── Download ── */}
      <section id="download-section" style={{
        position: 'relative', width: '100%', display: 'flex',
        flexDirection: 'column', alignItems: 'center',
        padding: '120px 40px', background: 'transparent',
      }}>
        <SectionBadge text="Acquire The System" color={CYAN} />
        <h2 style={{
          fontFamily: "'Outfit', sans-serif", fontWeight: 900,
          textAlign: 'center', marginBottom: '12px',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em',
          color: isDark ? '#ffffff' : '#1e293b'
        }}>
          Build The <span style={{ color: CYAN }}>Target.</span>
        </h2>
        <p style={{ color: isDark ? '#64748b' : '#64748b', fontSize: '16px', marginBottom: '64px', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
          Let SDES build the discipline.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px', maxWidth: '1280px', width: '100%', marginBottom: '80px',
        }}>
          <DownloadCard title="Windows 10 / 11" subtitle="Full desktop enforcement agent for maximum focus and system-level lockdown." status="AVAILABLE" icon={Monitor} accentColor={CYAN} buttonText="Download Desktop App" />
          <DownloadCard title="Browser Extension" subtitle="Cross-browser web enforcer. Blocks procrastination sites with zero lag." status="AVAILABLE" icon={Globe} accentColor={PINK} buttonText="Get Web Enforcer" />
          <DownloadCard title="macOS" subtitle="Mac enforcement agent with kernel-level web traffic monitoring." status="COMING SOON" icon={Apple} accentColor={isDark ? '#94a3b8' : '#64748b'} buttonText="Coming Soon" disabled />
          <DownloadCard title="Linux" subtitle="Linux enforcement agent built for productivity and development environments." status="COMING SOON" icon={Terminal} accentColor={isDark ? '#94a3b8' : '#64748b'} buttonText="Coming Soon" disabled />
          <DownloadCard title="Mobile Companion" subtitle="Android & iOS mission sync. Never lose your focus stack on the go." status="COMING SOON" icon={Smartphone} accentColor={isDark ? '#94a3b8' : '#64748b'} buttonText="Coming Soon" disabled />
        </div>

        <div style={{ width: '100%', maxWidth: '500px', height: '1px', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)', marginBottom: '40px' }} />
        <p style={{ color: isDark ? '#64748b' : '#64748b', textAlign: 'center', maxWidth: '520px', lineHeight: '2.0', fontSize: '15px', fontFamily: "'Inter', sans-serif" }}>
          The difference between dreams and achievements is not talent. Not time. Not luck.<br />
          It is execution — disciplined, enforced, and repeated until it becomes who you are.
        </p>
      </section>
    </div>
  );
}

function AppContent() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const CYAN = '#00f0ff';

  return (
    <main style={{
      background: 'transparent',
      minHeight: '100svh', position: 'relative', overflowX: 'hidden',
    }}>
      <Navbar />
      <GlobalBackground />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<SetupGuidePage />} />
      </Routes>

      {/* ── Footer ── */}
      <footer id="site-footer" style={{
        width: '100%', padding: '80px 40px', textAlign: 'center',
        borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.08)',
        background: 'transparent',
      }}>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif", fontWeight: 900,
          fontSize: '32px', letterSpacing: '-0.02em', marginBottom: '16px',
          color: isDark ? '#ffffff' : '#1e293b'
        }}>
          S<span style={{ color: CYAN }}>D</span>ES
        </h2>
        <div style={{ color: isDark ? '#64748b' : '#64748b', fontSize: '12px', letterSpacing: '0.3em', marginBottom: '24px', textTransform: 'uppercase' as const, fontWeight: 600 }}>
          Strict · Discipline · Ego · System
        </div>
        <div style={{ color: isDark ? '#334155' : '#94a3b8', fontSize: '12px' }}>© 2025 SDES. All rights reserved.</div>
      </footer>
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
