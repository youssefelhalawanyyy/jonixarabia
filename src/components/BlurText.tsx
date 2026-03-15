'use client';

import { motion } from 'framer-motion';

type BlurTextProps = {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'characters';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  onAnimationComplete?: () => void;
  className?: string;
};

export default function BlurText({
  text,
  delay = 100,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  className,
}: BlurTextProps) {
  const parts = animateBy === 'words' ? text.split(' ') : text.split('');

  const getInitial = () => {
    const base = { opacity: 0, filter: 'blur(14px)' };
    switch (direction) {
      case 'top':    return { ...base, y: -24 };
      case 'bottom': return { ...base, y:  24 };
      case 'left':   return { ...base, x: -24 };
      case 'right':  return { ...base, x:  24 };
      default:       return base;
    }
  };

  return (
    <span className={className} aria-label={text} style={{ wordSpacing: 'normal' }}>
      {parts.map((part, i) => (
        <motion.span
          key={i}
          initial={getInitial()}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0, x: 0 }}
          transition={{
            duration: 0.6,
            delay: i * (delay / 1000),
            ease: [0.25, 0.1, 0.25, 1],
          }}
          onAnimationComplete={i === parts.length - 1 ? onAnimationComplete : undefined}
          style={{ display: 'inline' }}
        >
          {/* Word + space after (except last) */}
          {part}{animateBy === 'words' && i < parts.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  );
}
