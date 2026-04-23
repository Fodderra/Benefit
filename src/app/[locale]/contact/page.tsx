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
          <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A38560', marginBottom: '24px' }}>Benefit</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9em] uppercase" style={{ color: '#FFFFFF', marginBottom: '32px' }}>
            {t('heading')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '520px', lineHeight: 1.7, fontSize: '1rem' }}>
            We're here to answer your questions and explore how we can elevate your brand within Georgia's premium ecosystem.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section style={{ padding: '80px 0 120px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px', alignItems: 'start' }}>

          {/* Left: Info */}
          <div>
            <div style={{ marginBottom: '48px' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '32px' }}>Contact Details</p>
              {[
                { label: 'Email', value: 'hello@benefit.media', href: 'mailto:hello@benefit.media' },
                { label: 'Partners', value: 'partners@benefit.media', href: 'mailto:partners@benefit.media' },
                { label: 'Events', value: 'events@benefit.media', href: 'mailto:events@benefit.media' },
                { label: 'Phone', value: '+995 32 200 00 00', href: 'tel:+99532200000' },
              ].map(c => (
                <div key={c.label} style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '6px' }}>{c.label}</p>
                  <a href={c.href} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>
                    {c.value}
                  </a>
                </div>
              ))}
            </div>

            <div>
              <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '20px' }}>Office</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, fontSize: '0.9rem' }}>
                4 Marjanishvili Street<br />
                Tbilisi, Georgia 0102
              </p>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.28)', marginTop: '8px' }}>
                Mon – Fri, 10:00 – 19:00
              </p>
            </div>

            {/* Social links */}
            <div style={{ marginTop: '48px' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '16px' }}>Follow Us</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['Instagram', 'Facebook', 'LinkedIn', 'YouTube'].map(s => (
                  <a key={s} href="#" style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.1)', padding: '7px 14px', textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
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
