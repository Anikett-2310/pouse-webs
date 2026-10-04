import urllib.request
import html

routes = [
    ('/', ['01', 'INPUT MODES', '02', 'COMPANION TOOLS', '03', 'CONNECT', '04', 'DOWNLOAD', '05', 'DEVELOPER TOOL', '06', 'SECURITY', '07', 'FAQ', 'Utilities & Instant Shortcuts', 'Prefer the terminal?', 'Windows Terminal (PowerShell / Command Prompt)', 'Frequently Asked Questions', 'Have a technical issue or bug report?']),
    ('/features', ['Five ways to point.', 'Utilities & Instant Shortcuts']),
    ('/how-it-works', ['Pair once. It remembers.', 'Wi-Fi WebSocket transport', 'Bluetooth RFCOMM transport']),
    ('/download', ['Get Pouse.', 'Pouse for Windows', 'Pouse for Android', 'Pouse CLI']),
    ('/security', ['Private by design.', 'Layer 1: OS-level Bluetooth pairing', 'Layer 2: Trust-On-First-Use', 'Layer 3: Deferred InputOwner acquisition']),
    ('/faq', ['Frequently Asked Questions', 'Have a technical issue or bug report?', 'Open an issue on GitHub']),
    ('/troubleshooting', ['Troubleshooting.', 'Wi-Fi & network diagnostics', 'Bluetooth & pairing diagnostics']),
    ('/about', ['The story of Pouse.', 'The device already in your pocket']),
    ('/updates', ['Updates & changelog.', 'Version 1.0.0: The foundation release'])
]

all_ok = True
for path, expected_snippets in routes:
    url = f"http://localhost:3000{path}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            status = resp.status
            raw_body = resp.read().decode('utf-8')
            body = html.unescape(raw_body)
            missing = [s for s in expected_snippets if s not in body]
            if status == 200 and not missing:
                print(f"PASS: {path:18} Status {status}, {len(body)} bytes, all {len(expected_snippets)} checks verified")
            else:
                print(f"FAIL: {path:18} Status {status}, Missing: {missing}")
                all_ok = False
    except Exception as e:
        print(f"ERROR on {path}: {e}")
        all_ok = False

if not all_ok:
    exit(1)
print("\nAll routes verified successfully!")
