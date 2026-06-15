import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface DownloadCardProps {
  title: string;
  subtitle: string;
  status: 'AVAILABLE' | 'COMING SOON';
  icon: LucideIcon;
  accentColor: string;
  buttonText: string;
  disabled?: boolean;
}

export default function DownloadCard({
  title,
  subtitle,
  status,
  icon: Icon,
  accentColor,
  buttonText,
  disabled = false,
}: DownloadCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isAvailable = status === 'AVAILABLE';

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '24px',
        padding: '32px',
        borderRadius: '20px',
        minHeight: '280px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: isAvailable ? 'default' : 'default',
        background: isDark
          ? (isAvailable ? 'rgba(10,10,18,0.7)' : 'rgba(10,10,18,0.4)')
          : (isAvailable ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.6)'),
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: isDark
          ? (isAvailable
            ? `1px solid rgba(255,255,255,0.1)`
            : '1px solid rgba(255,255,255,0.05)')
          : (isAvailable
            ? '1px solid rgba(0,0,0,0.1)'
            : '1px solid rgba(0,0,0,0.05)'),
        boxShadow: isDark
          ? '0 8px 32px rgba(0,0,0,0.4)'
          : '0 8px 32px rgba(0,0,0,0.06)',
        opacity: isAvailable ? 1 : 0.85,
      }}
      onMouseEnter={e => {
        if (isAvailable) {
          const el = e.currentTarget;
          el.style.transform = 'translateY(-6px)';
          el.style.boxShadow = isDark
            ? `0 20px 40px rgba(0,0,0,0.5), 0 0 30px ${accentColor}15`
            : `0 20px 40px rgba(0,0,0,0.1), 0 0 30px ${accentColor}20`;
          el.style.border = `1px solid ${accentColor}30`;
        }
      }}
      onMouseLeave={e => {
        if (isAvailable) {
          const el = e.currentTarget;
          el.style.transform = 'translateY(0)';
          el.style.boxShadow = isDark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.06)';
          el.style.border = isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)';
        }
      }}
    >
      {/* Top accent glow */}
      {isAvailable && (
        <div
          style={{
            position: 'absolute',
            top: '-40px', right: '-40px',
            width: '120px', height: '120px',
            borderRadius: '50%',
            background: accentColor,
            opacity: 0.06,
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Top section: icon + title + subtitle */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Icon box */}
        <div
          style={{
            display: 'inline-flex',
            padding: '12px',
            borderRadius: '12px',
            width: 'fit-content',
            background: isAvailable
              ? (isDark ? `${accentColor}12` : `${accentColor}10`)
              : (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'),
            border: isAvailable
              ? `1px solid ${accentColor}25`
              : (isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.07)'),
            color: isAvailable
              ? accentColor
              : (isDark ? '#888' : '#888'),
          }}
        >
          <Icon size={28} strokeWidth={2} />
        </div>

        {/* Text */}
        <div>
          <h3
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: '22px',
              letterSpacing: '-0.01em',
              marginBottom: '8px',
              color: isAvailable
                ? (isDark ? '#ffffff' : '#0f172a')
                : (isDark ? '#a1a1aa' : '#71717a'),
              lineHeight: 1.2,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              lineHeight: '1.65',
              color: isAvailable
                ? (isDark ? '#94a3b8' : '#64748b')
                : (isDark ? '#71717a' : '#a1a1aa'),
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>

      {/* Bottom section: badge + button */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Status badge */}
        <span
          style={{
            display: 'inline-block',
            width: 'fit-content',
            padding: '4px 12px',
            borderRadius: '6px',
            fontSize: '11px',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: isAvailable
              ? `${accentColor}12`
              : (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'),
            border: isAvailable
              ? `1px solid ${accentColor}30`
              : (isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.07)'),
            color: isAvailable
              ? accentColor
              : (isDark ? '#888' : '#888'),
          }}
        >
          {status}
        </span>

        {/* Button */}
        {isAvailable ? (
          <button
            style={{
              width: '100%',
              padding: '13px 20px',
              borderRadius: '10px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '0.02em',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: isDark ? '#ffffff' : '#0f172a',
              color: isDark ? '#000000' : '#ffffff',
              border: 'none',
              boxShadow: isDark
                ? '0 0 20px rgba(255,255,255,0.1)'
                : '0 0 20px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.transform = 'scale(1.02)';
              el.style.boxShadow = isDark
                ? `0 0 30px ${accentColor}40`
                : `0 0 30px rgba(0,0,0,0.18)`;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.transform = 'scale(1)';
              el.style.boxShadow = isDark
                ? '0 0 20px rgba(255,255,255,0.1)'
                : '0 0 20px rgba(0,0,0,0.1)';
            }}
          >
            {buttonText}
          </button>
        ) : (
          <button
            disabled
            style={{
              width: '100%',
              padding: '13px 20px',
              borderRadius: '10px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'not-allowed',
              background: 'transparent',
              border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
              color: isDark ? '#888' : '#888',
            }}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
