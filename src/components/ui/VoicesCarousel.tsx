'use client';

import { useEffect, useRef, useState } from 'react';

const VOICES_DATA = [
  { name: 'Sakshi Solanki', role: 'AI Developer',        videoId: 'mWrMizY2pgs' },
  { name: 'Amaan Khan',     role: 'Salesforce Developer', videoId: 'mZNjESWqEAQ' },
  { name: 'Sanidhya',       role: 'AI Developer',         videoId: 'omMUY8Jrcio' },
  { name: 'Ravi Jain',      role: 'Salesforce Developer', videoId: 'C_ODJG_vt0s' },
  { name: 'Akarshi Jain',   role: 'AI Developer',         videoId: 'sNFiEeMqPPk' },
];
const VOICES_LOOP = [...VOICES_DATA, ...VOICES_DATA];

export default function VoicesCarousel() {
  const [mounted, setMounted] = useState(false);
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const pauseAnim  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'; };
  const resumeAnim = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running'; };

  const clearActive = () => {
    setActive(null);
    resumeAnim();
  };

  const selectVideo = (idx: number) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setActive(idx);
    pauseAnim();

    // center the selected card by adjusting the track's translateX
    const wrapper = wrapperRef.current;
    const card    = cardRefs.current[idx];
    if (wrapper && card) {
      const scrollTo = card.offsetLeft - wrapper.offsetWidth / 2 + card.offsetWidth / 2;
      wrapper.scrollLeft = scrollTo;
    }

    // auto-resume after 4s
    resumeTimer.current = setTimeout(() => clearActive(), 4000);
  };

  useEffect(() => {
    return () => { if (resumeTimer.current) clearTimeout(resumeTimer.current); };
  }, []);

  if (!mounted) {
    // render placeholder cards during SSR / before hydration
    return (
      <div style={{ display: 'flex', gap: 24, padding: '8px 0 16px', overflow: 'hidden' }}>
        {VOICES_DATA.map((member, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: 'clamp(340px, 36vw, 460px)',
              borderRadius: 16,
              background: 'rgba(26,86,219,0.06)',
              border: '1px solid rgba(77,134,245,0.12)',
            }}
          >
            <div style={{ paddingBottom: '56.25%', position: 'relative', borderRadius: '14px 14px 0 0', background: 'rgba(26,86,219,0.10)' }} />
            <div style={{ padding: '16px 20px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #1A56DB, #4D86F5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>{member.name.charAt(0)}</span>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.3 }}>{member.name}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-3)', fontWeight: 500, marginTop: 2 }}>{member.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* ── ticker wrapper — always overflow:hidden, no scrollbar ── */}
      <div
        ref={wrapperRef}
        style={{
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        <div
          ref={trackRef}
          onMouseEnter={pauseAnim}
          onMouseLeave={() => { if (active === null) resumeAnim(); }}
          style={{
            display: 'flex',
            gap: 24,
            width: 'max-content',
            animation: 'voicesTicker 60s linear infinite',
            padding: '8px 0 16px',
          }}
        >
          {VOICES_LOOP.map((member, i) => {
            const srcIdx   = i % VOICES_DATA.length;
            const isActive = active === srcIdx;
            return (
              <div
                key={i}
                ref={el => { if (i < VOICES_DATA.length) cardRefs.current[i] = el; }}
                className="glass team-video-card"
                style={{
                  flexShrink: 0,
                  width: 'clamp(340px, 36vw, 460px)',
                  transform: isActive ? 'scale(1.04)' : 'scale(1)',
                  boxShadow: isActive ? '0 0 0 2.5px #1A56DB, 0 24px 64px rgba(26,86,219,0.28)' : '',
                  zIndex: isActive ? 10 : 1,
                  transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '14px 14px 0 0' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${member.videoId}`}
                    title={`${member.name} — ${member.role}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  />
                </div>
                <div style={{ padding: '16px 20px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #1A56DB, #4D86F5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>{member.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.3 }}>{member.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--fg-3)', fontWeight: 500, marginTop: 2 }}>{member.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── dot nav ── */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
        {VOICES_DATA.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => active === i ? clearActive() : selectVideo(i)}
            aria-label={`Go to ${VOICES_DATA[i].name}`}
            style={{
              width: active === i ? 28 : 8,
              height: 8,
              borderRadius: 999,
              border: 'none',
              background: active === i ? '#1A56DB' : 'rgba(77,134,245,0.35)',
              cursor: 'pointer',
              padding: 0,
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
