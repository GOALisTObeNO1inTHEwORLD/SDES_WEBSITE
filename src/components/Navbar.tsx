import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { id: 'home',    label: 'Home',        section: 'hero',      route: '/' },
  { id: 'about',   label: 'About SDES',  section: 'sdes-main', route: '/' },
  { id: 'workflow',label: 'Workflow',     section: 'workflow',  route: '/' },
  { id: 'setup',   label: 'Setup Guide', section: null,        route: '/setup' },
  { id: 'faq',     label: 'FAQ',         section: 'footer',    route: '/' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const location = useLocation();

  // ── Track scroll position for active state ──
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Map scroll Y to active section (rough breakpoints)
      const y = window.scrollY + 120;
      const sections: { id: string; el: HTMLElement | null }[] = [
        { id: 'hero',      el: document.getElementById('hero') },
        { id: 'workflow',  el: document.getElementById('workflow') },
        { id: 'sdes-main', el: document.getElementById('sdes-main') },
        { id: 'footer',    el: document.getElementById('site-footer') },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const { id, el } = sections[i];
        if (el && el.offsetTop <= y) {
          // map element ids back to nav ids
          if (id === 'hero')      setActive('home');
          else if (id === 'workflow') setActive('workflow');
          else if (id === 'sdes-main') setActive('about');
          else if (id === 'footer')  setActive('faq');
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Sync active with route ──
  useEffect(() => {
    if (location.pathname === '/setup') setActive('setup');
    else setActive('home');
  }, [location.pathname]);

  // ── Handle nav click ──
  const handleNav = (link: typeof navLinks[0]) => {
    setActive(link.id);

    if (link.route === '/setup') {
      navigate('/setup');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      // After navigation, scroll to section
      setTimeout(() => scrollToSection(link.section), 300);
      return;
    }

    scrollToSection(link.section);
  };

  const scrollToSection = (sectionId: string | null) => {
    if (!sectionId) return;
    const el = document.getElementById(sectionId === 'hero' ? 'hero' : sectionId);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 56;
      window.scrollTo({ top: y, behavior: 'auto' });
    } else if (sectionId === 'footer') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' });
    }
  };

  const accent = isDark ? '#00f0ff' : '#6366f1';

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}
    >
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        height: '56px',
        background: isDark
          ? (scrolled ? 'rgba(2,4,8,0.4)' : 'rgba(2,4,8,0.15)')
          : (scrolled ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)'),
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: isDark
          ? '1px solid rgba(255,255,255,0.07)'
          : '1px solid rgba(0,0,0,0.08)',
        boxShadow: scrolled
          ? (isDark ? '0 4px 30px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.08)')
          : 'none',
        transition: 'all 0.3s ease',
      }}>

        {/* ── Logo ── */}
        <button onClick={() => handleNav(navLinks[0])} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: '22px',
            letterSpacing: '-0.02em',
            color: isDark ? '#ffffff' : '#1e293b',
          }}>
            S<span style={{ color: accent }}>D</span>ES
          </span>
        </button>

        {/* ── Nav Links ── */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          {navLinks.map((link) => {
            const isActive = active === link.id;
            const isSetup = link.id === 'setup';
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link)}
                style={{
                  position: 'relative',
                  background: isActive
                    ? (isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.07)')
                    : 'transparent',
                  border: isActive
                    ? `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`
                    : '1px solid transparent',
                  borderRadius: '10px',
                  color: isActive
                    ? (isDark ? '#ffffff' : '#0f172a')
                    : isSetup
                      ? accent
                      : (isDark ? 'rgba(148,163,184,0.85)' : 'rgba(71,85,105,0.85)'),
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: isSetup ? 700 : 600,
                  fontSize: '14px',
                  padding: '8px 18px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = isDark ? '#ffffff' : '#0f172a';
                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = isSetup ? accent : (isDark ? 'rgba(148,163,184,0.85)' : 'rgba(71,85,105,0.85)');
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {link.label}
                {isActive && (
                  <span style={{
                    position: 'absolute', bottom: '4px', left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'block', width: '16px', height: '2px',
                    borderRadius: '99px', background: accent,
                    boxShadow: `0 0 8px ${accent}`,
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* ── Right: Theme Toggle + Download ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <button
            onClick={toggleTheme}
            title={isDark ? 'Light Mode' : 'Dark Mode'}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '38px', height: '38px', borderRadius: '10px',
              background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
              color: isDark ? '#94a3b8' : '#64748b',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.09)';
              e.currentTarget.style.color = isDark ? '#fff' : '#0f172a';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
              e.currentTarget.style.color = isDark ? '#94a3b8' : '#64748b';
            }}
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('download-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else if (location.pathname !== '/') { navigate('/'); setTimeout(() => document.getElementById('download-section')?.scrollIntoView({ behavior: 'smooth' }), 400); }
            }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '9px 20px', borderRadius: '10px',
              background: isDark
                ? 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(0,240,255,0.07))'
                : 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.08))',
              border: isDark ? '1px solid rgba(0,240,255,0.4)' : '1px solid rgba(99,102,241,0.4)',
              color: isDark ? '#ffffff' : '#3730a3',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700, fontSize: '14px',
              cursor: 'pointer', transition: 'all 0.25s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = isDark ? '0 0 24px rgba(0,240,255,0.3)' : '0 0 24px rgba(99,102,241,0.25)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Download SDES
          </button>
        </div>
      </div>
    </motion.header>
  );
}
