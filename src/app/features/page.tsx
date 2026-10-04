import type { Metadata } from 'next';
import ModeSwitcher from '@/components/ModeSwitcher';
import UtilityDock from '@/components/UtilityDock';
import ScreenshotFrame from '@/components/ScreenshotFrame';

export const metadata: Metadata = {
  title: 'Modes & Features — Pouse',
  description:
    'Explore the five input modes of Pouse: Touchpad, Motion, Touchless, Gaming, and Remote Screen, plus the unified Utility Dock.',
};

export default function FeaturesPage() {
  return (
    <div>
      <section style={{ paddingTop: 'clamp(48px, 8vw, 90px)' }}>
        <div className="wrap">
          <h2>Five ways to point.</h2>
          <p className="sub">
            Every mode shares the same Windows client and protocol. Touch, tilt, wave, tap, or stream your desktop directly to your pocket.
          </p>

          <ModeSwitcher />

          <div style={{ marginTop: '80px', borderTop: '1px solid var(--line)', paddingTop: '60px' }}>
            <h2>Inside each mode.</h2>
            <p className="sub">
              Engineered for natural interaction with zero added PC drivers.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '800px' }}>
              <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '36px' }}>
                <h3 className="f0" style={{ fontSize: '34px', margin: '0 0 12px', color: '#8b5cf6' }}>
                  Touchpad mode
                </h3>
                <p style={{ color: 'var(--mut)', margin: '0 0 16px' }}>
                  A split layout designed for one-handed operation. Eighty-five percent of the phone screen is dedicated to smooth, low-latency cursor movement with microtask coalescing. The remaining fifteen percent on the right edge is a dedicated scroll strip.
                </p>
                <ul style={{ color: 'var(--mut)', paddingLeft: '20px', margin: 0, lineHeight: 1.8 }}>
                  <li>One-finger drag for cursor displacement</li>
                  <li>One-finger tap for left click; two-finger tap for right click</li>
                  <li>Double tap and drag for text selection and window dragging</li>
                  <li>Two-finger vertical swipe for natural scrolling</li>
                  <li>Pinch gesture for Windows magnifier zoom</li>
                </ul>
              </div>

              <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '36px' }}>
                <h3 className="f1" style={{ fontSize: '32px', margin: '0 0 12px', color: '#22d3ee' }}>
                  Motion mode
                </h3>
                <p style={{ color: 'var(--mut)', margin: '0 0 16px' }}>
                  Uses your phone&apos;s internal accelerometer and gyroscope sensors. Hold down the central trigger button to steer the cursor with natural wrist tilts. Release the button at any moment to park the cursor instantly, ideal for slide decks and presentations.
                </p>
                <ul style={{ color: 'var(--mut)', paddingLeft: '20px', margin: 0, lineHeight: 1.8 }}>
                  <li>Inertial motion tracking via high-frequency sensor fusion</li>
                  <li>Dead-man trigger: cursor moves only while held</li>
                  <li>Sub-millisecond receive-to-inject latency on the PC</li>
                </ul>
              </div>

              <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '36px' }}>
                <h3 className="f2" style={{ fontSize: '32px', margin: '0 0 12px', color: '#fb7185' }}>
                  Touchless mode
                </h3>
                <p style={{ color: 'var(--mut)', margin: '0 0 16px' }}>
                  Powered by on-device computer vision through the front camera using MediaPipe Hand Landmark detection. Point your phone toward your hand: wave in mid-air to aim, and pinch your thumb and index finger together to click.
                </p>
                <ul style={{ color: 'var(--mut)', paddingLeft: '20px', margin: 0, lineHeight: 1.8 }}>
                  <li>Pure on-device ML inference; no video leaves the device</li>
                  <li>Live hand skeleton overlay provides visual tracking feedback</li>
                  <li>Completely contactless operation when hands are occupied</li>
                </ul>
              </div>

              <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '36px' }}>
                <h3 className="f3" style={{ fontSize: '34px', margin: '0 0 12px', color: '#fbbf24' }}>
                  Gaming mode
                </h3>
                <p style={{ color: 'var(--mut)', margin: '0 0 16px' }}>
                  Rotate the phone sideways for a comfortable, landscape virtual gamepad. Features a responsive virtual analog stick, directional D-pad, and primary action buttons ready for PC gaming over either Wi-Fi or Bluetooth.
                </p>
                <ul style={{ color: 'var(--mut)', paddingLeft: '20px', margin: 0, lineHeight: 1.8 }}>
                  <li>Dual-thumb ergonomic layout for landscape orientation</li>
                  <li>Normalized axis inputs with zero stick drift</li>
                  <li>Operates seamlessly over low-latency RFCOMM or WebSocket</li>
                </ul>
              </div>

              <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '36px' }}>
                <h3 className="f4" style={{ fontSize: '32px', margin: '0 0 12px', color: '#34d399' }}>
                  Remote Screen mode
                </h3>
                <p style={{ color: 'var(--mut)', margin: '0 0 16px' }}>
                  A dedicated top-level mode streaming your Windows primary monitor straight to your phone at up to 60 FPS. Captured using Windows Graphics Capture (WGC) and encoded with hardware Media Foundation H.264. Tapping on the phone mirror dispatches absolute coordinates straight back to Windows.
                </p>
                <ul style={{ color: 'var(--mut)', paddingLeft: '20px', margin: 0, lineHeight: 1.8 }}>
                  <li>Hardware H.264 encode/decode pipeline on GPU</li>
                  <li>Direct touch interaction with absolute coordinate mapping</li>
                  <li>Requires local Wi-Fi connection for video bandwidth</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '80px', borderTop: '1px solid var(--line)', paddingTop: '60px' }}>
            <h2>The utility dock.</h2>
            <p className="sub">
              Available as a header dock across every mode. Control your computer without leaving your current input screen.
            </p>
            <UtilityDock />

            <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
              <div>
                <h3 className="f0" style={{ fontSize: '24px', margin: '0 0 8px' }}>Volume & Mute</h3>
                <p style={{ color: 'var(--mut)', fontSize: '15px' }}>
                  Dedicated Win32 media keys for volume up, volume down, and one-tap mute.
                </p>
              </div>
              <div>
                <h3 className="f0" style={{ fontSize: '24px', margin: '0 0 8px' }}>Display brightness</h3>
                <p style={{ color: 'var(--mut)', fontSize: '15px' }}>
                  Platform-adaptive adjustment: WMI methods for laptop screens, DDC/CI commands for desktop monitors.
                </p>
              </div>
              <div>
                <h3 className="f0" style={{ fontSize: '24px', margin: '0 0 8px' }}>Windows navigation</h3>
                <p style={{ color: 'var(--mut)', fontSize: '15px' }}>
                  Instant shortcuts for Windows Search (Win+S), Task View (Win+Tab), Show Desktop (Win+D), and Taskbar Apps (Win+T).
                </p>
              </div>
              <div>
                <h3 className="f0" style={{ fontSize: '24px', margin: '0 0 8px' }}>Soft keyboard</h3>
                <p style={{ color: 'var(--mut)', fontSize: '15px' }}>
                  Send typed UTF-8 text directly to the focused Windows window with full keystroke injection.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '48px', maxWidth: '360px' }}>
              <p style={{ color: 'var(--mut)', fontSize: '14.5px', marginBottom: '12px' }}>
                Utility dock expanded view:
              </p>
              <ScreenshotFrame
                name="utilities-dock"
                alt="Pouse utility dock expanded view on phone"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
