import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const CYAN = '#00f0ff';

export default function WorkflowSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const phases = [
    {
      num: '01', color: CYAN,
      title: 'Environment Lockdown',
      desc: 'Upon execution, SDES seizes control of the active workspace. Distracting processes are identified and terminated. Web traffic is routed through the enforcement proxy. The device is now a secure facility.',
    },
    {
      num: '02', color: '#a5b4fc',
      title: 'Goal Alignment',
      desc: "Your pre-defined objectives are injected into the session. There is no 'what should I do now'. There is only the mission parameter. Your schedule is already loaded.",
    },
    {
      num: '03', color: '#ff0055',
      title: 'Unyielding Enforcement',
      desc: 'Attempting to break the lockdown triggers the EGO protocol. Warnings are minimal. Consequences are immediate. You will finish the work.',
    },
  ];

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 40px',
      background: 'transparent',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '900px',
        width: '100%',
      }}>
        {/* Top: Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px',
            padding: '6px 16px',
            borderRadius: '100px',
            background: `${CYAN}08`,
            border: `1px solid ${CYAN}30`,
            color: CYAN,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: CYAN, boxShadow: `0 0 8px ${CYAN}` }} />
            Application Workflow
          </div>

          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: isDark ? '#ffffff' : '#1e293b'
          }}>
            We Did Not Build An App.<br />
            <span style={{ color: isDark ? CYAN : '#4f46e5' }}>We Built a System.</span>
          </h2>
        </motion.div>

        {/* Bottom: Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{
            width: '100%',
            padding: '40px 48px',
            borderRadius: '24px',
            background: isDark ? 'rgba(10,10,18,0.7)' : 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
            boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            color: isDark ? '#94a3b8' : '#475569',
            lineHeight: '1.75',
            fontSize: '1.05rem',
          }}>
            The modern digital environment is built for distraction. Every interface is optimized to harvest your attention. SDES was engineered to destroy this dynamic entirely.
          </p>

          {phases.map(({ num, color, title, desc }) => (
            <div key={num} style={{ display: 'flex', gap: '16px' }}>
              <span style={{
                display: 'inline-block',
                padding: '3px 10px',
                height: 'fit-content',
                borderRadius: '6px',
                fontSize: '12px',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                flexShrink: 0,
                marginTop: '3px',
                color,
                background: `${color}10`,
                border: `1px solid ${color}25`,
              }}>
                {num}
              </span>
              <div>
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: '18px',
                  marginBottom: '8px',
                  color: isDark ? '#ffffff' : '#0f172a',
                }}>
                  {title}
                </h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  color: isDark ? '#94a3b8' : '#475569',
                  lineHeight: '1.7',
                  fontSize: '14px',
                }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}

          <p style={{ color: isDark ? CYAN : '#4f46e5', fontWeight: 600, fontSize: '15px' }}>
            We did not build another productivity tool. We built an operating system that forces you to succeed.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
