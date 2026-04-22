'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { PanoramaSlider } from '@/components/PanoramaSlider';
import { Navigation } from '@/components/Navigation';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 83;

const ACCORDION_CARDS = [
  { label: 'Benefit Magazine', img: '/Gallery/Benefit/Category/magazine1.png', href: '/magazine' },
  { label: 'Events',           img: '/Gallery/Benefit/Category/2.png',         href: '/events'  },
  { label: 'Digital & Video',  img: '/Gallery/Benefit/Category/3.png',         href: '/digital' },
  { label: 'Television',       img: '/Gallery/Benefit/Category/4.png',         href: '#'        },
];

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();

  // Accordion state lives here so locale is always in scope for the Explore links
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.hero-animate').forEach((el, i) => {
        gsap.from(el, { y: 30, duration: 1.2, delay: 0.15 + i * 0.1, ease: 'power2.out' });
      });
      gsap.utils.toArray<Element>('.reveal-text').forEach((el) => {
        gsap.from(el, {
          y: 40, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        });
      });
      gsap.utils.toArray<Element>('.reveal-card').forEach((el, i) => {
        gsap.from(el, {
          y: 50, duration: 0.9, delay: i * 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        });
      });
    });
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => { ctx.revert(); cancelAnimationFrame(raf); };
  }, []);

  const tickerItems = t.raw('ticker') as string[];

  return (
    <main style={{ background: '#000000' }}>

      <Navigation />

      {/* ── HERO ── */}
      <section style={{ background: '#000000', minHeight: '100vh', paddingTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', width: '100%', padding: '0 48px' }}>
          <h1 className="hero-animate" style={{ fontSize: 'clamp(5rem, 16vw, 20rem)', fontWeight: 700, letterSpacing: '0.01em', lineHeight: 1, color: '#FFFFFF', textTransform: 'uppercase', margin: '0' }}>
            Benefit
          </h1>
          <div className="hero-animate" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '28px auto 30px', maxWidth: '520px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.2)' }} />
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.45)' }} />
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.2)' }} />
          </div>
          <p className="hero-animate" style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: '0 0 48px' }}>
            {t('hero.tagline')}
          </p>
          <div className="hero-animate" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`/${locale}/magazine`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#FFFFFF', color: '#000000', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px 32px', textDecoration: 'none', border: '1px solid #FFFFFF', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              {t('hero.cta_magazine')} <span style={{ fontWeight: 300 }}>→</span>
            </a>
            <a href={`/${locale}/partners`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'transparent', color: '#FFFFFF', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px 32px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.45)', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)')}>
              {t('hero.cta_partner')} <span style={{ fontWeight: 300 }}>→</span>
            </a>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>{t('hero.scroll')}</span>
          <div style={{ width: '1px', height: '44px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }} />
        </div>
      </section>

      {/* ── TICKER ── */}
<div style={{ 
  background: '#FFFFFF !important', 
  height: '50px', //
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden', 
  borderTop: '2px solid #000000', 
  borderBottom: '2px solid #000000',
  margin: '20px 0'
}}>
  <motion.div
    style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}
    animate={{ x: ['0%', '-50%'] }}
    transition={{ duration: 15, ease: 'linear', repeat: Infinity }}
  >
    {[...tickerItems, ...tickerItems].map((item, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', lineHeight: '1' }}>
        <span style={{ 
          fontSize: '18px', // 
          fontWeight: 350, 
          letterSpacing: '-0.04em', 
          textTransform: 'uppercase', 
          color: '#000000', 
          padding: '0 20px' 
        }}>{item}</span>
        <span style={{ color: '#000000', fontSize: '20px' }}>•</span>
      </div>
    ))}
  </motion.div>
</div>

      {/* ── HORIZONTAL ACCORDION ── */}
      {/* A ↓ paddingTop controls vertical gap FROM the Ticker above this section */}
      {/* B ↓ paddingBottom controls vertical gap TO the Scroll Animation below  */}
      <section style={{ background: '#000000', paddingTop: '120px', paddingBottom: '120px' }}>
        {/* C ↓ maxWidth controls how wide the cards section can grow              */}
        {/* D ↓ margin: 0 auto centers it; padding: 0 48px adds side breathing room */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
          {/* E ↓ height controls how tall all cards are                            */}
          {/* F ↓ gap controls the thin line between cards                          */}
          <div style={{ display: 'flex', height: '600px', gap: '2px', overflow: 'hidden' }}>
            {ACCORDION_CARDS.map((card, i) => {
              const isActive = activeCard === i;
              const isDimmed = activeCard !== null && !isActive;
              return (
                <motion.div
                  key={i}
                  /* G ↓ flexGrow values: 2.5 = expanded width, 1 = collapsed width  */
                  animate={{ flexGrow: isActive ? 2.5 : 1 }}
                  /* H ↓ duration controls expansion speed in seconds                 */
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  onHoverStart={() => setActiveCard(i)}
                  onHoverEnd={() => setActiveCard(null)}
                  style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', flexShrink: 0, flexBasis: 0 }}
                >
                  {/* Background image — grayscale + scale driven by hover state */}
                  <motion.div
                    animate={{
                      filter: isDimmed ? 'grayscale(1)' : 'grayscale(0)',
                      opacity: isDimmed ? 0.45 : 1,
                      scale: isActive ? 1.04 : 1,
                    }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    <Image
                      src={card.img}
                      alt={card.label}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                  </motion.div>

                  {/* Gradient overlay — lightens when active */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: isActive
                      ? 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)'
                      : 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 100%)',
                    transition: 'background 0.6s ease',
                  }} />

                  {/* Collapsed state: vertical rotated label */}
                  <motion.span
                    animate={{ opacity: isActive ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: 'absolute', bottom: '32px', left: '50%',
                      translate: '-50% 0', whiteSpace: 'nowrap',
                      fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.22em',
                      textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
                      writingMode: 'vertical-rl', transform: 'rotate(180deg)',
                    }}
                  >
                    {card.label}
                  </motion.span>

                  {/* Expanded state: eyebrow + title + link fade up */}
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                    transition={{ duration: 0.35, delay: isActive ? 0.15 : 0 }}
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 28px' }}
                  >
                    <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A38560', marginBottom: '10px' }}>
                      Benefit
                    </p>
                    <h3 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#FFFFFF', lineHeight: 1.1, marginBottom: '20px', textTransform: 'uppercase' }}>
                      {card.label}
                    </h3>
                    {card.href !== '#' && (
                      <a
                        href={`/${locale}${card.href}`}
                        style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.4)', paddingBottom: '3px' }}
                      >
                        Explore →
                      </a>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SCROLL ANIMATION ── */}
      <section id="magazine" style={{ background: '#000000', position: 'relative', zIndex: 0 }}>
        <ScrollAnimation frameDir="/frames" frameCount={FRAME_COUNT} />
      </section>

      {/* ── WHERE YOU FIND US ── */}
      <section style={{ background: '#000000', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p className="reveal-text" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginBottom: '64px' }}>
            {t('whereYouFindUs.label')}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderLeft: '1px solid rgba(255,255,255,0.09)' }}>
            {(t.raw('whereYouFindUs.channels') as { title: string; sub: string }[]).map((channel, i) => (
              <div key={i} className="reveal-card" style={{ borderRight: '1px solid rgba(255,255,255,0.09)', padding: '48px 28px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#FFFFFF', marginBottom: '10px' }}>{channel.title}</h3>
                <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.5 }}>{channel.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFIT MAGAZINE ── */}
      <section style={{ background: '#000000', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 40%', alignItems: 'stretch' }}>
          <div style={{ paddingTop: '120px', paddingBottom: '120px', paddingRight: '80px', paddingLeft: 'max(48px, calc((100vw - 1280px) / 2 + 48px))' }}>
            <h2 className="reveal-text" style={{ margin: '0 0 36px' }}>
              <span style={{ display: 'block', fontSize: 'clamp(3rem, 5.5vw, 6.5rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1, color: '#FFFFFF' }}>{t('magazine.label')}</span>
              <span style={{ display: 'block', fontSize: 'clamp(3rem, 5.5vw, 6.5rem)', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1, color: '#FFFFFF' }}>{t('magazine.sublabel')}</span>
            </h2>
            <p className="reveal-text" style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.78, marginBottom: '40px', maxWidth: '520px', fontSize: '1rem' }}>{t('magazine.body')}</p>
            <a href={`/${locale}/magazine`} className="reveal-text" style={{ display: 'inline-block', background: 'transparent', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.5)', padding: '13px 32px', fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.04em', textDecoration: 'none', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}>
              {t('magazine.cta')}
            </a>
          </div>
          <div className="reveal-card" style={{ position: 'relative', minHeight: '600px' }}>
            <Image src="/Gallery/Benefit/Category/magazine1.png" alt="Benefit Magazine" fill sizes="40vw" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, #000000 10%, rgba(0,0,0,0.55) 55%, transparent 100%)', pointerEvents: 'none' }} />
          </div>
        </div>
      </section>

      {/* ── PANORAMA SLIDER ── */}
      <PanoramaSlider />

     {/* ── BENEFIT TALKS ── */}
<section style={{ background: '#000000', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 40%', alignItems: 'stretch' }}>
    <div style={{ paddingTop: '120px', paddingBottom: '120px', paddingRight: '80px', paddingLeft: 'max(48px, calc((100vw - 1280px) / 2 + 48px))' }}>
      <h2 className="reveal-text" style={{ margin: '0 0 36px' }}>
        <span style={{ display: 'block', fontSize: 'clamp(3rem, 5.5vw, 6.5rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1, color: '#FFFFFF' }}>{t('talks.label')}</span>
        <span style={{ display: 'block', fontSize: 'clamp(3rem, 5.5vw, 6.5rem)', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1, color: '#FFFFFF' }}>{t('talks.sublabel')}</span>
      </h2>
      <p className="reveal-text" style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.78, marginBottom: '24px', maxWidth: '520px', fontSize: '1rem' }}>{t('talks.body')}</p>
      <div className="reveal-text" style={{ marginBottom: '36px' }}>
        {[t('talks.bullet1'), t('talks.bullet2')].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem' }}>
            <div style={{ width: '4px', height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '50%', flexShrink: 0 }} />
            {item}
          </div>
        ))}
      </div>
      <a href={`/${locale}/events`} className="reveal-text" style={{ display: 'inline-block', background: 'transparent', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.5)', padding: '13px 32px', fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.04em', textDecoration: 'none', transition: 'border-color 0.2s' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = '#fff')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}>
        {t('talks.cta')}
      </a>
    </div>

    {/* აქ დაემატა სურათი */}
    <div className="reveal-card" style={{ position: 'relative', minHeight: '600px', background: '#0c0c0c' }}>
      <Image 
        src="/Gallery/Benefit/Category/2.png" 
        alt="Benefit Talks Event" 
        fill 
        sizes="40vw" 
        style={{ 
          objectFit: 'cover', // 
          objectPosition: 'center center' 
        }} 
      />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, #000000 10%, rgba(0,0,0,0.55) 55%, transparent 100%)', pointerEvents: 'none' }} />
    </div>
  </div>
</section>

      {/* ── EVENT SPEAKERS ── */}
      <section style={{ background: '#000000', padding: '80px 0 120px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p className="reveal-text" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '48px' }}>
            {t('speakers.label')}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {['Alex Chikovani', 'Speaker', 'Speaker', 'Speaker', 'Speaker'].map((name, i) => (
              <div key={i} className="reveal-card">
                <div style={{ background: '#111111', aspectRatio: '3/4', marginBottom: '12px' }} />
                <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#FFFFFF' }}>{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

   {/* ── DIGITAL & VIDEO ── */}

      <section style={{ background: '#000000', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 40%', alignItems: 'stretch' }}>

          <div style={{ paddingTop: '120px', paddingBottom: '120px', paddingRight: '80px', paddingLeft: 'max(48px, calc((100vw - 1280px) / 2 + 48px))' }}>

            <h2 className="reveal-text" style={{ margin: '0 0 36px' }}>

              <span style={{ display: 'block', fontSize: 'clamp(3rem, 5.5vw, 6.5rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1, color: '#FFFFFF' }}>{t('digital.label')}</span>

              <span style={{ display: 'block', fontSize: 'clamp(3rem, 5.5vw, 6.5rem)', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1, color: '#FFFFFF' }}>{t('digital.sublabel')}</span>

            </h2>

            <p className="reveal-text" style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.78, marginBottom: '40px', maxWidth: '520px', fontSize: '1rem' }}>{t('digital.body')}</p>

            <a href={`/${locale}/digital`} className="reveal-text" style={{ display: 'inline-block', background: 'transparent', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.5)', padding: '13px 32px', fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.04em', textDecoration: 'none', transition: 'border-color 0.2s' }}

              onMouseEnter={e => (e.currentTarget.style.borderColor = '#fff')}

              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}>

              {t('digital.cta')}

            </a>

            <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', marginTop: '32px' }}>{t('digital.sub')}</p>

          </div>

          <div className="reveal-card" style={{ position: 'relative', minHeight: '600px' }}>
            <Image
              src="/Gallery/Benefit/Category/3.png"
              alt="Digital & Video"
              fill
              sizes="40vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            {/* Left fade — blends into the black text column */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #000000 0%, transparent 35%)', pointerEvents: 'none' }} />
            {/* Bottom fade — grounds the image into the black page */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, #000000 10%, rgba(0,0,0,0.55) 55%, transparent 100%)', pointerEvents: 'none' }} />
          </div>

        </div>

      </section>

      {/* ── FEATURED ARTICLES ── */}
      <section style={{ background: '#000000', padding: '80px 0 120px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <p className="reveal-text" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '40px' }}>
            {t('articles.label')}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', marginBottom: '28px' }}>
            {[
              { cat: 'Business', title: "Georgia's Most Influential Audience" },
              { cat: 'Events', title: 'Benefit Talks: Where Ideas Meet Investment' },
              { cat: 'Lifestyle', title: 'Digital & Video: Brand Storytelling' },
            ].map((article, i) => (
              <div key={i} className="reveal-card" style={{ background: '#FFFFFF' }}>
                <div style={{ background: '#e0e0e0', aspectRatio: '16/10' }} />
                <div style={{ padding: '24px' }}>
                  <p style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.38)', marginBottom: '8px' }}>{article.cat}</p>
                  <p style={{ fontSize: '0.92rem', fontWeight: 600, color: '#000000', lineHeight: 1.4 }}>{article.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'right' }}>
            <a href={`/${locale}/blog`} style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
              {t('articles.viewAll')}
            </a>
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section style={{ background: '#000000', padding: '80px 0 100px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <h2 className="reveal-text" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '60px', textAlign: 'center' }}>
            {t('partners.heading')}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0', borderTop: '1px solid rgba(255,255,255,0.07)', borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
            {["L'Oréal", 'Nexia', 'Danceme', 'Borjomi', 'Partner', 'Partner', 'Partner', 'Partner', 'Partner', 'Partner'].map((p, i) => (
              <div key={i} className="reveal-card" style={{ textAlign: 'center', padding: '28px 16px', borderRight: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.42)', letterSpacing: '0.04em' }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BECOME PART OF THE ECOSYSTEM ── */}
      <section id="partner" style={{ background: '#000000', padding: '160px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
          <h2 className="reveal-text" style={{ fontSize: 'clamp(2.8rem, 6vw, 6.5rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '36px', whiteSpace: 'pre-line' }}>
            {t('ecosystem.heading')}
          </h2>
          <p className="reveal-text" style={{ color: 'rgba(255,255,255,0.48)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 48px', fontSize: '1rem' }}>
            {t('ecosystem.body')}
          </p>
          <a href={`/${locale}/contact`} className="btn-primary" style={{ padding: '16px 48px', fontSize: '0.875rem' }}>
            {t('ecosystem.cta')}
          </a>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section style={{ background: '#000000', padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          <div>
            <h2 className="reveal-text" style={{ fontSize: '1.9rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}>{t('contact.heading')}</h2>
            <p style={{ color: 'rgba(255,255,255,0.48)', lineHeight: 1.7 }}>{t('contact.body')}</p>
          </div>
          <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.07)', padding: '40px' }}>
            <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '28px' }}>{t('contact.formLabel')}</p>
            {[
              { label: t('contact.name'), type: 'text', placeholder: t('contact.namePh') },
              { label: t('contact.email'), type: 'email', placeholder: t('contact.emailPh') },
              { label: t('contact.phone'), type: 'tel', placeholder: t('contact.phonePh') },
              { label: t('contact.message'), type: 'textarea', placeholder: t('contact.messagePh') },
            ].map((field) => (
              <div key={field.label} style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: '6px' }}>{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea placeholder={field.placeholder} rows={4} style={{ width: '100%', background: '#000', border: '1px solid rgba(255,255,255,0.09)', color: '#fff', padding: '10px 14px', fontSize: '0.875rem', fontFamily: 'inherit', resize: 'vertical', outline: 'none', boxSizing: 'border-box' }} />
                ) : (
                  <input type={field.type} placeholder={field.placeholder} style={{ width: '100%', background: '#000', border: '1px solid rgba(255,255,255,0.09)', color: '#fff', padding: '10px 14px', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                )}
              </div>
            ))}
            <button className="btn-primary" style={{ marginTop: '8px', width: '100%', justifyContent: 'center' }}>{t('contact.submit')}</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '48px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <img src="/logo.svg" alt="Benefit" style={{ height: '20px' }} />
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              {[{ label: 'f', href: '#' }, { label: 'x', href: '#' }, { label: 'in', href: '#' }, { label: 'yt', href: '#' }, { label: 'ig', href: '#' }].map(s => (
                <a key={s.label} href={s.href} style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.72rem', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}>{s.label}</a>
              ))}
            </div>
          </div>
          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)' }}>{t('footer.rights')}</p>
            <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)' }}>{t('footer.sub')}</p>
          </div>
        </div>
      </footer>

    </main>
  );
}
