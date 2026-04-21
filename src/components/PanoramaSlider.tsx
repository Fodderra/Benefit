'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';

const SLIDES = [
  '/frames/frame-001.webp',
  '/frames/frame-021.webp',
  '/frames/frame-042.webp',
  '/frames/frame-063.webp',
  '/frames/frame-083.webp',
];

interface CardDims { w: number; h: number; }

function getCardDims(): CardDims {
  if (typeof window === 'undefined') return { w: 300, h: 410 };
  if (window.innerWidth <= 640) return { w: 160, h: 220 };
  if (window.innerWidth <= 1024) return { w: 220, h: 300 };
  return { w: 300, h: 410 };
}

const OFFSETS = [
  { tx: 0,   rotY: 0,  scale: 1,    opacity: 1   },
  { tx: 320, rotY: 38, scale: 0.84, opacity: 0.75 },
  { tx: 540, rotY: 52, scale: 0.71, opacity: 0.45 },
];

export function PanoramaSlider() {
  const t = useTranslations();
  const [active, setActive] = useState(2);
  const [dims, setDims] = useState<CardDims>(getCardDims);
  const dragRef = useRef({ startX: 0, dragging: false, moved: false });

  useEffect(() => {
    const onResize = () => setDims(getCardDims());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const go = useCallback((dir: number) => {
    setActive(prev => Math.max(0, Math.min(SLIDES.length - 1, prev + dir)));
  }, []);

  function getTransform(i: number) {
    const offset = i - active;
    const abs = Math.abs(offset);
    if (abs >= OFFSETS.length) {
      const cfg = OFFSETS[OFFSETS.length - 1];
      const dir = offset > 0 ? 1 : -1;
      return {
        transform: `translateX(${dir * cfg.tx}px) rotateY(${dir * cfg.rotY}deg) scale(${cfg.scale})`,
        opacity: 0,
        zIndex: 0,
      };
    }
    const cfg = OFFSETS[abs];
    const dir = offset >= 0 ? 1 : -1;
    return {
      transform: `translateX(${dir * cfg.tx}px) rotateY(${dir * cfg.rotY}deg) scale(${cfg.scale})`,
      opacity: cfg.opacity,
      zIndex: OFFSETS.length - abs,
    };
  }

  function onPointerDown(e: React.PointerEvent) {
    dragRef.current = { startX: e.clientX, dragging: true, moved: false };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragRef.current.dragging) return;
    if (Math.abs(e.clientX - dragRef.current.startX) > 8) dragRef.current.moved = true;
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    const delta = e.clientX - dragRef.current.startX;
    if (dragRef.current.moved && Math.abs(delta) > 40) {
      go(delta < 0 ? 1 : -1);
    }
  }

  const containerH = dims.h + 100;

  return (
    <section style={{ background: '#000000', padding: '80px 0', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <p style={{ textAlign: 'center', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '64px' }}>
        {t('gallery')}
      </p>

      {/* Carousel track */}
      <div
        style={{ position: 'relative', height: containerH, perspective: '1100px', userSelect: 'none', cursor: 'grab' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Left edge fade */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '15%', height: '100%', background: 'linear-gradient(to right, #000000, transparent)', zIndex: 30, pointerEvents: 'none' }} />
        {/* Right edge fade */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '15%', height: '100%', background: 'linear-gradient(to left, #000000, transparent)', zIndex: 30, pointerEvents: 'none' }} />

        {/* Cards */}
        {SLIDES.map((src, i) => {
          const style = getTransform(i);
          return (
            <div
              key={i}
              className="panorama-card"
              onClick={() => { if (!dragRef.current.moved) setActive(i); }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: dims.w,
                height: dims.h,
                marginLeft: -(dims.w / 2),
                marginTop: -(dims.h / 2),
                transition: 'transform 0.55s cubic-bezier(0.25,0.1,0.25,1), opacity 0.55s ease',
                transformStyle: 'preserve-3d',
                cursor: i === active ? 'grab' : 'pointer',
                overflow: 'hidden',
                borderRadius: '2px',
                ...style,
              }}
            >
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                draggable={false}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
              />
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '32px' }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              height: '6px',
              width: i === active ? '22px' : '6px',
              borderRadius: '3px',
              background: i === active ? '#A38560' : 'rgba(255,255,255,0.25)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Arrow controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px' }}>
        {[{ label: '←', dir: -1 }, { label: '→', dir: 1 }].map(({ label, dir }) => (
          <button
            key={label}
            onClick={() => go(dir)}
            style={{
              background: 'transparent', border: '1px solid rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.55)', width: '40px', height: '40px',
              cursor: 'pointer', fontSize: '1rem', transition: 'border-color 0.2s, color 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.6)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
