import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

interface CanvasSequenceProps {
  folderPath: string;
  frameCount: number;
  prefix?: string;
  padDigits?: number;
  extension?: string;
  pinDuration?: number; 
  children?: React.ReactNode; 
}

export default function CanvasSequence({
  folderPath,
  frameCount,
  prefix = 'ezgif-frame-',
  padDigits = 3,
  extension = '.jpg',
  pinDuration = 2000,
  children
}: CanvasSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const renderFrameRef = useRef<{ frame: number }>({ frame: 1 });

  useEffect(() => {
    let loadedCount = 0;
    imagesRef.current = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const numStr = i.toString().padStart(padDigits, '0');
      img.src = `${folderPath}/${prefix}${numStr}${extension}`;
      
      // Force browser to decode the image into memory before marking it ready
      img.decode().then(() => {
        loadedCount++;
        setLoaded(Math.round((loadedCount / frameCount) * 100));
        if (i === 1) renderFrame(1);
      }).catch((e) => {
        // Fallback for decode errors or unsupported decode()
        console.warn('Decode failed for', img.src, e);
        loadedCount++;
        setLoaded(Math.round((loadedCount / frameCount) * 100));
        if (i === 1) renderFrame(1);
      });
      
      imagesRef.current.push(img);
    }
  }, [folderPath, frameCount, prefix, padDigits, extension]);

  const lastFrameRef = useRef<number>(-1);
  const rafRef = useRef<number>(0);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const safeIndex = Math.min(Math.max(1, Math.round(index)), frameCount) - 1;
    // Skip redraw if same frame
    if (safeIndex === lastFrameRef.current) return;
    lastFrameRef.current = safeIndex;

    const img = imagesRef.current[safeIndex];
    if (!img || !img.complete) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number;
    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    // Draw synchronously because GSAP's onUpdate is already inside a requestAnimationFrame!
    // Wrapping it in another rAF causes double-deferral, leading to dropped/skipped frames during fast scrolling.
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        // Cap DPR to 1.5: 1 is too blurry on Retina screens ("no clarity"), but 2+ causes GPU stutter.
        const dpr = Math.min(window.devicePixelRatio, 1.5); 
        const rect = containerRef.current.getBoundingClientRect();
        
        // Set canvas buffer sizes to physical pixels
        canvasRef.current.width = rect.width * dpr;
        canvasRef.current.height = (window.innerHeight - 56) * dpr;
        
        // CSS sizes are in logical CSS pixels
        canvasRef.current.style.width = `${rect.width}px`;
        canvasRef.current.style.height = `${window.innerHeight - 56}px`;

        renderFrame(renderFrameRef.current.frame);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 56px',
        end: `+=${pinDuration}`,
        scrub: 1, // 1-second scrub drastically smooths out chunky mouse wheel ticks, preventing "stuck/stutter" feeling
        pin: true,
        pinType: 'fixed', // Prevent jitter caused by transform pinning
      }
    });

    tl.to(renderFrameRef.current, {
      frame: frameCount,
      ease: 'none',
      onUpdate: () => renderFrame(renderFrameRef.current.frame)
    });

  }, { scope: containerRef, dependencies: [frameCount, pinDuration] });

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-black" style={{ height: 'calc(100vh - 56px)' }}>
      
      {loaded < 100 && (
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 font-mono tracking-widest text-sm opacity-50 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          PREPARING [{loaded}%]
        </div>
      )}

      {/* Edge-to-Edge Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 block w-full h-full object-cover z-0" 
        style={{
          transition: 'opacity 0.5s ease',
        }}
      />
      
      {/* Subtle overlay for text readability (if needed later) */}
      <div className={`absolute inset-0 z-10 pointer-events-none ${isDark ? 'bg-black/10' : 'bg-white/10'}`} />
      
      {/* Text Children Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center">
        {children}
      </div>
      
    </div>
  );
}
