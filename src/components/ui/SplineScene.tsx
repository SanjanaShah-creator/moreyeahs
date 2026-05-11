'use client';
import { useEffect, useRef } from 'react';

interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: () => void;
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<unknown>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    let cancelled = false;

    async function load() {
      try {
        const { Application } = await import('@splinetool/runtime');
        if (cancelled || !canvasRef.current) return;
        const app = new Application(canvasRef.current);
        appRef.current = app;
        await app.load(scene);
        if (!cancelled) onLoad?.();
      } catch (e) {
        console.warn('Spline failed to load:', e);
      }
    }

    load();

    return () => {
      cancelled = true;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (appRef.current as any)?.dispose?.();
      } catch {}
    };
  }, [scene, onLoad]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
