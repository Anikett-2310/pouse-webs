'use client';

import { useEffect, useRef } from 'react';

export default function ConnectionRibbon() {
  const svgRef = useRef<SVGSVGElement>(null);
  const livePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const livePath = livePathRef.current;
    const svg = svgRef.current;
    if (!livePath || !svg) return;

    const length = livePath.getTotalLength();
    livePath.style.strokeDasharray = `${length}`;
    livePath.style.strokeDashoffset = `${length}`;

    const handleScroll = () => {
      const rect = svg.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight * 0.85 - rect.top) / (window.innerHeight * 0.6))
      );
      livePath.style.strokeDashoffset = `${length * (1 - progress)}`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="ribbon"
      id="rib"
      viewBox="0 0 1000 150"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rg" x1="0" x2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="0.5" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#f0abfc" />
        </linearGradient>
      </defs>
      <path
        className="base"
        id="rb"
        d="M70 90 C 250 -10, 330 170, 500 80 S 760 10, 930 80"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        ref={livePathRef}
        className="live"
        id="rl"
        d="M70 90 C 250 -10, 330 170, 500 80 S 760 10, 930 80"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect
        x="40"
        y="62"
        width="30"
        height="56"
        rx="8"
        fill="#0b0716"
        stroke="#22d3ee"
        strokeWidth="2"
      />
      <rect
        x="930"
        y="56"
        width="52"
        height="38"
        rx="5"
        fill="#0b0716"
        stroke="#f0abfc"
        strokeWidth="2"
      />
      <path d="M944 106h24" stroke="#f0abfc" strokeWidth="2" />
      <text x="55" y="140" textAnchor="middle">
        Phone
      </text>
      <text x="956" y="140" textAnchor="middle">
        Windows PC
      </text>
    </svg>
  );
}
