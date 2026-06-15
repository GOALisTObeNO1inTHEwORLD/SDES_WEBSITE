import { RefObject, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';

export function useScrollVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  containerRef: RefObject<HTMLElement | null>
) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is muted for autoplay and scroll scrubbing
    video.muted = true;
    // We don't want it to play on its own, just scrub
    video.pause();

    const updateTime = (progress: number) => {
      if (video.duration) {
        // Map progress (0-1) to video duration
        video.currentTime = video.duration * progress;
      }
    };

    // Subscribing to scroll progress changes
    const unsubscribe = scrollYProgress.on('change', updateTime);

    return () => unsubscribe();
  }, [scrollYProgress, videoRef]);

  return scrollYProgress;
}
