import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function useInViewReveal(
  threshold: number = 0.3,
  once: boolean = true
) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: threshold, once });

  return { ref, isInView };
}
