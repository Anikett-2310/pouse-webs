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
    path = os.path.join(ORIGINALS_DIR, name)
    im = Image.open(path)
    w, h = im.size
    print(f"\n=== {name} ({w}x{h}) ===")
    
    # Sample top 80 pixels (check colors / changes)
    # Print color of middle column x=w//2 or x=10 across top 0..80
    top_pixels = [im.getpixel((w // 2, y)) for y in range(0, min(80, h), 4)]
    print(f"Top center pixels (y=0..76 step 4): {top_pixels[:6]}...")
    
    # Sample bottom 80 pixels
    bottom_pixels = [im.getpixel((w // 2, y)) for y in range(h - 80, h, 4)]
    print(f"Bottom center pixels (y={h-80}..{h} step 4): {bottom_pixels[-6:]}...")
