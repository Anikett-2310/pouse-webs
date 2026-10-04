'use client';

import { useState } from 'react';

interface DownloadTabsProps {
  showScreenshots?: boolean;
  defaultTab?: 'windows' | 'android';
}

export default function DownloadTabs({
  showScreenshots = false,
  defaultTab = 'windows',
}: DownloadTabsProps) {
  const [activeTab, setActiveTab] = useState<'windows' | 'android'>(defaultTab);

  return (
    <div>
      {/* Tab Pills: Only Windows and Android */}
      <div className="tabs" role="tablist" aria-label="Operating system platforms">
        <button
          role="tab"
          aria-selected={activeTab === 'windows'}
          tabIndex={activeTab === 'windows' ? 0 : -1}
          onClick={() => setActiveTab('windows')}
          className={activeTab === 'windows' ? 'active-tab' : ''}
        >
          Windows
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'android'}
          tabIndex={activeTab === 'android' ? 0 : -1}
          onClick={() => setActiveTab('android')}
          className={activeTab === 'android' ? 'active-tab' : ''}
        >
          Android
        </button>
      </div>

      {/* Windows Panel */}
      <div
        className={`panel glass-card ${activeTab === 'windows' ? 'on' : ''}`}
        id="p-w"
        role="tabpanel"
        aria-labelledby="tab-windows"
      >
        <div>
          <h3>Pouse for Windows</h3>
          <p>
            Pouse-Setup-v1.0.0.exe, straight from the GitHub release, with an official companion SHA-256 checksum published alongside.
          </p>

          <a
            className="btn pri download-btn-with-icon"
            href="https://github.com/Anikett-2310/Pouse/releases/tag/v1.0.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginRight: '8px' }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download from GitHub</span>
          </a>

          {/* SmartScreen Caution Glass Card */}
          <div className="smartscreen-card">
            <div className="smartscreen-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div>
              <h4 className="smartscreen-title">Notice regarding Windows SmartScreen</h4>
              <p className="smartscreen-text">
                The v1.0.0 installer is built from open-source code and currently unsigned with a paid commercial Authenticode certificate. SmartScreen may display an unrecognized app dialog on launch. Click &ldquo;More info&rdquo; and verify the companion SHA-256 hash before running.
              </p>
            </div>
          </div>

          {showScreenshots && (
            <div style={{ marginTop: '32px' }}>
              <div className="screenshot-eyebrow-label">SYSTEM TRAY CONTEXT MENU</div>
              <div className="mac-window-frame">
                <div className="mac-window-titlebar">
                  <div className="mac-window-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>
                  <span className="mac-window-title">pc-tray-menu.webp</span>
                </div>
                <div className="mac-window-body">
                  <img
                    src="/media/pc-tray-menu.webp"
                    alt="Pouse PC client Windows system tray icon and menu"
                    width={550}
                    height={689}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <p style={{ fontSize: '15.5px', color: 'var(--mut)' }}>
            Requires Windows 10 (version 1809+) or Windows 11. Installs silently to <code className="cli-code-inline">AppData\Local\Programs\Pouse</code> and automatically configures loopback firewall permissions.
          </p>

          {showScreenshots && (
            <div style={{ marginTop: '32px' }}>
              <div className="screenshot-eyebrow-label">WINDOWS CLIENT PREFERENCES</div>
              <div className="mac-window-frame">
                <div className="mac-window-titlebar">
                  <div className="mac-window-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>
                  <span className="mac-window-title">pc-preferences.webp</span>
                </div>
                <div className="mac-window-body">
                  <img
                    src="/media/pc-preferences.webp"
                    alt="Pouse Windows client preferences dialog"
                    width={960}
                    height={650}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Android Panel */}
      <div
        className={`panel glass-card ${activeTab === 'android' ? 'on' : ''}`}
        id="p-a"
        role="tabpanel"
        aria-labelledby="tab-android"
      >
        <div>
          <h3>Pouse for Android</h3>
          <p>Download the official signed APK release directly from GitHub.</p>
          <a
            className="btn pri download-btn-with-icon"
            href="https://github.com/Anikett-2310/Pouse/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginRight: '8px' }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download for Android</span>
          </a>

          {showScreenshots && (
            <div style={{ marginTop: '32px' }}>
              <div className="screenshot-eyebrow-label">INSTANT QR PAIRING</div>
              <div className="phone-frame" style={{ maxWidth: '280px', margin: '0' }}>
                <img
                  src="/media/connect-qr.webp"
                  alt="Pouse Android application QR code connection screen"
                  width={540}
                  height={928}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <p>Package name <code className="cli-code-inline">com.pouse.app</code>.</p>
          <p className="note">
            Download includes the signed APK. Verify via the GitHub release page.
          </p>

          {showScreenshots && (
            <div style={{ marginTop: '32px' }}>
              <div className="screenshot-eyebrow-label">ANDROID COMPANION APP</div>
              <div className="phone-frame" style={{ maxWidth: '280px', margin: '0' }}>
                <img
                  src="/media/hero-phone.webp"
                  alt="Pouse mobile interface on Android phone"
                  width={540}
                  height={928}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
