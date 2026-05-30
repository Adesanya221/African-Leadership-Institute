'use client';

import { useRef, useEffect, useState } from 'react';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay class suffix: 1, 2, or 3
  threshold?: number;
}

export default function AnimateOnScroll({
  children,
  className = '',
  delay = 0,
  threshold = 0.15,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const delayClass = delay > 0 ? `animate-on-scroll-delay-${delay}` : '';

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${delayClass} ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
