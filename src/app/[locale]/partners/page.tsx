'use client';

import { Navigation } from '@/components/Navigation';

const STATS = [
  { value: '85+', label: 'Brand Partners' },
  { value: '4', label: 'Years of Collaboration' },
  { value: '350K+', label: 'Affluent Readers Reached' },
  { value: '12', label: 'Successful Events' },
];

const PARTNERS = [
  { name: "L'Oréal Georgia", category: 'Beauty & Lifestyle' },
  { name: 'Nexia Georgia', category: 'Finance' },
  { name: 'Danceme', category: 'Fashion' },
  { name: 'Borjomi', category: 'Gastronomy' },
  { name: 'Marriott Tbilisi', category: 'Hospitality' },
  { name: 'Biltmore Hotel', category: 'Hospitality' },
  { name: 'Rooms Hotels', category: 'Hospitality' },
  { name: 'Sheraton Grand', category: 'Hospitality' },
  { name: 'TBC Bank', category: 'Finance' },
  { name: 'Bank of Georgia', category: 'Finance' },
  { name: 'Magti', category: 'Technology' },
  { name: 'Silknet', category: 'Technology' },
  { name: 'Natakhtari', category: 'Gastronomy' },
  { name: 'Château Mukhrani', category: 'Gastronomy' },
  { name: 'Meama', category: 'Gastronomy' },
];

const TIERS = [
  {
    title: 'Magazine Partner',
    price: 'From $2,400 / issue',
    features: ['Full-page spread in quarterly print edition', 'Digital version inclusion', 'Social media amplification', 'Distributed across 300+ premium touchpoints'],
  },
  {
    title: 'Event Partner',
    price: 'From $4,800 / event',
    features: ['Branded activation zone at Benefit Talks', 'Logo on all event materials', 'Speaking opportunity available', 'Post-event content package', 'Guest list priority'],
    featured: true,
  },
  {
    title: 'Digital Partner',
    price: 'From $1,200 / month',
    features: ['Branded video content production', 'Social media campaign', 'Email newsletter feature', 'Website banner placement'],
  },
];

export default function PartnersPage() {
  return (
    <main style={{ background: '#000000', minHeight: '100vh' }}>
      <Navigation />

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '80px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A38560', marginBottom: '20px' }}>Benefit</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '24px' }}>
            Partners
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '560px', lineHeight: 1.7, fontSize: '1rem' }}>
            Benefit connects premium brands with Georgia's most influential audience — across print, live events, and digital platforms.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section style={{ padding: '0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ borderRight: '1px solid rgba(255,255,255,0.07)', padding: '56px 28px', textAlign: 'center' }}>
                <p style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '12px' }}>{s.value}</p>
                <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Tiers */}
      <section style={{ padding: '80px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '48px' }}>Partnership Options</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
            {TIERS.map((tier, i) => (
              <div key={i} style={{ background: tier.featured ? '#0f0d0a' : '#0a0a0a', border: `1px solid ${tier.featured ? '#A38560' : 'rgba(255,255,255,0.07)'}`, padding: '40px', position: 'relative' }}>
                {tier.featured && (
                  <div style={{ position: 'absolute', top: '-1px', left: '32px', background: '#A38560', padding: '4px 12px' }}>
                    <span style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#000' }}>Most Popular</span>
                  </div>
                )}
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '8px', marginTop: tier.featured ? '12px' : '0' }}>{tier.title}</h3>
                <p style={{ fontSize: '0.88rem', color: '#A38560', fontWeight: 600, marginBottom: '28px' }}>{tier.price}</p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '24px' }}>
                  {tier.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#A38560', flexShrink: 0, marginTop: '1px', fontSize: '0.7rem' }}>✓</span>
                      <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{f}</p>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '28px' }}>
                  <a href="mailto:partners@benefit.media" style={{ display: 'inline-block', background: tier.featured ? '#A38560' : 'transparent', color: tier.featured ? '#000' : '#fff', border: `1px solid ${tier.featured ? '#A38560' : 'rgba(255,255,255,0.3)'}`, padding: '11px 24px', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={e => { if (!tier.featured) { e.currentTarget.style.borderColor = '#fff'; } }}
                    onMouseLeave={e => { if (!tier.featured) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; } }}>
                    Enquire Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logo Grid */}
      <section style={{ padding: '80px 0 120px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '48px' }}>Our Partners</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', borderTop: '1px solid rgba(255,255,255,0.06)', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
            {PARTNERS.map((p, i) => (
              <div key={i} style={{ borderRight: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '32px 20px', textAlign: 'center', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0a0a0a')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.02em', marginBottom: '6px' }}>{p.name}</p>
                <p style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#090909', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '28px' }}>
            Become Part<br />Of The Ecosystem
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: '40px', fontSize: '1rem' }}>
            Join Georgia's most influential business and lifestyle platform. Reach premium customers across print, live events, and digital.
          </p>
          <a href="mailto:partners@benefit.media" className="btn-primary" style={{ padding: '15px 48px', fontSize: '0.875rem' }}>Join Us →</a>
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
