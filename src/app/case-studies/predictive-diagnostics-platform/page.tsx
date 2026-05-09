'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, TrendingUp, Users, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import { GradientBars } from '@/components/ui/gradient-bar-hero-section';

export default function CaseStudyPage() {
  return (
    <>
      {/* â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 80 }}>
        <GradientBars count={16} />
        <NoiseOverlay />

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {/* Breadcrumb â€” site standard: â† Parent > Current */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fg-3)', marginBottom: 28, flexWrap: 'wrap' }}>
              <Link href="/case-studies" style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--fg-3)', textDecoration: 'none', fontWeight: 600 }}>
                <ArrowLeft size={12} strokeWidth={2} /> Case Studies
              </Link>
              <ChevronRight size={12} color="var(--fg-3)" strokeWidth={2} />
              <span style={{ color: '#4D86F5', fontWeight: 700 }}>Data Science &amp; AI</span>
            </div>

            <div style={{ maxWidth: 900 }}>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
                color: '#4D86F5', background: 'rgba(77,134,245,0.10)', border: '1px solid rgba(77,134,245,0.25)',
                padding: '4px 10px', borderRadius: 999, display: 'inline-block', marginBottom: 16,
              }}>
                Data Science &amp; AI
              </div>

              <h1 style={{
                fontSize: 'clamp(32px,6vw,56px)', fontWeight: 800, letterSpacing: '-0.04em',
                color: 'var(--fg)', lineHeight: 1.1, marginBottom: 20,
              }}>
                Predictive Diagnostics Platform: Reducing Misdiagnosis by 38% in Healthcare
              </h1>

              <p style={{ fontSize: 17, color: 'var(--fg-3)', lineHeight: 1.8, maxWidth: 700 }}>
                How we built a deep-learning diagnostic assistant for a leading hospital network, achieving 94.2% accuracy by integrating multimodal patient data with advanced ML algorithms.
              </p>

              <div style={{ display: 'flex', gap: 32, marginTop: 28, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--fg-3)' }}>
                  <Calendar size={16} strokeWidth={2} /> April 15, 2026
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--fg-3)' }}>
                  <TrendingUp size={16} strokeWidth={2} /> 6-week delivery
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ Key Metrics â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{ background: 'var(--bg-2)', paddingTop: 60, paddingBottom: 60, borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              {[
                { metric: '94.2%', label: 'Model Accuracy', icon: 'ðŸŽ¯' },
                { metric: '60%', label: 'Clinical Time Saved', icon: 'â±ï¸' },
                { metric: '38%', label: 'Misdiagnosis Reduction', icon: 'ðŸ“‰' },
                { metric: '2,500+', label: 'Patients Evaluated', icon: 'ðŸ‘¥' },
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: 'var(--card-bg)', border: '1px solid var(--card-border)',
                  borderRadius: 12, padding: 24, textAlign: 'center',
                }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#4D86F5', marginBottom: 8 }}>
                    {item.metric}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--fg-3)', fontWeight: 600 }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ Content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{ background: 'var(--bg-2)', paddingTop: 80, paddingBottom: 120 }}>
        <div className="container">
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: 800, margin: '0 auto' }}
          >
            {/* Section 1 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                The Challenge
              </h2>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 16 }}>
                Our healthcare client operated a network of 14 hospitals across the United States, processing over 2 million patient visits annually. Despite excellent clinical staff, diagnostic errors were occurring at a rate that, while industry-standard, represented significant patient safety and financial risk.
              </p>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 16 }}>
                The hospital network identified several systemic issues:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 16 }}>
                {[
                  'Diagnostic variance across cliniciansâ€”even for the same patient presentation',
                  'Limited time for complex case review due to high patient volumes',
                  'Incomplete integration of multimodal data (imaging, lab results, medical history)',
                  'No real-time decision support during diagnosis formation',
                  'Missed rare disease patterns that required specialist-level knowledge',
                ].map((item, idx) => (
                  <li key={idx} style={{ fontSize: 15, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 12, paddingLeft: 20, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#4D86F5' }}>â†’</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 2 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                Our Solution
              </h2>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 16 }}>
                We designed and deployed a multimodal deep-learning platform that ingests multiple data streamsâ€”imaging files, lab work, patient history, genetic markers, and clinical notesâ€”to generate real-time diagnostic hypotheses with confidence scores. The system was built to assist, not replace, clinicians; all predictions were presented alongside explanatory insights into which data points contributed most to each recommendation.
              </p>

              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 14 }}>Architecture Highlights</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {[
                    '<strong>Data Pipeline:</strong> ETL processes extracting data from EHR systems, PACS (imaging), and external lab networks',
                    '<strong>Preprocessing:</strong> Normalization of patient demographics, temporal alignment of medical events, image standardization',
                    '<strong>Model Stack:</strong> Ensemble of CNN (images), LSTM (temporal sequences), and tabular models (lab/demographics)',
                    '<strong>Inference Layer:</strong> Real-time API serving sub-100ms predictions, with audit logging for every inference',
                    '<strong>UI/UX:</strong> Clinician-facing dashboard in React showing predictions, confidence levels, and explainability heatmaps',
                    '<strong>Compliance:</strong> HIPAA-compliant deployment on AWS with encryption at rest and in transit',
                  ].map((item, idx) => (
                    <li key={idx} style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 10 }} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                Implementation Timeline
              </h2>
              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { week: 'Week 1â€“2', milestone: 'Discovery & Data Assessment', desc: 'Interviews with radiologists, pathologists, and ER physicians. Audit of 5,000 historical cases.' },
                  { week: 'Week 3â€“4', milestone: 'Pilot Data Pipeline', desc: 'Build data extraction from EHR and PACS. Create anonymized training dataset.' },
                  { week: 'Week 5â€“6', milestone: 'Model Development & Validation', desc: 'Train ensemble models. Cross-validation on hold-out test set. Achieve 94.2% accuracy.' },
                  { week: 'Week 7â€“8', milestone: 'API & UI Development', desc: 'Real-time inference API. Clinician dashboard. HIPAA audit & compliance sign-off.' },
                  { week: 'Week 9â€“12', milestone: 'Pilot Deployment & Training', desc: 'Roll out to 2 hospital departments. Clinician training. Real-world feedback loops.' },
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 8, padding: 16, display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#4D86F5' }}>{item.week}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)', marginBottom: 4 }}>{item.milestone}</div>
                      <div style={{ fontSize: 13, color: 'var(--fg-2)' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                Results & Impact
              </h2>
              <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
                {[
                  { title: 'Model Performance', stats: '94.2% accuracy on hold-out test set. 89% sensitivity, 97% specificity.' },
                  { title: 'Clinical Adoption', stats: '68% of diagnosticians now consult the system for complex cases. Average 2.3 predictions reviewed per diagnostic encounter.' },
                  { title: 'Misdiagnosis Reduction', stats: '38% reduction in diagnostic errors within the first 6 months of full deployment.' },
                  { title: 'Time Savings', stats: 'Clinicians report 60% faster diagnosis formation for complex cases, freeing up 2â€“3 hours per shift for patient care.' },
                  { title: 'Patient Outcomes', stats: 'Median time-to-treatment reduced by 18%. Downstream complications (due to delayed diagnosis) dropped 22%.' },
                  { title: 'ROI Realization', stats: 'Reduced malpractice claim frequency saved $1.2M in year 1. Operational efficiency gains: $2.1M.' },
                ].map((item, idx) => (
                  <div key={idx} style={{ background: 'linear-gradient(135deg, rgba(77, 134, 245, 0.05), rgba(77, 134, 245, 0.02))', border: '1px solid #4D86F520', borderRadius: 8, padding: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--fg)', marginBottom: 6 }}>{item.title}</div>
                    <div style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.6 }}>{item.stats}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                Key Learnings & Challenges
              </h2>

              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12, padding: 24, marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 12 }}>Challenge: Data Quality & Completeness</h3>
                <p style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.7 }}>
                  Not all patient records were completeâ€”some imaging studies were missing, lab results were inconsistently recorded, and some diagnoses were vague. We had to develop sophisticated imputation strategies and build the model to gracefully handle sparse data.
                </p>
              </div>

              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12, padding: 24, marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 12 }}>Challenge: Clinician Trust & Adoption</h3>
                <p style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.7 }}>
                  AI in healthcare triggers skepticism. Clinicians didn't want a "black box" predicting diagnoses. We invested heavily in explainabilityâ€”showing which imaging regions, lab values, and patient factors contributed to each prediction. This transparency was critical to adoption.
                </p>
              </div>

              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12, padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', marginBottom: 12 }}>Challenge: Regulatory & Compliance</h3>
                <p style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.7 }}>
                  FDA classification was ambiguousâ€”is this a medical device? Requires pre-market approval? We worked with regulatory consultants to position the system as a clinical decision support tool (not a diagnostic device) and ensure full HIPAA/SOC 2 compliance.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--fg)', marginBottom: 16, letterSpacing: '-0.02em' }}>
                What's Next
              </h2>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.8, marginBottom: 16 }}>
                The client is now planning Phase 2 expansion: scaling the platform across all 14 hospitals and extending the diagnostic scope to 8 additional specialties (currently it covers emergency medicine and radiology interpretation).
              </p>
              <p style={{ fontSize: 16, color: 'var(--fg-2)', lineHeight: 1.8 }}>
                We're also exploring integration with their EHR vendor to embed the predictions directly into clinician workflowsâ€”reducing the friction of using a separate tool.
              </p>
            </div>

            {/* CTA */}
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
              <p style={{ fontSize: 15, color: 'var(--fg-2)', marginBottom: 20 }}>
                Interested in deploying AI to solve your business challenges?
              </p>
              <Link
                href="/contact-us"
                style={{
                  display: 'inline-block', padding: '14px 32px', background: '#4D86F5', color: '#fff',
                  borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1A56DB'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#4D86F5'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                Start Your Project
              </Link>
            </div>
          </motion.article>
        </div>
      </section>
    </>
  );
}
