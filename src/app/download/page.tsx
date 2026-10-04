import type { Metadata } from 'next';
import { Suspense } from 'react';
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
          <div className="eyebrow">
            <span className="num">04</span>
            <span className="label">DOWNLOAD</span>
          </div>
          <h2 className="reveal">Get Pouse.</h2>
          <p className="sub">
            Install the PC client first, then the phone app. Prefer a terminal? The CLI handles the Windows install for you.
          </p>

          <Suspense fallback={<div style={{ minHeight: '300px' }} />}>
            <DownloadTabs showScreenshots />
          </Suspense>

          <div style={{ marginTop: '80px', borderTop: '1px solid var(--line)', paddingTop: '60px', maxWidth: '800px' }}>
            <h2 className="reveal">System requirements.</h2>
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

            {/* SmartScreen Note Card */}
            <div className="smartscreen-card" style={{ marginTop: '48px' }}>
              <div className="smartscreen-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <h4 className="smartscreen-title">Notice regarding Windows SmartScreen</h4>
                <p className="smartscreen-text">
                  The v1.0.0 installer is built from open-source code and currently unsigned with a paid commercial Authenticode certificate. Windows SmartScreen may show an unrecognized app dialog on launch. You can verify the file SHA-256 checksum published alongside the GitHub release before proceeding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
