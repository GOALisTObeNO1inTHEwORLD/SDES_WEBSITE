import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AutoPlayButtonProps {
  targetSectionId: string; // where to start
}

export default function AutoPlayButton({ targetSectionId }: AutoPlayButtonProps) {
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef<number>(0);
  const speedRef = useRef(80); // px per second

  // Show button when user scrolls near the target section
  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById(targetSectionId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Show when target section is within 200px of viewport
      setVisible(rect.top < window.innerHeight + 200 && rect.bottom > -200);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetSectionId]);

  // Auto-scroll loop
  useEffect(() => {
    if (!playing) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    let lastTime: number | null = null;

    const step = (timestamp: number) => {
      if (lastTime === null) lastTime = timestamp;
      const dt = (timestamp - lastTime) / 1000;
      lastTime = timestamp;

      const maxScroll = document.body.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScroll - 5) {
        setPlaying(false);
        return;
      }

      window.scrollBy({ top: speedRef.current * dt, behavior: 'auto' });
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  // Stop auto-play when user manually scrolls
  useEffect(() => {
    let userScrolling = false;
    let timeout: ReturnType<typeof setTimeout>;

    const onWheel = () => {
      userScrolling = true;
      setPlaying(false);
      clearTimeout(timeout);
    };

    const onTouch = () => {
      userScrolling = true;
      setPlaying(false);
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  const handleClick = () => {
    if (!playing) {
      // Scroll to target section first, then start
      const el = document.getElementById(targetSectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => setPlaying(true), 800);
      } else {
        setPlaying(true);
      }
    } else {
      setPlaying(false);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            zIndex: 8888,
          }}
        >
          <button
            onClick={handleClick}
            title={playing ? 'Pause auto-scroll' : 'Auto-scroll through SDES story'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 22px',
              borderRadius: '50px',
              background: playing
                ? 'rgba(255,0,85,0.15)'
                : 'rgba(0,240,255,0.12)',
              border: playing
                ? '1px solid rgba(255,0,85,0.4)'
                : '1px solid rgba(0,240,255,0.4)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              color: playing ? '#ff4499' : '#00f0ff',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: playing
                ? '0 0 30px rgba(255,0,85,0.2)'
                : '0 0 30px rgba(0,240,255,0.15)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {/* Icon */}
            <span style={{ fontSize: '18px', lineHeight: 1 }}>
              {playing ? '⏸' : '▶'}
            </span>
            {playing ? 'Pause Cinema' : 'Auto-Play Story'}
          </button>

          {/* Speed control while playing */}
          {playing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '10px',
                padding: '8px 16px',
                borderRadius: '30px',
                background: 'rgba(10,10,18,0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#64748b', fontSize: '11px', fontFamily: 'monospace' }}>SPEED</span>
              {[40, 80, 140].map(speed => (
                <button
                  key={speed}
                  onClick={() => { speedRef.current = speed; }}
                  style={{
                    padding: '3px 10px',
                    borderRadius: '6px',
                    background: speedRef.current === speed ? 'rgba(0,240,255,0.15)' : 'transparent',
                    border: speedRef.current === speed ? '1px solid rgba(0,240,255,0.3)' : '1px solid transparent',
                    color: speedRef.current === speed ? '#00f0ff' : '#64748b',
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    cursor: 'pointer',
                  }}
                >
                  {speed === 40 ? 'Slow' : speed === 80 ? 'Normal' : 'Fast'}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
