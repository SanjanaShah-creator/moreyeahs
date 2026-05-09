'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/*
 * lightH / darkH: inner box height in px for each theme
 * Wide flat logos (Prometheus, Abdo, Supersourcing) need a smaller box height
 * so they don't get stretched — the width fills the cell naturally.
 * Square/tall logos (Flyers Soft, TerraSecure) need a taller box.
 * DevLabs light is 1536×1024 (wide), dark is 466×120 (wide flat).
 */
const CLIENTS = [
  { name: 'Prometheus',    light: '/images/Client Logo 1.png',            dark: '/images/Client Dark theme logo 1.png', lightH: 40, darkH: 44,  wide: false, darkWide: false },
  { name: 'Flyers Soft',   light: '/images/Client Logo 2.png',            dark: '/images/Client Dark theme logo 2.png', lightH: 72, darkH: 72,  wide: false, darkWide: false },
  { name: 'Abdo',          light: '/images/Client Logo 3.png',            dark: '/images/Client Dark theme logo 3.png', lightH: 40, darkH: 64,  wide: false, darkWide: false },
  { name: 'Supersourcing', light: '/images/Client Logo 4.png',            dark: '/images/Client Dark theme logo 4.png', lightH: 32, darkH: 52,  wide: false, darkWide: true  },
  { name: 'TerraSecure',   light: '/images/Client Logo 5.png',            dark: '/images/Client Dark theme logo 5.png', lightH: 72, darkH: 72,  wide: false, darkWide: false },
  { name: 'DevLabs',       light: '/images/Client Logo 6.png',            dark: '/images/Client Dark theme logo 6.png', lightH: 68, darkH: 44,  wide: true,  darkWide: false },
] as const;

function LogoCard({ client }: { client: typeof CLIENTS[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="logo-card"
      style={{
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: 110, padding: client.wide || client.darkWide ? '0 8px' : '0 20px',
        border: '1px solid var(--border)',
        overflow: 'hidden', cursor: 'default',
        transition: 'background 0.3s',
        background: hovered ? 'rgba(26,86,219,0.06)' : 'transparent',
      }}
    >
      {/* Spotlight glow */}
      <div className="logo-spotlight" style={{
        position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
        width: 200, height: 200, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(77,134,245,0.45) 0%, rgba(26,86,219,0.12) 50%, transparent 72%)',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s ease',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Top beam */}
      <div className="logo-beam" style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(77,134,245,0.8), transparent)',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s ease',
        pointerEvents: 'none', zIndex: 2,
      }} />

      {/* Light logo */}
      <div className="logo-box-light" style={{
        position: 'relative', zIndex: 3,
        width: '100%', height: client.lightH,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <img
          src={client.light}
          alt={client.name}
          className="logo-img"
          style={{
            maxWidth: '100%', maxHeight: '100%',
            /* wide logos: fill width so they appear larger */
            width: client.wide ? '100%' : 'auto',
            height: client.wide ? 'auto' : 'auto',
            objectFit: 'contain', objectPosition: 'center', display: 'block',
            filter: hovered ? 'none' : 'grayscale(1) brightness(0.55)',
            opacity: hovered ? 1 : 0.65,
            transition: 'filter 0.4s ease, opacity 0.4s ease',
          }}
        />
      </div>

      {/* Dark logo — hidden by default, shown via CSS in dark mode */}
      <div className="logo-box-dark" style={{
        position: 'relative', zIndex: 3,
        width: '100%', height: client.darkH,
        display: 'none', alignItems: 'center', justifyContent: 'center',
      }}>
        <img
          src={client.dark}
          alt={client.name}
          className="logo-img"
          style={{
            maxWidth: '100%', maxHeight: '100%',
            width: client.darkWide ? '100%' : 'auto',
            height: 'auto',
            objectFit: 'contain', objectPosition: 'center', display: 'block',
            filter: hovered ? 'none' : 'grayscale(1) brightness(0.7)',
            opacity: hovered ? 1 : 0.7,
            transition: 'filter 0.4s ease, opacity 0.4s ease',
          }}
        />
      </div>
    </div>
  );
}

export default function ClientLogosSection() {
  return (
    <section style={{
      background: 'var(--bg)', position: 'relative',
      overflow: 'hidden', padding: '72px 0 64px',
    }}>

      {/* Dot-grid */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(77,134,245,0.16) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 44 }}
        >
          <div className="section-badge" style={{ display: 'inline-flex', marginBottom: 14 }}>
            Clients &amp; Partners
          </div>
          <h2 style={{
            fontSize: 'clamp(22px,2.8vw,36px)', fontWeight: 800,
            letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.15, marginBottom: 10,
          }}>
            Trusted by <span className="grad">Growing Businesses</span>
          </h2>
          <p style={{ fontSize: 14, color: 'var(--fg-3)', maxWidth: 400, margin: '0 auto', lineHeight: 1.7 }}>
            From startups to enterprises — teams that chose MoreYeahs to build, scale, and grow.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="client-logos-grid"
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)',
            border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden',
          }}
        >
          {CLIENTS.map((client) => (
            <motion.div
              key={client.name}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}
            >
              <LogoCard client={client} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        /* Theme switching — show light or dark logo box */
        .logo-box-light { display: flex !important; }
        .logo-box-dark  { display: none  !important; }
        .dark .logo-box-light { display: none  !important; }
        .dark .logo-box-dark  { display: flex !important; }

        /* Desktop / tablet */
        @media(max-width:1024px){
          .client-logos-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }

        /* Mobile: 2-col, always full color */
        @media(max-width:640px){
          .client-logos-grid { grid-template-columns: repeat(2, 1fr) !important; width: 100%; }
          .logo-img { filter: none !important; opacity: 1 !important; }
          .logo-spotlight, .logo-beam { display: none !important; }
          .logo-card { padding: 0 12px !important; height: 88px !important; }
        }
      `}</style>
    </section>
  );
}
