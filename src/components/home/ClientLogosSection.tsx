'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const CLIENTS = [
  {
    name: 'Prometheus',
    light: '/images/Client Logo 1.png',
    dark:  '/images/Client Dark theme logo 1.png',
    size: 'normal',
  },
  {
    name: 'Flyers Soft',
    light: '/images/Client Logo 2.png',
    dark:  '/images/Client Dark theme logo 2.png',
    size: 'large',
  },
  {
    name: 'Abdo',
    light: '/images/Client Logo 3.png',
    dark:  '/images/Client Dark theme logo 3.png',
    size: 'normal',
  },
  {
    name: 'Supersourcing',
    light: '/images/Client Logo 4.png',
    dark:  '/images/Client Dark theme logo 4.png',
    size: 'normal',
  },
  {
    name: 'TerraSecure',
    light: '/images/Client Logo 5.png',
    dark:  '/images/Client Dark theme logo 5.png',
    size: 'large',
  },
  {
    name: 'DevLabs',
    light: '/images/Client Logo 6.png',
    dark:  '/images/Client Dark theme logo 6.png',
    size: 'large',
  },
] as const;

function LogoCard({ client }: { client: typeof CLIENTS[number] }) {
  const [hovered, setHovered] = useState(false);
  const boxH = client.size === 'large' ? 76 : 44;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="logo-card"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 110,
        padding: '0 24px',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'background 0.3s',
        background: hovered ? 'rgba(26,86,219,0.06)' : 'transparent',
      }}
    >
      {/* Spotlight glow from above */}
      <div className="logo-spotlight" style={{
        position: 'absolute', top: -80, left: '50%',
        transform: 'translateX(-50%)',
        width: 200, height: 200, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(77,134,245,0.45) 0%, rgba(26,86,219,0.12) 50%, transparent 72%)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Top edge light beam */}
      <div className="logo-beam" style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(77,134,245,0.8), transparent)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none', zIndex: 2,
      }} />

      {/* Logo box */}
      <div style={{
        position: 'relative', zIndex: 3,
        width: '100%', height: boxH,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Light theme logo */}
        <img
          src={client.light}
          alt={client.name}
          className="logo-img logo-light-img"
          style={{
            maxWidth: '100%', maxHeight: '100%',
            width: 'auto', height: 'auto',
            objectFit: 'contain', objectPosition: 'center',
            display: 'block',
            filter: hovered ? 'none' : 'grayscale(1) brightness(0.55)',
            opacity: hovered ? 1 : 0.65,
            transition: 'filter 0.4s ease, opacity 0.4s ease',
          }}
        />
        {/* Dark theme logo */}
        <img
          src={client.dark}
          alt={client.name}
          className="logo-img logo-dark-img"
          style={{
            maxWidth: '100%', maxHeight: '100%',
            width: 'auto', height: 'auto',
            objectFit: 'contain', objectPosition: 'center',
            display: 'none',
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
      background: 'var(--bg)',
      position: 'relative',
      overflow: 'hidden',
      padding: '72px 0 64px',
    }}>

      {/* Dot-grid background */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(77,134,245,0.16) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Heading */}
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
            fontSize: 'clamp(22px,2.8vw,36px)',
            fontWeight: 800, letterSpacing: '-0.03em',
            color: 'var(--fg)', lineHeight: 1.15, marginBottom: 10,
          }}>
            Trusted by <span className="grad">Growing Businesses</span>
          </h2>
          <p style={{ fontSize: 14, color: 'var(--fg-3)', maxWidth: 400, margin: '0 auto', lineHeight: 1.7 }}>
            From startups to enterprises — teams that chose MoreYeahs to build, scale, and grow.
          </p>
        </motion.div>

        {/* Logo grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="client-logos-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          {CLIENTS.map((client) => (
            <motion.div
              key={client.name}
              variants={{
                hidden:  { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
            >
              <LogoCard client={client} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        /* Light/dark logo switching */
        .logo-light-img { display: block; }
        .logo-dark-img  { display: none; }
        .dark .logo-light-img { display: none !important; }
        .dark .logo-dark-img  { display: block !important; }

        /* Desktop / tablet */
        @media(max-width:1024px){
          .client-logos-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }

        /* Mobile: 2-col, logos always full color */
        @media(max-width:640px){
          .client-logos-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            width: 100%;
          }
          .logo-img {
            filter: none !important;
            opacity: 1 !important;
          }
          .logo-spotlight, .logo-beam { display: none !important; }
          .logo-card { padding: 0 12px !important; height: 88px !important; }
        }
      `}</style>
    </section>
  );
}
