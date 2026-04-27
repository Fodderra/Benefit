'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

const NAV_KEYS = ['magazine', 'events', 'digital', 'blog', 'contact'] as const;
const NAV_HREFS: Record<string, string> = {
  magazine: '/magazine',
  events:   '/events',
  digital:  '/digital',
  blog:     '/blog',
  contact:  '/contact',
};

export function Navigation() {
  const t = useTranslations('nav');
  const locale    = useLocale();
  const pathname  = usePathname();
  const router    = useRouter();
  const [open, setOpen] = useState(false);

  function toggleLocale() {
    const next = locale === 'en' ? 'ka' : 'en';
    router.replace(pathname, { locale: next });
  }

  const linkStyle: React.CSSProperties = {
    color: 'rgba(255,255,255,0.55)',
    fontSize: '0.7rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'color 0.2s',
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(0,0,0,0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
    }}>
      {/* ── Main bar ── */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '0 24px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <a href={`/${locale}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
          <img src="/logo.svg" alt="Benefit" style={{ height: '22px', width: 'auto' }} />
        </a>

        {/* Desktop links — hidden below md */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '32px' }}>
          {NAV_KEYS.map(key => (
            <a
              key={key}
              href={`/${locale}${NAV_HREFS[key]}`}
              style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            >
              {t(key)}
            </a>
          ))}
        </div>

        {/* Right cluster: locale toggle + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Language switcher — hidden while site is English-only; remove 'hidden' class to re-enable */}
          <button
            className="hidden"
            onClick={toggleLocale}
            style={{
              color: '#FFFFFF', fontSize: '0.7rem', fontWeight: 600,
              letterSpacing: '0.1em', background: 'none',
              border: '1px solid rgba(255,255,255,0.4)', padding: '8px 16px',
              cursor: 'pointer', transition: 'border-color 0.2s', fontFamily: 'inherit',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)')}
          >
            {locale === 'en' ? 'KA' : 'EN'}
          </button>

          {/* Hamburger — visible below md only */}
          <button
            className="flex md:hidden"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '8px', color: '#fff', flexShrink: 0,
            }}
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 8h18M3 16h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer — hidden above md ── */}
      {open && (
        <div
          className="md:hidden"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(0,0,0,0.98)',
          }}
        >
          {NAV_KEYS.map(key => (
            <a
              key={key}
              href={`/${locale}${NAV_HREFS[key]}`}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                color: 'rgba(255,255,255,0.75)',
                fontSize: '0.85rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 500,
                textDecoration: 'none',
                padding: '18px 24px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >
              {t(key)}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
