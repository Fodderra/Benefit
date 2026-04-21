'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';

const CATEGORIES = ['All', 'Business', 'Lifestyle', 'Fashion', 'Hospitality', 'Gastronomy', 'Events'];

const POSTS = [
  { slug: 'georgia-business-influence', title: "Georgia's Most Influential Business Leaders 2025", category: 'Business', date: 'Apr 10, 2025', readTime: '6 min', excerpt: "Meet the entrepreneurs and executives shaping Georgia's economic landscape in 2025." },
  { slug: 'luxury-hospitality-tbilisi', title: 'The Rise of Luxury Hospitality in Tbilisi', category: 'Hospitality', date: 'Mar 28, 2025', readTime: '4 min', excerpt: 'How international hotel brands are transforming the Georgian capital into a premium destination.' },
  { slug: 'benefit-talks-recap', title: 'Benefit Talks III: Highlights & Key Takeaways', category: 'Events', date: 'Mar 15, 2025', readTime: '5 min', excerpt: 'Recapping the most impactful moments from our third high-level business gathering.' },
  { slug: 'georgian-fashion-week', title: 'Georgian Fashion: A New Creative Force', category: 'Fashion', date: 'Feb 22, 2025', readTime: '7 min', excerpt: 'How local designers are gaining international recognition while preserving cultural heritage.' },
  { slug: 'fine-dining-guide', title: 'Tbilisi Fine Dining: The Ultimate 2025 Guide', category: 'Gastronomy', date: 'Feb 10, 2025', readTime: '8 min', excerpt: 'From Michelin-calibre restaurants to hidden gems — the definitive guide to premium dining in Georgia.' },
  { slug: 'premium-lifestyle-2025', title: 'Defining Premium Lifestyle in the Modern Era', category: 'Lifestyle', date: 'Jan 30, 2025', readTime: '5 min', excerpt: 'What does luxury mean in 2025? Beyond material goods, the pursuit of meaningful experiences.' },
  { slug: 'investment-opportunities', title: 'Investment Opportunities in Georgia: 2025 Overview', category: 'Business', date: 'Jan 18, 2025', readTime: '9 min', excerpt: 'Key sectors attracting foreign and domestic investment — real estate, tech, hospitality, and more.' },
  { slug: 'boutique-hotels', title: 'Boutique Hotels Redefining Georgian Hospitality', category: 'Hospitality', date: 'Jan 5, 2025', readTime: '4 min', excerpt: 'The boutique revolution: intimate, story-driven stays that rival global luxury chains.' },
  { slug: 'wine-culture', title: "Georgia's Wine Culture: Ancient Tradition Meets Modern Commerce", category: 'Gastronomy', date: 'Dec 20, 2024', readTime: '6 min', excerpt: "How the world's oldest wine country is leveraging 8,000 years of tradition in today's premium market." },
];

export default function BlogPage() {
  const [category, setCategory] = useState('All');

  const filtered = category === 'All' ? POSTS : POSTS.filter(p => p.category === category);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <main style={{ background: '#000000', minHeight: '100vh' }}>
      <Navigation />

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '80px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A38560', marginBottom: '20px' }}>Benefit</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '24px' }}>
            Blog
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '520px', lineHeight: 1.7, fontSize: '1rem' }}>
            Editorial insights at the intersection of business, lifestyle, and culture — curated for Georgia's most influential audience.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section style={{ padding: '40px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: '64px', background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', zIndex: 10 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{ background: cat === category ? '#A38560' : 'transparent', color: cat === category ? '#000' : 'rgba(255,255,255,0.45)', border: `1px solid ${cat === category ? '#A38560' : 'rgba(255,255,255,0.15)'}`, padding: '8px 18px', cursor: 'pointer', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all 0.2s', flexShrink: 0 }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section style={{ padding: '48px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
            <p style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '20px' }}>Featured</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 40%', gap: '48px', alignItems: 'center', cursor: 'pointer' }}>
              <div>
                <span style={{ display: 'inline-block', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A38560', border: '1px solid rgba(163,133,96,0.3)', padding: '4px 10px', marginBottom: '20px' }}>{featured.category}</span>
                <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '16px' }}>{featured.title}</h2>
                <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '24px', fontSize: '0.95rem' }}>{featured.excerpt}</p>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>{featured.date}</span>
                  <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                  <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>{featured.readTime} read</span>
                </div>
              </div>
              <div style={{ background: '#111', aspectRatio: '4/3' }} />
            </div>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section style={{ padding: '48px 0 120px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
            {rest.map((post, i) => (
              <div key={i} style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div style={{ background: '#111', aspectRatio: '16/10' }} />
                <div style={{ padding: '24px' }}>
                  <span style={{ display: 'inline-block', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A38560', marginBottom: '12px' }}>{post.category}</span>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', lineHeight: 1.35, marginBottom: '10px' }}>{post.title}</h3>
                  <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.6, marginBottom: '16px' }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)' }}>{post.date}</span>
                    <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)' }}>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.9rem' }}>No posts in this category yet.</p>
            </div>
          )}
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
