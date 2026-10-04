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
  const glowRef = useRef<HTMLDivElement>(null);
  const logoBoxRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);

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

  // Parallax glow effect
  useEffect(() => {
    if (reducedMotion) return;

    const handleScroll = () => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

  // 3D logo tilt
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !logoBoxRef.current || !logoImgRef.current) return;
    const rect = logoBoxRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    logoImgRef.current.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`;
  };

  const handlePointerLeave = () => {
    if (logoImgRef.current) {
      logoImgRef.current.style.transform = '';
    }
  };

  return (
    <header className="hero" id="top">
      <div className="glow" ref={glowRef} aria-hidden="true" />
      <div className="wrap">
        <div>
          <h1 className="in">
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
        </div>
        <div
          className="logo in"
          style={{ animationDelay: '0.2s' }}
          id="logo"
          ref={logoBoxRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <img
            ref={logoImgRef}
            src="/assets/pouse-logo.png"
            alt="Pouse icon glowing logo"
            width={340}
            height={340}
          />
        </div>
      </div>
    </header>
  );
}
