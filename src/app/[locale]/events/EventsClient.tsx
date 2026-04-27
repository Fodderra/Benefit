'use client';

import { useEffect, useRef } from 'react';
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
  thumbnail?: string;
  tags?: string[];
  attendees?: string;
  highlights?: string[];
}

export default function EventsClient({ upcoming, past }: { upcoming: EventItem[]; past: EventItem[] }) {
  const heroRef = useRef<HTMLElement>(null);
  const pastRef = useRef<HTMLElement>(null);
  const ctaRef  = useRef<HTMLElement>(null);

  useEffect(() => {
    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll('.hero-reveal'),
          { y: 40 },
          { y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
        );
      }

      if (pastRef.current) {
        gsap.fromTo(
          pastRef.current.querySelectorAll('.past-card'),
          { y: 40 },
          { y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: pastRef.current, start: 'top 80%' } }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.querySelectorAll('.cta-reveal'),
          { y: 30 },
          { y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' } }
        );
      }
    })();
  }, []);

  const featured     = upcoming[0];
  const moreUpcoming = upcoming.slice(1);

  return (
    <main style={{ background: '#000000', minHeight: '100vh' }}>
      <Navigation />

      {/* ── PAGE TITLE ── */}
      <section style={{ paddingTop: '160px', paddingBottom: '80px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <div className="flex flex-col md:flex-row" style={{ alignItems: 'center', gap: '60px' }}>

            {/* Text block */}
            <div style={{ flex: '1 1 50%' }}>
              <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A38560', marginBottom: '24px' }}>Benefit</p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9em] uppercase" style={{ color: '#FFFFFF', marginBottom: '32px' }}>
                Benefit<br />Talks
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontSize: '1rem' }}>
                High-level gatherings where industry leaders, entrepreneurs, and premium brands connect, exchange ideas, and create lasting partnerships.
              </p>
            </div>

            {/* Hero image */}
            <div className="w-full md:w-auto" style={{ flex: '0 0 45%' }}>
              <img
                src="/Gallery/Benefit/Side Page photos/talks1.png"
                alt="Benefit Talks"
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

      {/* ── UPCOMING EVENT ── */}
      <section ref={heroRef} style={{ paddingTop: '80px', paddingBottom: '100px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>

          <p className="hero-reveal" style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '52px' }}>
            Upcoming Event
          </p>

          {featured ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

                {/* ── LEFT: text ── */}
                <div>
                  {featured.tags && featured.tags.length > 0 && (
                    <div className="hero-reveal" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
                      {featured.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '0.56rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#A38560', border: '1px solid rgba(163,133,96,0.4)', padding: '4px 10px' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h1 className="hero-reveal text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.95em]" style={{ color: '#FFFFFF', marginBottom: '32px' }}>
                    {featured.title}
                  </h1>

                  <div className="hero-reveal" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' }}>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>{featured.date}</p>
                    {featured.location && (
                      <>
                        <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
                        <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>{featured.location}</p>
                      </>
                    )}
                  </div>

                  {featured.description && (
                    <p className="hero-reveal" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: '44px', maxWidth: '460px' }}>
                      {featured.description}
                    </p>
                  )}

                  <a
                    className="hero-reveal btn-outline"
                    href={featured.registrationUrl ?? 'mailto:events@benefit.media'}
                    style={{ letterSpacing: '0.14em', fontSize: '0.72rem', fontWeight: 700 }}
                  >
                    Register Now →
                  </a>
                </div>

                {/* ── RIGHT: image ── */}
                <div className="hero-reveal" style={{ aspectRatio: '4/5', overflow: 'hidden', background: '#111', position: 'relative' }}>
                  {featured.coverImage?.asset?.url ? (
                    <img
                      src={featured.coverImage.asset.url}
                      alt={featured.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #111 0%, #0a0a0a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.08)' }}>Benefit Talks</span>
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: '20px', left: '20px', background: '#A38560', padding: '8px 16px' }}>
                    <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#000' }}>{featured.date}</span>
                  </div>
                </div>
              </div>

              {/* Secondary upcoming events */}
              {moreUpcoming.length > 0 && (
                <div style={{ marginTop: '64px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  {moreUpcoming.map(ev => (
                    <div key={ev._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div>
                        <p style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{ev.title}</p>
                        <p style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
                          {ev.date}{ev.location ? ` · ${ev.location}` : ''}
                        </p>
                      </div>
                      <a
                        href={ev.registrationUrl ?? 'mailto:events@benefit.media'}
                        style={{ fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A38560', textDecoration: 'none', border: '1px solid rgba(163,133,96,0.4)', padding: '9px 20px', transition: 'all 0.2s', flexShrink: 0 }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#A38560'; el.style.color = '#000'; }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = '#A38560'; }}
                      >
                        Register →
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.9rem' }}>No upcoming events at this time. Check back soon.</p>
          )}
        </div>
      </section>

      {/* ── PAST EVENTS ── */}
      <section ref={pastRef} style={{ padding: '100px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '48px' }}>
            Past Events
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '12px' }}>
            {past.map(ev => {
              const bgImg = ev.thumbnail || ev.coverImage?.asset?.url;
              return (
                <div
                  key={ev._id}
                  className="past-card"
                  style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', cursor: 'default', transition: 'transform 0.4s ease',
                    background: bgImg ? `url(${bgImg}) center/cover no-repeat` : 'linear-gradient(135deg, #0d0d0d, #1a1a1a)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.02)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'; }}
                >
                  {/* dark gradient overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)', transition: 'background 0.3s' }} />

                  {/* attendees badge */}
                  {ev.attendees && (
                    <div style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(0,0,0,0.7)', padding: '4px 10px', backdropFilter: 'blur(4px)' }}>
                      <span style={{ fontSize: '0.56rem', color: '#A38560', fontWeight: 700, letterSpacing: '0.1em' }}>{ev.attendees}</span>
                    </div>
                  )}

                  {/* text at bottom */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 18px' }}>
                    <p style={{ fontSize: '0.56rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '6px' }}>
                      {ev.date}{ev.location ? ` · ${ev.location}` : ''}
                    </p>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', marginBottom: ev.highlights && ev.highlights.length > 0 ? '10px' : 0 }}>{ev.title}</h3>
                    {ev.highlights && ev.highlights.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {ev.highlights.map(h => (
                          <span key={h} style={{ fontSize: '0.56rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}>· {h}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PARTNER WITH US CTA ── */}
      <section ref={ctaRef} style={{ padding: '160px 48px', textAlign: 'center' }}>
        <p className="cta-reveal" style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#A38560', marginBottom: '24px' }}>
          Partner with Us
        </p>
        <h2 className="cta-reveal text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.95em] max-w-4xl mx-auto" style={{ color: '#FFFFFF', marginBottom: '28px' }}>
          Sponsor a<br />Benefit Event
        </h2>
        <p className="cta-reveal" style={{ color: 'rgba(255,255,255,0.42)', lineHeight: 1.75, maxWidth: '400px', margin: '0 auto 44px', fontSize: '0.9rem' }}>
          Elevate your brand visibility in front of Georgia&apos;s most influential business community.
        </p>
        <a
          className="cta-reveal btn-primary"
          href="mailto:events@benefit.media"
          style={{ letterSpacing: '0.14em', fontSize: '0.72rem', fontWeight: 700, padding: '14px 40px' }}
        >
          Get in Touch
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
