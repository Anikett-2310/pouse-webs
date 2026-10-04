'use client';

import { useEffect, useRef } from 'react';

interface SecuritySayProps {
  statements?: Array<{ normal: string; highlight: string; suffix?: string }>;
}

const DEFAULT_STATEMENTS = [
  {
    prefix: 'Pouse has ',
    highlight: 'no telemetry',
    suffix: ". It doesn't collect how you use it.",
  },
  {
    prefix: 'Wi-Fi pairing stays on ',
    highlight: 'your own network',
    suffix: ', with a QR code and a pair token.',
  },
  {
    prefix: 'Bluetooth asks before it trusts. The first connection needs ',
    highlight: 'your approval',
    suffix: '.',
  },
];

export default function SecuritySay({ statements }: SecuritySayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('on', entry.isIntersecting);
        });
      },
      {
        rootMargin: '-42% 0px -42% 0px',
      }
    );

    const paragraphs = container.querySelectorAll('p');
    paragraphs.forEach((p) => observer.observe(p));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="say" id="say" ref={containerRef}>
      {DEFAULT_STATEMENTS.map((item, idx) => (
        <p key={idx}>
          {item.prefix}
          <em>{item.highlight}</em>
          {item.suffix}
        </p>
      ))}
    </div>
  );
}
