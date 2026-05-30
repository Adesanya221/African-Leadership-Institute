'use client';

import { useRef, useEffect } from 'react';

interface AutoScrollProps {
  children: React.ReactNode;
  speed?: number; // pixels per interval
  interval?: number; // ms
  className?: string;
  pauseOnHover?: boolean;
}

export default function AutoScroll({
  children,
  speed = 1,
  interval = 30,
  className = '',
  pauseOnHover = true,
}: AutoScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const timer = setInterval(() => {
      if (pausedRef.current) return;
      if (el.scrollWidth <= el.clientWidth) return;

      el.scrollLeft += speed;

      // When we pass the midpoint (end of original content), snap back to start.
      // The content is duplicated, so this jump is invisible.
      const half = (el.scrollWidth - el.clientWidth) / 2;
      if (el.scrollLeft >= half) {
        el.scrollLeft = el.scrollLeft - half;
      }
    }, interval);

    if (pauseOnHover) {
      const onEnter = () => { pausedRef.current = true; };
      const onLeave = () => { pausedRef.current = false; };
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
      el.addEventListener('touchstart', onEnter, { passive: true });
      el.addEventListener('touchend', onLeave);

      return () => {
        clearInterval(timer);
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.removeEventListener('touchstart', onEnter);
        el.removeEventListener('touchend', onLeave);
      };
    }

    return () => clearInterval(timer);
  }, [speed, interval, pauseOnHover]);

  return (
    <div ref={ref} className={className}>
      {children}
      {children}
    </div>
  );
}
