import type { Metadata } from 'next';
import FaqAccordion, { FaqItem } from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Pouse',
  description:
    'Find answers to common questions about Pouse setup, requirements, networking, security, and hardware compatibility.',
};

export default function FaqPage() {
  const faqItems: FaqItem[] = [
    {
      question: 'Do I need an active internet connection to use Pouse?',
      answer:
        'No. Bluetooth RFCOMM operates completely offline without any local network or router. In Wi-Fi mode, Pouse only needs both devices on the same local area network (LAN) — no internet traffic is generated or required.',
      defaultOpen: true,
    },
    {
      question: 'Why does Windows SmartScreen warn me when running the installer?',
      answer:
        'Pouse v1.0.0 is open-source software built with Rust and Inno Setup. It has not yet been signed with a commercial Authenticode code signing certificate. To verify the installer, compare the SHA-256 checksum of your downloaded file with the hash published on the official GitHub Release page.',
      defaultOpen: true,
    },
    {
      question: 'Which operating systems and devices are supported?',
      answer:
        'The PC client runs on Windows 10 (version 1809 and newer) and Windows 11. The mobile companion application requires Android 8.0 (API level 26) or higher. iOS and macOS are not currently supported.',
    },
    {
      question: 'How does Remote Screen work and can it work over Bluetooth?',
      answer:
        'Remote Screen captures your Windows desktop using Windows Graphics Capture (WGC) and encodes it in real time via GPU hardware (Media Foundation H.264). Because high-definition 60 FPS video streaming requires 5 to 15 Mbps of bandwidth, Remote Screen requires a local Wi-Fi connection. Bluetooth RFCOMM bandwidth (~1 Mbps) is insufficient and is restricted to input control only.',
    },
    {
      question: 'What happens if both Wi-Fi and Bluetooth are active at the same time?',
      answer:
        'Pouse employs an InputOwner singleton on the PC client. Only one transport can inject input into Windows at any given time. If the connection switches, all pressed keys and mouse buttons are automatically released to prevent stuck inputs.',
    },
    {
      question: 'Does Pouse collect any analytics or telemetry?',
      answer:
        'None whatsoever. Pouse contains zero tracking code, zero analytics SDKs, and zero cloud services. All network packets stay strictly between your phone and your personal computer.',
    },
    {
      question: 'How does the brightness control in the Utility Dock work?',
      answer:
        'Pouse automatically detects your display type. On laptops with internal panels, it uses Windows Management Instrumentation (WMI). On desktop setups with external monitors, it sends DDC/CI commands via dxva2.dll directly to your monitor hardware.',
    },
    {
      question: 'Is the rear camera optical mouse mode supported?',
      answer:
        'No. Optical surface mouse tracking via the rear camera was evaluated during early research and has been dropped from the project roadmap in favor of Touchless computer-vision tracking and high-precision Touchpad input.',
    },
    {
      question: 'How can I reset my pairing token or start fresh?',
      answer:
        'You can reset pairing at any time from the PC client. Right-click the Pouse system tray icon, open Preferences, and click "Reset Pairing Token". Alternatively, start the client from the command line with the --reset-pairing flag.',
    },
  ];

  return (
    <div>
      <section style={{ paddingTop: 'clamp(48px, 8vw, 90px)' }}>
        <div className="wrap">
          <h2>Questions, answered.</h2>
          <p className="sub">
            Clear, honest details on how Pouse works, what it supports, and how your privacy is protected.
          </p>

          <div style={{ maxWidth: '800px', marginTop: '36px' }}>
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>
    </div>
  );
}
