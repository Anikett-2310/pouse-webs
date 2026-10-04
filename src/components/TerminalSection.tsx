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

export default function TerminalSection() {
  const [activeTab, setActiveTab] = useState<TabKey>('Install');
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to start typing 0.4s after scrolling into view
  useEffect(() => {
    const el = terminalRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasScrolledIntoView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
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
      // Not yet in view, show empty
      setDisplayedLines([]);
      return;
    }

    let isCancelled = false;
    let timerId: NodeJS.Timeout;

    setDisplayedLines([]);
    setIsTyping(true);

    const runTyping = async () => {
      // Initial 0.4s wait when starting
      await new Promise((resolve) => {
        timerId = setTimeout(resolve, 400);
      });
      if (isCancelled) return;

      const currentLines: string[] = [];

      for (let lineIdx = 0; lineIdx < targetLines.length; lineIdx++) {
        const fullLine = targetLines[lineIdx];
        let currentText = '';

        for (let charIdx = 0; charIdx <= fullLine.length; charIdx++) {
          if (isCancelled) return;
          currentText = fullLine.slice(0, charIdx);
          const update = [...currentLines, currentText];
          setDisplayedLines(update);

          await new Promise((resolve) => {
            timerId = setTimeout(resolve, 42);
          });
        }

        currentLines.push(fullLine);

        // Pause 0.5s between lines if there is another line
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

  return (
    <section className="section-terminal" id="terminal">
      <div className="wrap">
        <div className="terminal-grid">
          {/* Left Column */}
          <div className="terminal-left">
            <div className="eyebrow">
              <span className="num">05</span>
              <span className="label">DEVELOPER TOOL</span>
            </div>
            <h2 style={{ fontWeight: 800, margin: '0 0 20px', lineHeight: 1.1 }}>
              Prefer the terminal?
            </h2>
            <p className="terminal-desc">
              Install and manage the Pouse Windows client directly using the official{' '}
              <code className="inline-code">pouse-cli</code> tool published on npm. It downloads the official release, verifies its companion SHA-256 checksum automatically, and launches the setup.
            </p>
            <div style={{ marginTop: '32px' }}>
              <Link className="btn" href="/download">
                Read CLI Documentation &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column: Terminal Window */}
          <div className="terminal-right" ref={terminalRef}>
            <div className="terminal-window">
              {/* Title Bar */}
              <div className="terminal-header">
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
                  aria-label="Copy terminal commands"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Tab Row */}
              <div className="terminal-tabs" role="tablist">
                {(['Install', 'Update', 'Uninstall', '--help'] as TabKey[]).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      role="tab"
                      aria-selected={isActive}
                      className={`terminal-tab ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Terminal Body */}
              <div className="terminal-body" aria-live="polite">
                {displayedLines.map((line, idx) => {
                  const isLastLine = idx === displayedLines.length - 1;
                  return (
                    <div key={idx} className="terminal-line">
                      <span>{line}</span>
                      {isLastLine && (
                        <span className="block-cursor" aria-hidden="true" />
                      )}
                    </div>
                  );
                })}
                {displayedLines.length === 0 && (
                  <div className="terminal-line">
                    <span className="block-cursor" aria-hidden="true" />
                  </div>
                )}
              </div>

              {/* Footer Strip */}
              <div className="terminal-footer">
                <span className="footer-req">
                  Requirements: Windows 10/11 &bull; Node.js &gt;= 22
                </span>
                <span className="footer-path">
                  Default installer path: AppData\Local\Programs\Pouse
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
