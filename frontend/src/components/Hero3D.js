import React, { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 262;
const FRAME_PATH = '/animation/ezgif-frame-';

function frameSource(frame) {
  return `${FRAME_PATH}${String(frame).padStart(3, '0')}.png`;
}

export default function Hero3D({ onOpenModal }) {
  const [viewportPhase, setViewportPhase] = useState('before');
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const frameRef = useRef(1);
  const phaseRef = useRef('before');

  useEffect(() => {
    let animationFrame = 0;
    let ticking = false;
    const isConstrainedDevice = window.matchMedia('(pointer: coarse)').matches
      || (navigator.deviceMemory && navigator.deviceMemory <= 4)
      || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    const frameStep = isConstrainedDevice ? 2 : 1;

    const updateFrame = () => {
      ticking = false;
      const hero = heroRef.current;
      if (!hero) return;

      const scrollDistance = Math.max(1, hero.offsetHeight - window.innerHeight);
      const heroTop = hero.offsetTop;
      const scrollOffset = window.scrollY - heroTop;
      const nextPhase = scrollOffset < 0
        ? 'before'
        : scrollOffset > scrollDistance
          ? 'after'
          : 'fixed';
      if (nextPhase !== phaseRef.current) {
        phaseRef.current = nextPhase;
        setViewportPhase(nextPhase);
      }

      const progress = Math.max(0, Math.min(1, scrollOffset / scrollDistance));
      const rawFrame = Math.round(progress * (FRAME_COUNT - 1)) + 1;
      const nextFrame = rawFrame === FRAME_COUNT
        ? FRAME_COUNT
        : Math.max(1, Math.round(rawFrame / frameStep) * frameStep);
      if (nextFrame !== frameRef.current) {
        frameRef.current = nextFrame;
        if (imageRef.current) {
          imageRef.current.src = frameSource(nextFrame);
        }
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        animationFrame = requestAnimationFrame(updateFrame);
      }
    };

    updateFrame();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section ref={heroRef} data-hero-animation className="relative h-[300vh] w-full bg-[#05070b]">
      <div
        className={`h-screen w-full overflow-hidden ${viewportPhase === 'fixed' ? 'fixed inset-x-0 top-0 z-0' : 'absolute inset-x-0'}`}
        style={viewportPhase === 'after' ? { top: 'calc(100% - 100vh)' } : undefined}
      >
        <img
          ref={imageRef}
          src={frameSource(1)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55" />
      </div>
    </section>
  );
}
