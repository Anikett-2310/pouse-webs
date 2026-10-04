import type { Metadata } from 'next';
import TerminalSection from '@/components/TerminalSection';

export const metadata: Metadata = {
  title: 'Pouse CLI — Official Terminal Tool for Windows',
  description:
    'Install, update, and manage the Pouse Windows client directly from PowerShell or Command Prompt using the pouse-cli npm package.',
};

export default function CliPage() {
  return (
    <div style={{ paddingTop: 'clamp(40px, 8vw, 80px)' }}>
      <TerminalSection showSecondary />
    </div>
  );
}
