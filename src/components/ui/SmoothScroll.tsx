'use client';

import { useEffect } from 'react';

/**
 * Smooth scroll behavior with optimized performance
 * Uses CSS scroll-behavior for native smoothness
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return null;
}
