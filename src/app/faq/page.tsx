import type { Metadata } from 'next';
import FaqSection from '@/components/FaqSection';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Pouse',
  description:
    'Comprehensive factual answers regarding Pouse compatibility, network transports, security, and setup.',
};

export default function FaqPage() {
  return (
    <div style={{ paddingTop: 'clamp(32px, 6vw, 60px)' }}>
      {/* Show all 10 questions on the dedicated FAQ page */}
      <FaqSection />
    </div>
  );
}
