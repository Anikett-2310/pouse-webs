'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── 1. TYPING HEADLINE ──
    const phrases = [
      'a touchpad.',
      'a motion mouse.',
      'a gamepad.',
      'a second screen.',
      'a hand tracker.',
    ];
    let pi = 0;
    let ci = 0;
    let del = false;
    let typeTimer: NodeJS.Timeout | null = null;

    function tickType() {
      const el = document.getElementById('typed');
      if (!el) return;
      if (isReduced) {
        el.textContent = phrases[0];
        return;
      }
      const cur = phrases[pi];
      if (!del) {
        el.textContent = cur.slice(0, ++ci);
        if (ci === cur.length) {
          del = true;
          typeTimer = setTimeout(tickType, 1500);
          return;
        }
        typeTimer = setTimeout(tickType, 75);
      } else {
        el.textContent = cur.slice(0, --ci);
        if (ci === 0) {
          del = false;
          pi = (pi + 1) % phrases.length;
          typeTimer = setTimeout(tickType, 75);
          return;
        }
        typeTimer = setTimeout(tickType, 32);
      }
    }

    tickType();

    const devs = document.getElementById('devices');
    const devWrap = document.getElementById('dev-wrap');
    const devGlow = document.getElementById('dev-glow');
    const dots = [
      { el: document.getElementById('d1'), offset: 0 },
      { el: document.getElementById('d2'), offset: 0.33 },
      { el: document.getElementById('d3'), offset: 0.66 },
    ];

    if (isReduced) {
      dots.forEach((d) => {
        if (d.el) d.el.style.display = 'none';
      });
      if (devWrap) devWrap.style.transform = 'none';
      if (devGlow) devGlow.style.transform = 'translate(-50%, -50%)';
      return () => {
        if (typeTimer) clearTimeout(typeTimer);
      };
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    // ── 2. DEVICE TILT ──
    let cx = 0,
      cy = 0,
      tx2 = 0,
      ty2 = 0;
    let tiltAnimId: number;

    const handlePointerMove = (e: PointerEvent) => {
      if (!devs) return;
      const r = devs.getBoundingClientRect();
      cx = (e.clientX - r.left) / r.width - 0.5;
      cy = (e.clientY - r.top) / r.height - 0.5;
    };

    const handlePointerLeave = () => {
      cx = 0;
      cy = 0;
    };

    if (devs) {
      devs.addEventListener('pointermove', handlePointerMove);
      devs.addEventListener('pointerleave', handlePointerLeave);
    }

    function tickTilt() {
      tx2 = lerp(tx2, cx, 0.08);
      ty2 = lerp(ty2, cy, 0.08);
      if (devWrap) {
        devWrap.style.transform = `rotateY(${tx2 * 12}deg) rotateX(${-ty2 * 12}deg)`;
      }
      if (devGlow) {
        devGlow.style.transform = `translate(calc(-50% + ${-tx2 * 8}px),calc(-50% + ${-ty2 * 8}px))`;
      }
      tiltAnimId = requestAnimationFrame(tickTilt);
    }

    tiltAnimId = requestAnimationFrame(tickTilt);

    // ── 3. TRAVELING DOTS ON BEZIER (analytic cubicBez, NO getPointAtLength) ──
    function cubicBez(p0: number, p1: number, p2: number, p3: number, t: number) {
      const u = 1 - t;
      return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
    }

    let p0 = { x: 140, y: 210 };
    let p1 = { x: 190, y: 150 };
    let p2 = { x: 230, y: 270 };
    let p3 = { x: 280, y: 210 };

    function measureCoords() {
      if (!devs) return;
      const phone = devs.querySelector<HTMLElement>('.phone');
      const laptop = devs.querySelector<HTMLElement>('.laptop');
      if (!phone || !laptop) return;

      const dRect = devs.getBoundingClientRect();
      const pRect = phone.getBoundingClientRect();
      const lRect = laptop.getBoundingClientRect();

      if (dRect.width === 0 || pRect.width === 0 || lRect.width === 0) return;

      // Phone right-center relative to devs container
      const x0 = pRect.right - dRect.left;
      const y0 = pRect.top - dRect.top + pRect.height / 2;

      // Laptop left-center relative to devs container
      const x3 = lRect.left - dRect.left;
      const y3 = lRect.top - dRect.top + lRect.height / 2;

      // S-curve intermediate control points
      const dx = x3 - x0;
      const p1x = x0 + dx * 0.35;
      const p1y = y0 - 60;
      const p2x = x0 + dx * 0.65;
      const p2y = y3 + 60;

      p0 = { x: x0, y: y0 };
      p1 = { x: p1x, y: p1y };
      p2 = { x: p2x, y: p2y };
      p3 = { x: x3, y: y3 };

      const dStr = `M ${x0.toFixed(1)} ${y0.toFixed(1)} C ${p1x.toFixed(1)} ${p1y.toFixed(1)}, ${p2x.toFixed(1)} ${p2y.toFixed(1)}, ${x3.toFixed(1)} ${y3.toFixed(1)}`;
      const cp = document.getElementById('cp');
      const cpglow = document.getElementById('cp-glow');
      if (cp) cp.setAttribute('d', dStr);
      if (cpglow) cpglow.setAttribute('d', dStr);

      const svg = devs.querySelector<SVGSVGElement>('.conn-svg');
      if (svg) {
        svg.setAttribute('viewBox', `0 0 ${dRect.width.toFixed(1)} ${dRect.height.toFixed(1)}`);
      }
    }

    measureCoords();
    window.addEventListener('resize', measureCoords);

    const DUR = 2400;
    let dotsAnimId: number;

    function tickDots() {
      const now = performance.now();
      dots.forEach((d) => {
        if (!d.el) return;
        const t = (now / DUR + d.offset) % 1;
        // ease-in-out
        const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const x = cubicBez(p0.x, p1.x, p2.x, p3.x, e);
        const y = cubicBez(p0.y, p1.y, p2.y, p3.y, e);
        d.el.setAttribute('cx', x.toFixed(1));
        d.el.setAttribute('cy', y.toFixed(1));
        // 4-7px radius that pulses
        const r = 4 + 3 * Math.sin(t * Math.PI);
        d.el.setAttribute('r', r.toFixed(1));
      });
      dotsAnimId = requestAnimationFrame(tickDots);
    }

    dotsAnimId = requestAnimationFrame(tickDots);

    return () => {
      if (typeTimer) clearTimeout(typeTimer);
      cancelAnimationFrame(tiltAnimId);
      cancelAnimationFrame(dotsAnimId);
      window.removeEventListener('resize', measureCoords);
      if (devs) {
        devs.removeEventListener('pointermove', handlePointerMove);
        devs.removeEventListener('pointerleave', handlePointerLeave);
      }
    };
  }, []);

  return (
    <section className="hero">
      {/* Spotlight behind headline */}
      <div className="hero-spotlight" aria-hidden="true" />

      <div className="wrap">
        <div className="hero-inner">
          {/* Left Column */}
          <div className="hero-text">
            <span className="eyebrow">
              <b>00</b> Pocket Mouse
            </span>
            <h1>
              <span className="l1">Turn your phone into</span>
              <span className="typed" id="typed"></span>
            </h1>
            <p className="lede">
              Pouse makes your Android phone a wireless mouse for Windows. No dongle, no extra hardware, just the phone already in your pocket.
            </p>
            <div className="ctas">
              <Link className="btn-pri" href="/download">
                Get Pouse for Windows
              </Link>
              <Link className="btn-out" href="/features">
                See the five modes
              </Link>
            </div>
            <div className="stats">
              <span className="stat">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
                5 Input Modes
              </span>
              <span className="stat">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
                </svg>
                2 Transports
              </span>
              <span className="stat">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                v1.0.0 Released
              </span>
            </div>
          </div>

          {/* Right Column: Devices */}
          <div className="devices" id="devices" aria-label="Interactive demonstration of phone paired with Windows laptop">
            <div className="dev-glow" id="dev-glow" aria-hidden="true"></div>
            <div id="dev-wrap">
              {/* Phone */}
              <div className="phone">
                <div className="phone-bar" aria-hidden="true">
                  <div className="phone-notch"></div>
                </div>
                <div className="phone-screen">
                  <img
                    src="/media/hero-phone.webp"
                    alt="Pouse Android companion app"
                    width={540}
                    height={928}
                  />
                </div>
                <div className="phone-home" aria-hidden="true">
                  <div className="phone-pill"></div>
                </div>
              </div>

              {/* Connection SVG with traveling dots */}
              <svg className="conn-svg" viewBox="0 0 420 420" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="cg" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="50%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#f0abfc" />
                  </linearGradient>
                  <linearGradient id="dot-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c4b5fd" />
                    <stop offset="100%" stopColor="#f0abfc" />
                  </linearGradient>
                  <filter id="glow-f" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Base dim path */}
                <path className="conn-path" id="cp" d="M 140 210 C 190 150, 230 270, 280 210" />
                {/* Glow path */}
                <path id="cp-glow" fill="none" stroke="url(#cg)" strokeWidth="2" opacity="0.9" filter="url(#glow-f)" d="M 140 210 C 190 150, 230 270, 280 210" />
                {/* Traveling Dots with IDs d1, d2, d3 */}
                <circle className="dot" id="d1" fill="url(#dot-grad)" filter="url(#glow-f)" r="5" cx="140" cy="210" />
                <circle className="dot" id="d2" fill="url(#dot-grad)" filter="url(#glow-f)" r="5" cx="140" cy="210" />
                <circle className="dot" id="d3" fill="url(#dot-grad)" filter="url(#glow-f)" r="5" cx="140" cy="210" />
              </svg>

              {/* Laptop */}
              <div className="laptop">
                <div className="laptop-screen">
                  <img
                    src="/media/pc-tray-menu.webp"
                    alt="Pouse PC client interface"
                    width={550}
                    height={689}
                  />
                </div>
                <div className="laptop-base" aria-hidden="true">
                  <div className="laptop-notch"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
