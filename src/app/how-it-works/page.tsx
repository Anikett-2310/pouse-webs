import type { Metadata } from 'next';
import ConnectionRibbon from '@/components/ConnectionRibbon';
import ConnectSteps from '@/components/ConnectSteps';

export const metadata: Metadata = {
  title: 'How It Works — Pouse',
  description:
    'Discover how Pouse connects your Android phone and Windows PC over Wi-Fi or Bluetooth with zero input collisions.',
};

export default function HowItWorksPage() {
  return (
    <div>
      <section style={{ paddingTop: 'clamp(48px, 8vw, 90px)' }}>
        <div className="wrap">
          <h2>Pair once. It remembers.</h2>
          <p className="sub">
            Pouse supports two completely independent transport pathways. The PC client arbitrates input ownership so commands never collide.
          </p>

          <ConnectionRibbon />

          <div style={{ marginTop: '40px' }}>
            <ConnectSteps showScreenshots />
          </div>

          <div style={{ marginTop: '80px', borderTop: '1px solid var(--line)', paddingTop: '60px' }}>
            <h2>Under the hood.</h2>
            <p className="sub">
              A single unified JSON protocol bridges native Android event capture and the Windows OS input engine.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', maxWidth: '960px' }}>
              <div>
                <h3 className="f0" style={{ fontSize: '28px', margin: '0 0 12px', color: '#22d3ee' }}>
                  Wi-Fi WebSocket transport
                </h3>
                <p style={{ color: 'var(--mut)', margin: '0 0 12px', fontSize: '15px' }}>
                  The PC client runs an asynchronous WebSocket server on port 8081 backed by Tokio and Tungstenite.
                </p>
                <p style={{ color: 'var(--mut)', margin: 0, fontSize: '15px' }}>
                  Sockets are configured with TCP_NODELAY to bypass Nagle&apos;s algorithm, delivering microtask-coalesced pointer packets with instant responsiveness. Wi-Fi also handles the high-bandwidth video feed for Remote Screen mode.
                </p>
              </div>

              <div>
                <h3 className="f0" style={{ fontSize: '28px', margin: '0 0 12px', color: '#f0abfc' }}>
                  Bluetooth RFCOMM transport
                </h3>
                <p style={{ color: 'var(--mut)', margin: '0 0 12px', fontSize: '15px' }}>
                  Works completely offline with zero local network required. Operates over standard RFCOMM with fixed UUID <code style={{ color: '#c4f1d6', fontSize: '13px' }}>7f9b841a-3e2c-4a90-8b1b-5e6f8a9c0d1e</code>.
                </p>
                <p style={{ color: 'var(--mut)', margin: 0, fontSize: '15px' }}>
                  A custom buffered reader on Windows avoids per-byte Windows Runtime overhead, reducing event latency to under 1 millisecond.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '60px', padding: '32px', borderRadius: '24px', background: 'rgba(18, 12, 36, 0.6)', border: '1px solid var(--line)', maxWidth: '960px' }}>
              <h3 className="f0" style={{ fontSize: '30px', margin: '0 0 12px' }}>
                InputOwner: Collision-free arbitration
              </h3>
              <p style={{ color: 'var(--mut)', margin: '0 0 12px', fontSize: '15px' }}>
                What happens if both Wi-Fi and Bluetooth are connected simultaneously? The PC client runs a thread-safe <code style={{ color: '#c4f1d6' }}>InputOwner</code> singleton.
              </p>
              <p style={{ color: 'var(--mut)', margin: 0, fontSize: '15px' }}>
                Only one transport can hold active ownership. If transport switches, any held keys or drag buttons are automatically released first to prevent stuck inputs. A connected Bluetooth socket does not seize input until the user confirms trust and sends an authorized event.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
