'use client';

/**
 * GridBeam — MoreYeahs design-system grid panel.
 *
 * Idle:  3 gradient beams travel square-to-square along grid-aligned paths.
 *        Each uses an animated linearGradient (same technique as original Beam
 *        component) — the gradient coordinates move, dragging the light blob
 *        along the path.
 *
 * Hover: Exact grid-cell highlight + radial glow spreading to nearby squares.
 */

import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

/* ─── constants ─────────────────────────────────────────────────────── */
const BLUE      = '#4D86F5';
const BLUE_MID  = '#1A56DB';
const BLUE_SOFT = '#80A9FF';
const CELL   = 44; // must match .gb-grid background-size

/* ─── BeamPath ──────────────────────────────────────────────────────── */
/**
 * Renders an L/staircase path whose stroke is an animated linearGradient.
 * The gradient coordinates animate from below the path to above it, dragging
 * the coloured blob upward — identical technique to the original Beam SVG.
 */
function BeamPath({
  d,
  gradId,
  duration = 2.4,
  delay = 0,
  from,
  to,
}: {
  d: string;
  gradId: string;
  duration?: number;
  delay?: number;
  /** gradient start coords (percentages) when beam is "off screen below" */
  from: { x1: string; x2: string; y1: string; y2: string };
  /** gradient end coords when beam has fully traversed the path */
  to: { x1: string; x2: string; y1: string; y2: string };
}) {
  return (
    <g>
      {/* Ghost path — faint so grid feels connected */}
      <path d={d} stroke={`${BLUE}12`} strokeWidth={1} fill="none" strokeLinejoin="round" />

      {/* Animated beam path */}
      <path
        d={d}
        stroke={`url(#${gradId})`}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 5px ${BLUE}99)` }}
      />

      <defs>
        <motion.linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          variants={{ initial: from, animate: to }}
          initial="initial"
          animate="animate"
          // @ts-ignore — framer-motion types don't expose linearGradient directly
          transition={{
            duration,
            delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            repeatDelay: 1.8,
          }}
        >
          <stop stopColor={BLUE_SOFT} stopOpacity={0} />
          <stop stopColor={BLUE_SOFT} stopOpacity={0.9} offset="0.2" />
          <stop stopColor={BLUE_MID}  stopOpacity={1}   offset="0.6" />
          <stop stopColor={BLUE}      stopOpacity={0}   offset="1" />
        </motion.linearGradient>
      </defs>
    </g>
  );
}

/* ─── GridBeam ──────────────────────────────────────────────────────── */
export interface GridBeamProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  beams?: 1 | 2 | 3;
}

export const GridBeam: React.FC<GridBeamProps> = ({
  children,
  className = '',
  style,
  beams = 3,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse]   = useState<{ x: number; y: number } | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const onMouseLeave = useCallback(() => setMouse(null), []);

  const snapX = mouse ? Math.floor(mouse.x / CELL) * CELL : 0;
  const snapY = mouse ? Math.floor(mouse.y / CELL) * CELL : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`gb-grid ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: 24,
        ...style,
      }}
    >
      {/* ── Hover: exact cell highlight ───────────────────────────────── */}
      {mouse && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: snapX, top: snapY,
            width: CELL, height: CELL,
            border: `1px solid ${BLUE}55`,
            background: `${BLUE}0C`,
            pointerEvents: 'none',
            zIndex: 1,
            transition: 'left 0.04s linear, top 0.04s linear',
          }}
        />
      )}

      {/* ── Hover: radial glow across nearby squares ─────────────────── */}
      {mouse && (
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(
              ellipse 180px 160px at ${mouse.x}px ${mouse.y}px,
              rgba(77,134,245,0.18) 0%,
              rgba(77,134,245,0.07) 50%,
              transparent 72%
            )`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      {/* ── Animated beam SVG ────────────────────────────────────────── */}
      <svg
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          overflow: 'visible',
          pointerEvents: 'none',
          zIndex: 2,
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Beam 1 — top-left area: horizontal then down then horizontal */}
        {beams >= 1 && (
          <BeamPath
            gradId="gbB1"
            d="M44 44 H264 V220 H440 V396"
            duration={2.2}
            delay={0}
            from={{ x1: '50%', x2: '60%', y1: '180%', y2: '200%' }}
            to={  { x1: '10%', x2: '20%', y1: '-80%', y2: '-60%' }}
          />
        )}

        {/* Beam 2 — center area: vertical then right then down */}
        {beams >= 2 && (
          <BeamPath
            gradId="gbB2"
            d="M600 0 V176 H440 V352 H660 V528"
            duration={2.8}
            delay={1.1}
            from={{ x1: '80%', x2: '100%', y1: '160%', y2: '180%' }}
            to={  { x1: '0%',  x2: '20%',  y1: '-60%', y2: '-40%' }}
          />
        )}

        {/* Beam 3 — right area: staircase from top-right down */}
        {beams >= 3 && (
          <BeamPath
            gradId="gbB3"
            d="M880 0 V176 H1056 V352 H880 V528 H1100"
            duration={2.5}
            delay={0.6}
            from={{ x1: '20%', x2: '40%', y1: '150%', y2: '170%' }}
            to={  { x1: '-20%', x2: '0%', y1: '-50%', y2: '-30%' }}
          />
        )}

        {/* Intersection dots — spread across full grid */}
        {Array.from({ length: 20 }).map((_, row) =>
          Array.from({ length: 30 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={col * CELL}
              cy={row * CELL}
              r={1.5}
              fill={`${BLUE}22`}
            />
          ))
        )}
      </svg>

      {/* ── Children ─────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 3, width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  );
};

/* ─── Standalone Beam (original API compat) ─────────────────────────── */
export const Beam = () => (
  <svg
    width="156" height="63" viewBox="0 0 156 63"
    fill="none" xmlns="http://www.w3.org/2000/svg"
    className="absolute top-0 left-0 ml-24 mt-8 pointer-events-none"
  >
    <path
      d="M31 .5h32M0 .5h32m30 31h32m-1 0h32m-1 31h32M62.5 32V0m62 63V31"
      stroke="url(#beamGradStandalone)" strokeWidth={1.5}
    />
    <defs>
      <motion.linearGradient
        id="beamGradStandalone"
        variants={{
          initial: { x1: '40%', x2: '50%', y1: '160%', y2: '180%' },
          animate: { x1: '0%',  x2: '10%', y1: '-40%', y2: '-20%' },
        }}
        animate="animate" initial="initial"
        // @ts-ignore
        transition={{ duration: 1.8, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 2 }}
      >
        <stop stopColor={BLUE_SOFT} stopOpacity={0} />
        <stop stopColor={BLUE_SOFT} />
        <stop offset="0.325" stopColor={BLUE_MID} />
        <stop offset="1"     stopColor={BLUE} stopOpacity={0} />
      </motion.linearGradient>
    </defs>
  </svg>
);

export default GridBeam;
