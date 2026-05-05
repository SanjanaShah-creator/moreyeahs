'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

type Variant = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'clipUp';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
  threshold?: number;
}

const VARIANTS: Record<Variant, Variants> = {
  fadeUp: {
    hidden:  { opacity: 0, y: 52, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  },
  fadeIn: {
    hidden:  { opacity: 0, filter: 'blur(6px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  slideLeft: {
    hidden:  { opacity: 0, x: 64, filter: 'blur(4px)' },
    visible: { opacity: 1, x: 0,  filter: 'blur(0px)' },
  },
  slideRight: {
    hidden:  { opacity: 0, x: -64, filter: 'blur(4px)' },
    visible: { opacity: 1, x: 0,   filter: 'blur(0px)' },
  },
  scaleUp: {
    hidden:  { opacity: 0, scale: 0.88, filter: 'blur(4px)' },
    visible: { opacity: 1, scale: 1,    filter: 'blur(0px)' },
  },
  clipUp: {
    hidden:  { opacity: 0, y: 40, scale: 0.97, filter: 'blur(3px)' },
    visible: { opacity: 1, y: 0,  scale: 1,    filter: 'blur(0px)' },
  },
};

export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.7,
  className,
  style,
  once = true,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      variants={VARIANTS[variant]}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered children — wrap a list container */
export function ScrollRevealGroup({
  children,
  stagger = 0.1,
  delay = 0,
  variant = 'fadeUp',
  className,
  style,
}: {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  variant?: Variant;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={VARIANTS[variant]} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
