import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import GlobalBackground from '../components/GlobalBackground';
import Navbar from '../components/Navbar';

interface Step {
  num: string;
  title: string;
  desc: string;
  detail: string;
  badge: string;
  color: string;
}

const steps: Step[] = [
  {
    num: '01',
    title: 'Download SDES',
    badge: 'Acquisition',
    color: '#00f0ff',
    desc: 'Get the SDES enforcement agent for your platform.',
    detail: 'Visit the download section and choose your platform — Windows 10/11 desktop agent or the Browser Extension for web enforcement. Both are standalone and install without dependencies.',
  },
  {
    num: '02',
    title: 'Run the Installer',
    badge: 'Installation',
    color: '#a5b4fc',
    desc: 'Run as Administrator for full system-level access.',
    detail: 'Double-click the installer executable. When prompted, click "Run as Administrator" — this is required for SDES to access system-level enforcement capabilities including process management and network filtering.',
  },
  {
    num: '03',
    title: 'Configure Your Mission',
    badge: 'Configuration',
    color: '#00f0ff',
    desc: 'Set your study schedule, blocked apps, and focus goals.',
    detail: 'Open SDES Dashboard. Create your first Study Session — set the duration, select apps and websites to block, and define your goal for this session. You can save session templates for reuse.',
  },
  {
    num: '04',
    title: 'Activate Strict Mode',
    badge: 'Activation',
    color: '#ff0055',
    desc: 'Press Enforce. The system takes over.',
    detail: 'Click "Start Enforcement". SDES immediately activates all configured rules. Blocked apps are terminated. Restricted websites return access-denied. Your focus session has begun. The timer runs until you complete it.',
  },
  {
    num: '05',
    title: 'Install Browser Extension',
    badge: 'Web Enforcement',
    color: '#00FF41',
    desc: 'Add the Browser Enforcer for full web coverage.',
    detail: 'Install the SDES Browser Extension from the extension store (Chrome/Edge/Firefox). Link it to your desktop agent using the pairing code shown in the dashboard. All web blocking rules sync automatically.',
  },
];

export default function SetupGuidePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textColor = isDark ? '#94a3b8' : '#475569';
  const headingColor = isDark ? '#ffffff' : '#1e293b';
  const accent = isDark ? '#00f0ff' : '#6366f1';

  return (
    <div style={{
      background: 'transparent',
      color: isDark ? '#ffffff' : '#1e293b',
      minHeight: '100vh',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <Navbar />
      <GlobalBackground />

      <main style={{ paddingTop: '120px', paddingBottom: '120px', maxWidth: '900px', margin: '0 auto', padding: '120px 40px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            marginBottom: '24px', padding: '6px 18px', borderRadius: '100px',
            background: `${accent}08`, border: `1px solid ${accent}30`, color: accent,
            fontFamily: "'JetBrains Mono', monospace", fontSize: '11px',
            fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const,
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accent, boxShadow: `0 0 8px ${accent}` }} />
            Setup Guide
          </div>

          <h1 style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 900,
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em',
            lineHeight: 1.1, color: headingColor, marginBottom: '20px',
          }}>
            Get SDES Running{' '}
            <span style={{ color: accent }}>In 5 Steps</span>
          </h1>

          <p style={{
            color: textColor, fontSize: '1.1rem', lineHeight: 1.7,
            maxWidth: '580px', margin: '0 auto',
          }}>
            From download to full enforcement mode — this guide walks you through every step of setting up SDES on your device.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div style={{ position: 'relative' }}>

          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: '28px', top: '24px',
            bottom: '24px', width: '2px',
            background: isDark
              ? 'linear-gradient(to bottom, rgba(0,240,255,0.3), rgba(0,240,255,0.05))'
              : 'linear-gradient(to bottom, rgba(99,102,241,0.3), rgba(99,102,241,0.05))',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}
              >
                {/* Step circle */}
                <div style={{
                  flexShrink: 0,
                  width: '56px', height: '56px',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isDark ? 'rgba(10,10,18,0.9)' : 'rgba(255,255,255,0.9)',
                  border: `2px solid ${step.color}`,
                  boxShadow: `0 0 20px ${step.color}25`,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 900, fontSize: '14px',
                  color: step.color,
                  zIndex: 1,
                }}>
                  {step.num}
                </div>

                {/* Content card */}
                <div style={{
                  flex: 1,
                  padding: '28px 32px',
                  borderRadius: '20px',
                  background: isDark ? 'rgba(10,10,18,0.7)' : 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
                  boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.07)',
                }}>
                  {/* Badge */}
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '3px 12px', borderRadius: '6px',
                      fontSize: '11px', fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const,
                      background: `${step.color}10`,
                      border: `1px solid ${step.color}25`,
                      color: step.color,
                    }}>
                      {step.badge}
                    </span>
                  </div>

                  <h2 style={{
                    fontFamily: "'Outfit', sans-serif", fontWeight: 800,
                    fontSize: '22px', letterSpacing: '-0.01em',
                    color: isDark ? '#ffffff' : '#1e293b',
                    marginBottom: '8px',
                  }}>
                    {step.title}
                  </h2>

                  <p style={{
                    color: step.color, fontWeight: 600,
                    fontSize: '14px', marginBottom: '12px',
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    {step.desc}
                  </p>

                  <p style={{
                    color: textColor, lineHeight: '1.75',
                    fontSize: '15px', fontFamily: "'Inter', sans-serif",
                  }}>
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginTop: '80px' }}
        >
          <p style={{
            color: textColor, fontSize: '16px', marginBottom: '28px',
            fontFamily: "'Inter', sans-serif",
          }}>
            Ready to enforce your goals?
          </p>
          <a
            href="#"
            onClick={e => e.preventDefault()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '16px 40px', borderRadius: '14px',
              background: isDark
                ? 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(0,240,255,0.06))'
                : 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.07))',
              border: isDark ? '1px solid rgba(0,240,255,0.4)' : '1px solid rgba(99,102,241,0.4)',
              color: isDark ? '#ffffff' : '#1e1b4b',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700, fontSize: '16px',
              textDecoration: 'none',
              transition: 'all 0.3s',
            }}
          >
            ⬇ Download SDES Now
          </a>
        </motion.div>
      </main>
    </div>
  );
}
