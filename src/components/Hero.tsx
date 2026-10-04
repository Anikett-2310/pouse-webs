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

    if (isReduced) {
      return () => {
        if (typeTimer) clearTimeout(typeTimer);
      };
    }

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    // ── 2. DEVICE TILT ──
    const devs = document.getElementById('devices');
    const devWrap = document.getElementById('dev-wrap');
    const devGlow = document.getElementById('dev-glow');
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

    const dots = [
      { el: document.getElementById('d1'), offset: 0 },
      { el: document.getElementById('d2'), offset: 0.33 },
      { el: document.getElementById('d3'), offset: 0.66 },
    ];
    const DUR = 2400;
    let dotsAnimId: number;

    function tickDots() {
      const now = performance.now();
      dots.forEach((d) => {
        if (!d.el) return;
        const t = (now / DUR + d.offset) % 1;
        // ease-in-out
        const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const x = cubicBez(145, 200, 240, 295, e);
        const y = cubicBez(145, 80, 210, 145, e);
        d.el.setAttribute('cx', x.toString());
        d.el.setAttribute('cy', y.toString());
      });
      dotsAnimId = requestAnimationFrame(tickDots);
    }

    dotsAnimId = requestAnimationFrame(tickDots);

    return () => {
      if (typeTimer) clearTimeout(typeTimer);
      cancelAnimationFrame(tiltAnimId);
      cancelAnimationFrame(dotsAnimId);
      if (devs) {
        devs.removeEventListener('pointermove', handlePointerMove);
        devs.removeEventListener('pointerleave', handlePointerLeave);
      }
    };
  }, []);

  return (
    <section className="hero">
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
              <svg className="conn-svg" viewBox="0 0 420 290" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="cg" x1="0" x2="1">
                    <stop offset="0" stopColor="#22d3ee" />
                    <stop offset="0.5" stopColor="#a78bfa" />
                    <stop offset="1" stopColor="#f0abfc" />
                  </linearGradient>
                  <filter id="glow-f">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Base dim path */}
                <path className="conn-path" id="cp" d="M 145 145 C 200 80, 240 210, 295 145" />
                {/* Glow path */}
                <path fill="none" stroke="url(#cg)" strokeWidth="2" opacity="0.9" filter="url(#glow-f)" d="M 145 145 C 200 80, 240 210, 295 145" />
                {/* Traveling Dots with IDs d1, d2, d3 */}
                <circle className="dot" id="d1" fill="#c4b5fd" filter="url(#glow-f)" cx="145" cy="145" />
                <circle className="dot" id="d2" fill="#e879f9" filter="url(#glow-f)" cx="145" cy="145" />
                <circle className="dot" id="d3" fill="#67e8f9" filter="url(#glow-f)" cx="145" cy="145" />
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
