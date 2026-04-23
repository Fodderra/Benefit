'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

const NAV_KEYS = ['magazine', 'events', 'digital', 'blog', 'contact'] as const;
const NAV_HREFS: Record<string, string> = {
  magazine: '/magazine',
  events: '/events',
  digital: '/digital',
  blog: '/blog',
  contact: '/contact',
};

export function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function toggleLocale() {
    const next = locale === 'en' ? 'ka' : 'en';
    router.replace(pathname, { locale: next });
  }

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href={`/${locale}`} style={{ textDecoration: 'none' }}>
          <img src="/logo.svg" alt="Benefit" style={{ height: '22px', width: 'auto' }} />
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {NAV_KEYS.map(key => (
            <a
              key={key}
              href={`/${locale}${NAV_HREFS[key]}`}
              style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            >
              {t(key)}
            </a>
          ))}
        </div>
        <button
          onClick={toggleLocale}
          style={{
            color: '#FFFFFF', fontSize: '0.7rem', fontWeight: 600,
            letterSpacing: '0.1em', textDecoration: 'none', background: 'none',
            border: '1px solid rgba(255,255,255,0.4)', padding: '8px 16px',
            cursor: 'pointer', transition: 'border-color 0.2s', fontFamily: 'inherit',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)')}
        >
          {locale === 'en' ? 'KA' : 'EN'}
        </button>
      </div>
    </nav>
  );
}
