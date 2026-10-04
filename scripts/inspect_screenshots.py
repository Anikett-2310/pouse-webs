import os
import shutil
from PIL import Image

MEDIA_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'media')
ORIGINALS_DIR = os.path.join(MEDIA_DIR, 'originals')

os.makedirs(ORIGINALS_DIR, exist_ok=True)

# 1. Backup all files in public/media to public/media/originals if not already backed up
for fname in os.listdir(MEDIA_DIR):
    src = os.path.join(MEDIA_DIR, fname)
    if os.path.isfile(src):
        dst = os.path.join(ORIGINALS_DIR, fname)
        if not os.path.exists(dst):
            shutil.copy2(src, dst)
            print(f"Backed up: {fname}")

print("Backup complete.")

# 2. Inspect all master images in originals
masters = [
    'touchpad-mode.webp',
    'motion-mode.webp',
    'touchless-mode.webp',
    'gaming-mode.webp',
    'remote-screen.webp',
    'utilities-dock.webp',
    'connect-qr.webp',
    'bluetooth-discovery.webp',
    'hero-phone.webp',
    'pc-tray-menu.webp',
    'pc-preferences.webp'
]

for m in masters:
    path = os.path.join(ORIGINALS_DIR, m)
    if os.path.exists(path):
        with Image.open(path) as im:
            print(f"{m:25} size: {im.size} mode: {im.mode}")
