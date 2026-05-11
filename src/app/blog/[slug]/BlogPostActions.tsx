'use client';

import { useState, useEffect, useCallback } from 'react';
import { Share2, Download } from 'lucide-react';
import { downloadAsPDF } from '@/lib/pdf-export';

interface BlogPostActionsProps {
  title: string;
  slug: string;
}

export default function BlogPostActions({ title, slug }: BlogPostActionsProps) {
  const [exporting, setExporting] = useState(false);

  const handlePDF = useCallback(async () => {
    setExporting(true);
    await downloadAsPDF({ contentElementId: 'blog-content', title, filename: slug });
    setExporting(false);
  }, [title, slug]);

  const handleShare = useCallback(() => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title, url: window.location.href });
    }
  }, [title]);

  // Fix broken images in blog content
  useEffect(() => {
    const article = document.getElementById('blog-content');
    if (!article) return;
    const imgs = Array.from(article.querySelectorAll('img')) as HTMLImageElement[];
    imgs.forEach(img => {
      const hide = () => {
        img.style.display = 'none';
        const parent = img.closest('figure, .wp-block-image');
        if (parent) (parent as HTMLElement).style.display = 'none';
      };
      if (!img.src || img.naturalWidth === 0) hide();
      else img.addEventListener('error', hide);
    });
  }, []);

  return (
    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
      <button
        onClick={handlePDF}
        disabled={exporting}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 12, fontWeight: 700,
          color: exporting ? 'var(--fg-3)' : '#4D86F5',
          background: 'none', border: 'none',
          cursor: exporting ? 'not-allowed' : 'pointer',
          transition: 'color 0.2s', fontFamily: 'inherit',
        }}
        onMouseEnter={e => { if (!exporting) (e.currentTarget as HTMLElement).style.color = '#1A56DB'; }}
        onMouseLeave={e => { if (!exporting) (e.currentTarget as HTMLElement).style.color = '#4D86F5'; }}
      >
        <Download size={12} strokeWidth={2} />
        {exporting ? 'Exporting…' : 'Download PDF'}
      </button>
      <button
        onClick={handleShare}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 12, fontWeight: 700, color: '#4D86F5',
          background: 'none', border: 'none', cursor: 'pointer',
          transition: 'color 0.2s', fontFamily: 'inherit',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#1A56DB'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#4D86F5'; }}
      >
        <Share2 size={12} strokeWidth={2} /> Share
      </button>
    </div>
  );
}
