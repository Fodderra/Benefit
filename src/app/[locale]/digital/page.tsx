'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';

// ─────────────────────────────────────────────────────────────────────────────
// VIDEOS — edit this array to manage your portfolio.
//
// youtubeId  → plain ID, youtube.com/watch, youtube.com/shorts, or youtu.be URL
//              Leave '' to show a static placeholder.
// thumbnail  → path to a cover image, e.g. '/gallery/cover1.jpg'
//              Leave '' to fall back to a plain dark background.
// ─────────────────────────────────────────────────────────────────────────────
const VIDEOS = [
  { id: 1, title: 'Gumbati Holding — Vake Residence',    client: 'Gumbati',      duration: '2:34', aspectRatio: '9/16',  youtubeId: 'S-ACKlfODQo', thumbnail: 'https://img.youtube.com/vi/S-ACKlfODQo/maxresdefault.jpg' },
  { id: 2, title: 'Moedani Gastro Station - A Taste of Modern Tbilisi"',    client: 'Borjomi',      duration: '1:15', aspectRatio: '16/9',  youtubeId: 'https://youtube.com/shorts/bb6rRHhotS4?si=EYUiAS3Fyn_uEg9p',             thumbnail: 'https://img.youtube.com/vi/bb6rRHhotS4/maxresdefault.jpg' },
  { id: 3, title: 'IERI Store - Where Fashion Meets Art & Culture',  client: 'Benefit',      duration: '4:22', aspectRatio: '9/16',  youtubeId: 'https://youtube.com/shorts/bp0rjMccLh4?si=0ojkqcJmZ7vBfTcZ',             thumbnail: 'https://img.youtube.com/vi/bp0rjMccLh4/maxresdefault.jpg' },
  { id: 4, title: 'Business Partner, "Benefit" section.',  client: 'Benefit',      duration: '4:22', aspectRatio: '9/16',  youtubeId: 'https://www.youtube.com/watch?v=bDYIMrBLKDw',             thumbnail: 'https://img.youtube.com/vi/bDYIMrBLKDw/maxresdefault.jpg' },
  { id: 5, title: 'Live Your Dream - Bene Exclusive',    client: 'Danceme',      duration: '0:30', aspectRatio: '1/1',   youtubeId: 'https://www.youtube.com/watch?v=4mfJEcg--YA',             thumbnail: 'https://img.youtube.com/vi/4mfJEcg--YA/maxresdefault.jpg' },
  { id: 6, title: 'KTW Group x Kairos Logistics"',    client: 'Borjomi',      duration: '1:15', aspectRatio: '16/9',  youtubeId: 'https://youtu.be/Hdg6jkbRqQs?si=8LmxH6Bn7W6rXmob',             thumbnail: 'https://img.youtube.com/vi/Hdg6jkbRqQs/maxresdefault.jpg' },
  { id: 7, title: 'Benefit Magazine Q4 — Launch Reel',   client: 'Benefit',      duration: '1:02', aspectRatio: '16/9',  youtubeId: '',             thumbnail: '' },
  { id: 8, title: 'Premium Brand — Social Reels 2024',   client: 'Confidential', duration: '0:15', aspectRatio: '9/16',  youtubeId: '',             thumbnail: '' },
  { id: 9, title: 'Premium Brand — Social Reels 2024',   client: 'Confidential', duration: '0:15', aspectRatio: '9/16',  youtubeId: '',             thumbnail: '' },
  { id: 10, title: 'Premium Brand — Social Reels 2024',   client: 'Confidential', duration: '0:15', aspectRatio: '9/16',  youtubeId: '',             thumbnail: '' },
  { id: 11, title: 'Premium Brand — Social Reels 2024',   client: 'Confidential', duration: '0:15', aspectRatio: '9/16',  youtubeId: '',             thumbnail: '' },
  { id: 12, title: 'Premium Brand — Social Reels 2024',   client: 'Confidential', duration: '0:15', aspectRatio: '9/16',  youtubeId: '',             thumbnail: '' },
];

const STATS = [
  { value: '120+', label: 'Videos Produced'     },
  { value: '45',   label: 'Brand Partners'      },
  { value: '8M+',  label: 'Combined Views'      },
  { value: '3',    label: 'Years of Excellence' },
];

// Accepts a plain YouTube ID, a youtube.com/shorts/ID URL,
// a youtube.com/watch?v=ID URL, or a youtu.be/ID URL.
function getEmbedUrl(raw: string): string | null {
  const s = raw.trim();
  if (!s) return null;

  const shortsMatch = s.match(/shorts\/([^?&/\s]+)/);
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}?autoplay=1&mute=0`;

  const watchMatch = s.match(/[?&]v=([^?&/\s]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1&mute=0`;

  const shortlinkMatch = s.match(/youtu\.be\/([^?&/\s]+)/);
  if (shortlinkMatch) return `https://www.youtube.com/embed/${shortlinkMatch[1]}?autoplay=1&mute=0`;

  if (!s.includes('/') && !s.includes('.')) {
    return `https://www.youtube.com/embed/${s}?autoplay=1&mute=0`;
  }

  return null;
}

export default function DigitalPage() {
  const [playingId, setPlayingId] = useState<number | null>(null);

  return (
    <main style={{ background: '#000000', minHeight: '100vh' }}>
      <Navigation />

      {/* ── HERO ── */}
      <section style={{ paddingTop: '160px', paddingBottom: '80px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A38560', marginBottom: '24px' }}>Benefit</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9em] uppercase" style={{ color: '#FFFFFF', marginBottom: '32px' }}>
            Digital &<br />Video
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '560px', lineHeight: 1.7, fontSize: '1rem' }}>
            Premium visual storytelling for ambitious brands. From cinematic brand films to social-first content — we craft narratives that elevate identity and drive meaningful engagement.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
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

      {/* ── DYNAMIC VIDEO GRID ── */}
<section style={{ padding: '0 0 120px' }}>
  <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)', // 3 სვეტი
      gap: '20px', 
      alignItems: 'start' 
    }}>
      {VIDEOS.map((video, index) => {
        // ლოგიკა: პირველი 3 (0,1,2) არის 9/16, შემდეგი 3 (3,4,5) არის 16/9 და ა.შ.
        const rowIndex = Math.floor(index / 3);
        const currentAspectRatio = rowIndex % 2 === 0 ? '9/16' : '16/9';
        
        const isPlaying = playingId === video.id;
        const embedUrl = getEmbedUrl(video.youtubeId);
        const canPlay = embedUrl !== null;

        return (
          <div key={video.id} style={{ width: '100%' }}>
            <div
              style={{
                position: 'relative',
                background: '#111',
                aspectRatio: currentAspectRatio, // აქ ხდება მონაცვლეობა
                overflow: 'hidden',
                cursor: canPlay && !isPlaying ? 'pointer' : 'default',
                backgroundImage: `url(${video.thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onClick={() => { if (canPlay && !isPlaying) setPlayingId(video.id); }}
            >
              {isPlaying && embedUrl ? (
                <iframe
                  src={embedUrl}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                  allow="autoplay; encrypted-media; fullscreen"
                />
              ) : (
                <>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
                    {canPlay && (
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1.5px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '14px solid #fff', marginLeft: '3px' }} />
                      </div>
                    )}
                  </div>
                  
                  {/* ინფორმაცია ბარათის ბოლოში */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>{video.title}</p>
                    <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)' }}>{video.client} · {video.duration}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

      {/* ── SERVICES ── */}
      <section style={{ padding: '80px 0 120px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '48px' }}>Our Services</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
            {[
              { title: 'Brand Films',          desc: 'Cinematic narratives that define your brand identity and resonate with premium audiences.' },
              { title: 'Campaign Videos',      desc: 'Strategic video campaigns designed to maximize reach and conversion across platforms.' },
              { title: 'Event Coverage',       desc: 'Premium multi-camera event coverage with same-day highlight reels.' },
              { title: 'Executive Interviews', desc: 'Polished interview production that positions your leaders as industry voices.' },
              { title: 'Social Content',       desc: 'High-volume, platform-native content packages optimized for engagement.' },
              { title: 'Aerial & 3D',          desc: 'Drone footage and 3D visualization for real estate, hospitality, and luxury brands.' },
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

      {/* ── CTA ── */}
      <section style={{ background: '#090909', padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: '24px' }}>Start Your Project</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '40px' }}>Ready to elevate your brand story? Let&apos;s discuss your vision.</p>
          <a href="mailto:digital@benefit.media" className="btn-primary" style={{ padding: '14px 40px' }}>Get a Quote</a>
        </div>
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
