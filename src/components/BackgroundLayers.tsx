'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackgroundLayers() {
  const orbARef = useRef<HTMLDivElement>(null);
  const orbBRef = useRef<HTMLDivElement>(null);
  const orbCRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(isReduced);
    if (isReduced) return;

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let animationFrameId: number;

    const handleScroll = () => {
      targetY = window.scrollY;
    };

    const updateParallax = () => {
      // Lerp with factor 0.08 for silky lagged movement
      currentY += (targetY - currentY) * 0.08;

      if (orbARef.current) {
        orbARef.current.style.transform = `translate3d(0, ${currentY * -0.12}px, 0)`;
      }
      if (orbBRef.current) {
        orbBRef.current.style.transform = `translate3d(0, ${currentY * 0.08}px, 0)`;
      }
      if (orbCRef.current) {
        orbCRef.current.style.transform = `translate3d(0, ${currentY * -0.06}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (reducedMotion) {
    return null;
  }

  return (
    <div className="bg-layers" aria-hidden="true">
      {/* Layer 1 — dotted grid (static) */}
      <div className="bg-layer-grid" />

      {/* Layer 2 — slow drifting orbs (parallax) */}
      <div className="bg-layer-orbs">
        <div ref={orbARef} className="bg-orb orb-a" />
        <div ref={orbBRef} className="bg-orb orb-b" />
        <div ref={orbCRef} className="bg-orb orb-c" />
      </div>

      {/* Layer 3 — noise texture (static) */}
      <div className="bg-layer-noise" />
    </div>
  );
}
