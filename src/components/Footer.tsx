import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top-grid">
          {/* Brand info column */}
          <div className="footer-brand-col">
            <Link className="brand" href="/" style={{ marginBottom: '14px', display: 'inline-flex' }}>
              <img
                src="/assets/pouse-logo.png"
                alt="Pouse logo"
                width={30}
                height={30}
              />
              <span>Pouse</span>
              <span className="version-pill">v1.0.0</span>
            </Link>
            <p className="footer-desc">
              Pocket Mouse platform converting an Android phone into a multi-mode wireless input device for Windows 10/11.
            </p>
            <p className="footer-telemetry-note">
              This website and the CLI collect zero telemetry and run no tracking scripts.
            </p>
          </div>

          {/* Product links */}
          <div className="footer-col">
            <h4>PRODUCT</h4>
            <ul>
              <li>
                <Link href="/features">All 5 Input Modes</Link>
              </li>
              <li>
                <Link href="/how-it-works">How It Works</Link>
              </li>
              <li>
                <Link href="/security">Security & Privacy</Link>
              </li>
              <li>
                <Link href="/download">CLI Tool (pouse-cli)</Link>
              </li>
              <li>
                <Link href="/faq">Frequently Asked Questions</Link>
              </li>
            </ul>
          </div>

          {/* Downloads links */}
          <div className="footer-col">
            <h4>DOWNLOADS</h4>
            <ul>
              <li>
                <Link href="/download">Download Center</Link>
              </li>
              <li>
                <a
                  href="https://github.com/Anikett-2310/Pouse/releases/tag/v1.0.0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Windows Desktop Client
                </a>
              </li>
              <li>
                <span style={{ color: 'var(--dim)' }}>Android Mobile App (soon)</span>
              </li>
              <li>
                <a
                  href="https://github.com/Anikett-2310/Pouse/releases/tag/v1.0.0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Release v1.0.0
                </a>
              </li>
            </ul>
          </div>

          {/* Repository links */}
          <div className="footer-col">
            <h4>REPOSITORY</h4>
            <ul>
              <li>
                <a
                  href="https://github.com/Anikett-2310/Pouse"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source code on GitHub &nearr;
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Anikett-2310/Pouse/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Issue Tracker &nearr;
                </a>
              </li>
              <li>
                <Link href="/security">Privacy Policy</Link>
              </li>
              <li>
                <a
                  href="https://github.com/Anikett-2310/Pouse/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  License: MIT
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; 2026 Pouse. Windows is a trademark of Microsoft Corporation. Android is a trademark of Google LLC.
          </p>
          <a
            className="author-link"
            href="https://github.com/Anikett-2310/Pouse"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anikett-2310/Pouse
          </a>
        </div>
      </div>
    </footer>
  );
}
