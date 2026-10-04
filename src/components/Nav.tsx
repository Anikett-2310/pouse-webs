'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <div className="wrap">
        <Link className="brand" href="/">
          <img
            src="/assets/pouse-logo.png"
            alt="Pouse logo"
            width={30}
            height={30}
          />
          Pouse
        </Link>
        <div className="links">
          <Link
            href="/features"
            className={pathname === '/features' ? 'active' : ''}
          >
            Modes
          </Link>
          <Link
            href="/how-it-works"
            className={pathname === '/how-it-works' ? 'active' : ''}
          >
            Connect
          </Link>
          <Link
            href="/download"
            className={pathname === '/download' ? 'active' : ''}
          >
            Download
          </Link>
          <Link
            href="/security"
            className={pathname === '/security' ? 'active' : ''}
          >
            Security
          </Link>
          <Link
            href="/faq"
            className={pathname === '/faq' ? 'active' : ''}
          >
            FAQ
          </Link>
        </div>
        <Link className="btn pri" href="/download">
          Download
        </Link>
      </div>
    </nav>
  );
}
