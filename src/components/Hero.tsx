'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const PHRASES = [
  'a touchpad.',
  'a motion mouse.',
  'a gamepad.',
  'a second screen.',
  'a hand tracker.',
];

export default function Hero() {
  const [typedText, setTypedText] = useState('a touchpad.');
  const [reducedMotion, setReducedMotion] = useState(false);
  const visualBoxRef = useRef<HTMLDivElement>(null);
  const devicesRef = useRef<HTMLDivElement>(null);
  const visualGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(isReduced);

    if (isReduced) {
      setTypedText(PHRASES[0]);
      return;
    }

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const tick = () => {
      const currentPhrase = PHRASES[phraseIdx];

      if (!isDeleting) {
        charIdx++;
        setTypedText(currentPhrase.slice(0, charIdx));

        if (charIdx === currentPhrase.length) {
          isDeleting = true;
          timeoutId = setTimeout(tick, 1500);
          return;
        }
        timeoutId = setTimeout(tick, 75);
      } else {
        charIdx--;
        setTypedText(currentPhrase.slice(0, charIdx));

        if (charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % PHRASES.length;
          timeoutId = setTimeout(tick, 75);
          return;
        }
        timeoutId = setTimeout(tick, 32);
      }
    };

    timeoutId = setTimeout(tick, 75);

    return () => clearTimeout(timeoutId);
  }, []);

  // 3D cursor tilt on both devices + counter-parallax on background glow
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !visualBoxRef.current || !devicesRef.current) return;
    const rect = visualBoxRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Up to 12 degrees on both axes, perspective 1000px, 0.15s smoothing
    devicesRef.current.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;

    // Counter-parallax: glow moves 8px in opposite direction
    if (visualGlowRef.current) {
      visualGlowRef.current.style.transform = `translate(${-x * 8}px, ${-y * 8}px)`;
    }
  };

  const handlePointerLeave = () => {
    if (devicesRef.current) {
      devicesRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
    }
    if (visualGlowRef.current) {
      visualGlowRef.current.style.transform = 'translate(0px, 0px)';
    }
  };

  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        {/* Left Column */}
        <div className="hero-content">
          <div className="eyebrow hero-eyebrow in">
            <span className="num muted">00</span>
            <span className="label muted">POCKET MOUSE</span>
          </div>

          <h1 className="in" style={{ animationDelay: '0.1s' }}>
            <span className="l1">Turn your phone into</span>
            <span id="type" aria-live="polite">
              <span>{typedText}</span>
              {!reducedMotion && <span className="caret" aria-hidden="true" />}
            </span>
          </h1>

          <p className="lede in" style={{ animationDelay: '0.25s' }}>
            Pouse makes your Android phone a wireless mouse for Windows. No dongle, no extra hardware, just the phone already in your pocket.
          </p>

          <div className="cta in" style={{ animationDelay: '0.4s' }}>
            <Link className="btn pri" href="/download">
              Get Pouse for Windows
            </Link>
            <Link className="btn" href="/features">
              See the five modes
            </Link>
          </div>

          <p className="fine in" style={{ animationDelay: '0.55s' }}>
            Version 1.0.0. Windows 10/11 and Android. Works over Wi-Fi or Bluetooth.
          </p>

          {/* Three small stat pills */}
          <div className="hero-stat-pills in reveal" style={{ animationDelay: '0.65s' }}>
            <div className="hero-stat-pill">
              <svg className="stat-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span><strong>5</strong> Input Modes</span>
            </div>
            <div className="hero-stat-pill">
              <svg className="stat-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
              </svg>
              <span><strong>2</strong> Transports</span>
            </div>
            <div className="hero-stat-pill">
              <svg className="stat-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span><strong>v1.0.0</strong> Released</span>
            </div>
          </div>
        </div>

        {/* Right Column: Phone + PC Visual */}
        <div
          className="hero-visual in"
          style={{ animationDelay: '0.2s' }}
          ref={visualBoxRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          aria-label="Interactive demonstration of phone paired with Windows laptop"
        >
          {/* Large soft radial glow with counter-parallax */}
          <div className="hero-visual-glow" ref={visualGlowRef} aria-hidden="true" />

          {/* 3D tiltable devices container */}
          <div className="hero-devices" ref={devicesRef}>
            {/* Phone Shape on left */}
            <div className="device-phone">
              <div className="device-phone-notch" aria-hidden="true" />
              <div className="device-phone-screen">
                <img
                  src="/media/hero-phone.webp"
                  alt="Pouse Android companion app running on mobile phone"
                  width={540}
                  height={928}
                  className="device-img"
                />
              </div>
            </div>

            {/* Laptop Shape on right */}
            <div className="device-laptop">
              <div className="device-laptop-screen">
                <img
                  src="/media/pc-tray-menu.webp"
                  alt="Pouse PC client running in Windows system tray"
                  width={550}
                  height={689}
                  className="device-img"
                />
              </div>
              <div className="device-laptop-deck" aria-hidden="true">
                <div className="device-laptop-notch" />
              </div>
            </div>

            {/* Connection Line with Traveling Dots */}
            <svg
              className="hero-conn-svg"
              viewBox="0 0 540 380"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="dotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#f0abfc" />
                </linearGradient>
                <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#c084fc" floodOpacity="0.8" />
                </filter>
              </defs>

              {/* Smooth cubic bezier curve from phone to laptop */}
              <path
                id="heroConnPath"
                d="M 180 175 C 235 175, 275 220, 315 220"
                stroke="rgba(167, 139, 250, 0.3)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                fill="none"
              />

              {!reducedMotion && (
                <>
                  <circle r="3" fill="url(#dotGrad)" filter="url(#dotGlow)">
                    <animateMotion
                      dur="2.4s"
                      repeatCount="indefinite"
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="spline"
                      keySplines="0.42 0 0.58 1"
                    >
                      <mpath href="#heroConnPath" />
                    </animateMotion>
                  </circle>
                  <circle r="3" fill="url(#dotGrad)" filter="url(#dotGlow)">
                    <animateMotion
                      dur="2.4s"
                      begin="0.6s"
                      repeatCount="indefinite"
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="spline"
                      keySplines="0.42 0 0.58 1"
                    >
                      <mpath href="#heroConnPath" />
                    </animateMotion>
                  </circle>
                  <circle r="3" fill="url(#dotGrad)" filter="url(#dotGlow)">
                    <animateMotion
                      dur="2.4s"
                      begin="1.2s"
                      repeatCount="indefinite"
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="spline"
                      keySplines="0.42 0 0.58 1"
                    >
                      <mpath href="#heroConnPath" />
                    </animateMotion>
                  </circle>
                </>
              )}
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
