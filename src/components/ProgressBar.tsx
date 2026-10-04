'use client';

import { useEffect, useState } from 'react';

export default function ProgressBar() {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const y = window.scrollY;
      const maxScroll = h.scrollHeight - window.innerHeight;
      setScale(maxScroll > 0 ? y / maxScroll : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="bar"
      style={{ transform: `scaleX(${scale})` }}
      aria-hidden="true"
    />
  );
}
