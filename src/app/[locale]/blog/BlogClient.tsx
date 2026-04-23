'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';

const CATEGORIES = ['All', 'Business', 'Lifestyle', 'Fashion', 'Hospitality', 'Gastronomy', 'Events'];

export interface Post {
  _id?: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime?: string;
  excerpt: string;
  coverImage?: { asset?: { url?: string } } | null;
}

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [category, setCategory] = useState('All');

  const filtered = category === 'All' ? posts : posts.filter(p => p.category === category);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  function imgSrc(post: Post) {
    return post.coverImage?.asset?.url ?? null;
  }

  return (
    <main style={{ background: '#000000', minHeight: '100vh' }}>
      <Navigation />

      <section style={{ paddingTop: '160px', paddingBottom: '80px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A38560', marginBottom: '24px' }}>Benefit</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9em] uppercase" style={{ color: '#FFFFFF', marginBottom: '32px' }}>Blog</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '520px', lineHeight: 1.7, fontSize: '1rem' }}>
            Editorial insights at the intersection of business, lifestyle, and culture — curated for Georgia&apos;s most influential audience.
          </p>
        </div>
      </section>

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
                  {featured.readTime && <>
                    <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>{featured.readTime} read</span>
                  </>}
                </div>
              </div>
              <div style={{ background: '#111', aspectRatio: '4/3', overflow: 'hidden' }}>
                {imgSrc(featured) && <img src={imgSrc(featured)!} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
            </div>
          </div>
        </section>
      )}

      <section style={{ padding: '48px 0 120px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.9rem' }}>No posts in this category yet.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
              {rest.map((post, i) => (
                <div key={post._id ?? i}
                  style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div style={{ background: '#111', aspectRatio: '16/10', overflow: 'hidden' }}>
                    {imgSrc(post) && <img src={imgSrc(post)!} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  </div>
                  <div style={{ padding: '24px' }}>
                    <span style={{ display: 'inline-block', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A38560', marginBottom: '12px' }}>{post.category}</span>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', lineHeight: 1.35, marginBottom: '10px' }}>{post.title}</h3>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.6, marginBottom: '16px' }}>{post.excerpt}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)' }}>{post.date}</span>
                      {post.readTime && <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)' }}>{post.readTime}</span>}
                    </div>
                  </div>
                </div>
              ))}
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
