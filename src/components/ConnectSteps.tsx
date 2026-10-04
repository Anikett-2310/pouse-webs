import ScreenshotFrame from './ScreenshotFrame';

interface ConnectStepsProps {
  showScreenshots?: boolean;
}

export default function ConnectSteps({ showScreenshots = false }: ConnectStepsProps) {
  return (
    <div className="two">
      <div>
        <h3>Wi-Fi</h3>
        <p>
          Fastest, and the only way to use Remote Screen. Phone and PC share the same network.
        </p>
        <ol>
          <li>Open Pouse on the PC to show a QR code.</li>
          <li>Scan it with the Pouse app.</li>
          <li>That&apos;s it. Next time it reconnects by itself.</li>
        </ol>
        {showScreenshots && (
          <div style={{ marginTop: '32px' }}>
            <ScreenshotFrame
              name="connect-qr"
              alt="Pouse Wi-Fi QR code pairing flow on phone"
            />
          </div>
        )}
      </div>

      <div>
        <h3>Bluetooth</h3>
        <p>
          No network needed. The PC shows up in discovery and you approve it on first connection.
        </p>
        <ol>
          <li>Run Pouse on the PC.</li>
          <li>Find it in the app&apos;s Bluetooth list.</li>
          <li>Approve the pairing prompt once.</li>
        </ol>
        {showScreenshots && (
          <div style={{ marginTop: '32px' }}>
            <ScreenshotFrame
              name="bluetooth-discovery"
              alt="Pouse Bluetooth discovery and TOFU authorization dialog"
            />
          </div>
        )}
      </div>
    </div>
  );
}
