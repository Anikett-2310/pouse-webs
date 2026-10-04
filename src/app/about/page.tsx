import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Pouse',
  description:
    'The story, vision, and philosophy behind Pouse. Turning the phone in your pocket into an evolving input companion.',
};

export default function AboutPage() {
  return (
    <div>
      <section style={{ paddingTop: 'clamp(48px, 8vw, 90px)' }}>
        <div className="wrap">
          <h2>The story of Pouse.</h2>
          <p className="sub">
            Why we built a multi-modal wireless input platform instead of another basic trackpad app.
          </p>

          <div style={{ maxWidth: '840px', marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
            <p className="f0" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1.25, color: '#f6f2ff', margin: 0 }}>
              &ldquo;I need a mouse, but I don&apos;t have one with me.&rdquo;
            </p>

            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '32px' }}>
              <h3 style={{ font: "800 24px/1.2 var(--font-bricolage), 'Bricolage Grotesque', sans-serif", letterSpacing: '-0.02em', margin: '0 0 16px' }}>
                The device already in your pocket
              </h3>
              <p style={{ color: 'var(--mut)', lineHeight: 1.7, margin: '0 0 16px' }}>
                Everyone has been stuck without a mouse: sitting in a coffee shop with a dying trackpad, presenting slides in a conference room without a clicker, or lying on a couch with a PC hooked up to a TV. Yet every one of us always carries a high-performance computer with a multi-touch display, high-frequency inertial sensors, high-definition cameras, and wireless radios right in our pocket.
              </p>
              <p style={{ color: 'var(--mut)', lineHeight: 1.7, margin: 0 }}>
                Pouse was founded on a simple question: how far can we push this existing device to replace dedicated desktop peripherals?
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '32px' }}>
              <p className="f0" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', lineHeight: 1.3, color: '#f0abfc', margin: '0 0 20px' }}>
                Progressive exploration across every input dimension.
              </p>
              <p style={{ color: 'var(--mut)', lineHeight: 1.7, margin: '0 0 16px' }}>
                Most trackpad apps stop at basic finger dragging. Pouse is designed from the protocol up as an exploration platform for multiple input technologies: capacitive multi-touch, inertial motion tracking with gyroscopes, contactless computer vision via MediaPipe hand landmark detection, virtual gamepads, and full-resolution GPU desktop mirroring.
              </p>
              <p style={{ color: 'var(--mut)', lineHeight: 1.7, margin: 0 }}>
                Every single mode transmits structured JSON events over the exact same Pouse protocol. As new sensory interaction modes are introduced on mobile, the core Windows client requires zero changes.
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '32px' }}>
              <h3 style={{ font: "800 24px/1.2 var(--font-bricolage), 'Bricolage Grotesque', sans-serif", letterSpacing: '-0.02em', margin: '0 0 16px' }}>
                Engineered with Rust and modern native toolchains
              </h3>
              <p style={{ color: 'var(--mut)', lineHeight: 1.7, margin: '0 0 16px' }}>
                Mouse pointers must feel instantaneous. Input lag of even 30 milliseconds makes a computer feel broken. That is why the Pouse Windows client was built natively from scratch in Rust, utilizing Tokio for high-concurrency event loops, Win32 SendInput APIs for sub-millisecond input injection, and direct DirectX / Media Foundation GPU acceleration for low-latency H.264 video.
              </p>
              <p style={{ color: 'var(--mut)', lineHeight: 1.7, margin: 0 }}>
                The mobile companion pairs Flutter with specialized Kotlin bridges to access hardware-level RFCOMM Bluetooth sockets, MediaCodec decoders, and camera frames with zero intermediary bloat.
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '32px' }}>
              <h3 style={{ font: "800 24px/1.2 var(--font-bricolage), 'Bricolage Grotesque', sans-serif", letterSpacing: '-0.02em', margin: '0 0 16px' }}>
                Open source and community driven
              </h3>
              <p style={{ color: 'var(--mut)', lineHeight: 1.7, margin: '0 0 16px' }}>
                Pouse is created and maintained by Aniket. The code is completely open source under transparent licensing, free from subscriptions, accounts, and advertisements.
              </p>
              <p style={{ color: 'var(--mut)', lineHeight: 1.7, margin: 0 }}>
                You can review every line of code, inspect protocol schemas, or contribute to upcoming features on{' '}
                <a
                  href="https://github.com/Anikett-2310/Pouse"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#e879f9', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  GitHub
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
