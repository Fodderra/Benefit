'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { useLocale } from 'next-intl';

const ISSUES = [
  { number: 4, quarter: 'Q4', year: 2024, title: 'The Power of Influence', cover: '/first-frame.png' },
  { number: 3, quarter: 'Q3', year: 2024, title: 'Luxury Reimagined', cover: '/first-frame.png' },
  { number: 2, quarter: 'Q2', year: 2024, title: 'Business & Beyond', cover: '/first-frame.png' },
  { number: 1, quarter: 'Q1', year: 2024, title: 'The Premier Issue', cover: '/first-frame.png' },
];

function FlipbookViewer({ issue }: { issue: typeof ISSUES[0] }) {
  const [page, setPage] = useState(0);
  const totalPages = 8;

  return (
    <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', padding: '48px', borderRadius: '2px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
        {/* Book spread */}
        <div style={{ display: 'flex', boxShadow: '0 32px 80px rgba(0,0,0,0.8)', position: 'relative' }}>
          {/* Left page */}
          <div style={{ width: 'clamp(160px, 25vw, 320px)', height: 'clamp(220px, 35vw, 450px)', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '2px solid #000', position: 'relative', overflow: 'hidden' }}>
            {page === 0 ? (
              <div style={{ width: '100%', height: '100%', background: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: '24px' }}>
                <img src={issue.cover} alt={issue.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  <p style={{ fontSize: '0.55rem', letterSpacing: '0.2em', color: '#A38560', textTransform: 'uppercase', fontWeight: 600 }}>Benefit Magazine</p>
                  <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>{issue.quarter} {issue.year}</p>
                </div>
              </div>
            ) : (
              <div style={{ padding: '24px', width: '100%' }}>
                <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Page {page * 2 - 1}</p>
                <div style={{ height: '2px', background: '#A38560', width: '32px', marginBottom: '16px' }} />
                <p style={{ fontSize: '0.65rem', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: '12px' }}>Editorial Feature</p>
                <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>Premium business content curated for Georgia's most influential audience. Each edition explores the intersection of luxury, ambition, and lifestyle.</p>
              </div>
            )}
          </div>
          {/* Right page */}
          <div style={{ width: 'clamp(160px, 25vw, 320px)', height: 'clamp(220px, 35vw, 450px)', background: '#161616', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {page === 0 ? (
              <div style={{ padding: '24px', width: '100%' }}>
                <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Contents</p>
                {['The Power of Influence', 'Luxury Reimagined', 'Business Trends 2025', 'Premium Lifestyle', 'Partner Spotlight', 'Event Recap'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '6px 0', fontSize: '0.58rem', color: 'rgba(255,255,255,0.5)' }}>
                    <span>{item}</span>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>{(i + 1) * 8}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '24px', width: '100%' }}>
                <p style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>Page {page * 2}</p>
                <div style={{ background: '#222', aspectRatio: '16/9', marginBottom: '12px' }} />
                <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>Exclusive editorial photography and brand storytelling from Georgia's premier media platform.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px' }}>
        <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', color: page === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)', padding: '10px 20px', cursor: page === 0 ? 'default' : 'pointer', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'inherit' }}>← Prev</button>
        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>{page + 1} / {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', color: page === totalPages - 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)', padding: '10px 20px', cursor: page === totalPages - 1 ? 'default' : 'pointer', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'inherit' }}>Next →</button>
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setPage(i)} style={{ width: i === page ? '18px' : '6px', height: '6px', borderRadius: '3px', background: i === page ? '#A38560' : 'rgba(255,255,255,0.15)', border: 'none', padding: 0, cursor: 'pointer', transition: 'width 0.3s' }} />
        ))}
      </div>
    </div>
  );
}

export default function MagazinePage() {
  const locale = useLocale();
  const [selected, setSelected] = useState(0);

  return (
    <main style={{ background: '#000000', minHeight: '100vh' }}>
      <Navigation />

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '80px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A38560', marginBottom: '20px' }}>Benefit</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '24px' }}>
            Magazine
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '520px', lineHeight: 1.7, fontSize: '1rem' }}>
            Georgia's premier quarterly business publication — distributed across a curated ecosystem of luxury touchpoints. Read our latest issues online.
          </p>
        </div>
      </section>

      {/* Issue selector */}
      <section style={{ padding: '60px 0 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '24px' }}>All Issues</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
            {ISSUES.map((issue, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ background: i === selected ? '#A38560' : 'transparent', color: i === selected ? '#000' : 'rgba(255,255,255,0.55)', border: `1px solid ${i === selected ? '#A38560' : 'rgba(255,255,255,0.2)'}`, padding: '10px 20px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                {issue.quarter} {issue.year}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Flipbook viewer */}
      <section style={{ padding: '0 0 80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
              Issue #{ISSUES[selected].number} — {ISSUES[selected].title}
            </h2>
            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>
              {ISSUES[selected].quarter} {ISSUES[selected].year}
            </p>
          </div>
          <FlipbookViewer issue={ISSUES[selected]} />
        </div>
      </section>

      {/* All issues grid */}
      <section style={{ padding: '40px 0 120px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '32px' }}>Browse Issues</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {ISSUES.map((issue, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                <div style={{ position: 'relative', aspectRatio: '3/4', background: '#111', marginBottom: '12px', overflow: 'hidden', outline: i === selected ? '2px solid #A38560' : '2px solid transparent', outlineOffset: '2px', transition: 'outline-color 0.2s' }}>
                  <img src={issue.cover} alt={issue.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, transition: 'opacity 0.2s' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                    <p style={{ fontSize: '0.58rem', color: '#A38560', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{issue.quarter} {issue.year}</p>
                  </div>
                </div>
                <p style={{ fontSize: '0.78rem', fontWeight: 600, color: i === selected ? '#fff' : 'rgba(255,255,255,0.55)', letterSpacing: '0.02em' }}>{issue.title}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '48px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src="/logo.svg" alt="Benefit" style={{ height: '20px' }} />
          <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)' }}>© 2025 Benefit. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
