'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface DownloadTabsProps {
  showScreenshots?: boolean;
  defaultTab?: 'windows' | 'android' | 'cli';
}

type CliTabKey = 'Install' | 'Update' | 'Uninstall' | '--help';

const CLI_COMMANDS: Record<CliTabKey, string[]> = {
  Install: ['npm install -g pouse-cli', 'pouse install'],
  Update: ['pouse update'],
  Uninstall: ['pouse uninstall'],
  '--help': ['pouse --help'],
};

export default function DownloadTabs({
  showScreenshots = false,
  defaultTab = 'windows',
}: DownloadTabsProps) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'windows' | 'android' | 'cli'>(defaultTab);

  // Read URL query parameter ?tab=cli if present
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'cli' || tabParam === 'android' || tabParam === 'windows') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // CLI tab interactive state
  const [cliSubTab, setCliSubTab] = useState<CliTabKey>('Install');
  const [cliLines, setCliLines] = useState<string[]>([]);
  const [cliCopied, setCliCopied] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(isReduced);

    if (activeTab !== 'cli') return;

    if (isReduced) {
      setCliLines(CLI_COMMANDS[cliSubTab]);
      return;
    }

    let isCancelled = false;
    let timerId: NodeJS.Timeout;

    setCliLines([]);

    const runTyping = async () => {
      await new Promise((resolve) => {
        timerId = setTimeout(resolve, 400);
      });
      if (isCancelled) return;

      const target = CLI_COMMANDS[cliSubTab];
      const cur: string[] = [];

      for (let lineIdx = 0; lineIdx < target.length; lineIdx++) {
        const fullLine = target[lineIdx];
        for (let charIdx = 0; charIdx <= fullLine.length; charIdx++) {
          if (isCancelled) return;
          setCliLines([...cur, fullLine.slice(0, charIdx)]);
          await new Promise((resolve) => {
            timerId = setTimeout(resolve, 42);
          });
        }
        cur.push(fullLine);
        if (lineIdx < target.length - 1) {
          await new Promise((resolve) => {
            timerId = setTimeout(resolve, 500);
          });
        }
      }
    };

    runTyping();

    return () => {
      isCancelled = true;
      clearTimeout(timerId);
    };
  }, [activeTab, cliSubTab]);

  const handleCliCopy = () => {
    const text = CLI_COMMANDS[cliSubTab].join('\n');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCliCopied(true);
    setTimeout(() => setCliCopied(false), 1600);
  };

  return (
    <div>
      {/* Tab Pills */}
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
        <button
          role="tab"
          aria-selected={activeTab === 'cli'}
          tabIndex={activeTab === 'cli' ? 0 : -1}
          onClick={() => setActiveTab('cli')}
          className={activeTab === 'cli' ? 'active-tab' : ''}
        >
          CLI
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
          <p>A signed APK you install directly, no Play Store involved.</p>
          <a
            className="btn pri"
            aria-disabled="true"
            href="#download"
            tabIndex={-1}
            style={{ opacity: 0.65, cursor: 'not-allowed' }}
          >
            Download link coming soon
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
            The public hosting spot for the APK is still being finalized. Source code and build instructions are open on GitHub.
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

      {/* CLI Panel */}
      <div
        className={`panel glass-card ${activeTab === 'cli' ? 'on' : ''}`}
        id="p-c"
        role="tabpanel"
        aria-labelledby="tab-cli"
        style={{ gridTemplateColumns: '1fr', gap: '28px' }}
      >
        <div>
          <h3>Pouse CLI</h3>
          <p style={{ maxWidth: '42em' }}>
            Install, update, or remove the Windows client from PowerShell or Command Prompt. It downloads the official release and automatically validates its SHA-256 checksum.
          </p>
        </div>

        {/* Primary Interactive Terminal Window with Typing Animation */}
        <div className="terminal-window" role="region" aria-label="Interactive CLI Terminal">
          <div className="terminal-titlebar">
            <div className="terminal-dots" aria-hidden="true">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="terminal-title">Windows Terminal (PowerShell / Command Prompt)</div>
            <button
              type="button"
              className="terminal-copy-btn"
              onClick={handleCliCopy}
              aria-label="Copy CLI commands"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>{cliCopied ? 'Copied ✓' : 'Copy'}</span>
            </button>
          </div>

          <div className="terminal-tabs" role="tablist">
            {(['Install', 'Update', 'Uninstall', '--help'] as CliTabKey[]).map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={cliSubTab === tab}
                className={`terminal-tab-btn ${cliSubTab === tab ? 'active' : ''}`}
                onClick={() => setCliSubTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="terminal-body" aria-live="polite">
            {cliLines.map((line, idx) => (
              <div key={idx} className="terminal-line">
                <span className="terminal-text">{line}</span>
                {idx === cliLines.length - 1 && (
                  <span className={`terminal-block-cursor ${reducedMotion ? 'static' : ''}`} aria-hidden="true" />
                )}
              </div>
            ))}
            {cliLines.length === 0 && (
              <div className="terminal-line">
                <span className={`terminal-block-cursor ${reducedMotion ? 'static' : ''}`} aria-hidden="true" />
              </div>
            )}
          </div>

          <div className="terminal-footer">
            <span className="terminal-req">Requirements: Windows 10/11 &bull; Node.js &gt;= 22</span>
            <span className="terminal-path">Default installer path: AppData\Local\Programs\Pouse</span>
          </div>
        </div>

        {/* Second Terminal: "Other commands" (Static) */}
        <div>
          <div className="eyebrow" style={{ marginBottom: '10px' }}>
            <span className="label" style={{ color: 'var(--mut)' }}>OTHER COMMANDS</span>
          </div>
          <div className="terminal-window" role="region" aria-label="Static CLI Maintenance Commands">
            <div className="terminal-titlebar">
              <div className="terminal-dots" aria-hidden="true">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="terminal-title">Windows Terminal (Maintenance)</div>
            </div>
            <div className="terminal-body" style={{ minHeight: 'auto', padding: '24px 28px' }}>
              <div className="terminal-line" style={{ color: 'var(--mut)', marginBottom: '8px' }}>
                # Check for and install updates
              </div>
              <div className="terminal-line">pouse update</div>
              <div className="terminal-line" style={{ color: 'var(--mut)', marginTop: '16px', marginBottom: '8px' }}>
                # Clean removal of Windows desktop client
              </div>
              <div className="terminal-line">pouse uninstall</div>
            </div>
          </div>
        </div>

        {/* Published on npm badge */}
        <div>
          <a
            href="https://www.npmjs.com/package/pouse-cli"
            target="_blank"
            rel="noopener noreferrer"
            className="npm-pill-badge"
            aria-label="View pouse-cli package on npm"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect width="16" height="16" rx="3" fill="#CB3837" />
              <path d="M3 3H13V13H8V5.5H5.5V13H3V3Z" fill="white" />
            </svg>
            <span>Published on npm &bull; pouse-cli</span>
          </a>
        </div>
      </div>
    </div>
  );
}
