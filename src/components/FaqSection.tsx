'use client';

import { useState } from 'react';
import Link from 'next/link';

export interface FaqItemData {
  question: string;
  answer: string;
}

export const ALL_FAQ_ITEMS: FaqItemData[] = [
  {
    question: 'Do I need any extra hardware to use Pouse?',
    answer:
      'No. Pouse requires no USB dongles, adapters, or dedicated receivers. It uses the Android smartphone already in your pocket and connects over your existing home/office Wi-Fi or your PC’s built-in Bluetooth radio.',
  },
  {
    question: 'Does Pouse work without an active Wi-Fi network?',
    answer:
      'Yes. Bluetooth Classic (RFCOMM) mode operates completely offline with zero local Wi-Fi network or router required. Even in Wi-Fi mode, Pouse only requires a local area network connection between phone and PC—no internet connectivity is used or required.',
  },
  {
    question: 'How does Bluetooth pairing work?',
    answer:
      'First, your phone and PC pair at the Windows OS level via standard Bluetooth passkey authentication. Second, when Pouse connects, Android prompts for Trust-On-First-Use (TOFU) confirmation bound to the PC’s permanent hardware Bluetooth MAC (BD_ADDR). Input ownership is only granted on the PC when an authorized event is received.',
  },
  {
    question: 'Can Remote Screen stream video over Bluetooth?',
    answer:
      'No. Real-time H.264 video streaming at up to 60 FPS requires 5 to 15 Mbps of bandwidth, which exceeds typical Bluetooth RFCOMM bandwidth (~1 Mbps). Remote Screen video requires a local Wi-Fi connection. If connected via Bluetooth, the app indicates that Wi-Fi is required for desktop video streaming.',
  },
  {
    question: 'Are macOS, Linux, or iOS supported?',
    answer:
      'Version 1.0.0 exclusively supports Windows 10/11 for the PC host client and Android (API 26+) for the mobile companion app. macOS, Linux, and iOS are not currently supported as the project focuses deeply on native Windows input and display subsystems.',
  },
  {
    question: 'Why does Windows SmartScreen display a warning when installing?',
    answer:
      'The Pouse v1.0.0 installer is built from open-source code and is not yet signed with a paid commercial Authenticode certificate. Windows SmartScreen displays a warning for unsigned executables. You can safely click "More info" and "Run anyway" after verifying the SHA-256 hash published with the GitHub release.',
  },
  {
    question: 'Is Pouse available on the Google Play Store?',
    answer:
      'No. The Pouse Android companion app is distributed directly as a signed APK from our download center. Google Play Store publishing is not required for our current distribution model, keeping the app independent and open source.',
  },
  {
    question: 'What is the difference between Task View and Taskbar Apps in the utilities dock?',
    answer:
      'Task View triggers Windows Task View overview (Win+Tab), displaying all virtual desktops and active open windows across your desktop. Taskbar Apps (Win+T) focuses and cycles through individual applications pinned to your Windows taskbar.',
  },
  {
    question: 'How do I uninstall Pouse?',
    answer:
      'On Windows, uninstall through standard Windows Settings > Installed Apps or via the Start Menu uninstaller shortcut, which cleanly removes the application and associated Windows Firewall rules. If installed via CLI, simply run "pouse uninstall".',
  },
  {
    question: 'What is the development limitation with Bluetooth discovery?',
    answer:
      'The BLE advertisement beacon currently uses company ID 0xFFFF, which is reserved by the Bluetooth SIG strictly for development and testing. This is a recognized external public-distribution blocker for the BLE advertisement mechanism until an official Bluetooth SIG Company Identifier is assigned.',
  },
];

interface FaqSectionProps {
  limit?: number;
  showAllLink?: boolean;
}

export default function FaqSection({ limit, showAllLink = false }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default
  const items = limit ? ALL_FAQ_ITEMS.slice(0, limit) : ALL_FAQ_ITEMS;

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="section-faq" id="faq">
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <span className="num">07</span>
            <span className="label">FAQ</span>
          </div>
          <h2 className="reveal" style={{ maxWidth: '100%', margin: '0 auto 16px', fontWeight: 800 }}>
            Frequently Asked Questions
          </h2>
          <p className="sub" style={{ margin: '0 auto', maxWidth: '38em' }}>
            Practical, factual answers regarding Pouse compatibility, network transports, security, and setup.
          </p>
        </div>

        {/* Accordion Cards */}
        <div className="faq-container">
          <div className="faq-accordion-list">
            {items.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`faq-card glass-card reveal ${isOpen ? 'open' : ''}`}
                  style={{ transitionDelay: `${idx * 0.12}s` }}
                >
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => toggleItem(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{item.question}</span>
                    <span className="faq-icon-circle" aria-hidden="true">
                      <span className="faq-plus-icon" />
                    </span>
                  </button>
                  <div className="faq-answer-wrap">
                    <div className="faq-answer-inner">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {showAllLink && (
            <div style={{ textAlign: 'center', marginTop: '28px' }}>
              <Link className="btn" href="/faq">
                See all questions →
              </Link>
            </div>
          )}

          {/* Issue Box */}
          <div className="faq-issue-box glass-card reveal" style={{ transitionDelay: '0.2s' }}>
            <h3>Have a technical issue or bug report?</h3>
            <p>
              Check out the public issue tracker on GitHub to report issues, request features, or review the codebase.
            </p>
            <div>
              <a
                className="btn"
                href="https://github.com/Anikett-2310/Pouse/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open an issue on GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
