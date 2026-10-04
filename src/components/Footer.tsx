import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Faint violet glow behind the footer area */}
      <div className="footer-glow" aria-hidden="true" />

      <div className="wrap">
        {/* Three columns */}
        <div className="footer-three-cols">
          {/* Column 1: Product */}
          <div className="footer-col reveal" style={{ transitionDelay: '0s' }}>
            <h4 className="footer-col-heading">PRODUCT</h4>
            <ul className="footer-links">
              <li>
                <Link href="/features">All 5 Input Modes</Link>
              </li>
              <li>
                <Link href="/how-it-works">How It Works</Link>
              </li>
              <li>
                <Link href="/security">Security &amp; Privacy</Link>
              </li>
              <li>
                <Link href="/download?tab=cli">CLI Tool (pouse-cli)</Link>
              </li>
              <li>
                <Link href="/faq">Frequently Asked Questions</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Downloads */}
          <div className="footer-col reveal" style={{ transitionDelay: '0.1s' }}>
            <h4 className="footer-col-heading">DOWNLOADS</h4>
            <ul className="footer-links">
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
                <span className="footer-dim-item">Android Mobile App (coming soon)</span>
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

          {/* Column 3: Repository */}
          <div className="footer-col reveal" style={{ transitionDelay: '0.2s' }}>
            <h4 className="footer-col-heading">REPOSITORY</h4>
            <ul className="footer-links">
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
                  href="https://github.com/Anikett-2310/Pouse"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  License: TBD
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Centered zero telemetry note */}
        <div className="footer-telemetry-strip reveal" style={{ transitionDelay: '0.25s' }}>
          <p className="footer-telemetry-text">
            This website and the CLI collect zero telemetry and run no tracking scripts.
          </p>
        </div>

        {/* Bottom copyright line with author link on the right */}
        <div className="footer-bottom-bar reveal" style={{ transitionDelay: '0.3s' }}>
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
