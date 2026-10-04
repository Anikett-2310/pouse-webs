import Hero from '@/components/Hero';
import ModeSwitcher from '@/components/ModeSwitcher';
import UtilityDock from '@/components/UtilityDock';
import ConnectionRibbon from '@/components/ConnectionRibbon';
import ConnectSteps from '@/components/ConnectSteps';
import DownloadTabs from '@/components/DownloadTabs';
import SecuritySay from '@/components/SecuritySay';
import FaqAccordion, { FaqItem } from '@/components/FaqAccordion';

export default function HomePage() {
  const homeFaqItems: FaqItem[] = [
    {
      question: 'Do I need internet?',
      answer:
        'No. Bluetooth works with no network at all, and Wi-Fi mode only needs your phone and PC on the same local network.',
      defaultOpen: true,
    },
    {
      question: 'Why does Windows warn me about the installer?',
      answer:
        "It isn't signed with a production Authenticode certificate yet. Compare the file against the published SHA-256 checksum, then choose to run it anyway.",
    },
    {
      question: 'Which devices work?',
      answer:
        'Version 1.0.0 supports Android phones and Windows 10 or 11 PCs.',
    },
    {
      question: 'Can I use the phone as a second screen?',
      answer:
        'Yes. Remote Screen streams your desktop to the phone over Wi-Fi, and your touches go back to the PC.',
    },
  ];

  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Modes */}
      <section id="modes">
        <div className="wrap">
          <h2>One phone, five ways to point.</h2>
          <p className="sub">
            Pick the mode that fits the moment. Switching takes a tap, and the utility dock stays with you in all of them.
          </p>
          <ModeSwitcher />
          <UtilityDock />
        </div>
      </section>

      {/* 3. Connect */}
      <section className="conn" id="connect">
        <div className="wrap">
          <h2>Pair once. It remembers.</h2>
          <p className="sub">
            Two ways to connect, and the PC only listens to one at a time so inputs never collide.
          </p>
          <ConnectionRibbon />
          <ConnectSteps />
        </div>
      </section>

      {/* 4. Download */}
      <section id="download">
        <div className="wrap">
          <h2>Get Pouse.</h2>
          <p className="sub">
            Install the PC client first, then the phone app. Prefer a terminal? The CLI handles the Windows install for you.
          </p>
          <DownloadTabs />
        </div>
      </section>

      {/* 5. Security */}
      <section id="security">
        <div className="wrap">
          <h2>Private by design.</h2>
          <p className="sub">Scroll slowly. Three promises, in plain words.</p>
          <SecuritySay />
        </div>
      </section>

      {/* 6. FAQ */}
      <section id="faq">
        <div className="wrap">
          <h2>Questions, answered.</h2>
          <p className="sub"></p>
          <FaqAccordion items={homeFaqItems} />
        </div>
      </section>
    </>
  );
}
