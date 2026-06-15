import { useState, useRef, MouseEvent } from 'react';
import { useSpring } from 'framer-motion';

export function useMagneticHover() {
  const ref = useRef<HTMLDivElement>(null);
  
  const rotateX = useSpring(0, { stiffness: 300, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate rotation based on cursor position relative to center
    // Max rotation is 15 degrees
    const rX = ((e.clientY - centerY) / (rect.height / 2)) * -10;
    const rY = ((e.clientX - centerX) / (rect.width / 2)) * 10;

    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave };
}
