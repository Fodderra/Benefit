'use client';

import { useState, useEffect } from 'react';
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

// პარამეტრები 66 გვერდისთვის
const TOTAL_PAGES = 66;
const START_FILE_NUMBER = 1; // slide 1-39.jpg

function getSlidePath(index: number) {
  // padStart(2, '0') უზრუნველყოფს, რომ 1-ის ნაცვლად დაიწეროს 01, 2-ის ნაცვლად 02 და ა.შ.
  const fileNumber = (START_FILE_NUMBER + index).toString().padStart(2, '0');
  return `/Gallery/Benefit/Magazine publishs/Slider/slide 1-${fileNumber}.jpg`;
}
// 33 "გაშლა" (Spread)
const SPREADS: [string, string | null][] = Array.from(
  { length: Math.ceil(TOTAL_PAGES / 2) },
  (_, i) => [
    getSlidePath(i * 2),
    i * 2 + 1 < TOTAL_PAGES ? getSlidePath(i * 2 + 1) : null,
  ]
);

const COVER_ARCHIVE: (string | null)[] = [
  '/Gallery/Benefit/Magazine publishs/Bene_Mag1 (1).png',
  '/Gallery/Benefit/Magazine publishs/Bene_Mag1 (2).png',
  '/Gallery/Benefit/Magazine publishs/Bene_Mag1 (3).png',
  '/Gallery/Benefit/Magazine publishs/Bene_Mag1 (4).png',
  '/Gallery/Benefit/Magazine publishs/Bene_Mag1 (5).png',
  '/Gallery/Benefit/Magazine publishs/Bene_Mag1 (6).png',
  null,
  null,
];

export default function MagazineClient({ issues }: { issues: Issue[] }) {
  const [spread, setSpread] = useState(0);
  const total = SPREADS.length;
  const [left, right] = SPREADS[spread];
  const progress = ((spread + 1) / total) * 100;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft')  setSpread(p => Math.max(0, p - 1));
      if (e.key === 'ArrowRight') setSpread(p => Math.min(total - 1, p + 1));
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);

  return (
    <main style={{ background: '#000000', minHeight: '100vh' }}>
      <Navigation />

      {/* ── HERO ── */}
      <section style={{ paddingTop: '160px', paddingBottom: '80px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <div className="flex flex-col md:flex-row" style={{ alignItems: 'center', gap: '60px' }}>

            {/* Text block */}
            <div style={{ flex: '1 1 50%' }}>
              <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A38560', marginBottom: '24px' }}>Benefit</p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9em] uppercase" style={{ color: '#FFFFFF', marginBottom: '32px' }}>
                Benefit<br />Magazine
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontSize: '1rem' }}>
                A curated exploration of luxury, business, and lifestyle in Georgia. Step into a world where premium storytelling meets executive insight.
              </p>
            </div>

            {/* Hero image */}
            <div className="w-full md:w-auto" style={{ flex: '0 0 45%' }}>
              <img
                src="/Gallery/Benefit/Side Page photos/heromag2.png"
                alt="Benefit Magazine"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '8px',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                  objectFit: 'cover',
                }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── LATEST EDITION ── */}
      <section style={{ paddingTop: '100px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          
          <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '40px', textAlign: 'center' }}>
            Latest Edition
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px' }}>
            
            {/* მარცხენა ისარი შავ ფონზე */}
            <button
              onClick={() => setSpread(p => Math.max(0, p - 1))}
              disabled={spread === 0}
              style={{
                background: 'none', border: 'none', color: 'white',
                opacity: spread === 0 ? 0 : 0.2, cursor: spread === 0 ? 'default' : 'pointer',
                fontSize: '2rem', transition: 'opacity 0.2s', padding: '20px'
              }}
              onMouseEnter={e => spread > 0 && (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={e => spread > 0 && (e.currentTarget.style.opacity = '0.2')}
            >
              ←
            </button>

            {/* ჟურნალის გაშლა */}
            <div style={{ flex: 1, maxWidth: '860px' }}>
              <div style={{ display: 'flex', width: '100%', boxShadow: '0 48px 100px rgba(0,0,0,0.85)', position: 'relative' }}>
                
                {/* მარცხენა გვერდი */}
                <div 
                  onClick={() => setSpread(p => Math.max(0, p - 1))}
                  style={{ flex: 1, aspectRatio: '3/4', overflow: 'hidden', background: '#111', cursor: 'pointer' }}
                >
                  <img src={left} alt="" loading="eager" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                {/* შუა ზოლი (Spine) */}
                <div style={{ width: '4px', flexShrink: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1))' }} />

                {/* მარჯვენა გვერდი */}
                <div 
                  onClick={() => setSpread(p => Math.min(total - 1, p + 1))}
                  style={{ flex: 1, aspectRatio: '3/4', overflow: 'hidden', background: right ? '#111' : '#000', cursor: 'pointer' }}
                >
                  {right && <img src={right} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
              </div>

              {/* ბრინჯაოსფერი პროგრეს ბარი */}
              <div style={{ marginTop: '40px', height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: '#A38560', transition: 'width 0.3s ease' }} />
              </div>
            </div>

            {/* მარჯვენა ისარი შავ ფონზე */}
            <button
              onClick={() => setSpread(p => Math.min(total - 1, p + 1))}
              disabled={spread === total - 1}
              style={{
                background: 'none', border: 'none', color: 'white',
                opacity: spread === total - 1 ? 0 : 0.2, cursor: spread === total - 1 ? 'default' : 'pointer',
                fontSize: '2rem', transition: 'opacity 0.2s', padding: '20px'
              }}
              onMouseEnter={e => spread < total - 1 && (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={e => spread < total - 1 && (e.currentTarget.style.opacity = '0.2')}
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* Previous Published სექცია უცვლელია */}
      <section style={{ padding: '80px 0 100px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '32px' }}>
            Previous Published
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {COVER_ARCHIVE.map((src, i) => (
              <div key={i} style={{ aspectRatio: '3/4', border: '1px solid rgba(255,255,255,0.14)', overflow: 'hidden', background: '#080808' }}>
                {src && <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '48px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src="/logo.svg" alt="Benefit" style={{ height: '20px' }} />
          <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)' }}>© 2026 Benefit. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}