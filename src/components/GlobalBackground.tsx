import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    // ── Resize ──
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Reinit matrix columns on resize
      initMatrix();
    };
    window.addEventListener('resize', resize);

    // ── Stars ──
    const STAR_COUNT = 130;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.65 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.007 + 0.002,
      glow: Math.random() > 0.65,
    }));

    // ── Matrix Rain — time-based smooth fall ──
    const FONT_SIZE = 14;
    const chars = '01001011010010001101001010010110';

    interface Drop {
      x: number;
      y: number;          // pixel position (float)
      speed: number;      // pixels per second
      opacity: number;
      length: number;     // trail length in chars
      chars: string[];    // pre-picked character per trail step
    }

    let drops: Drop[] = [];

    const initMatrix = () => {
      const cols = Math.floor(canvas.width / FONT_SIZE);
      drops = Array.from({ length: cols }, (_, i) => ({
        x: i * FONT_SIZE,
        y: -(Math.random() * canvas.height * 1.5),  // stagger starts above screen
        speed: 40 + Math.random() * 70,             // 40–110 px/s  ← key: time-based
        opacity: 0.12 + Math.random() * 0.45,
        length: Math.floor(Math.random() * 14) + 6,
        chars: Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]),
      }));
    };

    initMatrix();
    resize();

    // ── Render Loop ──
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = (now - lastTime) / 1000; // seconds
      lastTime = now;

      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Stars ──
      stars.forEach(star => {
        star.pulse += star.speed;
        const alpha = star.opacity * (0.6 + 0.4 * Math.sin(star.pulse));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(180, 220, 255, ${alpha})`
          : `rgba(100, 150, 220, ${alpha * 0.45})`;
        ctx.fill();

        if (star.glow) {
          const grad = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r * 4);
          grad.addColorStop(0, isDark
            ? `rgba(0,240,255,${alpha * 0.45})`
            : `rgba(99,102,241,${alpha * 0.2})`);
          grad.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      });

      // ── Matrix Rain (smooth, time-based) ──
      ctx.font = `${FONT_SIZE}px 'JetBrains Mono', 'Courier New', monospace`;
      ctx.textAlign = 'center';

      drops.forEach(drop => {
        // Move by speed * delta time = perfectly smooth regardless of FPS
        drop.y += drop.speed * dt;

        // Draw trail from head upward
        for (let t = 0; t < drop.length; t++) {
          const trailY = drop.y - t * FONT_SIZE;
          if (trailY < -FONT_SIZE || trailY > canvas.height + FONT_SIZE) continue;

          // Head is brightest, tail fades
          const trailFade = (1 - t / drop.length);
          const isHead = t === 0;

          let alpha: number;
          if (isDark) {
            alpha = isHead ? drop.opacity * 1.0 : drop.opacity * trailFade * 0.75;
          } else {
            alpha = isHead ? drop.opacity * 0.25 : drop.opacity * trailFade * 0.15;
          }

          if (alpha < 0.01) continue;

          // Head char glows brighter
          ctx.fillStyle = isDark
            ? (isHead ? `rgba(160, 255, 160, ${alpha})` : `rgba(0, 200, 60, ${alpha})`)
            : `rgba(20, 140, 40, ${alpha})`;

          const charIdx = (Math.floor(drop.y / FONT_SIZE) - t) & (drop.chars.length - 1);
          ctx.fillText(drop.chars[Math.abs(charIdx) % drop.chars.length], drop.x + FONT_SIZE / 2, trailY);
        }

        // Reset drop when it goes off-screen
        if (drop.y - drop.length * FONT_SIZE > canvas.height) {
          drop.y = -(Math.random() * 200);
          drop.speed = 40 + Math.random() * 70;
          drop.opacity = 0.12 + Math.random() * 0.45;
          drop.length = Math.floor(Math.random() * 14) + 6;
          drop.chars = Array.from({ length: 20 }, () =>
            chars[Math.floor(Math.random() * chars.length)]
          );
        }
      });

      ctx.textAlign = 'left'; // reset

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -50,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: isDark ? '#020408' : '#f8fafc',
        transition: 'background 0.4s ease',
      }}
    >
      {/* ── Aurora blobs (dark mode) ── */}
      {isDark && (
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '75%',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}>
          <div style={{
            position: 'absolute', top: '-10%', left: '5%',
            width: '55%', height: '65%', borderRadius: '50%',
            background: 'rgba(0, 212, 255, 0.15)',
            animation: 'aurora-shift-1 28s infinite ease-in-out alternate',
          }} />
          <div style={{
            position: 'absolute', top: '-20%', right: '5%',
            width: '60%', height: '70%', borderRadius: '50%',
            background: 'rgba(123, 47, 255, 0.12)',
            animation: 'aurora-shift-2 38s infinite ease-in-out alternate',
          }} />
          <div style={{
            position: 'absolute', top: '35%', left: '20%',
            width: '40%', height: '45%', borderRadius: '50%',
            background: 'rgba(0, 240, 255, 0.07)',
            animation: 'aurora-shift-1 32s infinite ease-in-out alternate',
          }} />
          <div style={{
            position: 'absolute', top: '15%', right: '20%',
            width: '38%', height: '48%', borderRadius: '50%',
            background: 'rgba(255, 0, 85, 0.05)',
            animation: 'aurora-shift-2 44s infinite ease-in-out alternate',
          }} />
        </div>
      )}

      {/* ── Light mode gradient ── */}
      {!isDark && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 65%), radial-gradient(ellipse 60% 30% at 80% 20%, rgba(6,182,212,0.05) 0%, transparent 50%)',
        }} />
      )}

      {/* ── Full-site dot grid ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: isDark
          ? 'linear-gradient(rgba(0,240,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.045) 1px, transparent 1px)'
          : 'linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* ── Grid intersection dots ── */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: isDark
          ? 'radial-gradient(circle, rgba(0,240,255,0.2) 1px, transparent 1px)'
          : 'radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        backgroundPosition: '-1px -1px',
      }} />

      {/* ── Stars + Matrix canvas ── */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
    </div>
  );
}
