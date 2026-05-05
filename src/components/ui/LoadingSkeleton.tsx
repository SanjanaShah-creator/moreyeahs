'use client';

export function LoadingSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <div style={{ width: '100%' }}>
      <div className="loading-skeleton-grid">
        {Array.from({ length: cards }).map((_, i) => (
          <div key={i} className="glass skeleton-card">
            {/* Cover image placeholder */}
            <div className="skeleton skeleton-card-img" />

            {/* Body */}
            <div className="skeleton-card-body">
              {/* Category badge */}
              <div className="skeleton skeleton-subtitle" style={{ width: '38%', marginBottom: 14 }} />
              {/* Title */}
              <div className="skeleton skeleton-headline" style={{ marginBottom: 10 }} />
              <div className="skeleton skeleton-headline" style={{ width: '75%', marginBottom: 16 }} />
              {/* Excerpt lines */}
              <div className="skeleton skeleton-text" style={{ marginBottom: 8 }} />
              <div className="skeleton skeleton-text" style={{ width: '88%', marginBottom: 8 }} />
              <div className="skeleton skeleton-text" style={{ width: '64%', marginBottom: 20 }} />
              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 14, marginTop: 'auto' }}>
                <div className="skeleton" style={{ width: 80, height: 12, borderRadius: 999 }} />
                <div className="skeleton" style={{ width: 50, height: 12, borderRadius: 999 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
