'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';

export interface Issue {
  _id?: string;
  number: number;
  quarter: string;
  year: number;
  title: string;
  cover?: string | null;
  pdfUrl?: string | null;
}

// Each entry = [left page, right page]
const SPREADS = [
  ['/frames/Slider/1.png',  '/frames/Slider/2.png' ],
  ['/frames/Slider/3.png',  '/frames/Slider/4.png' ],
  ['/frames/Slider/5.png',  '/frames/Slider/6.png' ],
  ['/frames/Slider/7.png',  '/frames/Slider/8.png' ],
  ['/frames/Slider/9.png',  '/frames/Slider/10.png'],
  ['/frames/Slider/11.png', '/frames/Slider/12.png'],
  ['/frames/Slider/13.png', '/frames/Slider/1.png' ],
  ['/frames/Slider/2.png',  '/frames/Slider/3.png' ],
];

// null = empty/placeholder cell
const COVER_ARCHIVE: (string | null)[] = [
  '/frames/Slider/1.png',
  '/frames/Slider/4.png',
  '/frames/Slider/7.png',
  '/frames/Slider/10.png',
  '/frames/Slider/2.png',
  '/frames/Slider/5.png',
  null,
  null,
];

export default function MagazineClient({ issues }: { issues: Issue[] }) {
  const [spread, setSpread] = useState(0);
  const total = SPREADS.length;
  const [left, right] = SPREADS[spread];

  return (
    <main style={{ background: '#000000', minHeight: '100vh' }}>
      <Navigation />

      {/* ── LATEST EDITION ── */}
      <section style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>

          <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '40px' }}>
            Latest Edition
          </p>

          {/* Two-page spread */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'flex', width: '100%', maxWidth: '860px', boxShadow: '0 48px 100px rgba(0,0,0,0.85)' }}>
              {/* Left page */}
              <div style={{ flex: 1, aspectRatio: '3/4', overflow: 'hidden', background: '#111' }}>
                <img
                  src={left}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              {/* Spine */}
              <div style={{ width: '6px', flexShrink: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0.08))' }} />
              {/* Right page */}
              <div style={{ flex: 1, aspectRatio: '3/4', overflow: 'hidden', background: '#f0f0f0' }}>
                <img
                  src={right}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>

          {/* Connected prev / counter / next */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <button
              onClick={() => setSpread(p => Math.max(0, p - 1))}
              disabled={spread === 0}
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.22)', borderRight: 'none', color: spread === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.85)', padding: '11px 28px', cursor: spread === 0 ? 'default' : 'pointer', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'inherit', transition: 'color 0.2s' }}
            >← Prev</button>
            <div style={{ border: '1px solid rgba(255,255,255,0.22)', padding: '11px 28px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', userSelect: 'none' }}>
              {spread + 1} / {total}
            </div>
            <button
              onClick={() => setSpread(p => Math.min(total - 1, p + 1))}
              disabled={spread === total - 1}
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.22)', borderLeft: 'none', color: spread === total - 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.85)', padding: '11px 28px', cursor: spread === total - 1 ? 'default' : 'pointer', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'inherit', transition: 'color 0.2s' }}
            >Next →</button>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
            {SPREADS.map((_, i) => (
              <button
                key={i}
                onClick={() => setSpread(i)}
                style={{ width: i === spread ? '22px' : '6px', height: '6px', borderRadius: '3px', background: i === spread ? '#A38560' : 'rgba(255,255,255,0.2)', border: 'none', padding: 0, cursor: 'pointer', transition: 'width 0.3s ease, background 0.3s ease' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── PREVIOUS PUBLISHED ── */}
      <section style={{ padding: '80px 0 100px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '32px' }}>
            Previous Published
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {COVER_ARCHIVE.map((src, i) => (
              <div
                key={i}
                style={{ aspectRatio: '3/4', border: '1px solid rgba(255,255,255,0.14)', overflow: 'hidden', background: '#080808', position: 'relative', cursor: src ? 'pointer' : 'default', transition: 'border-color 0.2s' }}
                onMouseEnter={e => { if (src) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)'; }}
              >
                {src && (
                  <img
                    src={src}
                    alt={`Issue ${i + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease, filter 0.3s ease', filter: 'grayscale(0.15)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0.15)'; }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BECOME PART OF THE ECOSYSTEM ── */}
      <section style={{ padding: '160px 48px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95em] uppercase max-w-4xl mx-auto" style={{ color: '#FFFFFF', margin: '0 auto 32px', maxWidth: '760px' }}>
          Become Part<br />of the<br />Ecosystem
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.42)', lineHeight: 1.75, maxWidth: '400px', margin: '0 auto 44px', fontSize: '0.9rem' }}>
          Join Georgia&apos;s most influential business and lifestyle platform. Meet premium customers across print, live events, and digital.
        </p>
        <a
          href="mailto:info@benefit.media"
          className="btn-outline"
          style={{ letterSpacing: '0.16em', fontSize: '0.72rem', fontWeight: 700 }}
        >
          Media Kit ↓
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '48px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src="/logo.svg" alt="Benefit" style={{ height: '20px' }} />
          <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)' }}>© 2026 Benefit. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
