import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'scale' | 'fade-in' | 'slide-left' | 'slide-right';
  delay?: number; // ms
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  threshold = 0.05,
}) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -15px 0px',
      }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [threshold]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'scale':
        return 'scroll-reveal-scale';
      case 'slide-left':
        return 'scroll-reveal-left';
      case 'slide-right':
        return 'scroll-reveal-right';
      case 'fade-in':
        return 'scroll-reveal-fade';
      case 'fade-up':
      default:
        return 'scroll-reveal';
    }
  };

  const delayStyle = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div
      ref={domRef}
      style={delayStyle}
      className={`${getAnimationClass()} ${isVisible ? 'is-revealed' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
