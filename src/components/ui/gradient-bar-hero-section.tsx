'use client';

import { useState, useEffect } from 'react';

const NUM_BARS = 22;

function barHeight(i: number, total: number): number {
  const pos  = i / (total - 1);
  const dist = Math.abs(pos - 0.5);
  return 22 + 78 * Math.pow(dist * 2, 1.18);
}

const PLACEHOLDER: React.CSSProperties = {
  position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
};

export function GradientBars({ count = NUM_BARS }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Render nothing on the server — avoids hydration mismatches from
  // CSS animation values and vendor-prefixed styles that differ between
  // Node (SSR) and the browser.
  if (!mounted) return <div aria-hidden="true" style={PLACEHOLDER} />;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, zIndex: 0,
        overflow: 'hidden', pointerEvents: 'none',
        display: 'flex', height: '100%',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: `1 0 calc(100% / ${count})`,
            maxWidth: `calc(100% / ${count})`,
            height: '100%',
            transformOrigin: 'bottom',
            transform: `scaleY(${barHeight(i, count) / 100})`,
          }}
        >
          <div
            className="hero-grad-bar"
            style={{
              width: '100%',
              height: '100%',
              animation: 'pulseBar 2.6s ease-in-out infinite alternate',
              animationDelay: `${i * 0.09}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function Component() {
  return (
    <div style={{
      position: 'relative', width: '100%', minHeight: '100vh',
      background: 'var(--bg)', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <GradientBars />
    </div>
  );
}
