import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Updates & Release Notes — Pouse',
  description:
    'Version history, release notes, and architecture milestones for Pouse v1.0.0 and upcoming developments.',
};

export default function UpdatesPage() {
  return (
    <div>
      <section style={{ paddingTop: 'clamp(48px, 8vw, 90px)' }}>
        <div className="wrap">
          <h2 className="reveal">Updates & changelog.</h2>
          <p className="sub">
            Track release milestones, protocol enhancements, and client improvements across the platform.
          </p>

          <div style={{ maxWidth: '840px', marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '56px' }}>
            <div>
              <p className="f0" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1.25, color: '#c4b5fd', margin: '0 0 16px' }}>
                Version 1.0.0: The foundation release
              </p>
              <p style={{ color: 'var(--mut)', margin: '0 0 24px', fontSize: '15px' }}>
                Released October 2026 &bull; Initial public release for Windows and Android
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', borderTop: '1px solid var(--line)', paddingTop: '28px' }}>
                <div>
                  <h3 style={{ font: "800 20px/1.2 var(--font-bricolage), 'Bricolage Grotesque', sans-serif", margin: '0 0 10px', color: 'var(--ink)' }}>
                    Dual-transport core engine
                  </h3>
                  <p style={{ color: 'var(--mut)', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
                    Full implementation of parallel Wi-Fi (WebSocket port 8081) and Bluetooth (Classic RFCOMM with WinRT BLE discovery beacon). Integrated the InputOwner singleton ensuring thread-safe transport arbitration with automatic button and key releases on transfer.
                  </p>
                </div>

                <div>
                  <h3 style={{ font: "800 20px/1.2 var(--font-bricolage), 'Bricolage Grotesque', sans-serif", margin: '0 0 10px', color: 'var(--ink)' }}>
                    Five distinct input modes
                  </h3>
                  <p style={{ color: 'var(--mut)', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
                    Launched Touchpad mode with an 85% precision tracking surface and 15% scroll zone, Motion mode with dead-man gyro tilt steering, Touchless mode powered by on-device MediaPipe hand landmark detection, Gaming mode with a landscape virtual analog stick and buttons, and Remote Screen streaming Windows desktop at up to 60 FPS.
                  </p>
                </div>

                <div>
                  <h3 style={{ font: "800 20px/1.2 var(--font-bricolage), 'Bricolage Grotesque', sans-serif", margin: '0 0 10px', color: 'var(--ink)' }}>
                    Unified Utility Dock
                  </h3>
                  <p style={{ color: 'var(--mut)', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
                    Always-accessible header dock delivering quick PC controls: Volume, Mute, Display Brightness via WMI (laptops) and DDC/CI (desktop monitors), Windows Search (Win+S), Task View (Win+Tab), Show Desktop (Win+D), App Switcher (Alt+Tab), Taskbar Apps (Win+T), and Soft Keyboard.
                  </p>
                </div>

                <div>
                  <h3 style={{ font: "800 20px/1.2 var(--font-bricolage), 'Bricolage Grotesque', sans-serif", margin: '0 0 10px', color: 'var(--ink)' }}>
                    Three-layer defense-in-depth security
                  </h3>
                  <p style={{ color: 'var(--mut)', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
                    Layered security consisting of OS Bluetooth pairing, mobile Trust-On-First-Use (TOFU) confirmation bound to hardware BD_ADDR, deferred InputOwner acquisition on the PC, cryptographic CNG 128-bit pair tokens, and DPAPI-encrypted Wi-Fi password storage.
                  </p>
                </div>

                <div>
                  <h3 style={{ font: "800 20px/1.2 var(--font-bricolage), 'Bricolage Grotesque', sans-serif", margin: '0 0 10px', color: 'var(--ink)' }}>
                    Pouse CLI published on npm
                  </h3>
                  <p style={{ color: 'var(--mut)', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
                    Available globally as <code style={{ color: '#c4f1d6' }}>pouse-cli</code> for installing, updating, and verifying the Windows client directly from command lines and scripts.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '40px' }}>
              <p className="f0" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', lineHeight: 1.3, color: '#f0abfc', margin: '0 0 16px' }}>
                Roadmap decisions and clarity
              </p>
              <p style={{ color: 'var(--mut)', lineHeight: 1.7, margin: '0 0 16px' }}>
                Following technical evaluation, the experimental Optical Surface Mouse mode (using the rear camera against physical surfaces) was officially dropped. Modern phone cameras suffer from severe rolling shutter artifacts and high thermal throttling when operated continuously on desk surfaces.
              </p>
              <p style={{ color: 'var(--mut)', lineHeight: 1.7, margin: 0 }}>
                Focus remains dedicated to maximizing performance, battery efficiency, and reliability across our five core input modes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
