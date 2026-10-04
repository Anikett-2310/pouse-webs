import type { Metadata } from 'next';
import DownloadTabs from '@/components/DownloadTabs';

export const metadata: Metadata = {
  title: 'Download Pouse — Windows, Android & CLI',
  description:
    'Download the Pouse PC client for Windows 10/11, install via npm CLI, or get the companion Android application.',
};

export default function DownloadPage() {
  return (
    <div>
      <section style={{ paddingTop: 'clamp(48px, 8vw, 90px)' }}>
        <div className="wrap">
          <h2>Get Pouse.</h2>
          <p className="sub">
            Install the PC client first, then the phone app. Prefer a terminal? The CLI handles the Windows install for you.
          </p>

          <DownloadTabs showScreenshots />

          <div style={{ marginTop: '80px', borderTop: '1px solid var(--line)', paddingTop: '60px', maxWidth: '800px' }}>
            <h2>System requirements.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px', marginTop: '32px' }}>
              <div>
                <h3 className="f0" style={{ fontSize: '26px', margin: '0 0 10px', color: '#c4b5fd' }}>
                  Windows PC
                </h3>
                <ul style={{ color: 'var(--mut)', paddingLeft: '20px', margin: 0, fontSize: '15px', lineHeight: 1.8 }}>
                  <li>Windows 10 (version 1809 or later) or Windows 11</li>
                  <li>Bluetooth 4.0+ adapter (optional, for Bluetooth mode)</li>
                  <li>DirectX 11-compatible GPU (for Remote Screen)</li>
                  <li>Inno Setup installer creates necessary firewall rules</li>
                </ul>
              </div>

              <div>
                <h3 className="f0" style={{ fontSize: '26px', margin: '0 0 10px', color: '#67e8f9' }}>
                  Android phone
                </h3>
                <ul style={{ color: 'var(--mut)', paddingLeft: '20px', margin: 0, fontSize: '15px', lineHeight: 1.8 }}>
                  <li>Android 8.0 (API level 26) or newer</li>
                  <li>Touchscreen with multi-touch support</li>
                  <li>Camera (for Touchless hand tracking and QR scan)</li>
                  <li>Gyroscope and accelerometer (for Motion mode)</li>
                </ul>
              </div>
            </div>

            <div style={{ marginTop: '48px', padding: '24px', borderRadius: '16px', border: '1px solid var(--line)', background: 'rgba(21, 15, 40, 0.4)' }}>
              <h3 className="f0" style={{ fontSize: '24px', margin: '0 0 8px' }}>
                Note regarding Windows SmartScreen
              </h3>
              <p style={{ color: 'var(--mut)', fontSize: '14.5px', margin: 0 }}>
                The v1.0.0 installer is built from open-source code and currently unsigned with an Authenticode certificate. Windows SmartScreen may show a warning dialog on launch. You can verify the file SHA-256 checksum published alongside the GitHub release before proceeding.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
