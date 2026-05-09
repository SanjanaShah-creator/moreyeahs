'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, BookOpen, Users, Coffee, Heart, Globe2, MapPin, Clock, TrendingUp, ArrowRight, ChevronLeft, ChevronRight, Award, Layers } from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { GradientBars } from '@/components/ui/gradient-bar-hero-section';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ScrollReveal from '@/components/ui/ScrollReveal';
import VoicesCarousel from '@/components/ui/VoicesCarousel';
const FV = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const FT = { duration: 0.6 };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

/* â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const PRIDE_STATS = [
  { Icon: Award, value: '12', label: 'Years', sub: 'Total Industrial experience' },
  { Icon: Globe2, value: '100+', label: 'Satisfied Clients', sub: 'Relationships built through reliable delivery' },
  { Icon: Users, value: '200+', label: 'Successful Projects', sub: 'Ideas shipped into meaningful outcomes' },
  { Icon: Layers, value: '15+', label: 'Services we offer', sub: 'Solutions across modern digital needs' },
];

const PRIDE_EVENTS = [
  {
    title: 'Pench National Park Outing',
    eyebrow: 'Team Retreat',
    desc: 'A rejuvenating team getaway surrounded by nature, reflection, and shared moments that brought us closer as a team.',
    highlights: [
      'Jungle safari and wildlife spotting at one of India\'s finest tiger reserves',
      'Bonfire evenings with team games, stories, and laughter',
      'Mindful walks through the forest â€” a reset from the everyday grind',
      'Strengthened bonds that carry back into how we work together',
    ],
    stats: [
      { value: '40+', label: 'Team Members' },
      { value: '3', label: 'Days Together' },
    ],
    photos: [
      '/images/Pench%20National%20Park%20Outing%201.JPG',
      '/images/Pench%20National%20Park%20Outing%202.JPG',
      '/images/Pench%20National%20Park%20Outing%203.JPG',
      '/images/Pench%20National%20Park%20Outing%204.JPG',
      '/images/Pench%20National%20Park%20Outing%205.JPG',
      '/images/Pench%20National%20Park%20Outing%206.JPG',
      '/images/Pench%20National%20Park%20Outing%207.JPG',
      '/images/Pench%20National%20Park%20Outing%208.JPG',
    ],
  },
  {
    title: 'Town Hall',
    eyebrow: 'Company Gathering',
    desc: 'Our quarterly Town Hall is where the whole company comes together â€” to align on vision, celebrate wins, and recognize the people who make it all happen.',
    highlights: [
      'Company-wide updates on goals, milestones, and the road ahead',
      'Spotlight awards recognizing outstanding contributions across teams',
      'Open Q&A with leadership â€” honest conversations, no filters',
      'A reminder that behind every project is a team that genuinely cares',
    ],
    stats: [
      { value: '150+', label: 'Attendees' },
      { value: 'Quarterly', label: 'Cadence' },
    ],
    photos: [
      '/images/Town%20Hall%201.jpg',
      '/images/Town%20Hall%202.jpg',
      '/images/Town%20Hall%203.jpg',
      '/images/Town%20Hall%204.jpg',
    ],
  },
];

const VALUES = [
  { Icon: Shield,      title: 'Humility',                  desc: 'We remain grounded and open to learning, no matter our achievements. By respecting others\' contributions and acknowledging our limitations, we build stronger relationships and grow together.' },
  { Icon: BookOpen,    title: 'Integrity',                 desc: 'We act with honesty, transparency, and strong moral principles in everything we do. Integrity guides our decisions, inspires trust, and ensures consistency between our words and actions.' },
  { Icon: Users,       title: 'Team Spirit',               desc: 'We believe success is a collective achievement built on collaboration and respect. By supporting each other toward shared goals, we create unity that makes us resilient in every challenge.' },
  { Icon: Coffee,      title: 'Accountability',            desc: 'We remain grounded and open to learning, no matter our achievements. By respecting others\' contributions and acknowledging our limitations, we build stronger relationships and grow together.' },
  { Icon: TrendingUp,  title: 'Continuously Evolve',       desc: 'We are dedicated to our people, clients, and mission, standing by them in every situation. Our commitment is built on trust, consistency, and respect, which strengthens long-term partnerships.' },
  { Icon: Heart,       title: 'Gratitude & Appreciation',  desc: 'We believe in recognizing every effort, big or small, that contributes to success. Gratitude strengthens our culture of respect, while appreciation motivates our people to keep growing.' },
  { Icon: Globe2,      title: 'Loyalty',                   desc: 'We are dedicated to our people, clients, and mission, standing by them in every situation. Our commitment is built on trust, consistency, and respect, which strengthens long-term partnerships.' },
  { Icon: MapPin,      title: 'Inclusion & Diversity',     desc: 'We believe diverse perspectives make us stronger. By creating an inclusive environment where everyone feels heard, respected, and empowered, we encourage creativity and innovation.' },
];

const PERKS = [
  { Icon: Heart,       title: 'Health Insurance',      desc: 'Full coverage for you and your family â€” medical, dental, and vision.' },
  { Icon: Globe2,      title: 'Remote-First',          desc: 'Work from anywhere with optional access to our Indore and Cedar Park offices.' },
  { Icon: Clock,       title: 'Flexible Hours',        desc: 'Async-first culture. Own your schedule, deliver great work.' },
  { Icon: TrendingUp,  title: 'Performance Bonuses',   desc: 'Performance bonuses twice a year recognising outstanding contributions across the team.' },
];

export default function LifeAtMoreYeahsPage() {
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const activeEvent = PRIDE_EVENTS[activeEventIndex];

  useEffect(() => {
    setActivePhotoIndex(0);
  }, [activeEventIndex]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActivePhotoIndex((current) => (current + 1) % activeEvent.photos.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [activeEvent.photos.length]);

  const showPreviousPhoto = () => {
    setActivePhotoIndex((current) => (current - 1 + activeEvent.photos.length) % activeEvent.photos.length);
  };

  const showNextPhoto = () => {
    setActivePhotoIndex((current) => (current + 1) % activeEvent.photos.length);
  };

  return (
    <>
      {/* â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 80 }}>
        <GradientBars count={16} />
        <NoiseOverlay />

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <motion.div variants={stagger} initial="hidden" animate="visible" style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <motion.div variants={FV} transition={FT}>
              <div className="section-badge" style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: 20 }}>
                <Users size={11} strokeWidth={2} />
                About Us
              </div>
            </motion.div>
            <motion.h1 variants={FV} transition={FT} style={{ fontSize: 'clamp(34px,5.5vw,62px)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--fg)', lineHeight: 1.06, marginBottom: 22 }}>
              At MoreYeahs, people feel <span className="grad">supported, inspired, and empowered.</span>
            </motion.h1>
            <motion.p variants={FV} transition={FT} style={{ fontSize: 17, color: 'var(--fg-3)', lineHeight: 1.8, maxWidth: 560, margin: '0 auto' }}>
              Our culture is built on collaboration, continuous learning, and a shared passion for creating meaningful digital solutions. Here, ideas are valued, growth is encouraged, and every individual plays a role in shaping what we build together.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ Moments of Pride â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }} className="pride-layout">
            {/* Left â€” text + stats */}
            <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.65 }}>
              <div className="section-badge" style={{ marginBottom: 16 }}>Our Journey</div>
              <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', marginBottom: 24, lineHeight: 1.1 }}>
                Moments Of <span className="grad">Pride.</span>
              </h2>
              <p style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.85, marginBottom: 32 }}>
                We don&apos;t just work together, we celebrate together. Our culture is built on the shared joy of every milestone.
              </p>
              <div className="pride-story-note">
                <div>
                  <span>Culture in action</span>
                  <p>From town halls to team retreats, these moments help us pause, reflect, and recognize the people behind the work.</p>
                </div>
                <div>
                  <span>Shared progress</span>
                  <p>Every milestone reminds us that strong delivery begins with trust, ownership, and a team that shows up for each other.</p>
                </div>
              </div>
            </motion.div>

            {/* Right â€” team photo */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.65 }}
              className="pride-stats-grid"
            >
              {PRIDE_STATS.map(({ Icon, value, label, sub }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(26,86,219,0.14)', transition: { duration: 0.3 } }}
                  className="glass pride-stat-card"
                >
                  <div className="pride-stat-icon">
                    <Icon size={17} color="#4D86F5" strokeWidth={1.5} />
                  </div>
                  <div className="pride-stat-value">{value}</div>
                  <div className="pride-stat-label">{label}</div>
                  <div className="pride-stat-sub">{sub}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="pride-event-showcase"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.65 }}
          >
            <div className="pride-showcase-head">
              <div>
                <div className="section-badge" style={{ marginBottom: 14 }}>Event Gallery</div>
                <h3>Stories from our celebrations</h3>
              </div>
            </div>

            <div className="pride-event-rail" aria-label="Select pride event">
              {PRIDE_EVENTS.map((event, index) => (
                <button
                  type="button"
                  key={event.title}
                  className={index === activeEventIndex ? 'active' : ''}
                  onClick={() => setActiveEventIndex(index)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {event.title}
                </button>
              ))}
            </div>

            <article className="glass pride-event-card">
              <div className="pride-event-copy">
                <div className="pride-event-topline">
                  <span>{activeEvent.eyebrow}</span>
                </div>
                <h3>{activeEvent.title}</h3>
                <p style={{ marginBottom: 20 }}>{activeEvent.desc}</p>
                {activeEvent.highlights && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {activeEvent.highlights.map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4D86F5', flexShrink: 0, marginTop: 5 }} />
                        <span style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.65 }}>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pride-carousel" aria-label={`${activeEvent.title} photos`}>
                <div
                  className="pride-carousel-track"
                  style={{ transform: `translateX(-${activePhotoIndex * 100}%)` }}
                >
                  {activeEvent.photos.map((photo, photoIndex) => (
                    <div className="pride-photo-frame" key={photo}>
                      <img
                        src={photo}
                        alt={`${activeEvent.title} ${photoIndex + 1}`}
                        loading={photoIndex === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  ))}
                </div>

                <button type="button" className="pride-carousel-arrow prev" aria-label="Previous photo" onClick={showPreviousPhoto}>
                  <ChevronLeft size={18} strokeWidth={2} />
                </button>
                <button type="button" className="pride-carousel-arrow next" aria-label="Next photo" onClick={showNextPhoto}>
                  <ChevronRight size={18} strokeWidth={2} />
                </button>

                <div className="pride-carousel-dots" aria-hidden="true">
                  {activeEvent.photos.map((photo, index) => (
                    <button
                      type="button"
                      key={photo}
                      className={index === activePhotoIndex ? 'active' : ''}
                      onClick={() => setActivePhotoIndex(index)}
                      tabIndex={-1}
                    />
                  ))}
                </div>
              </div>
            </article>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ Values Grid (4 + centered image + 4) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <ScrollReveal variant="clipUp" style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-badge" style={{ display: 'inline-flex', marginBottom: 16 }}>Push Beyond Boundaries</div>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.15 }}>
              What guides everything we do
            </h2>
          </ScrollReveal>

          {/* Top 4 values */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 32 }} className="values-grid-top">
            {VALUES.slice(0, 4).map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 32, scale: 0.96, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                className="glass"
                style={{ padding: '28px 22px' }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={20} color="#4D86F5" strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--fg)', marginBottom: 8, letterSpacing: '-0.02em' }}>{title}</h3>
                <p style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Center team image with caption */}
          <ScrollReveal variant="scaleUp" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <div style={{ maxWidth: 600, borderRadius: 20, overflow: 'hidden', boxShadow: '0 30px 100px rgba(0,0,0,0.12)' }}>
              <img
                src="/images/Life%20At%20MoreYeahs%20People.jpg"
                alt="Our team"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
            <div className="glass" style={{ padding: '14px 20px', maxWidth: 520, textAlign: 'center' }}>
              <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.7 }}>
                A rejuvenating team getaway surrounded by nature, reflection, and shared moments.
              </p>
            </div>
          </ScrollReveal>

          {/* Bottom 4 values */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="values-grid-bottom">
            {VALUES.slice(4, 8).map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 32, scale: 0.96, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                className="glass"
                style={{ padding: '28px 22px' }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={20} color="#4D86F5" strokeWidth={1.5} />
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--fg)', marginBottom: 8, letterSpacing: '-0.02em' }}>{title}</h3>
                <p style={{ fontSize: 12, color: 'var(--fg-3)', lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Perks & Benefits â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â€“ */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <ScrollReveal variant="clipUp" style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-badge" style={{ display: 'inline-flex', marginBottom: 16 }}>Perks & Benefits</div>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.15 }}>
              We take care of our people
            </h2>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, maxWidth: 900, margin: '0 auto' }} className="perks-grid">
            {PERKS.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 32, scale: 0.96, filter: 'blur(4px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass"
                style={{ padding: '28px 24px', display: 'flex', gap: 18, alignItems: 'flex-start' }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 11, background: 'rgba(26,86,219,0.10)', border: '1px solid rgba(77,134,245,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={19} color="#4D86F5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--fg)', marginBottom: 6, letterSpacing: '-0.02em' }}>{title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.7, fontWeight: 500 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ Team Videos â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <ScrollReveal variant="clipUp" style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-badge" style={{ display: 'inline-flex', marginBottom: 16 }}>Meet the Team</div>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', lineHeight: 1.15 }}>
              Voices from <span className="grad">MoreYeahs</span>
            </h2>
            <p style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.7, maxWidth: 480, margin: '14px auto 0' }}>
              Hear directly from the people who make MoreYeahs what it is.
            </p>
          </ScrollReveal>

          <VoicesCarousel />
        </div>
      </section>

      {/* â”€â”€ CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <TestimonialsSection />

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <ScrollReveal variant="scaleUp" delay={0.1}>
            <motion.div
              className="glass"
              style={{ maxWidth: 720, margin: '0 auto', padding: '64px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
            >
              <div className="blob" style={{ width: 360, height: 360, top: '-80px', right: '-80px', background: 'radial-gradient(circle, rgba(26,86,219,0.15), transparent 65%)' }} />
              <div className="section-badge" style={{ display: 'inline-flex', marginBottom: 20, position: 'relative', zIndex: 1 }}>Join the Team</div>
              <h2 style={{ fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--fg)', marginBottom: 16, lineHeight: 1.15, position: 'relative', zIndex: 1 }}>
                Ready to do the best work <span className="grad">of your career?</span>
              </h2>
              <p style={{ fontSize: 15, color: 'var(--fg-3)', lineHeight: 1.75, maxWidth: 480, margin: '0 auto 32px', position: 'relative', zIndex: 1 }}>
                We are always looking for exceptional people who care deeply about craft, outcomes, and each other.
              </p>
              <Link
                href="/careers"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#1A56DB', color: '#fff', fontSize: 14, fontWeight: 700, borderRadius: 12, padding: '14px 28px', textDecoration: 'none', boxShadow: '0 6px 22px rgba(26,86,219,0.32)', transition: 'background 0.2s, transform 0.2s', position: 'relative', zIndex: 1 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0E2E75'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A56DB'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                View Open Roles <ArrowRight size={14} strokeWidth={2} />
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        .pride-event-showcase {
          margin-top: 72px;
        }
        .pride-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .pride-story-note {
          display: grid;
          gap: 12px;
        }
        .pride-story-note div {
          padding: 18px 20px;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 18px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .pride-story-note span {
          display: block;
          margin-bottom: 6px;
          color: var(--fg);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: -0.01em;
        }
        .pride-story-note p {
          color: var(--fg-3);
          font-size: 12px;
          line-height: 1.7;
        }
        .pride-stat-card {
          padding: 28px 24px;
          min-height: 202px;
        }
        .pride-stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: rgba(26,86,219,0.12);
          border: 1px solid rgba(77,134,245,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .pride-stat-value {
          font-size: 36px;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--fg);
          line-height: 1;
          margin-bottom: 6px;
        }
        .pride-stat-label {
          font-size: 13px;
          font-weight: 700;
          color: var(--fg-2);
          margin-bottom: 6px;
        }
        .pride-stat-sub {
          font-size: 12px;
          color: var(--fg-3);
          line-height: 1.6;
        }
        .pride-showcase-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 28px;
          margin-bottom: 22px;
        }
        .pride-showcase-head h3 {
          color: var(--fg);
          font-size: clamp(26px, 3vw, 38px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.12;
        }
        .pride-showcase-head p {
          max-width: 380px;
          color: var(--fg-3);
          font-size: 13px;
          line-height: 1.7;
        }
        .pride-event-rail {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          overscroll-behavior-x: contain;
          padding: 0 0 14px;
          margin-bottom: 18px;
        }
        .pride-event-rail::-webkit-scrollbar {
          height: 5px;
        }
        .pride-event-rail::-webkit-scrollbar-track {
          background: transparent;
        }
        .pride-event-rail::-webkit-scrollbar-thumb {
          background: rgba(77,134,245,0.65);
          border-radius: 999px;
        }
        .pride-event-rail button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          flex: 0 0 auto;
          border: 1px solid rgba(77,134,245,0.20);
          border-radius: 999px;
          padding: 10px 16px 10px 10px;
          background: var(--card-bg);
          color: var(--fg-2);
          font: inherit;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .pride-event-rail button span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 999px;
          background: rgba(26,86,219,0.10);
          color: #4D86F5;
          font-size: 10px;
        }
        .pride-event-rail button.active {
          background: #1A56DB;
          border-color: #1A56DB;
          color: #fff;
        }
        .pride-event-rail button.active span {
          background: rgba(255,255,255,0.18);
          color: #fff;
        }
        .pride-event-card {
          display: grid;
          grid-template-columns: minmax(220px, 0.36fr) minmax(0, 0.64fr);
          gap: 20px;
          align-items: stretch;
          scroll-snap-align: start;
          padding: 20px;
          border-radius: 24px;
          box-shadow: 0 34px 100px rgba(0,0,0,0.13);
          min-width: 0;
        }
        .pride-event-card + .pride-event-card {
          margin-top: 22px;
        }
        .pride-event-copy {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          min-width: 0;
          padding-top: 4px;
        }
        .pride-event-topline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 12px;
          color: #4D86F5;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .pride-event-topline span:last-child {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--fg-3);
          letter-spacing: 0;
          text-transform: none;
          white-space: nowrap;
        }
        .pride-event-card h3 {
          color: var(--fg);
          font-size: clamp(20px, 2.4vw, 28px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.12;
          margin-bottom: 10px;
        }
        .pride-event-card p {
          color: var(--fg-3);
          font-size: 13px;
          line-height: 1.7;
          max-width: 440px;
        }
        .pride-carousel {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          background: rgba(26,86,219,0.08);
          border: 1px solid rgba(77,134,245,0.16);
        }
        .pride-carousel-track {
          display: flex;
          transition: transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }
        .pride-photo-frame {
          width: 100%;
          flex: 0 0 100%;
          aspect-ratio: 16 / 9;
          border-radius: 0;
          overflow: hidden;
          background: #0a0d14;
        }
        .pride-photo-frame img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
        }
        .pride-carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 38px;
          height: 38px;
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 999px;
          background: rgba(10,13,20,0.52);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: background 0.2s ease, transform 0.2s ease;
          z-index: 2;
        }
        .pride-carousel-arrow:hover {
          background: rgba(26,86,219,0.86);
        }
        .pride-carousel-arrow.prev {
          left: 12px;
        }
        .pride-carousel-arrow.next {
          right: 12px;
        }
        .pride-carousel-dots {
          position: absolute;
          left: 50%;
          bottom: 12px;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          max-width: calc(100% - 96px);
          overflow: hidden;
          z-index: 2;
        }
        .pride-carousel-dots button {
          width: 18px;
          height: 4px;
          flex: 0 0 auto;
          border: 0;
          border-radius: 999px;
          background: rgba(255,255,255,0.45);
          padding: 0;
        }
        .pride-carousel-dots button.active {
          background: #fff;
        }
        @media(max-width:1100px){
          .pride-layout { grid-template-columns: 1fr !important; }
          .pride-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .pride-event-card { grid-template-columns: 1fr !important; }
          .pride-showcase-head { align-items: flex-start; flex-direction: column; }
          .values-grid-top, .values-grid-bottom { grid-template-columns: repeat(2, 1fr) !important; }
          .perks-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        /* â”€â”€ team videos â”€â”€ */
        .team-video-card { border-radius: 16px; overflow: hidden; transition: box-shadow 0.25s, transform 0.25s; }
        .team-video-card:hover { box-shadow: 0 20px 60px rgba(26,86,219,0.18); transform: translateY(-4px); }
        .voices-scroll-track::-webkit-scrollbar { display: none; }
        .voices-scroll-track { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes voicesTicker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media(max-width:640px){
          .pride-event-showcase { margin-top: 48px; }
          .pride-stats-grid { grid-template-columns: 1fr !important; }
          .pride-event-card {
            padding: 16px;
            border-radius: 20px;
          }
          .pride-event-topline {
            align-items: flex-start;
            flex-direction: column;
            gap: 6px;
          }
          .pride-photo-frame {
            aspect-ratio: 4 / 3;
          }
          .pride-carousel-arrow {
            width: 34px;
            height: 34px;
          }
          .values-grid-top, .values-grid-bottom { grid-template-columns: 1fr !important; }
          .perks-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
