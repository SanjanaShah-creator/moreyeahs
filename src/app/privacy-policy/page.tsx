'use client';

import { motion } from 'framer-motion';
import { Shield, Mail } from 'lucide-react';
import NoiseOverlay from '@/components/ui/NoiseOverlay';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us when you fill out our contact form, request a consultation, subscribe to our newsletter, or communicate with us. This includes your name, email address, phone number, company name, and any other information you choose to provide.

We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed. We use cookies and similar tracking technologies to collect this information.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:
• Respond to your inquiries and provide the services you request
• Send you technical notices, updates, and support messages
• Send marketing communications, if you have opted in
• Monitor and analyse trends, usage, and activities on our website
• Detect and prevent fraudulent transactions and other illegal activities
• Personalise and improve your experience on our website`,
  },
  {
    title: '3. Information Sharing',
    content: `We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except as described in this Privacy Policy.

We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or serving you – provided that those parties agree to keep this information confidential. We may also release your information when required by law or to protect the rights, property, or safety of MoreYeahs IT Technologies, our clients, or others.`,
  },
  {
    title: '4. Data Security',
    content: `We implement industry-standard security measures to protect against unauthorised access to or unauthorised alteration, disclosure, or destruction of data. These include internal reviews of our data collection, storage, and processing practices and security measures, as well as physical security measures to guard against unauthorised access to systems where we store personal data.

However, no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.`,
  },
  {
    title: '5. Cookies',
    content: `Our website uses cookies to enhance your experience. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser (if you allow) that enables the site's or service provider's systems to recognise your browser and capture and remember certain information.

You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies through your browser settings. If you disable cookies, some features of our website may not function properly.`,
  },
  {
    title: '6. Third-Party Links',
    content: `Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites.`,
  },
  {
    title: '7. Your Rights (GDPR & CCPA)',
    content: `Depending on your location, you may have certain rights regarding your personal data, including:
• The right to access the personal data we hold about you
• The right to request correction of inaccurate personal data
• The right to request deletion of your personal data
• The right to object to processing of your personal data
• The right to data portability
• The right to withdraw consent at any time

To exercise any of these rights, please contact us at digitalmoreyeahs@gmail.com.`,
  },
  {
    title: '8. Data Retention',
    content: `We retain personal information for as long as necessary to fulfil the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your personal information, we will securely delete or anonymise it.`,
  },
  {
    title: '9. Children\'s Privacy',
    content: `Our website is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will take steps to delete such information promptly.`,
  },
  {
    title: '10. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our website after any changes constitutes your acceptance of the new Privacy Policy.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 80 }}>
        <NoiseOverlay />
        <div className="blob" style={{ width: 400, height: 400, top: '-60px', right: '-5%', background: 'radial-gradient(circle, rgba(26,86,219,0.10), transparent 68%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(26,86,219,0.12)', border: '1px solid rgba(77,134,245,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={20} color="#4D86F5" strokeWidth={1.5} />
              </div>
              <div className="section-badge" style={{ marginBottom: 0 }}>Privacy Policy</div>
            </div>

            <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--fg)', lineHeight: 1.1, marginBottom: 12 }}>
              Privacy Policy
            </h1>
            <p style={{ fontSize: 14, color: 'var(--fg-3)', marginBottom: 48 }}>
              Last updated: <strong style={{ color: 'var(--fg-2)' }}>January 1, 2026</strong> Â· MoreYeahs IT Technologies Pvt Ltd
            </p>

            <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.78, marginBottom: 48, padding: '20px 24px', borderRadius: 12, background: 'rgba(26,86,219,0.06)', border: '1px solid rgba(77,134,245,0.14)' }}>
              MoreYeahs IT Technologies Pvt Ltd (&quot;MoreYeahs&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              {SECTIONS.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.03 }}
                >
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--fg)', marginBottom: 12, letterSpacing: '-0.01em' }}>{s.title}</h2>
                  <p style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{s.content}</p>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: 56, padding: '28px 28px', borderRadius: 16, background: 'rgba(26,86,219,0.06)', border: '1px solid rgba(77,134,245,0.14)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 8 }}>Contact Us About Privacy</h3>
              <p style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: 16 }}>
                If you have any questions about this Privacy Policy or our data practices, please contact our Privacy Team:
              </p>
              <a href="mailto:digitalmoreyeahs@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#4D86F5', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                <Mail size={14} strokeWidth={1.5} />
                digitalmoreyeahs@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
