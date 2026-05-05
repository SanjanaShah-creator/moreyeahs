'use client';

import Spline from '@splinetool/react-spline';

export default function Robot() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 760, overflow: 'hidden', position: 'relative' }}>
      <Spline
        scene="https://prod.spline.design/Y2fPByUwWWTfeexv/scene.splinecode?zoom=0&scroll=0&orbit=0"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
