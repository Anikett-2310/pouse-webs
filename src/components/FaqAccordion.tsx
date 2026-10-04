import React from 'react';

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
  defaultOpen?: boolean;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div>
      {items.map((item, idx) => (
        <details key={idx} open={item.defaultOpen}>
          <summary>{item.question}</summary>
          <div style={{ color: 'var(--mut)', marginTop: '12px', maxWidth: '46em' }}>
            {typeof item.answer === 'string' ? <p style={{ margin: 0 }}>{item.answer}</p> : item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
