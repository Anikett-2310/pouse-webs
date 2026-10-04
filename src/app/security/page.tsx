import type { Metadata } from 'next';
import SecuritySay from '@/components/SecuritySay';

export const metadata: Metadata = {
  title: 'Security & Privacy — Pouse',
  description:
    'Read about the three-layer security model of Pouse, zero telemetry pledge, cryptographic pairing, and Trust-On-First-Use authorization.',
};

export default function SecurityPage() {
  return (
    <div>
      <section style={{ paddingTop: 'clamp(48px, 8vw, 90px)' }}>
        <div className="wrap">
          <h2>Private by design.</h2>
          <p className="sub">Scroll slowly. Three promises, in plain words.</p>

          <SecuritySay />

          <div style={{ marginTop: '90px', borderTop: '1px solid var(--line)', paddingTop: '60px', maxWidth: '840px' }}>
            <h2 className="reveal">The three-layer security model.</h2>
            <p className="sub">
              Your computer controls your mouse and keyboard. We treat that privilege with defense-in-depth protection.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginTop: '36px' }}>
              <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '36px' }}>
                <h3 className="f0" style={{ fontSize: '32px', margin: '0 0 12px' }}>
                  Layer 1: OS-level Bluetooth pairing
                </h3>
                <p style={{ color: 'var(--mut)', margin: '0 0 12px', fontSize: '15px' }}>
                  Standard Windows and Android Bluetooth BR/EDR pairing with passkey verification is enforced by the operating system before any RFCOMM connection can be established.
                </p>
                <p style={{ color: 'var(--mut)', margin: 0, fontSize: '15px' }}>
                  Unpaired, rogue Bluetooth devices are rejected at the radio level before they can even initiate a socket handshake.
                </p>
              </div>

              <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '36px' }}>
                <h3 className="f0" style={{ fontSize: '32px', margin: '0 0 12px' }}>
                  Layer 2: Trust-On-First-Use (TOFU) authorization
                </h3>
                <p style={{ color: 'var(--mut)', margin: '0 0 12px', fontSize: '15px' }}>
                  Hardware pairing proves two devices know each other, but not that an app should have mouse control. On the Android side, Pouse gates all event transmission behind an explicit Trust-On-First-Use prompt.
                </p>
                <p style={{ color: 'var(--mut)', margin: 0, fontSize: '15px' }}>
                  When connecting to a PC for the first time, you must explicitly approve the connection. The trust record is bound to the PC&apos;s unique Classic Bluetooth hardware MAC (BD_ADDR). You can revoke trust at any time by tapping Forget Device.
                </p>
              </div>

              <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '36px' }}>
                <h3 className="f0" style={{ fontSize: '32px', margin: '0 0 12px' }}>
                  Layer 3: Deferred InputOwner acquisition
                </h3>
                <p style={{ color: 'var(--mut)', margin: '0 0 12px', fontSize: '15px' }}>
                  Even if an RFCOMM socket connects and completes the initial handshake, the PC client does not grant input injection authority.
                </p>
                <p style={{ color: 'var(--mut)', margin: 0, fontSize: '15px' }}>
                  Input ownership is only granted when the first authorized Pouse input event is received. Keep-alive pings and unverified connections never gain control of your cursor or keyboard.
                </p>
              </div>

              <div>
                <h3 className="f0" style={{ fontSize: '32px', margin: '0 0 12px' }}>
                  Cryptographic Wi-Fi pairing token
                </h3>
                <p style={{ color: 'var(--mut)', margin: '0 0 12px', fontSize: '15px' }}>
                  Being on the same Wi-Fi network does not grant access. The PC generates a cryptographically random 128-bit pairing token using Windows CNG (BCryptGenRandom).
                </p>
                <p style={{ color: 'var(--mut)', margin: '0 0 12px', fontSize: '15px' }}>
                  The token is shared out-of-band exclusively via the visual QR code scanned by your phone. Clients lacking this token cannot send input. Additionally, PC preferences allow setting an optional Wi-Fi password, encrypted at rest using Windows DPAPI (CryptProtectData).
                </p>
                <p style={{ color: 'var(--mut)', margin: 0, fontSize: '15px' }}>
                  Pouse contains zero analytics libraries, zero tracking cookies, zero external API calls, and zero telemetry. It communicates purely between your phone and your PC over local connections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
