import React from 'react';

interface TerminalPanelProps {
  lines: string[];
  accentColor: string; // e.g. '#00D4FF' (cyan), '#9B30FF' (purple), '#CC1100' (red), '#00FF41' (green)
  title: string;       // e.g. "strict_mode.exe — SDES Terminal"
  showLineNumbers?: boolean;
}

export default function TerminalPanel({
  lines,
  accentColor,
  title,
  showLineNumbers = true,
}: TerminalPanelProps) {

  // Syntax highlighting helper
  const renderWord = (word: string, lineIndex: number, wordIndex: number) => {
    const originalLine = lines[lineIndex] || '';
    const cleanWord = word.replace(/[\[\]]/g, '');

    // Brackets coloring in YouTube, Instagram etc.
    const hasOpeningBracket = word.startsWith('[');
    const hasClosingBracket = word.endsWith(']');

    const wordContent = cleanWord;

    // Highlight classes
    let highlightClass = 'text-[#AAAAAA]';

    if (word === '>') {
      return <span key={wordIndex} className="text-[#00FF41] mr-2 font-mono font-bold">&gt;</span>;
    }

    if (word === '.') {
      return <span key={wordIndex} className="text-[#30363D] block h-2"></span>;
    }

    // TERMINATED with flicker
    if (wordContent === 'TERMINATED' && originalLine.includes('TERMINATED ✕')) {
      return (
        <span key={wordIndex} className="inline-flex items-center text-[#CC1100] font-bold mr-2">
          TERMINATED
          <span className="ml-1 animate-flicker">✕</span>
        </span>
      );
    }
    if (word === '✕') return null; // handled above

    // CONNECTED ✓, COMPLETE ✓, ACTIVE ✓, ENABLED ✓, OPERATIONAL
    if (wordContent === 'CONNECTED' || wordContent === 'COMPLETE' || wordContent === 'ACTIVE' || wordContent === 'ENABLED' || wordContent === 'OPERATIONAL') {
      return (
        <span key={wordIndex} className="text-[#00FF41] font-bold mr-2 drop-shadow-[0_0_10px_rgba(0,255,65,0.4)]">
          {wordContent}
        </span>
      );
    }

    if (word === '✓') {
      return <span key={wordIndex} className="text-[#00FF41] font-bold mr-2 animate-pulse">✓</span>;
    }

    // SYNCING...
    if (word === 'SYNCING...') {
      return <span key={wordIndex} className="text-[#FFD700] mr-2 font-mono">{word}</span>;
    }

    // DETECTED
    if (wordContent === 'DETECTED') {
      return <span key={wordIndex} className="text-[#FF6644] font-bold mr-2">{wordContent}</span>;
    }

    // Red threats
    if (
      (cleanWord === 'social' && originalLine.includes('No social media')) ||
      (cleanWord === 'media.' && originalLine.includes('No social media')) ||
      (cleanWord === 'entertainment.' && originalLine.includes('No entertainment')) ||
      (cleanWord === 'browser' && originalLine.includes('No browser tabs')) ||
      (cleanWord === 'tabs' && originalLine.includes('No browser tabs'))
    ) {
      return <span key={wordIndex} className="text-[#FF6644] mr-2">{word}</span>;
    }

    // STRICT / LOCKED / ACTIVE keywords
    if (wordContent === 'LOCKED' || wordContent === 'initializing...' || wordContent === 'ACTIVATING...' || wordContent === 'SECURED' || wordContent === 'RUNNING') {
      return (
        <span 
          key={wordIndex} 
          className="font-bold mr-2" 
          style={{ color: accentColor, textShadow: `0 0 10px ${accentColor}40` }}
        >
          {wordContent}
        </span>
      );
    }

    // "already" in System Description
    if (wordContent === 'already') {
      return <span key={wordIndex} className="text-[#00D4FF] font-bold mr-2">{word}</span>;
    }

    // "SDES"
    if (wordContent === 'SDES') {
      return <span key={wordIndex} className="text-[#00FF41] font-bold mr-2">{wordContent}</span>;
    }

    // Highlight key values
    if (wordContent === 'Strict,' || wordContent === 'Discipline,' || wordContent === 'Ego') {
      return <span key={wordIndex} className="font-bold mr-2 text-white">{word}</span>;
    }

    // Muted lines
    if (originalLine.startsWith('Line') && originalLine.includes('--')) {
      highlightClass = 'text-[#444444]';
    }

    // Base bracket layout render
    return (
      <span key={wordIndex} className="mr-2">
        {hasOpeningBracket && <span className="text-[#444444] font-mono mr-[1px]">[</span>}
        <span className={`${highlightClass} font-mono`}>{wordContent}</span>
        {hasClosingBracket && <span className="text-[#444444] font-mono ml-[1px]">]</span>}
      </span>
    );
  };

  return (
    <div className="w-full font-mono glass-panel overflow-hidden border border-white/5 select-none shadow-2xl">
      {/* Top terminal title bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d0d]/80 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57] opacity-80" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E] opacity-80" />
          <div className="w-3 h-3 rounded-full bg-[#28C840] opacity-80" />
        </div>
        <div className="text-[11px] text-gray-500 font-mono tracking-wider">
          {title}
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Inside terminal window */}
      <div className="flex p-6 min-h-[200px] text-left leading-relaxed">
        {/* Line Numbers Column */}
        {showLineNumbers && (
          <div className="flex flex-col text-right pr-6 select-none border-r border-white/5 text-gray-700 w-12 text-sm leading-[2.2]">
            {lines.map((_, i) => (
              <span key={i}>{(i + 1).toString().padStart(2, '0')}</span>
            ))}
          </div>
        )}

        {/* Text Area */}
        <div className="flex-1 pl-6 text-sm leading-[2.2] font-mono whitespace-pre-wrap overflow-hidden">
          {lines.map((line, lineIdx) => {
            const lineWords = line.split(/\s+/).filter(w => w.length > 0 || w === '.');
            return (
              <div key={lineIdx} className="flex flex-wrap items-center min-h-[30px]">
                {lineWords.map((word, wordIdx) => renderWord(word, lineIdx, wordIdx))}
              </div>
            );
          })}

          {/* Persistent Blinking Cursor at bottom once finished */}
          <div className="flex items-center min-h-[30px]">
            <span 
              className="w-[9px] h-[15px] inline-block align-middle animate-cursor" 
              style={{ backgroundColor: accentColor }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
