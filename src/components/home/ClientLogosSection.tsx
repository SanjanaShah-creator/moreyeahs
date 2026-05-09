'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const CLIENTS = [
  { name: 'Prometheus',    src: '/images/Client Logo 1.png' },
  { name: 'Flyers Soft',   src: '/images/Client Logo 2.png' },
  { name: 'Abdo',          src: '/images/Client Logo 3.png' },
  { name: 'Supersourcing', src: '/images/Client Logo 4.png' },
  { name: 'TerraSecure',   src: '/images/Client Logo 5.png' },
  { name: 'Client',        src: '/images/Client Logo 6.png' },
];

function LogoCard({ client }: { client: typeof CLIENTS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 28px',
        /* grid cell border — forms the grid lines */
        border: '1px solid var(--border)',
        background: hovered ? 'rgba(26,86,219,0.04)' : 'transparent',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'background 0.3s',
        minHeight: 120,
      }}
    >
      {/* Spotlight glow from above on hover */}
      <div style={{
        position: 'absolute',
        top: -80,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(77,134,245,0.45) 0%, rgba(26,86,219,0.12) 50%, transparent 72%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Top edge light beam */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '15%',
        right: '15%',
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(77,134,245,0.8), transparent)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* Logo — grayscale + dim by default, full color on hover */}
      <img
        src={client.src}
        alt={client.name}
        style={{
          position: 'relative',
          zIndex: 3,
          maxHeight: 56,
          maxWidth: 160,
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          display: 'block',
          filter: hovered ? 'none' : 'grayscale(1) brightness(0.55)',
          opacity: hovered ? 1 : 0.6,
          transition: 'filter 0.4s ease, opacity 0.4s ease',
        }}
      />
    </div>
  );
}

export default function ClientLogosSection() {
  return (
    <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', padding: '88px 0' }}>

      {/* ── Subtle dot-grid background ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(77,134,245,0.18) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 52 }}
        >
          <div className="section-badge" style={{ display: 'inline-flex', marginBottom: 16 }}>
            Clients &amp; Partners
          </div>
          <h2 style={{
            fontSize: 'clamp(22px,2.8vw,36px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--fg)',
            lineHeight: 1.15,
            marginBottom: 10,
          }}>
            Trusted by <span className="grad">Growing Businesses</span>
          </h2>
          <p style={{ fontSize: 14, color: 'var(--fg-3)', maxWidth: 400, margin: '0 auto', lineHeight: 1.7 }}>
            From startups to enterprises — teams that chose MoreYeahs to build, scale, and grow.
          </p>
        </motion.div>

        {/* ── Logo grid — bordered cells form the grid lines ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="client-logos-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            /* outer border wraps the whole grid */
            border: '1px solid var(--border)',
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          {CLIENTS.map((client) => (
            <motion.div
              key={client.name}
              variants={{
                hidden:   { opacity: 0, y: 12 },
                visible:  { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
            >
              <LogoCard client={client} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media(max-width:900px){
          .client-logos-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media(max-width:520px){
          .client-logos-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
