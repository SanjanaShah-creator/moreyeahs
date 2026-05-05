'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const rawX = useMotionValue(-1000);
  const rawY = useMotionValue(-1000);
  const glowX = useSpring(rawX, { stiffness: 55, damping: 22 });
  const glowY = useSpring(rawY, { stiffness: 55, damping: 22 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [rawX, rawY]);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,86,219,0.14) 0%, rgba(77,134,245,0.06) 45%, transparent 72%)',
        x: glowX,
        y: glowY,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 9999,
        top: 0,
        left: 0,
      }}
    />
  );
}
