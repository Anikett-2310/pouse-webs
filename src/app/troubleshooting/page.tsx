import type { Metadata } from 'next';
import FaqAccordion, { FaqItem } from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'Troubleshooting — Pouse',
  description:
    'Diagnostic steps and solutions for Wi-Fi discovery, Bluetooth pairing, Windows Firewall, SmartScreen, and display brightness.',
};

export default function TroubleshootingPage() {
  const wifiItems: FaqItem[] = [
    {
      question: 'The phone cannot find the PC or connect over Wi-Fi.',
      answer: (
        <div>
          <p style={{ margin: '0 0 10px' }}>
            Ensure both your phone and PC are connected to the exact same local Wi-Fi router. Some guest Wi-Fi networks enable &quot;AP Isolation&quot; or &quot;Client Isolation&quot;, which prevents devices on the same Wi-Fi network from communicating with one another.
          </p>
          <p style={{ margin: 0 }}>
            Also confirm that Windows Firewall is not blocking port 8081. The official Pouse installer automatically adds this rule for Private networks, but manual installations may require allowing Pouse through the firewall.
          </p>
        </div>
      ),
      defaultOpen: true,
    },
    {
      question: 'The QR code fails to scan or returns an invalid pairing error.',
      answer:
        'Make sure the camera has sufficient lighting to read the QR code on your PC screen. If the pair token was previously reset on the PC, existing tokens on your phone will be rejected. Scan the newly generated QR code to update your phone pairing token.',
    },
    {
      question: 'Input lags or stutters intermittently over Wi-Fi.',
      answer:
        'Heavy 2.4 GHz Wi-Fi interference can induce packet jitter. Connecting your PC via Ethernet or switching your phone to a 5 GHz Wi-Fi band ensures the lowest possible latency for pointer input and Remote Screen streaming.',
    },
  ];

  const bluetoothItems: FaqItem[] = [
    {
      question: 'The PC does not appear in the phone Bluetooth discovery list.',
      answer: (
        <div>
          <p style={{ margin: '0 0 10px' }}>
            First, ensure that Bluetooth is turned on both in Windows Settings and on your Android phone.
          </p>
          <p style={{ margin: 0 }}>
            Make sure your devices are paired at the Windows OS level first before connecting inside the Pouse app. Pouse uses low-energy advertisement beacons to discover the PC&apos;s Classic Bluetooth address.
          </p>
        </div>
      ),
      defaultOpen: true,
    },
    {
      question: 'Bluetooth connects, but moving my finger produces no cursor motion.',
      answer:
        'When connecting via Bluetooth for the first time, check your phone screen for the Trust-On-First-Use (TOFU) confirmation dialog. Pouse blocks all input dispatch until you explicitly tap "Trust & Authorize". If you accidentally dismissed this prompt, tap "Forget Device" in the connection menu and reconnect.',
    },
    {
      question: 'Windows Bluetooth settings changed after closing Pouse.',
      answer:
        'Pouse includes a Bluetooth state lifecycle restorer. When Pouse launches, it records your existing Windows Bluetooth discoverability settings and automatically restores them upon a clean shutdown or tray exit.',
    },
  ];

  const hardwareItems: FaqItem[] = [
    {
      question: 'Brightness keys in the Utility Dock do not change monitor brightness.',
      answer:
        'On desktop monitors, brightness control relies on the DDC/CI communication standard over HDMI or DisplayPort. Open your physical monitor On-Screen Display (OSD) menu using the buttons on your monitor and ensure "DDC/CI" is toggled ON. Laptop screens using internal display panels use WMI automatically.',
    },
    {
      question: 'Remote Screen goes black when an administrator prompt appears.',
      answer:
        'This is expected Windows security behavior. Windows switches to the "Secure Desktop" isolation layer during User Account Control (UAC) elevation dialogs and lock screens (Win+L), which prevents all third-party screen capture tools from reading the display until you return to the normal user desktop.',
    },
    {
      question: 'Windows SmartScreen dialog blocks the installer.',
      answer:
        'Because Pouse v1.0.0 is an independent open-source release without a commercial Authenticode code-signing certificate, Windows SmartScreen may show an unknown publisher alert. Click "More info" and then "Run anyway". You can verify the file integrity by comparing its SHA-256 hash against the release notes.',
    },
  ];

  return (
    <div>
      <section style={{ paddingTop: 'clamp(48px, 8vw, 90px)' }}>
        <div className="wrap">
          <h2 className="reveal">Troubleshooting.</h2>
          <p className="sub">
            Step-by-step diagnostics for network configurations, device discovery, permissions, and monitor controls.
          </p>

          <div style={{ maxWidth: '820px', marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '56px' }}>
            <div>
              <h3 className="f0" style={{ fontSize: '34px', margin: '0 0 16px', color: '#22d3ee' }}>
                Wi-Fi & network diagnostics
              </h3>
              <FaqAccordion items={wifiItems} />
            </div>

            <div>
              <h3 className="f0" style={{ fontSize: '34px', margin: '0 0 16px', color: '#f0abfc' }}>
                Bluetooth & pairing diagnostics
              </h3>
              <FaqAccordion items={bluetoothItems} />
            </div>

            <div>
              <h3 className="f0" style={{ fontSize: '34px', margin: '0 0 16px', color: '#fbbf24' }}>
                Hardware, brightness & system integration
              </h3>
              <FaqAccordion items={hardwareItems} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
