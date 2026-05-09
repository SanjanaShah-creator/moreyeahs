'use client';

import { motion, type TargetAndTransition, type Variants } from 'framer-motion';

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

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const HIDDEN: Record<Variant, TargetAndTransition> = {
  fadeUp:     { opacity: 0, y: 52 },
  fadeIn:     { opacity: 0 },
  slideLeft:  { opacity: 0, x: 64 },
  slideRight: { opacity: 0, x: -64 },
  scaleUp:    { opacity: 0, scale: 0.88 },
  clipUp:     { opacity: 0, y: 40, scale: 0.97 },
};

const VISIBLE: Record<Variant, TargetAndTransition> = {
  fadeUp:     { opacity: 1, y: 0 },
  fadeIn:     { opacity: 1 },
  slideLeft:  { opacity: 1, x: 0 },
  slideRight: { opacity: 1, x: 0 },
  scaleUp:    { opacity: 1, scale: 1 },
  clipUp:     { opacity: 1, y: 0, scale: 1 },
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
  return (
    <motion.div
      className={className}
      style={style}
      initial={HIDDEN[variant]}
      whileInView={VISIBLE[variant]}
      viewport={{ once, amount: threshold }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered children â€” wrap a list container */
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
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const itemVariants: Variants = {
    hidden: HIDDEN[variant],
    visible: {
      ...VISIBLE[variant],
      transition: { duration: 0.65, ease: EASE },
    },
  };

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={containerVariants}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
