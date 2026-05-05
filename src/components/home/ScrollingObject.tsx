'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export function ScrollingObject() {
  const { scrollYProgress } = useScroll();

  const x       = useTransform(scrollYProgress, [0, 1],      ['0vw',  '-8vw']);
  const y       = useTransform(scrollYProgress, [0, 1],      ['0vh',  '60vh']);
  const scale   = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.85, 0.62]);
  const opacity = useTransform(scrollYProgress, [0.82, 1],   [1, 0.3]);

  return (
    <motion.div
      style={{
        x, y, scale, opacity,
        position: 'fixed',
        zIndex: 40,
        top: '12vh',
        right: 0,
        width: '52vw',
        height: '64vh',
        pointerEvents: 'none',
      }}
    >
      <Spline scene="https://prod.spline.design/Y2fPByUwWWTfeexv/scene.splinecode" />
    </motion.div>
  );
}
