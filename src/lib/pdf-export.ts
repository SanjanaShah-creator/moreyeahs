'use client';

// Light-mode color palette used when rendering PDF (always white background)
const PDF_COLORS = {
  text:        'rgb(15, 20, 40)',
  textMuted:   'rgb(80, 90, 110)',
  textFaint:   'rgb(120, 130, 150)',
  bg:          'rgb(255, 255, 255)',
  bgCard:      'rgb(248, 250, 255)',
  bgCard2:     'rgb(241, 245, 253)',
  border:      'rgb(220, 228, 245)',
  blue:        'rgb(26, 86, 219)',
  blueMid:     'rgb(77, 134, 245)',
};

/**
 * Decide whether a computed color is "dark-theme light" (near-white / very light)
 * that would be invisible on a white PDF background.
 */
function isNearWhite(rgb: string): boolean {
  const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return false;
  const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])];
  // luminance > 0.75 → too light for white background
  return (0.299 * r + 0.587 * g + 0.114 * b) > 190;
}

function isNearTransparent(rgb: string): boolean {
  const m = rgb.match(/rgba?\(\d+,\s*\d+,\s*\d+,?\s*([\d.]+)?\)/);
  if (!m) return false;
  const alpha = m[1] !== undefined ? parseFloat(m[1]) : 1;
  return alpha < 0.05;
}

async function logoDataUrl(): Promise<string | null> {
  // Always use the light-theme logo for PDF (white background)
  const src = '/images/MoreYeahs White theme Logo.png';
  try {
    const res = await fetch(src);
    const blob = await res.blob();
    return new Promise(resolve => {
      const r = new FileReader();
      r.onload = () => resolve(r.result as string);
      r.onerror = () => resolve(null);
      r.readAsDataURL(blob);
    });
  } catch { return null; }
}

export async function downloadAsPDF(options: {
  contentElementId: string;
  title: string;
  filename: string;
}) {
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ]);

  const element = document.getElementById(options.contentElementId);
  if (!element) return;

  const PAGE_W  = 210;
  const PAGE_H  = 297;
  const MARGIN  = 16;
  const HDR_H   = 24;
  const FTR_H   = 12;
  const AVAIL_H = PAGE_H - HDR_H - FTR_H - MARGIN * 2;
  const AVAIL_W = PAGE_W - MARGIN * 2;

  // render content once at high resolution
  // Tag each live element so we can match it in the clone and copy computed styles
  const liveElements = [element, ...Array.from(element.querySelectorAll('*'))] as HTMLElement[];
  liveElements.forEach((el, i) => el.setAttribute('data-pdf-idx', String(i)));

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
    onclone: (clonedDoc: Document) => {
      // html2canvas v1 onclone only receives the cloned document.
      // We copy computed styles from the live DOM and remap any near-white
      // (dark-theme) colors to readable light-mode equivalents so the PDF
      // always renders on a white background correctly.
      const clonedRoot = clonedDoc.getElementById(options.contentElementId);
      if (!clonedRoot) return;

      const clonedAll = [clonedRoot, ...Array.from(clonedRoot.querySelectorAll('*'))] as HTMLElement[];
      clonedAll.forEach((clonedEl) => {
        const idx = clonedEl.getAttribute('data-pdf-idx');
        if (idx === null) return;
        const liveEl = liveElements[Number(idx)];
        if (!liveEl) return;
        const cs = window.getComputedStyle(liveEl);

        // ── text color ──────────────────────────────────────────────
        const color = cs.color;
        clonedEl.style.color = isNearWhite(color) || isNearTransparent(color)
          ? PDF_COLORS.text
          : color;

        // ── background ──────────────────────────────────────────────
        const bg = cs.backgroundColor;
        if (isNearTransparent(bg)) {
          clonedEl.style.backgroundColor = 'transparent';
        } else {
          // Dark backgrounds → map to light card backgrounds
          const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (m) {
            const [r, g, b] = [Number(m[1]), Number(m[2]), Number(m[3])];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;
            if (lum < 40) {
              // Very dark (near-black) → white card
              clonedEl.style.backgroundColor = PDF_COLORS.bgCard;
            } else if (lum < 80) {
              // Dark → light card
              clonedEl.style.backgroundColor = PDF_COLORS.bgCard2;
            } else {
              clonedEl.style.backgroundColor = bg;
            }
          } else {
            clonedEl.style.backgroundColor = bg;
          }
        }

        // ── borders ─────────────────────────────────────────────────
        const fixBorder = (c: string) =>
          isNearWhite(c) || isNearTransparent(c) ? PDF_COLORS.border : c;
        clonedEl.style.borderTopColor    = fixBorder(cs.borderTopColor);
        clonedEl.style.borderBottomColor = fixBorder(cs.borderBottomColor);
        clonedEl.style.borderLeftColor   = fixBorder(cs.borderLeftColor);
        clonedEl.style.borderRightColor  = fixBorder(cs.borderRightColor);
      });
    },
  });

  // Clean up temporary attributes
  liveElements.forEach(el => el.removeAttribute('data-pdf-idx'));

  const imgFullH = (canvas.height / canvas.width) * AVAIL_W;

  // title block height on page 1
  const doc0 = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  doc0.setFontSize(16);
  const titleLines = doc0.splitTextToSize(options.title, AVAIL_W);
  const titleBlockH = titleLines.length * 7 + 16; // text + rule padding

  const firstSliceH = AVAIL_H - titleBlockH;     // content height on page 1
  const remainingH  = Math.max(0, imgFullH - firstSliceH);
  const extraPages  = remainingH > 0 ? Math.ceil(remainingH / AVAIL_H) : 0;
  const totalPages  = 1 + extraPages;

  // PDF always uses light theme (white background)
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const logo = await logoDataUrl();

  const drawHeader = (p: number) => {
    doc.setFillColor(248, 250, 255);
    doc.rect(0, 0, PAGE_W, HDR_H, 'F');

    // blue accent stripe
    doc.setFillColor(26, 86, 219);
    doc.rect(0, 0, PAGE_W, 3, 'F');

    // logo image or fallback wordmark
    if (logo) {
      try {
        doc.addImage(logo, 'PNG', MARGIN, 7, 44, 10);
      } catch {
        wordmarkFallback(doc, MARGIN);
      }
    } else {
      wordmarkFallback(doc, MARGIN);
    }

    // right: domain
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 120, 160);
    doc.text('moreyeahs.com', PAGE_W - MARGIN, 15, { align: 'right' });

    // page number (all pages)
    if (totalPages > 1) {
      doc.setFontSize(7);
      doc.setTextColor(150, 175, 230);
      doc.text(`${p + 1} / ${totalPages}`, PAGE_W - MARGIN, 20, { align: 'right' });
    }
  };

  const drawFooter = () => {
    doc.setDrawColor(220, 228, 245);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, PAGE_H - FTR_H - 1, PAGE_W - MARGIN, PAGE_H - FTR_H - 1);

    doc.setFillColor(250, 252, 255);
    doc.rect(0, PAGE_H - FTR_H, PAGE_W, FTR_H, 'F');

    doc.setTextColor(120, 140, 190);
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `© ${new Date().getFullYear()} MoreYeahs IT Technologies Pvt Ltd  ·  Confidential`,
      MARGIN,
      PAGE_H - 4.5,
    );
  };

  for (let p = 0; p < totalPages; p++) {
    if (p > 0) doc.addPage();

    drawHeader(p);
    drawFooter();

    const contentY = HDR_H + MARGIN;

    if (p === 0) {
      // title
      doc.setTextColor(15, 20, 40);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(titleLines, MARGIN, contentY + 6);

      // blue rule under title
      doc.setDrawColor(26, 86, 219);
      doc.setLineWidth(0.6);
      doc.line(MARGIN, contentY + titleBlockH - 6, MARGIN + 60, contentY + titleBlockH - 6);
      doc.setDrawColor(210, 220, 240);
      doc.setLineWidth(0.3);
      doc.line(MARGIN + 62, contentY + titleBlockH - 6, PAGE_W - MARGIN, contentY + titleBlockH - 6);

      // content slice: canvas rows 0 → firstSliceH
      const sliceH = Math.min(firstSliceH, imgFullH);
      if (sliceH > 0) {
        const sliceCanvas = sliceCanvasRegion(canvas, imgFullH, 0, sliceH, AVAIL_W);
        doc.addImage(
          sliceCanvas.toDataURL('image/jpeg', 0.88),
          'JPEG', MARGIN, contentY + titleBlockH, AVAIL_W, sliceH,
        );
      }
    } else {
      // pages 2+: pick up exactly where page 1 left off
      const sliceStart = firstSliceH + (p - 1) * AVAIL_H;
      const sliceH = Math.min(AVAIL_H, imgFullH - sliceStart);
      if (sliceH > 0) {
        const sliceCanvas = sliceCanvasRegion(canvas, imgFullH, sliceStart, sliceH, AVAIL_W);
        doc.addImage(
          sliceCanvas.toDataURL('image/jpeg', 0.88),
          'JPEG', MARGIN, contentY, AVAIL_W, sliceH,
        );
      }
    }
  }

  doc.save(`${options.filename}.pdf`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wordmarkFallback(doc: any, x: number) {
  doc.setFillColor(26, 86, 219);
  doc.roundedRect(x, 8, 9, 9, 1.2, 1.2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.text('mY', x + 4.5, 13.5, { align: 'center' });
  doc.setFontSize(10);
  doc.setTextColor(15, 20, 40);
  doc.text('MoreYeahs', x + 12, 13);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 120, 160);
  doc.text('AI, Data & Cloud', x + 12, 17.5);
}

function sliceCanvasRegion(
  src: HTMLCanvasElement,
  fullHmm: number,
  startMm: number,
  heightMm: number,
  _widthMm: number,
): HTMLCanvasElement {
  const scaleY = src.height / fullHmm;
  const sy = Math.round(startMm * scaleY);
  const sh = Math.round(heightMm * scaleY);

  const out = document.createElement('canvas');
  out.width  = src.width;
  out.height = Math.max(sh, 1);
  const ctx = out.getContext('2d')!;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, out.width, out.height);
  ctx.drawImage(src, 0, sy, src.width, sh, 0, 0, src.width, sh);
  return out;
}
