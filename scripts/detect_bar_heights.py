import os
from PIL import Image

ORIGINALS_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'media', 'originals')

def inspect_bars(name):
    path = os.path.join(ORIGINALS_DIR, name)
    im = Image.open(path)
    w, h = im.size
    
    # In Android, status bar typically has time on left, battery/wifi on right.
    # Check row-by-row standard deviation or min/max pixel values
    print(f"\n==================== {name} ({w}x{h}) ====================")
    
    # Check top rows
    status_bar_end = 0
    for y in range(0, 150):
        row = [im.getpixel((x, y)) for x in range(w)]
        # measure difference between pixels across the row
        r_vals = [p[0] for p in row]
        g_vals = [p[1] for p in row]
        b_vals = [p[2] for p in row]
        spread = (max(r_vals) - min(r_vals)) + (max(g_vals) - min(g_vals)) + (max(b_vals) - min(b_vals))
        # If there are icons, spread will be high (e.g. white icons on dark bg)
        if spread > 100:
            status_bar_end = y
    
    print(f"Detected top status bar icon activity up to y = {status_bar_end}")

    # Check bottom rows
    nav_bar_start = h
    for y in range(h - 1, h - 150, -1):
        row = [im.getpixel((x, y)) for x in range(w)]
        r_vals = [p[0] for p in row]
        g_vals = [p[1] for p in row]
        b_vals = [p[2] for p in row]
        spread = (max(r_vals) - min(r_vals)) + (max(g_vals) - min(g_vals)) + (max(b_vals) - min(b_vals))
        if spread > 100:
            nav_bar_start = y

    print(f"Detected bottom nav bar activity starting at y = {nav_bar_start} (height from bottom: {h - nav_bar_start})")

for name in [
    'touchpad-mode.webp',
    'motion-mode.webp',
    'touchless-mode.webp',
    'gaming-mode.webp',
    'remote-screen.webp',
    'utilities-dock.webp',
    'connect-qr.webp',
    'bluetooth-discovery.webp',
    'hero-phone.webp',
]:
    inspect_bars(name)
