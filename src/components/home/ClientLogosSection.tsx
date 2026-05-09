'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import NoiseOverlay from '@/components/ui/NoiseOverlay';

const CLIENTS: Array<{ name: string; lightSrc: string; darkSrc: string }> = [
  {
    name: 'Google Cloud',
    lightSrc: '/images/Google Cloud Light Theme Logo.png',
    darkSrc:  '/images/Google Cloud Dark Theme Logo.png',
  },
  {
    name: 'Microsoft',
    lightSrc: '/images/Microsoft Solutions Light Theme Logo.png',
    darkSrc:  '/images/Microsoft Google Cloud Dark Theme Logo.png',
  },
  {
    name: 'AWS',
    lightSrc: '/images/AWS Light Theme Logo.png',
    darkSrc:  '/images/AWS Dark Theme Logo.png',
  },
  {
    name: 'Salesforce',
    lightSrc: '/images/Salesforce ISV Partner Light Theme Logo.png',
    darkSrc:  '/images/Salesforce Google Cloud Dark Theme Logo.png',
  },
  {
    name: 'Zoho',
    lightSrc: '/images/Zoho Authorized Light Theme Logo.png',
    darkSrc:  '/images/Zoho Google Cloud Dark Theme Logo.png',
  },
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
        padding: '28px 32px',
        borderRadius: 16,
        border: '1px solid var(--border)',
        background: 'var(--card-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.3s',
        borderColor: hovered ? 'rgba(77,134,245,0.35)' : 'var(--border)',
      }}
    >
      {/* Spotlight glow that appears on hover — comes from above */}
      <div
        style={{
          position: 'absolute',
          top: -60,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(77,134,245,0.55) 0%, rgba(26,86,219,0.18) 45%, transparent 72%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Top edge glow line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '20%',
          right: '20%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(77,134,245,0.7), transparent)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Logo — desaturated by default, full color on hover */}
      <div style={{ position: 'relative', zIndex: 3, transition: 'filter 0.35s ease, opacity 0.35s ease', filter: hovered ? 'none' : 'grayscale(1)', opacity: hovered ? 1 : 0.45 }}>
        <img
          src={client.lightSrc}
          alt={client.name}
          className="logo-light"
          style={{ height: 52, maxWidth: 180, width: 'auto', objectFit: 'contain', display: 'block' }}
        />
        <img
          src={client.darkSrc}
          alt={client.name}
          className="logo-dark"
          style={{ height: 52, maxWidth: 180, width: 'auto', objectFit: 'contain', display: 'block' }}
        />
      </div>
    </div>
  );
}

export default function ClientLogosSection() {
  return (
    <section style={{ background: 'var(--bg-2)', position: 'relative', overflow: 'hidden', padding: '80px 0' }}>
      <NoiseOverlay />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <div className="section-badge" style={{ display: 'inline-flex', marginBottom: 16 }}>
            Our Partners &amp; Clients
          </div>
          <h2 style={{
            fontSize: 'clamp(22px,2.8vw,36px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--fg)',
            lineHeight: 1.15,
            marginBottom: 12,
          }}>
            Trusted by <span className="grad">Industry Leaders</span>
          </h2>
          <p style={{ fontSize: 14, color: 'var(--fg-3)', maxWidth: 420, margin: '0 auto', lineHeight: 1.7 }}>
            We partner with the world&apos;s leading technology platforms to deliver enterprise-grade solutions.
          </p>
        </motion.div>

        {/* Logo grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="client-logos-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 16,
          }}
        >
          {CLIENTS.map((client) => (
            <motion.div
              key={client.name}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
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
        @media(max-width:560px){
          .client-logos-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
