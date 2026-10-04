import { Suspense } from 'react';
import Hero from '@/components/Hero';
import ModeSwitcher from '@/components/ModeSwitcher';
import UtilitiesSection from '@/components/UtilitiesSection';
import ConnectionRibbon from '@/components/ConnectionRibbon';
import ConnectSteps from '@/components/ConnectSteps';
import DownloadTabs from '@/components/DownloadTabs';
import TerminalSection from '@/components/TerminalSection';
import SecuritySay from '@/components/SecuritySay';
import FaqSection from '@/components/FaqSection';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Hero />

      <div className="section-divider" aria-hidden="true" />

      {/* 01 Input Modes */}
      <section id="modes">
        <div className="wrap">
          <div className="eyebrow">
            <span className="num">01</span>
            <span className="label">INPUT MODES</span>
          </div>
          <h2 className="reveal">One phone, five ways to point.</h2>
          <p className="sub">
            Pick the mode that fits the moment. Switching takes a tap, and every mode shares the exact same lightweight Windows client.
          </p>
          <ModeSwitcher />
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* 02 Companion Tools: Utilities and Instant Shortcuts */}
      <UtilitiesSection />

      <div className="section-divider" aria-hidden="true" />

      {/* 03 Connect */}
      <section className="conn" id="connect">
        <div className="wrap">
          <div className="eyebrow">
            <span className="num">03</span>
            <span className="label">CONNECT</span>
          </div>
          <h2 className="reveal">Pair once. It remembers.</h2>
          <p className="sub">
            Two ways to connect, and the PC only listens to one at a time so inputs never collide.
          </p>
          <ConnectionRibbon />
          <ConnectSteps />
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* 04 Download */}
      <section id="download">
        <div className="wrap">
          <div className="eyebrow">
            <span className="num">04</span>
            <span className="label">DOWNLOAD</span>
          </div>
          <h2 className="reveal">Get Pouse.</h2>
          <p className="sub">
            Install the PC client first, then the phone app. Prefer a terminal? The CLI handles the Windows install for you.
          </p>
          <Suspense fallback={<div style={{ minHeight: '300px' }} />}>
            <DownloadTabs />
          </Suspense>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* 05 Developer Tool: Terminal (CLI) */}
      <TerminalSection />

      <div className="section-divider" aria-hidden="true" />

      {/* 06 Security */}
      <section id="security">
        <div className="wrap">
          <div className="eyebrow">
            <span className="num">06</span>
            <span className="label">SECURITY</span>
          </div>
          <h2 className="reveal">Private by design.</h2>
          <p className="sub">Scroll slowly. Three promises, in plain words.</p>
          <SecuritySay />
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* 07 FAQ */}
      <FaqSection limit={6} showAllLink />
    </>
  );
}
