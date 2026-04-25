'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main style={{ background: '#000000', minHeight: '100vh' }}>
      <Navigation />

      {/* Hero */}
      <section style={{ paddingTop: '160px', paddingBottom: '80px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <div className="flex flex-col md:flex-row" style={{ alignItems: 'center', gap: '60px' }}>

            {/* Text block */}
            <div style={{ flex: '1 1 55%' }}>
              <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A38560', marginBottom: '24px' }}>Benefit</p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9em] uppercase" style={{ color: '#FFFFFF', marginBottom: '32px' }}>
                Get in Touch<br />With Us
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontSize: '1rem' }}>
                We&apos;re here to answer your questions and explore how we can elevate your brand within Georgia&apos;s premium ecosystem.
              </p>
            </div>

            {/* Hero image */}
            <div className="w-full md:w-auto" style={{ flex: '0 0 40%', display: 'flex', justifyContent: 'center' }}>
              <img
                src="/Gallery/Benefit/Side Page photos/Benefit Characters _1  (4).png"
                alt="Get in Touch"
                style={{
                  width: '100%',
                  maxWidth: '450px',
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

      {/* Contact Grid */}
      <section style={{ padding: '80px 0 120px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px', alignItems: 'start' }}>

          {/* Left: Info */}
          <div>
            {/* Section label + separator */}
            <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A38560', marginBottom: '20px' }}>Contact Details</p>
            <div style={{ height: '1px', background: 'rgba(163,133,96,0.2)', marginBottom: '36px' }} />

            {/* 2-column contact grid */}
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '32px', marginBottom: '48px' }}>

              {/* Col 1 — General Inquiries */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    {/* Mail icon */}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A38560" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    <p style={{ fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A38560', margin: 0 }}>General Inquiries</p>
                  </div>
                  <a href="mailto:hello@benefit.media"
                    style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s, border-color 0.2s', borderBottom: '1px solid transparent', paddingBottom: '1px' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#A38560'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = 'transparent'; }}>
                    hello@benefit.media
                  </a>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    {/* Briefcase icon */}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A38560" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="12.01"/>
                    </svg>
                    <p style={{ fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A38560', margin: 0 }}>Partnerships</p>
                  </div>
                  <a href="mailto:partners@benefit.media"
                    style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s, border-color 0.2s', borderBottom: '1px solid transparent', paddingBottom: '1px' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#A38560'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = 'transparent'; }}>
                    partners@benefit.media
                  </a>
                </div>
              </div>

              {/* Col 2 — Office + Phone */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    {/* Map pin icon */}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A38560" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <p style={{ fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A38560', margin: 0 }}>Office Location</p>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', lineHeight: 1.75, margin: 0 }}>
                    4 Marjanishvili Street<br />Tbilisi, Georgia 0102
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.72rem', marginTop: '4px' }}>Mon – Fri, 10:00 – 19:00</p>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    {/* Phone icon */}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A38560" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.9 11.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.81 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.82 5.82l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <p style={{ fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A38560', margin: 0 }}>Phone</p>
                  </div>
                  <a href="tel:+99532200000"
                    style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s, border-color 0.2s', borderBottom: '1px solid transparent', paddingBottom: '1px' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#A38560'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = 'transparent'; }}>
                    +995 32 200 00 00
                  </a>
                </div>
              </div>

            </div>

            {/* Social links */}
            <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A38560', marginBottom: '16px' }}>Follow Us</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['Instagram', 'Facebook', 'LinkedIn', 'YouTube'].map(s => (
                  <a key={s} href="#"
                    style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.1)', padding: '7px 14px', textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(163,133,96,0.5)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', padding: '48px' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ width: '48px', height: '48px', border: '1px solid #A38560', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '1.2rem', color: '#A38560' }}>✓</div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Message Sent</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '32px' }}>{t('formLabel')}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>{t('name')}</label>
                    <input type="text" placeholder={t('namePh')} required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={{ width: '100%', background: '#000', border: '1px solid rgba(255,255,255,0.09)', color: '#fff', padding: '11px 14px', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>{t('email')}</label>
                    <input type="email" placeholder={t('emailPh')} required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={{ width: '100%', background: '#000', border: '1px solid rgba(255,255,255,0.09)', color: '#fff', padding: '11px 14px', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>{t('phone')}</label>
                    <input type="tel" placeholder={t('phonePh')} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={{ width: '100%', background: '#000', border: '1px solid rgba(255,255,255,0.09)', color: '#fff', padding: '11px 14px', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>Subject</label>
                    <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} style={{ width: '100%', background: '#000', border: '1px solid rgba(255,255,255,0.09)', color: form.subject ? '#fff' : 'rgba(255,255,255,0.3)', padding: '11px 14px', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', appearance: 'none' }}>
                      <option value="" disabled>Select topic</option>
                      <option value="partnership">Partnership</option>
                      <option value="magazine">Magazine</option>
                      <option value="events">Events</option>
                      <option value="digital">Digital & Video</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '6px' }}>{t('message')}</label>
                  <textarea placeholder={t('messagePh')} rows={5} required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ width: '100%', background: '#000', border: '1px solid rgba(255,255,255,0.09)', color: '#fff', padding: '11px 14px', fontSize: '0.875rem', fontFamily: 'inherit', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>{t('submit')}</button>
              </form>
            )}
          </div>
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
