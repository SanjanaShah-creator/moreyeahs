export default function Loading() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 120, paddingBottom: 80 }}>
      {/* Hero skeleton */}
      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', padding: '0 24px 80px' }}>
        <div className="skeleton" style={{ width: 120, height: 28, borderRadius: 999, margin: '0 auto 24px' }} />
        <div className="skeleton" style={{ width: '85%', height: 52, borderRadius: 14, margin: '0 auto 14px' }} />
        <div className="skeleton" style={{ width: '65%', height: 52, borderRadius: 14, margin: '0 auto 24px' }} />
        <div className="skeleton" style={{ width: '70%', height: 20, borderRadius: 999, margin: '0 auto 10px' }} />
        <div className="skeleton" style={{ width: '55%', height: 20, borderRadius: 999, margin: '0 auto' }} />
      </div>
      {/* Content skeleton — 3-col grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass" style={{ padding: 0, overflow: 'hidden', borderRadius: 16 }}>
              <div className="skeleton" style={{ height: 172, borderRadius: 0 }} />
              <div style={{ padding: '20px 22px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div className="skeleton" style={{ width: '40%', height: 20, borderRadius: 999 }} />
                <div className="skeleton" style={{ height: 18, borderRadius: 8 }} />
                <div className="skeleton" style={{ width: '75%', height: 18, borderRadius: 8 }} />
                <div className="skeleton" style={{ height: 13, borderRadius: 999 }} />
                <div className="skeleton" style={{ width: '85%', height: 13, borderRadius: 999 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 13, marginTop: 4 }}>
                  <div className="skeleton" style={{ width: 70, height: 12, borderRadius: 999 }} />
                  <div className="skeleton" style={{ width: 90, height: 12, borderRadius: 999 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
