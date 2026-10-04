'use client';

import ScreenshotFrame from './ScreenshotFrame';

interface UtilityPill {
  label: string;
  keycap: string;
}

const ROW_1_PILLS: UtilityPill[] = [
  { label: 'Volume', keycap: 'Vol +/-' },
  { label: 'Mute', keycap: 'Vol Mute' },
  { label: 'Brightness', keycap: 'WMI / DDC/CI' },
  { label: 'Windows Search', keycap: 'Win+S' },
  { label: 'Task View', keycap: 'Win+Tab' },
  { label: 'Show Desktop', keycap: 'Win+D' },
];

const ROW_2_PILLS: UtilityPill[] = [
  { label: 'Taskbar Apps', keycap: 'Win+T' },
  { label: 'App Switcher', keycap: 'Alt+Tab' },
  { label: 'Soft Keyboard', keycap: 'UTF-8' },
  { label: 'Gesture Cheatsheet', keycap: 'Popup' },
  { label: 'Volume', keycap: 'Vol +/-' },
  { label: 'Mute', keycap: 'Vol Mute' },
];

export default function UtilitiesSection() {
  return (
    <section className="section-utilities" id="utilities">
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow" style={{ textAlign: 'center', display: 'block' }}>
            <b>02</b> Companion Tools
          </span>
          <h2 className="reveal" style={{ maxWidth: '100%', margin: '0 auto 16px', fontWeight: 800 }}>
            Utilities &amp; Instant Shortcuts
          </h2>
          <p className="sub reveal" style={{ margin: '0 auto 48px', maxWidth: '38em' }}>
            Utility controls live in a collapsible bar at the top of your mobile screen, keeping essential PC actions at your fingertips without switching modes.
          </p>
        </div>

        {/* Row 1 */}
        <div className="marquee-outer" aria-label="Quick shortcut pills">
          <div className="marquee-track">
            {ROW_1_PILLS.map((pill, idx) => (
              <span key={`r1-a-${idx}`} className="pill">
                {pill.label} <span className="keycap">{pill.keycap}</span>
              </span>
            ))}
            {ROW_1_PILLS.map((pill, idx) => (
              <span key={`r1-b-${idx}`} className="pill" aria-hidden="true">
                {pill.label} <span className="keycap">{pill.keycap}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="marquee-outer" style={{ marginTop: '10px' }}>
          <div className="marquee-track rev">
            {ROW_2_PILLS.map((pill, idx) => (
              <span key={`r2-a-${idx}`} className="pill">
                {pill.label} <span className="keycap">{pill.keycap}</span>
              </span>
            ))}
            {ROW_2_PILLS.map((pill, idx) => (
              <span key={`r2-b-${idx}`} className="pill" aria-hidden="true">
                {pill.label} <span className="keycap">{pill.keycap}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Three glass cards with staggered scroll reveal */}
        <div className="cards-grid-3">
          {/* Card 1: Audio & Brightness */}
          <div className="glass-card utility-card reveal" style={{ transitionDelay: '0s' }}>
            <div className="icon-tile" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            </div>
            <h3>PC Audio &amp; Brightness</h3>
            <p className="card-intro">Directly adjust system parameters from your phone:</p>
            <ul className="card-bullets">
              <li>Volume Up, Volume Down, Volume Mute</li>
              <li>
                Brightness Up (+10%) and Brightness Down (-10%) via WMI (laptops) and DDC/CI (monitors)
              </li>
            </ul>
          </div>

          {/* Card 2: Windows Navigation */}
          <div className="glass-card utility-card reveal" style={{ transitionDelay: '0.12s' }}>
            <div className="icon-tile" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h3>Windows Navigation Actions</h3>
            <p className="card-intro">Trigger standard Windows productivity shortcuts:</p>
            <ul className="card-bullets">
              <li>
                <strong>Task View</strong> <span className="keycap">Win+Tab</span> overview of virtual desktops &amp; windows
              </li>
              <li>
                <strong>Taskbar Apps</strong> <span className="keycap">Win+T</span> cycles through pinned taskbar apps
              </li>
              <li>
                <strong>Show Desktop</strong> <span className="keycap">Win+D</span> instant minimize
              </li>
              <li>
                <strong>Windows Search</strong> <span className="keycap">Win+S</span> query launcher
              </li>
              <li>
                <strong>Previous / Next App</strong> <span className="keycap">Alt+Tab</span> window switching
              </li>
            </ul>
          </div>

          {/* Card 3: Soft Keyboard & Pairing */}
          <div className="glass-card utility-card reveal" style={{ transitionDelay: '0.24s' }}>
            <div className="icon-tile" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </div>
            <h3>Soft Keyboard &amp; Pairing</h3>
            <p className="card-intro">Quick text entry and connection maintenance:</p>
            <ul className="card-bullets">
              <li>Type full UTF-8 text strings directly into active PC fields</li>
              <li>
                Dedicated keys: <span className="keycap">Enter</span>, <span className="keycap">Backspace</span>, <span className="keycap">Space</span>, <span className="keycap">Tab</span>, <span className="keycap">Esc</span>
              </li>
              <li>Gesture cheatsheet popup for quick gesture reference</li>
              <li>QR code scanner and manual IP pairing inputs</li>
            </ul>
          </div>
        </div>

        {/* Centered phone frame showing utilities dock */}
        <div style={{ marginTop: '56px', display: 'flex', justifyContent: 'center' }}>
          <div className="phone-frame reveal">
            <ScreenshotFrame
              name="utilities-dock"
              alt="Pouse utilities dock on mobile phone"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
