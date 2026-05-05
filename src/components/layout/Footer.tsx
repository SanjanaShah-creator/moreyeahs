'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, X } from 'lucide-react';

/* Inline SVGs for social icons not in this lucide version */
const LinkedinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

const SOLUTIONS_LINKS = [
  { label: 'Data Science & AI',      href: '/solutions/data-science' },
  { label: 'Cloud & Infrastructure', href: '/solutions/cloud-infrastructure' },
  { label: 'Microsoft Services',     href: '/solutions/microsoft-services' },
  { label: 'Salesforce Services',    href: '/solutions/salesforce-services' },
  { label: 'Web & App Development',  href: '/solutions/web-app-development' },
];
const COMPANY_LINKS = [
  { label: 'Home',              href: '/' },
  { label: 'About',             href: '/about' },
  { label: 'About Us',          href: '/life-at-moreyeahs' },
  { label: 'Careers',           href: '/careers' },
  { label: 'Contact Us',        href: '/contact-us' },
  { label: 'Blog',              href: '/blog' },
  { label: 'Resources',         href: '/resources' },
];
const SOCIALS = [
  { Icon: LinkedinIcon,  href: '#', label: 'LinkedIn' },
  { Icon: X,             href: '#', label: 'X' },
  { Icon: FacebookIcon,  href: '#', label: 'Facebook' },
  { Icon: InstagramIcon, href: '#', label: 'Instagram' },
  { Icon: YoutubeIcon,   href: '#', label: 'YouTube' },
];

const linkBase: React.CSSProperties = {
  fontSize: 14, color: 'var(--fg-3)', textDecoration: 'none',
  transition: 'all 0.25s ease', lineHeight: 1.8, cursor: 'pointer',
};

export default function Footer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <footer 
      onMouseMove={handleMouseMove}
      style={{ 
        background: 'var(--bg-2)', 
        borderTop: '1px solid var(--border)', 
        position: 'relative', 
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
      }}>
      {/* Noise */}
      <div className="noise" />

      {/* Grid background */}
      <div 
        style={{ 
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(26,86,219,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,86,219,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
          zIndex: 1,
        }} 
      />

      {/* Flowing light animation */}
      <div 
        style={{ 
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(45deg, transparent 0%, rgba(26,86,219,0.15) 20%, transparent 40%, transparent 60%, rgba(74,164,255,0.12) 80%, transparent 100%)',
          backgroundSize: '200% 200%',
          animation: 'flowingLight 8s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 1,
        }} 
      />

      {/* Cursor-follow gradient bloom */}
      <div 
        style={{ 
          position: 'absolute',
          width: 500, 
          height: 500, 
          background: 'radial-gradient(circle, rgba(26,86,219,0.08), transparent 70%)',
          left: mousePos.x - 250,
          top: mousePos.y - 250,
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
          pointerEvents: 'none',
          zIndex: 1,
        }} 
      />

      {/* Static gradient bloom */}
      <div className="blob" style={{ width: 400, height: 400, top: '-100px', left: '-100px', background: 'radial-gradient(circle, rgba(26,86,219,0.07), transparent 70%)' }} />
      <div className="blob" style={{ width: 350, height: 350, bottom: '-50px', right: '-80px', background: 'radial-gradient(circle, rgba(74,164,255,0.05), transparent 70%)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 72, paddingBottom: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.2fr 1.4fr', gap: 48, paddingBottom: 56, borderBottom: '1px solid var(--border)' }} className="footer-grid">

          {/* Col 1 — Brand */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <img src="/images/MoreYeahs White theme Logo.png" alt="MoreYeahs" className="nav-logo-light" />
              <img src="/images/MoreYeahs Dark Theme Logo.png"  alt="MoreYeahs" className="nav-logo-dark" />
            </div>
            <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.8, maxWidth: 280, marginBottom: 24 }}>
              We are committed to making meaningful contributions to the environment and society. As a global technology leader, MoreYeahs aims to automate digital literacy and foster sustainable communities.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: 8 }}>
              {SOCIALS.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid rgba(26,86,219,0.3)', background: 'rgba(26,86,219,0.08)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-3)', textDecoration: 'none', transition: 'all 0.25s ease', cursor: 'pointer' }}
                  onMouseEnter={e => { 
                    (e.currentTarget as HTMLElement).style.borderColor = '#4D86F5'; 
                    (e.currentTarget as HTMLElement).style.color = '#1A56DB';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,219,0.25)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(26,86,219,0.3)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => { 
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,86,219,0.3)'; 
                    (e.currentTarget as HTMLElement).style.color = 'var(--fg-3)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(26,86,219,0.08)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}>
                  <Icon size={13} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Company */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg)', marginBottom: 20 }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
              {COMPANY_LINKS.map(l => (
                <li key={l.label}>
                  <Link href={l.href} style={linkBase}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.color = '#1A56DB';
                      (e.currentTarget as HTMLElement).style.paddingLeft = '8px';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--fg-3)';
                      (e.currentTarget as HTMLElement).style.paddingLeft = '0px';
                    }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Solutions */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg)', marginBottom: 20 }}>Solutions</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
              {SOLUTIONS_LINKS.map(l => (
                <li key={l.label}>
                  <Link href={l.href} style={linkBase}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.color = '#1A56DB';
                      (e.currentTarget as HTMLElement).style.paddingLeft = '8px';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--fg-3)';
                      (e.currentTarget as HTMLElement).style.paddingLeft = '0px';
                    }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg)', marginBottom: 20 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <a href="mailto:info@moreyeahs.com" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--fg-3)', fontSize: 13, lineHeight: 1, transition: 'all 0.25s ease', cursor: 'pointer' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = '#1A56DB';
                  (e.currentTarget as HTMLElement).style.paddingLeft = '8px';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--fg-3)';
                  (e.currentTarget as HTMLElement).style.paddingLeft = '0px';
                }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, background: 'rgba(26,86,219,0.15)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.25s ease', border: '1px solid rgba(26,86,219,0.2)' }}>
                  <Mail size={13} color="#4D86F5" strokeWidth={1.5} />
                </div>
                info@moreyeahs.com
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, background: 'rgba(26,86,219,0.15)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(26,86,219,0.2)' }}>
                  <Phone size={13} color="#4D86F5" strokeWidth={1.5} />
                </div>
                <span style={{ fontSize: 13, color: 'var(--fg-3)' }}>
                  <a href="tel:+919329911531" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#4D86F5'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'inherit'; }}>
                    +91 93299 11531
                  </a>
                  {', '}
                  <a href="tel:+12523492546" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#4D86F5'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'inherit'; }}>
                    +1 252 349 2546
                  </a>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: 'var(--fg-3)', fontSize: 13 }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, background: 'rgba(26,86,219,0.15)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, border: '1px solid rgba(26,86,219,0.2)' }}>
                  <MapPin size={13} color="#4D86F5" strokeWidth={1.5} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--fg-2)', marginBottom: 2 }}>India</div>
                  4th Floor, B Zone Business Spaces, Nipania Main Rd, Indore, MP 452010
                  <div style={{ fontWeight: 600, color: 'var(--fg-2)', marginTop: 8, marginBottom: 2 }}>USA</div>
                  2105, 801 C-Bar Ranch Trl, Cedar Park, TX 78613
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontSize: 12, color: 'var(--fg-3)' }}>© 2026 MoreYeahs IT Technologies Pvt Ltd. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Privacy Policy', '/privacy-policy'], ['Terms & Conditions', '/terms-and-conditions']].map(([label, href]) => (
              <Link key={label} href={href} style={{ fontSize: 12, color: 'var(--fg-3)', textDecoration: 'none', transition: 'all 0.25s ease', cursor: 'pointer' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = '#1A56DB';
                  (e.currentTarget as HTMLElement).style.paddingBottom = '2px';
                  (e.currentTarget as HTMLElement).style.borderBottom = '1px solid #1A56DB';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--fg-3)';
                  (e.currentTarget as HTMLElement).style.paddingBottom = '0px';
                  (e.currentTarget as HTMLElement).style.borderBottom = 'none';
                }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes flowingLight {
          0% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }
        
        @media(max-width:1024px){ .footer-grid{ grid-template-columns:1fr 1fr !important; } }
        @media(max-width:580px){ .footer-grid{ grid-template-columns:1fr !important; } }
      `}</style>
    </footer>
  );
}
