import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <Link className="brand" href="/">
            <img
              src="/assets/pouse-logo.png"
              alt="Pouse logo"
              width={30}
              height={30}
            />
            Pouse
          </Link>
          <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', fontSize: '14.5px' }}>
            <Link href="/features" style={{ color: 'var(--mut)' }}>Modes</Link>
            <Link href="/how-it-works" style={{ color: 'var(--mut)' }}>How it works</Link>
            <Link href="/download" style={{ color: 'var(--mut)' }}>Download</Link>
            <Link href="/security" style={{ color: 'var(--mut)' }}>Security</Link>
            <Link href="/faq" style={{ color: 'var(--mut)' }}>FAQ</Link>
            <Link href="/troubleshooting" style={{ color: 'var(--mut)' }}>Troubleshooting</Link>
            <Link href="/about" style={{ color: 'var(--mut)' }}>About</Link>
            <Link href="/updates" style={{ color: 'var(--mut)' }}>Updates</Link>
          </div>
        </div>
        <div className="credit">
          <span>Made by Aniket. Open source on <a href="https://github.com/Anikett-2310/Pouse" target="_blank" rel="noopener noreferrer">GitHub</a>.</span>
        </div>
      </div>
    </footer>
  );
}
