'use client';

import { Navigation } from '@/components/Navigation';

export interface EventItem {
  _id: string;
  title: string;
  date: string;
  location?: string;
  description?: string;
  status: 'upcoming' | 'past';
  registrationUrl?: string;
  coverImage?: { asset?: { url?: string } } | null;
  tags?: string[];
  attendees?: string;
  highlights?: string[];
}

export default function EventsClient({ upcoming, past }: { upcoming: EventItem[]; past: EventItem[] }) {
  return (
    <main style={{ background: '#000000', minHeight: '100vh' }}>
      <Navigation />

      <section style={{ paddingTop: '120px', paddingBottom: '80px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A38560', marginBottom: '20px' }}>Benefit</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '24px' }}>
            Talks &amp;<br />Events
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '520px', lineHeight: 1.7, fontSize: '1rem' }}>
            High-level gatherings where industry leaders, entrepreneurs, and premium brands connect, exchange ideas, and create lasting partnerships.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '48px' }}>
            <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Upcoming Events</p>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A38560', flexShrink: 0 }} />
          </div>
          {upcoming.length === 0 ? (
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.9rem' }}>No upcoming events at this time.</p>
          ) : (
            <div style={{ display: 'grid', gap: '2px' }}>
              {upcoming.map(ev => (
                <div key={ev._id} style={{ background: '#090909', border: '1px solid rgba(255,255,255,0.07)', padding: '48px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '32px', alignItems: 'start' }}>
                  <div>
                    {ev.tags && ev.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                        {ev.tags.map(tag => (
                          <span key={tag} style={{ fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A38560', border: '1px solid rgba(163,133,96,0.4)', padding: '4px 10px' }}>{tag}</span>
                        ))}
                      </div>
                    )}
                    <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '12px' }}>{ev.title}</h2>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', marginBottom: '20px', letterSpacing: '0.04em' }}>{ev.date}{ev.location ? ` · ${ev.location}` : ''}</p>
                    {ev.description && <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '560px', fontSize: '0.95rem' }}>{ev.description}</p>}
                  </div>
                  <div style={{ paddingTop: '8px' }}>
                    <a
                      href={ev.registrationUrl ?? 'mailto:events@benefit.media'}
                      style={{ display: 'inline-block', background: '#A38560', color: '#000', padding: '13px 28px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'background 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#B8956C')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#A38560')}
                    >
                      Register →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section style={{ padding: '80px 0 120px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '48px' }}>Past Events Archive</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px' }}>
            {past.map(ev => {
              const img = ev.coverImage?.asset?.url;
              return (
                <div key={ev._id} style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)', padding: '36px' }}>
                  <div style={{ background: '#111', aspectRatio: '16/9', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
                    {img
                      ? <img src={img} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)' }}>Event Photo</span></div>
                    }
                    {ev.attendees && (
                      <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', padding: '4px 10px' }}>
                        <span style={{ fontSize: '0.58rem', color: '#A38560', fontWeight: 600, letterSpacing: '0.1em' }}>{ev.attendees} Attendees</span>
                      </div>
                    )}
                  </div>
                  <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>{ev.date}{ev.location ? ` · ${ev.location}` : ''}</p>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', marginBottom: '16px' }}>{ev.title}</h3>
                  {ev.highlights && (
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      {ev.highlights.map(h => (
                        <span key={h} style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.06em' }}>· {h}</span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ background: '#090909', padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A38560', marginBottom: '20px' }}>Partner with Us</p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: '24px' }}>Sponsor a Benefit Event</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '40px' }}>Elevate your brand visibility in front of Georgia&apos;s most influential business community.</p>
          <a href="mailto:events@benefit.media" className="btn-primary" style={{ padding: '14px 40px' }}>Get in Touch</a>
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
