'use client';

import { motion } from 'framer-motion';
import { FileText, Mail } from 'lucide-react';
import NoiseOverlay from '@/components/ui/NoiseOverlay';

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing and using the MoreYeahs IT Technologies website (moreyeahs.com), you accept and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our website or services.

These Terms and Conditions apply to all visitors, users, and others who access or use the website and any services offered by MoreYeahs IT Technologies Pvt Ltd ("MoreYeahs", "we", "us", or "our").`,
  },
  {
    title: '2. Services',
    content: `MoreYeahs IT Technologies provides professional technology services including, but not limited to, AI and data engineering, cloud infrastructure, Microsoft and Salesforce implementations, and web and mobile application development.

Service delivery is governed by separate engagement agreements, statements of work, or master service agreements executed between MoreYeahs and individual clients. In the event of any conflict between these Terms and a separate agreement, the separate agreement shall prevail.`,
  },
  {
    title: '3. Intellectual Property',
    content: `The website and its original content, features, and functionality are and will remain the exclusive property of MoreYeahs IT Technologies Pvt Ltd and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of MoreYeahs.

Client deliverables are subject to intellectual property provisions set forth in individual client agreements. Unless otherwise agreed in writing, all work product developed for clients becomes the client's property upon receipt of full payment.`,
  },
  {
    title: '4. Use of the Website',
    content: `You agree not to use the website:
â€¢ In any way that violates any applicable local, national, or international law or regulation
â€¢ To transmit any unsolicited or unauthorised advertising or promotional material
â€¢ To impersonate or attempt to impersonate MoreYeahs, a MoreYeahs employee, another user, or any other person or entity
â€¢ To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website, or which may harm MoreYeahs or users of the website

We reserve the right to terminate your use of the website for violating any of the prohibited uses.`,
  },
  {
    title: '5. Disclaimer of Warranties',
    content: `The website is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. MoreYeahs does not warrant that the website will be uninterrupted or error-free, that defects will be corrected, or that the website or the server that makes it available are free of viruses or other harmful components.

MoreYeahs makes no warranties or representations about the accuracy or completeness of the website's content or the content of any websites linked to this website.`,
  },
  {
    title: '6. Limitation of Liability',
    content: `To the fullest extent permitted by law, MoreYeahs IT Technologies Pvt Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of (or inability to access or use) the website.

In no event shall MoreYeahs's total liability to you for all claims arising out of or relating to the use of the website exceed the amount paid by you, if any, for accessing the website during the twelve-month period preceding the claim.`,
  },
  {
    title: '7. Third-Party Links',
    content: `Our website may contain links to third-party websites or services that are not owned or controlled by MoreYeahs. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.

We strongly advise you to read the terms and conditions and privacy policy of any third-party website that you visit.`,
  },
  {
    title: '8. Confidentiality',
    content: `Any information you share with MoreYeahs through our contact forms, email, or other communications that is designated as confidential or that a reasonable person would understand to be confidential will be treated with reasonable care. However, general enquiries submitted through the website are not considered confidential unless covered by a separate non-disclosure agreement.`,
  },
  {
    title: '9. Governing Law',
    content: `These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Indore, Madhya Pradesh, India.

For clients located outside India, disputes may also be subject to arbitration under the rules of the Indian Council of Arbitration, as mutually agreed in individual engagement agreements.`,
  },
  {
    title: '10. Changes to Terms',
    content: `We reserve the right to modify these Terms and Conditions at any time. We will notify users of significant changes by updating the "Last Updated" date at the top of this page. Your continued use of the website after any changes constitutes your acceptance of the new Terms and Conditions.`,
  },
  {
    title: '11. Contact Information',
    content: `If you have any questions about these Terms and Conditions, please contact us at:

MoreYeahs IT Technologies Pvt Ltd
4th Floor, B Zone Business Spaces, Nipania Main Rd, Indore, MP 452010, India
Email: legal@moreyeahs.com
Phone: +91 93299 11531`,
  },
];

export default function TermsPage() {
  return (
    <>
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 80 }}>
        <NoiseOverlay />
        <div className="blob" style={{ width: 400, height: 400, top: '-60px', right: '-5%', background: 'radial-gradient(circle, rgba(26,86,219,0.10), transparent 68%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(26,86,219,0.12)', border: '1px solid rgba(77,134,245,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={20} color="#4D86F5" strokeWidth={1.5} />
              </div>
              <div className="section-badge" style={{ marginBottom: 0 }}>Legal</div>
            </div>

            <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--fg)', lineHeight: 1.1, marginBottom: 12 }}>
              Terms & Conditions
            </h1>
            <p style={{ fontSize: 14, color: 'var(--fg-3)', marginBottom: 48 }}>
              Last updated: <strong style={{ color: 'var(--fg-2)' }}>January 1, 2026</strong> Â· MoreYeahs IT Technologies Pvt Ltd
            </p>

            <p style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.78, marginBottom: 48, padding: '20px 24px', borderRadius: 12, background: 'rgba(26,86,219,0.06)', border: '1px solid rgba(77,134,245,0.14)' }}>
              Please read these Terms and Conditions carefully before using the MoreYeahs IT Technologies website. These terms govern your use of our website and services and constitute a legally binding agreement between you and MoreYeahs IT Technologies Pvt Ltd.
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
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 8 }}>Legal Enquiries</h3>
              <p style={{ fontSize: 14, color: 'var(--fg-3)', lineHeight: 1.7, marginBottom: 16 }}>
                For any legal enquiries or questions about these Terms and Conditions, please contact our Legal Team:
              </p>
              <a href="mailto:legal@moreyeahs.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#4D86F5', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                <Mail size={14} strokeWidth={1.5} />
                legal@moreyeahs.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
