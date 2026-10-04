'use client';

import { useEffect } from 'react';

export default function BackgroundLayers() {

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    // ── PARALLAX ORBS ──
    const orbs = [
      { el: document.getElementById('orb-a'), f: -0.12 },
      { el: document.getElementById('orb-b'), f: 0.08 },
      { el: document.getElementById('orb-c'), f: -0.06 },
    ];
    let ty = 0;
    let animId: number;

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function tickOrbs() {
      ty = lerp(ty, window.scrollY, 0.08);
      orbs.forEach((o) => {
        if (o.el) {
          o.el.style.transform = `translateY(${ty * o.f}px)`;
        }
      });
      animId = requestAnimationFrame(tickOrbs);
    }

    animId = requestAnimationFrame(tickOrbs);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div id="bg-grid" aria-hidden="true" />
      <div id="bg-noise" aria-hidden="true" />
      <div className="orb" id="orb-a" aria-hidden="true" />
      <div className="orb" id="orb-b" aria-hidden="true" />
      <div className="orb" id="orb-c" aria-hidden="true" />
    </>
  );
}
