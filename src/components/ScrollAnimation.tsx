'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


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

    </div>
  );
}
