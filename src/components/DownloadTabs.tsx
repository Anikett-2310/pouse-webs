'use client';

import { useState } from 'react';
import ScreenshotFrame from './ScreenshotFrame';

interface DownloadTabsProps {
  showScreenshots?: boolean;
}

export default function DownloadTabs({ showScreenshots = false }: DownloadTabsProps) {
  const [activeTab, setActiveTab] = useState<'windows' | 'android' | 'cli'>('windows');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = 'npm install -g pouse-cli\npouse install';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Operating system platforms">
        <button
          role="tab"
          aria-selected={activeTab === 'windows'}
          tabIndex={activeTab === 'windows' ? 0 : -1}
          onClick={() => setActiveTab('windows')}
        >
          Windows
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'android'}
          tabIndex={activeTab === 'android' ? 0 : -1}
          onClick={() => setActiveTab('android')}
        >
          Android
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'cli'}
          tabIndex={activeTab === 'cli' ? 0 : -1}
          onClick={() => setActiveTab('cli')}
        >
          CLI
        </button>
      </div>

      {/* Windows Panel */}
      <div
        className={`panel ${activeTab === 'windows' ? 'on' : ''}`}
        id="p-w"
        role="tabpanel"
        aria-labelledby="tab-windows"
      >
        <div>
          <h3>Pouse for Windows</h3>
          <p>
            Pouse-Setup-v1.0.0.exe, straight from the GitHub release, with a SHA-256 file next to it.
          </p>
          <a
            className="btn pri"
            href="https://github.com/Anikett-2310/Pouse/releases/tag/v1.0.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download from GitHub
          </a>

          {showScreenshots && (
            <div style={{ marginTop: '28px' }}>
              <p style={{ color: 'var(--mut)', fontSize: '14.5px', marginBottom: '10px' }}>
                System tray context menu:
              </p>
              <ScreenshotFrame
                name="pc-tray-menu"
                alt="Pouse PC client Windows system tray icon and menu"
                isLandscape
              />
            </div>
          )}
        </div>

        <div>
          <p>Windows 10 or 11.</p>
          <p className="note">
            The installer isn&apos;t signed with a production certificate yet, so SmartScreen may warn you. Check the SHA-256 file before you run it.
          </p>

          {showScreenshots && (
            <div style={{ marginTop: '28px' }}>
              <p style={{ color: 'var(--mut)', fontSize: '14.5px', marginBottom: '10px' }}>
                Windows client preferences:
              </p>
              <ScreenshotFrame
                name="pc-preferences"
                alt="Pouse Windows client preferences dialog"
                isLandscape
              />
            </div>
          )}
        </div>
      </div>

      {/* Android Panel */}
      <div
        className={`panel ${activeTab === 'android' ? 'on' : ''}`}
        id="p-a"
        role="tabpanel"
        aria-labelledby="tab-android"
      >
        <div>
          <h3>Pouse for Android</h3>
          <p>A signed APK you install directly, no Play Store involved.</p>
          <a
            className="btn pri"
            aria-disabled="true"
            href="#download"
            tabIndex={-1}
          >
            Download link coming soon
          </a>

          {showScreenshots && (
            <div style={{ marginTop: '28px' }}>
              <p style={{ color: 'var(--mut)', fontSize: '14.5px', marginBottom: '10px' }}>
                Instant QR pairing:
              </p>
              <ScreenshotFrame
                name="connect-qr"
                alt="Pouse Android application QR code connection screen"
              />
            </div>
          )}
        </div>

        <div>
          <p>Package name com.pouse.app.</p>
          <p className="note">
            The public hosting spot for the APK is still being set up.
          </p>

          {showScreenshots && (
            <div style={{ marginTop: '28px' }}>
              <p style={{ color: 'var(--mut)', fontSize: '14.5px', marginBottom: '10px' }}>
                Android companion app:
              </p>
              <ScreenshotFrame
                name="hero-phone"
                alt="Pouse mobile interface on Android phone"
              />
            </div>
          )}
        </div>
      </div>

      {/* CLI Panel */}
      <div
        className={`panel ${activeTab === 'cli' ? 'on' : ''}`}
        id="p-c"
        role="tabpanel"
        aria-labelledby="tab-cli"
      >
        <div>
          <h3>Pouse CLI</h3>
          <p>
            Install, update or remove the Windows client from a terminal. It verifies the checksum by default.
          </p>
          <a
            className="btn"
            href="https://www.npmjs.com/package/pouse-cli"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on npm
          </a>
        </div>

        <pre id="cmd">
          <button
            type="button"
            className="copy"
            id="copy"
            onClick={handleCopy}
            aria-label="Copy CLI commands"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
          npm install -g pouse-cli{'\n'}
          pouse install{'\n'}
          <i># later</i>{'\n'}
          pouse update{'\n'}
          pouse uninstall
        </pre>
      </div>
    </div>
  );
}
