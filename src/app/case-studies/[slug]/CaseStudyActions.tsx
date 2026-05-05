'use client';

import { useState, useCallback } from 'react';
import { Download, Share2 } from 'lucide-react';
import { downloadAsPDF } from '@/lib/pdf-export';

export default function CaseStudyActions({ title, slug }: { title: string; slug: string }) {
  const [exporting, setExporting] = useState(false);

  const handlePDF = useCallback(async () => {
    setExporting(true);
    // Try the ACF sections container first, fall back to classic content
    const contentId = document.getElementById('cs-acf-content')
      ? 'cs-acf-content'
      : 'cs-content';
    await downloadAsPDF({ contentElementId: contentId, title, filename: slug });
    setExporting(false);
  }, [title, slug]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({ title, url: window.location.href });
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
  }, [title]);

  const btnStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 6,
    fontSize: 12, fontWeight: 700,
    background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <button onClick={handlePDF} disabled={exporting}
        style={{ ...btnStyle, color: exporting ? 'var(--fg-3)' : '#4D86F5', cursor: exporting ? 'not-allowed' : 'pointer' }}
        onMouseEnter={e => { if (!exporting) (e.currentTarget as HTMLElement).style.color = '#1A56DB'; }}
        onMouseLeave={e => { if (!exporting) (e.currentTarget as HTMLElement).style.color = '#4D86F5'; }}>
        <Download size={12} strokeWidth={2} /> {exporting ? 'Exporting…' : 'Download PDF'}
      </button>
      <button onClick={handleShare}
        style={{ ...btnStyle, color: '#4D86F5' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1A56DB'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#4D86F5'; }}>
        <Share2 size={12} strokeWidth={2} /> Share
      </button>
    </div>
  );
}
