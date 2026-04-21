'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CalloutProps {
  side: 'left' | 'right';
  top: string;
  title: string;
  subtitle: string;
  scrollStart: number;
  scrollEnd: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function Callout({ side, top, title, subtitle, scrollStart, scrollEnd, containerRef }: CalloutProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !containerRef.current) return;

    gsap.set(ref.current, { x: side === 'left' ? -20 : 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: `top+=${scrollStart * 100}% top`,
        end: `top+=${scrollEnd * 100}% top`,
        scrub: 1,
      },
    });

    tl.to(ref.current, { x: 0, duration: 0.3 })
      .to(ref.current, { x: 0, duration: 0.4 }, '>+=0.3')
      .to(ref.current, { x: side === 'left' ? -20 : 20, duration: 0.3 });

    return () => {
      tl.kill();
    };
  }, [side, scrollStart, scrollEnd, containerRef]);

  return (
    <div
      ref={ref}
      className="absolute pointer-events-none"
      style={{
        top,
        left: side === 'left' ? '3%' : 'auto',
        right: side === 'right' ? '3%' : 'auto',
      }}
    >
      <div className={`flex items-center gap-3 ${side === 'right' ? 'flex-row-reverse' : ''}`}>
        <div className={`${side === 'right' ? 'text-left' : 'text-right'}`}>
          <p className="section-label" style={{ color: '#A38560' }}>{title}</p>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.02em' }}>{subtitle}</p>
        </div>
        <div className="w-24 border-t border-dashed" style={{ borderColor: 'rgba(163,133,96,0.5)' }} />
      </div>
    </div>
  );
}

interface ScrollAnimationProps {
  frameDir: string;
  frameCount: number;
}

export function ScrollAnimation({ frameDir, frameCount }: ScrollAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const playhead = { frame: 0 };
    let currentFrameIndex = -1;

    const isMobile = window.innerWidth <= 768;
    const dir = isMobile ? `${frameDir}/mobile` : frameDir;
    const count = isMobile ? Math.round(frameCount * 0.53) : frameCount;

    canvas.width = isMobile ? 1080 : 1920;
    canvas.height = isMobile ? 607 : 1080;

    const urls = Array.from({ length: count }, (_, i) =>
      `${dir}/frame-${String(i + 1).padStart(3, '0')}.webp`
    );

    const bitmaps: (ImageBitmap | null)[] = new Array(count).fill(null);
    let loadedCount = 0;
    let failedCount = 0;

    function drawBitmap(bitmap: ImageBitmap) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    }

    function render() {
      const newIndex = Math.round(playhead.frame);
      if (newIndex !== currentFrameIndex && bitmaps[newIndex]) {
        currentFrameIndex = newIndex;
        drawBitmap(bitmaps[newIndex]!);
      }
    }

    function initAnimation(totalFrames: number) {
      gsap.to(playhead, {
        frame: totalFrames - 1,
        ease: 'none',
        onUpdate: render,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
        },
      });
    }

    urls.forEach((url, i) => {
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => createImageBitmap(blob))
        .then((bitmap) => {
          bitmaps[i] = bitmap;
          loadedCount++;
          if (i === 0) {
            drawBitmap(bitmap);
            setFirstFrameReady(true);
          }
          if (loadedCount + failedCount === count) initAnimation(count);
        })
        .catch(() => {
          failedCount++;
          if (loadedCount + failedCount === count) initAnimation(count);
        });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      bitmaps.forEach((b) => b?.close());
    };
  }, [frameDir, frameCount]);

  return (
    <div ref={containerRef} className="relative h-screen w-full" style={{ background: '#000000' }}>
      {!firstFrameReady && (
        <img
          src={`${frameDir}/frame-001.webp`}
          alt=""
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          // @ts-ignore
          fetchpriority="high"
        />
      )}

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: 'contain',
          opacity: firstFrameReady ? 1 : 0,
        }}
      />

      <Callout
        side="left"
        top="35%"
        title="Print Excellence"
        subtitle="Quarterly curated business content"
        scrollStart={0.15}
        scrollEnd={0.42}
        containerRef={containerRef}
      />
      <Callout
        side="right"
        top="45%"
        title="Premium Reach"
        subtitle="5-star hotels · Airport lounges · Fine dining"
        scrollStart={0.3}
        scrollEnd={0.57}
        containerRef={containerRef}
      />
      <Callout
        side="left"
        top="55%"
        title="Benefit Talks"
        subtitle="Exclusive high-level business events"
        scrollStart={0.5}
        scrollEnd={0.75}
        containerRef={containerRef}
      />
      <Callout
        side="right"
        top="38%"
        title="Digital Amplification"
        subtitle="Integrated video campaigns · Social"
        scrollStart={0.65}
        scrollEnd={0.9}
        containerRef={containerRef}
      />
    </div>
  );
}
