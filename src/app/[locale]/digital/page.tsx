'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';

const VIDEOS = [
  { id: 1, title: 'L\'Oréal Georgia — Brand Film 2024', client: "L'Oréal", type: 'Brand Film', duration: '2:34', aspectRatio: '9/16' },
  { id: 2, title: 'Borjomi — Campaign "Pure Nature"', client: 'Borjomi', type: 'Campaign Video', duration: '1:15', aspectRatio: '16/9' },
  { id: 3, title: 'Benefit Talks III — Event Coverage', client: 'Benefit', type: 'Event Coverage', duration: '4:22', aspectRatio: '9/16' },
  { id: 4, title: 'Nexia Georgia — Executive Interview', client: 'Nexia', type: 'Interview', duration: '8:10', aspectRatio: '9/16' },
  { id: 5, title: 'Danceme — Social Content Package', client: 'Danceme', type: 'Social Content', duration: '0:30', aspectRatio: '1/1' },
  { id: 6, title: 'Marriott Tbilisi — Venue Showcase', client: 'Marriott', type: 'Brand Film', duration: '3:18', aspectRatio: '9/16' },
  { id: 7, title: 'Benefit Magazine Q4 — Launch Reel', client: 'Benefit', type: 'Campaign Video', duration: '1:02', aspectRatio: '16/9' },
  { id: 8, title: 'Premium Brand — Social Reels 2024', client: 'Confidential', type: 'Social Content', duration: '0:15', aspectRatio: '9/16' },
];

const TYPES = ['All', 'Brand Film', 'Campaign Video', 'Interview', 'Event Coverage', 'Social Content'];

const STATS = [
  { value: '120+', label: 'Videos Produced' },
  { value: '45', label: 'Brand Partners' },
  { value: '8M+', label: 'Combined Views' },
  { value: '3', label: 'Years of Excellence' },
];

export default function DigitalPage() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? VIDEOS : VIDEOS.filter(v => v.type === filter);

  return (
    <main style={{ background: '#000000', minHeight: '100vh' }}>
      <Navigation />

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '80px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A38560', marginBottom: '20px' }}>Benefit</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '24px' }}>
            Digital &<br />Video
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '560px', lineHeight: 1.7, fontSize: '1rem' }}>
            Premium visual storytelling for ambitious brands. From cinematic brand films to social-first content — we craft narratives that elevate identity and drive meaningful engagement.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '60px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ borderRight: '1px solid rgba(255,255,255,0.07)', padding: '32px 24px', textAlign: 'center' }}>
                <p style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.03em', marginBottom: '8px' }}>{s.value}</p>
                <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter */}
      <section style={{ padding: '48px 0 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {TYPES.map(type => (
              <button key={type} onClick={() => setFilter(type)} style={{ background: type === filter ? '#A38560' : 'transparent', color: type === filter ? '#000' : 'rgba(255,255,255,0.45)', border: `1px solid ${type === filter ? '#A38560' : 'rgba(255,255,255,0.15)'}`, padding: '8px 18px', cursor: 'pointer', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Vertical Video Grid (Reels style) */}
      <section style={{ padding: '0 0 120px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ columns: '3', gap: '12px', columnFill: 'balance' }}>
            {filtered.map((video) => {
              const isVertical = video.aspectRatio === '9/16';
              const isSquare = video.aspectRatio === '1/1';
              return (
                <div key={video.id} style={{ breakInside: 'avoid', marginBottom: '12px', display: 'block' }}>
                  <div style={{ position: 'relative', background: '#111', aspectRatio: video.aspectRatio, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.3s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.01)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
                    {/* Play button overlay */}
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', transition: 'background 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.45)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.2)')}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 0, height: 0, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderLeft: '12px solid rgba(255,255,255,0.8)', marginLeft: '3px' }} />
                      </div>
                    </div>
                    {/* Info overlay bottom */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 14px', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                      <p style={{ fontSize: '0.6rem', color: '#A38560', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>{video.type}</p>
                      <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>{video.title}</p>
                      <p style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{video.client} · {video.duration}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '80px 0 120px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '48px' }}>Our Services</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
            {[
              { title: 'Brand Films', desc: 'Cinematic narratives that define your brand identity and resonate with premium audiences.' },
              { title: 'Campaign Videos', desc: 'Strategic video campaigns designed to maximize reach and conversion across platforms.' },
              { title: 'Event Coverage', desc: 'Premium multi-camera event coverage with same-day highlight reels.' },
              { title: 'Executive Interviews', desc: 'Polished interview production that positions your leaders as industry voices.' },
              { title: 'Social Content', desc: 'High-volume, platform-native content packages optimized for engagement.' },
              { title: 'Aerial & 3D', desc: 'Drone footage and 3D visualization for real estate, hospitality, and luxury brands.' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)', padding: '40px 32px' }}>
                <p style={{ fontSize: '0.65rem', color: '#A38560', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>0{i + 1}</p>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>{s.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#090909', padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: '24px' }}>Start Your Project</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '40px' }}>Ready to elevate your brand story? Let's discuss your vision.</p>
          <a href="mailto:digital@benefit.media" className="btn-primary" style={{ padding: '14px 40px' }}>Get a Quote</a>
        </div>
      </section>

      <footer style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '48px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src="/logo.svg" alt="Benefit" style={{ height: '20px' }} />
          <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)' }}>© 2025 Benefit. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
