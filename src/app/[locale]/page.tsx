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

// Grid: 6 cols × 5 rows. Key = row*6+col. Add logo path to swap text for an <img>.
const PARTNER_MAP: Record<number, { name: string; logo?: string }> = {
  8:  { name: "L'Oréal" },
  9:  { name: 'Emansm' },
  10: { name: 'Nexia' },
  14: { name: 'Danone' },
  15: { name: 'Borjomi' },
  20: { name: 'Tegeta Motors' },
  21: { name: 'Askaneli' },
  22: { name: 'Sisvildi' },
};

const SPEAKERS = [
  { name: 'Alex Chikovani',  img: '/Gallery/Benefit/Speakers/Speakers cards-01.jpg' },
  { name: 'Giorgi Pertaia',  img: '/Gallery/Benefit/Speakers/Speakers cards-02.jpg' },
  { name: 'Nino Surguladze', img: '/Gallery/Benefit/Speakers/Speakers cards-03.jpg' },
  { name: 'Dato Turashvili', img: '/Gallery/Benefit/Speakers/Speakers cards-04.jpg' },
  { name: 'Ana Dolidze',     img: '/Gallery/Benefit/Speakers/Speakers cards-05.jpg' },
];

const ACCORDION_CARDS = [
  { label: 'Benefit Magazine', img: '/Gallery/Benefit/Category/magazine1.png', href: '/magazine' },
  { label: 'Events',           img: '/Gallery/Benefit/Category/2.png',         href: '/events'  },
  { label: 'Digital & Video',  img: '/Gallery/Benefit/Category/3.png',         href: '/digital' },
  { label: 'Television',       img: '/Gallery/Benefit/Category/4.png',         href: '#'        },
];

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeSpeaker, setActiveSpeaker] = useState<number | null>(null);

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
          <img
            className="hero-animate"
            src="/logo.svg"
            alt="Benefit"
            style={{ width: 'min(1100px, 88vw)', height: 'auto', display: 'block', margin: '0 auto' }}
          />
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
            <a href={`/${locale}/contact`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'transparent', color: '#FFFFFF', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px 32px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.45)', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)')}>
              {t('hero.cta_partner')} <span style={{ fontWeight: 300 }}>→</span>
            </a>
          </div>
          <div className="hero-animate" style={{ marginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.56rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>{t('hero.scroll')}</span>
            <div style={{ width: '1px', height: '44px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.28), transparent)' }} />
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
<div style={{ 
  background: '#FFFFFF',
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
            <a href={`/${locale}/magazine`} className="reveal-text btn-outline">
              {t('magazine.cta')}
            </a>
          </div>
          <div className="reveal-card" style={{ position: 'relative', minHeight: '600px' }}>
            <Image src="/Gallery/Benefit/Category/magazine1.png" alt="Benefit Magazine" fill priority sizes="40vw" style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #000000 0%, transparent 35%)', pointerEvents: 'none' }} />
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
            <p className="reveal-text" style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.78, marginBottom: '36px', maxWidth: '520px', fontSize: '1rem' }}>{t('talks.body')}</p>
            <div className="reveal-text" style={{ marginBottom: '36px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {[
                'Official part of the event with speakers',
                'Networking zone',
                'After Party',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.28)', flexShrink: 0, width: '24px' }}>
                    0{i + 1}
                  </span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <a href={`/${locale}/events`} className="reveal-text btn-outline">
              {t('talks.cta')}
            </a>
          </div>
          <div className="reveal-card" style={{ position: 'relative', minHeight: '600px' }}>
            <Image src="/Gallery/Benefit/Category/2.png" alt="Benefit Talks" fill priority sizes="40vw" style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #000000 0%, transparent 35%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, #000000 10%, rgba(0,0,0,0.55) 55%, transparent 100%)', pointerEvents: 'none' }} />
          </div>
        </div>
      </section>

      {/* ── EVENT SPEAKERS ── */}
      <section style={{ background: '#000000', paddingTop: '80px', paddingBottom: '120px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Label */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
          <p className="reveal-text" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '32px' }}>
            {t('speakers.label')}
          </p>
        </div>

        {/* Accordion strip — full bleed */}
        <div style={{ display: 'flex', height: '520px', gap: '2px', overflow: 'hidden', padding: '0 48px', maxWidth: '1280px', margin: '0 auto' }}>
          {SPEAKERS.map((speaker, i) => {
            const isActive = activeSpeaker === i;
            const isDimmed = activeSpeaker !== null && !isActive;
            return (
              <motion.div
                key={i}
                animate={{ flexGrow: isActive ? 3.5 : 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                onHoverStart={() => setActiveSpeaker(i)}
                onHoverEnd={() => setActiveSpeaker(null)}
                style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', flexShrink: 0, flexBasis: 0 }}
              >
                {/* Photo with grayscale + opacity transition */}
                <motion.div
                  animate={{
                    filter: isActive ? 'grayscale(0)' : 'grayscale(1)',
                    opacity: isDimmed ? 0.38 : isActive ? 1 : 0.58,
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <img
                    src={speaker.img}
                    alt={speaker.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                  />
                </motion.div>

                {/* Bottom gradient — deeper when active */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: isActive
                    ? 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
                    : 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)',
                  transition: 'background 0.6s ease',
                  pointerEvents: 'none',
                }} />

                {/* Speaker name — small & dim when collapsed, large & bright when expanded */}
                <div style={{ position: 'absolute', bottom: '24px', left: '20px', right: '20px' }}>
                  {/* Collapsed label */}
                  <motion.p
                    animate={{ opacity: isActive ? 0 : isDimmed ? 0.2 : 0.45 }}
                    transition={{ duration: 0.25 }}
                    style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFFFFF', lineHeight: 1.5, whiteSpace: 'nowrap' }}
                  >
                    {speaker.name.split(' ').map((word, wi) => <span key={wi} style={{ display: 'block' }}>{word}</span>)}
                  </motion.p>

                  {/* Expanded label */}
                  <motion.p
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                    transition={{ duration: 0.35, delay: isActive ? 0.2 : 0 }}
                    style={{ position: 'absolute', bottom: 0, left: 0, fontSize: '0.88rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFFFFF', whiteSpace: 'nowrap' }}
                  >
                    {speaker.name}
                  </motion.p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

   {/* ── DIGITAL & VIDEO ── */}

      <section id="digital" style={{ background: '#000000', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 40%', alignItems: 'stretch' }}>
    {/* Left Side: Text Column */}
    <div style={{ paddingTop: '120px', paddingBottom: '120px', paddingRight: '80px', paddingLeft: 'max(48px, calc((100vw - 1280px) / 2 + 48px))' }}>
      <h2 className="reveal-text" style={{ margin: '0 0 36px' }}>
        <span style={{ display: 'block', fontSize: 'clamp(3rem, 5.5vw, 6.5rem)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1, color: '#FFFFFF' }}>
          DIGITAL &
        </span>
        <span style={{ display: 'block', fontSize: 'clamp(3rem, 5.5vw, 6.5rem)', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1, color: '#FFFFFF' }}>
          MEDIA
        </span>
      </h2>
      <p className="reveal-text" style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.78, marginBottom: '40px', maxWidth: '520px', fontSize: '1rem' }}>
        Leveraging cutting-edge technology to create immersive digital experiences and compelling media content that resonates with your target audience.
      </p>
      <a href={`/${locale}/digital`} className="reveal-text btn-outline">
        Read More
      </a>
    </div>

    {/* Right Side: Image Column with Framer Motion */}
    <div className="reveal-card" style={{ position: 'relative', minHeight: '600px', overflow: 'hidden' }}>
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Image 
          src="/Gallery/Benefit/Category/3.png" // ← Use the correct image path
          alt="Digital & Media" 
          fill 
          sizes="40vw" 
          style={{ objectFit: 'cover', objectPosition: 'center center' }} 
        />
        {/* Left fade — blends into the black text column */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #000000 0%, transparent 35%)', pointerEvents: 'none' }} />
        {/* Bottom fade — grounds the image into the black page */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, #000000 10%, rgba(0,0,0,0.55) 55%, transparent 100%)', pointerEvents: 'none' }} />
      </motion.div>
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
              {
                cat: 'Business',
                date: 'April 10, 2026',
                read: '5 min read',
                title: "The Rise of Premium Media in the Caucasus",
                excerpt: "How Georgia's most ambitious brands are shifting ad spend toward quality editorial environments — and why it's working.",
                img: 'https://picsum.photos/seed/biz01/800/500',
              },
              {
                cat: 'Events',
                date: 'March 28, 2026',
                read: '4 min read',
                title: 'Inside Benefit Talks III: Where Deals Are Made',
                excerpt: "350 executives. One evening. A look at the conversations, connections, and commitments that defined Georgia's most exclusive business gathering.",
                img: 'https://picsum.photos/seed/biz02/800/500',
              },
              {
                cat: 'Digital & Video',
                date: 'March 14, 2026',
                read: '6 min read',
                title: 'Why Cinematic Brand Films Outperform Every Other Format',
                excerpt: "Data from 40+ campaigns shows that story-led video drives 3× longer brand recall than performance ads — here's how to do it right.",
                img: 'https://picsum.photos/seed/biz03/800/500',
              },
            ].map((article, i) => (
              <div key={i} className="reveal-card" style={{ background: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
                <div style={{ aspectRatio: '16/10', overflow: 'hidden', flexShrink: 0 }}>
                  <img
                    src={article.img}
                    alt={article.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                  />
                </div>
                <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <p style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A38560', margin: 0 }}>{article.cat}</p>
                    <div style={{ width: '1px', height: '10px', background: 'rgba(0,0,0,0.15)' }} />
                    <p style={{ fontSize: '0.58rem', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.04em', margin: 0 }}>{article.date}</p>
                  </div>
                  <p style={{ fontSize: '0.97rem', fontWeight: 700, color: '#000000', lineHeight: 1.35, marginBottom: '12px' }}>{article.title}</p>
                  <p style={{ fontSize: '0.78rem', color: 'rgba(0,0,0,0.48)', lineHeight: 1.65, marginBottom: '20px', flex: 1 }}>{article.excerpt}</p>
                  <p style={{ fontSize: '0.58rem', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>{article.read}</p>
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
      <section style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Heading */}
        <div style={{ textAlign: 'center', padding: '100px 48px 80px' }}>
          <h2 className="reveal-text text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.95em] max-w-4xl mx-auto" style={{ color: '#FFFFFF' }}>
            {t('partners.heading')}
          </h2>
        </div>

        {/* Full-width mesh grid — 2 cols mobile → 3 cols tablet → 6 cols desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
          {Array.from({ length: 30 }, (_, idx) => {
            const partner = PARTNER_MAP[idx];
            return (
              <div
                key={idx}
                className="partner-cell"
                style={{ borderRight: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
              >
                {partner && (
                  partner.logo
                    ? <img src={partner.logo} alt={partner.name} className="partner-logo" style={{ maxHeight: '36px', maxWidth: '100%', objectFit: 'contain' }} />
                    : <span className="partner-logo" style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FFFFFF', whiteSpace: 'nowrap' }}>{partner.name}</span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── BECOME PART OF THE ECOSYSTEM ── */}
      <section id="partner" style={{ background: '#000000', padding: '160px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
          <h2 className="reveal-text text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95em] uppercase max-w-4xl mx-auto" style={{ color: '#FFFFFF', marginBottom: '36px' }}>
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
      <footer style={{ background: '#EEF1F8' }}>
        {/* Main row: logo · socials · contact */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '52px 64px', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '40px' }}>

          {/* Brand logo */}
          <img src="/logo.svg" alt="Benefit" style={{ height: '26px', width: 'auto', filter: 'brightness(0)' }} />

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '22px', alignItems: 'center' }}>
            {[
              { label: 'Instagram', href: '#', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
              { label: 'Facebook', href: '#', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              { label: 'X', href: '#', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
              { label: 'LinkedIn', href: '#', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              { label: 'YouTube', href: '#', path: 'M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z' },
              { label: 'TikTok', href: '#', path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
            ].map(({ label, href, path }) => (
              <a key={label} href={href} aria-label={label} style={{ color: '#000', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.45')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>

          {/* Contact info */}
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.82rem', color: '#000', marginBottom: '5px', lineHeight: 1.6 }}>info@benefit.com</p>
            <p style={{ fontSize: '0.82rem', color: '#000', marginBottom: '5px', lineHeight: 1.6 }}>Tel: (+995) 555 63 52 52</p>
            <p style={{ fontSize: '0.82rem', color: '#000', lineHeight: 1.6 }}>Petre Kavtaradze St, T&apos;bilisi 0186</p>
          </div>
        </div>

        {/* Bottom strip */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', background: '#fff', padding: '16px 64px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(0,0,0,0.45)', margin: 0 }}>© 2026 by Bene Creative</p>
        </div>
      </footer>

    </main>
  );
}
