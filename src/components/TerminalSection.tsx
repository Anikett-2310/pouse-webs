'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type TabKey = 'Install' | 'Update' | 'Uninstall' | '--help';

const TAB_COMMANDS: Record<TabKey, string[]> = {
  Install: ['npm install -g pouse-cli', 'pouse install'],
  Update: ['pouse update'],
  Uninstall: ['pouse uninstall'],
  '--help': ['pouse --help'],
};

interface TerminalSectionProps {
  showSecondary?: boolean;
}

export default function TerminalSection({ showSecondary = false }: TerminalSectionProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('Install');
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Check reduced motion & observe viewport entrance
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(isReduced);

    if (isReduced) {
      setHasScrolledIntoView(true);
      setDisplayedLines(TAB_COMMANDS[activeTab]);
      return;
    }

    const el = terminalRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasScrolledIntoView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Typing effect on activeTab change or on scroll into view
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targetLines = TAB_COMMANDS[activeTab];

    if (isReduced) {
      setDisplayedLines(targetLines);
      setIsTyping(false);
      return;
    }

    if (!hasScrolledIntoView) {
      setDisplayedLines([]);
      return;
    }

    let isCancelled = false;
    let timerId: NodeJS.Timeout;

    // Clear body instantly on tab change
    setDisplayedLines([]);
    setIsTyping(true);

    const runTyping = async () => {
      // Wait 400ms when starting
      await new Promise((resolve) => {
        timerId = setTimeout(resolve, 400);
      });
      if (isCancelled) return;

      const currentLines: string[] = [];

      for (let lineIdx = 0; lineIdx < targetLines.length; lineIdx++) {
        const fullLine = targetLines[lineIdx];

        for (let charIdx = 0; charIdx <= fullLine.length; charIdx++) {
          if (isCancelled) return;
          const currentText = fullLine.slice(0, charIdx);
          setDisplayedLines([...currentLines, currentText]);

          await new Promise((resolve) => {
            timerId = setTimeout(resolve, 42);
          });
        }

        currentLines.push(fullLine);

        // Pause 500ms between lines
        if (lineIdx < targetLines.length - 1) {
          await new Promise((resolve) => {
            timerId = setTimeout(resolve, 500);
          });
        }
      }

      if (!isCancelled) {
        setIsTyping(false);
      }
    };

    runTyping();

    return () => {
      isCancelled = true;
      clearTimeout(timerId);
    };
  }, [activeTab, hasScrolledIntoView]);

  const handleCopy = () => {
    const text = TAB_COMMANDS[activeTab].join('\n');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const handleTabClick = (tab: TabKey) => {
    if (activeTab === tab) return;
    setActiveTab(tab);
  };

  return (
    <section className="section-terminal" id="cli">
      <div className="wrap">
        <div className="terminal-section-grid">
          {/* Left Column */}
          <div className="terminal-left-col">
            <div className="eyebrow">
              <span className="num">05</span>
              <span className="label">DEVELOPER TOOL</span>
            </div>
            <h2 className="reveal" style={{ maxWidth: '14em', margin: '0 0 18px', fontWeight: 800 }}>
              Prefer the terminal?
            </h2>
            <p className="terminal-desc">
              Install and manage the Pouse Windows client directly using the official{' '}
              <code className="cli-code-inline">pouse-cli</code> tool published on npm. It downloads the
              official release, verifies its companion SHA-256 checksum automatically, and launches the
              setup.
            </p>
            <div style={{ marginTop: '28px' }}>
              <Link className="btn btn-terminal-doc" href="/download?tab=cli">
                Read CLI Documentation &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column: Terminal Window */}
          <div className="terminal-right-col" ref={terminalRef}>
            <div className="terminal-window reveal" role="region" aria-label="Interactive CLI Terminal Simulator">
              {/* Window Title Bar */}
              <div className="terminal-titlebar">
                <div className="terminal-dots" aria-hidden="true">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <div className="terminal-title">
                  Windows Terminal (PowerShell / Command Prompt)
                </div>
                <button
                  type="button"
                  className="terminal-copy-btn"
                  onClick={handleCopy}
                  aria-label="Copy terminal commands to clipboard"
                >
                  {copied ? 'Copied ✓' : 'Copy'}
                </button>
              </div>

              {/* Tab Row */}
              <div className="terminal-tabs" role="tablist" aria-label="Terminal command modes">
                {(['Install', 'Update', 'Uninstall', '--help'] as TabKey[]).map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    className={`terminal-tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => handleTabClick(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Body with Animated Typing */}
              <div className="terminal-body" aria-live="polite">
                {displayedLines.map((line, idx) => (
                  <div key={idx} className="terminal-line">
                    <span className="terminal-text">{line}</span>
                    {idx === displayedLines.length - 1 && (
                      <span className={`terminal-block-cursor ${reducedMotion ? 'static' : ''}`} aria-hidden="true" />
                    )}
                  </div>
                ))}
                {displayedLines.length === 0 && (
                  <div className="terminal-line">
                    <span className={`terminal-block-cursor ${reducedMotion ? 'static' : ''}`} aria-hidden="true" />
                  </div>
                )}
              </div>

              {/* Footer Strip */}
              <div className="terminal-footer">
                <span className="terminal-req">Windows 10/11 · Node.js required</span>
                <span className="terminal-path">AppData\Local\Programs\Pouse</span>
              </div>
            </div>

            {/* Optional second terminal for CLI page: "Other commands" */}
            {showSecondary && (
              <div style={{ marginTop: '36px' }}>
                <div className="eyebrow" style={{ marginBottom: '10px' }}>
                  <span className="label" style={{ color: 'var(--mut)' }}>OTHER COMMANDS</span>
                </div>
                <div className="terminal-window reveal" role="region" aria-label="Static CLI Reference Commands">
                  <div className="terminal-titlebar">
                    <div className="terminal-dots" aria-hidden="true">
                      <span className="dot dot-red" />
                      <span className="dot dot-yellow" />
                      <span className="dot dot-green" />
                    </div>
                    <div className="terminal-title">Windows Terminal (Update &amp; Removal)</div>
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

                {/* Published on npm badge */}
                <div style={{ marginTop: '20px' }}>
                  <a
                    href="https://www.npmjs.com/package/pouse-cli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="npm-pill-badge"
                    aria-label="View pouse-cli package on npm registry"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <rect width="16" height="16" rx="3" fill="#CB3837" />
                      <path d="M3 3H13V13H8V5.5H5.5V13H3V3Z" fill="white" />
                    </svg>
                    <span>Published on npm &bull; pouse-cli</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
