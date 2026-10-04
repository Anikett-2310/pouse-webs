import os
from PIL import Image

ORIGINALS_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'media', 'originals')

def print_top_slice(name, max_y=60):
    im = Image.open(os.path.join(ORIGINALS_DIR, name))
    w, h = im.size
    print(f"\n--- Top slice for {name} ---")
    for y in range(0, max_y, 4):
        # Sample left (clock), middle (camera notch), right (battery/wifi)
        left = im.getpixel((30, y))
        mid = im.getpixel((w // 2, y))
        right = im.getpixel((w - 30, y))
        print(f"y={y:2d}: left={left} mid={mid} right={right}")

def print_bottom_slice(name, start_from=60):
    im = Image.open(os.path.join(ORIGINALS_DIR, name))
    w, h = im.size
    print(f"\n--- Bottom slice for {name} (last {start_from}px) ---")
    for y in range(h - start_from, h, 4):
        left = im.getpixel((30, y))
        mid = im.getpixel((w // 2, y))
        right = im.getpixel((w - 30, y))
        print(f"y={y:4d}: left={left} mid={mid} right={right}")

print_top_slice('touchpad-mode.webp', 60)
print_bottom_slice('touchpad-mode.webp', 60)
print_top_slice('connect-qr.webp', 60)
print_bottom_slice('connect-qr.webp', 60)
