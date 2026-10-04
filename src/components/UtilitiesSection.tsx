'use client';

import ScreenshotFrame from './ScreenshotFrame';

interface UtilityPill {
  label: string;
  keycap: string;
}

const PILLS: UtilityPill[] = [
  { label: 'Volume', keycap: 'Vol +/-' },
  { label: 'Mute', keycap: 'Vol Mute' },
  { label: 'Brightness', keycap: 'WMI / DDC/CI' },
  { label: 'Windows Search', keycap: 'Win+S' },
  { label: 'Task View', keycap: 'Win+Tab' },
  { label: 'Show Desktop', keycap: 'Win+D' },
  { label: 'Taskbar Apps', keycap: 'Win+T' },
  { label: 'App Switcher', keycap: 'Alt+Tab' },
  { label: 'Soft Keyboard', keycap: 'UTF-8' },
  { label: 'Gesture Cheatsheet', keycap: 'Popup' },
];

export default function UtilitiesSection() {
  return (
    <section className="section-utilities" id="utilities">
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <span className="num">02</span>
            <span className="label">COMPANION TOOLS</span>
          </div>
          <h2 style={{ maxWidth: '100%', margin: '0 auto 16px', fontWeight: 800 }}>
            Utilities & Instant Shortcuts
          </h2>
          <p className="sub" style={{ margin: '0 auto', maxWidth: '38em' }}>
            Utility controls live in a collapsible bar at the top of your mobile screen, keeping essential PC actions at your fingertips without switching modes.
          </p>
        </div>

        {/* Scrolling pill marquee */}
        <div className="pill-marquee-wrap" aria-label="Quick shortcut pills">
          <div className="pill-marquee-track">
            {/* First set */}
            {PILLS.map((pill, idx) => (
              <div key={`p1-${idx}`} className="pill-item">
                <span>{pill.label}</span>
                <span className="keycap">{pill.keycap}</span>
              </div>
            ))}
            {/* Duplicate set for seamless infinite loop */}
            {PILLS.map((pill, idx) => (
              <div key={`p2-${idx}`} className="pill-item" aria-hidden="true">
                <span>{pill.label}</span>
                <span className="keycap">{pill.keycap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Three glass cards */}
        <div className="cards-grid-3">
          {/* Card 1: Audio & Brightness */}
          <div className="glass-card utility-card">
            <div className="icon-tile" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            </div>
            <h3>PC Audio & Brightness</h3>
            <p className="card-intro">Directly adjust system parameters from your phone:</p>
            <ul className="card-bullets">
              <li>Volume Up, Volume Down, Volume Mute</li>
              <li>
                Brightness Up (+10%) and Brightness Down (-10%) via WMI (laptops) and DDC/CI (monitors)
              </li>
            </ul>
          </div>

          {/* Card 2: Windows Navigation */}
          <div className="glass-card utility-card">
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
                <strong>Task View</strong> <span className="keycap">Win+Tab</span> overview of virtual desktops & windows
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
          <div className="glass-card utility-card">
            <div className="icon-tile" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <line x1="6" y1="8" x2="6" y2="8" />
                <line x1="10" y1="8" x2="10" y2="8" />
                <line x1="14" y1="8" x2="14" y2="8" />
                <line x1="18" y1="8" x2="18" y2="8" />
                <line x1="6" y1="12" x2="6" y2="12" />
                <line x1="10" y1="12" x2="10" y2="12" />
                <line x1="14" y1="12" x2="14" y2="12" />
                <line x1="18" y1="12" x2="18" y2="12" />
                <line x1="8" y1="16" x2="16" y2="16" />
              </svg>
            </div>
            <h3>Soft Keyboard & Pairing</h3>
            <p className="card-intro">Quick text entry and connection maintenance:</p>
            <ul className="card-bullets">
              <li>Type full UTF-8 text strings directly into active PC fields</li>
              <li>
                Dedicated keys:{' '}
                <span className="keycap">Enter</span>{' '}
                <span className="keycap">Backspace</span>{' '}
                <span className="keycap">Space</span>{' '}
                <span className="keycap">Tab</span>{' '}
                <span className="keycap">Esc</span>
              </li>
              <li>Gesture cheatsheet popup for quick gesture reference</li>
              <li>QR code scanner and manual IP pairing inputs</li>
            </ul>
          </div>
        </div>

        {/* Centered phone showcase below cards */}
        <div style={{ marginTop: '56px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: '320px' }}>
            <ScreenshotFrame
              name="utilities-dock"
              alt="Pouse utility dock on phone screen showing quick controls"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
