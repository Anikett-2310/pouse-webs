import os
from PIL import Image

ORIGINALS_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'media', 'originals')

phone_shots = [
    'touchpad-mode.webp',
    'motion-mode.webp',
    'touchless-mode.webp',
    'gaming-mode.webp',
    'remote-screen.webp',
    'utilities-dock.webp',
    'connect-qr.webp',
    'bluetooth-discovery.webp',
    'hero-phone.webp',
]

for name in phone_shots:
    im = Image.open(os.path.join(ORIGINALS_DIR, name))
    w, h = im.size
    
    # Find status bar bottom: the highest y where status bar icons (clock, battery) appear
    # Check pixels around x=20..80 (clock) and x=w-80..w-20 (battery)
    # The status bar ends where the solid header or app content begins
    max_status_y = 0
    for y in range(10, 80):
        # Look for bright icon pixels
        for x in [30, 40, 50, w - 50, w - 40, w - 30]:
            p = im.getpixel((x, y))
            # If brightness is notably higher than dark background
            if sum(p) > 250:
                max_status_y = max(max_status_y, y)
    
    # Find navigation bar top: the lowest y from bottom where nav bar buttons or gesture pill appear
    min_nav_y = h
    for y in range(h - 1, h - 80, -1):
        for x in range(w // 4, 3 * w // 4):
            p = im.getpixel((x, y))
            if sum(p) > 150:
                min_nav_y = min(min_nav_y, y)
                
    print(f"{name:25} status_bar_bottom: {max_status_y} (crop top: {max_status_y + 6}), nav_bar_top: {min_nav_y} (crop bottom: {h - min_nav_y + 6})")
