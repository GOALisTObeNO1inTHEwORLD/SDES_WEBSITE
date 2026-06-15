import React, { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  mode?: 'drift' | 'converge' | 'explode';
  particleCount?: number;
  color?: string;
  connections?: boolean;
}

export default function ParticleCanvas({
  mode = 'drift',
  particleCount = 100,
  color = 'rgba(255,255,255,0.8)',
  connections = false
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      radius: number;
      canvas: HTMLCanvasElement;

      constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        
        if (mode === 'explode') {
          this.x = this.canvas.width / 2;
          this.y = this.canvas.height / 2;
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 5 + 2;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
        } else {
          this.vx = (Math.random() - 0.5) * 1;
          this.vy = (Math.random() - 0.5) * 1;
        }
        
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        if (mode === 'converge') {
          const centerX = this.canvas.width / 2;
          const centerY = this.canvas.height / 2;
          const dx = centerX - this.x;
          const dy = centerY - this.y;
          this.vx += dx * 0.0001;
          this.vy += dy * 0.0001;
          
          // Add some friction
          this.vx *= 0.99;
          this.vy *= 0.99;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (mode !== 'explode') {
          if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
          if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas));
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.update();
        p.draw();

        if (connections) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
              ctx.beginPath();
              ctx.strokeStyle = color.replace(/[\d.]+\)$/g, `${1 - dist / 100})`);
              ctx.lineWidth = 0.5;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [mode, particleCount, color, connections]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}
