from PIL import Image
import os

ORIGINALS_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'media', 'originals')

def inspect_bottom(name):
    im = Image.open(os.path.join(ORIGINALS_DIR, name))
    w, h = im.size
    print(f"\n==================== {name} bottom rows ====================")
    # Check y from 900 to 1042
    for y in range(920, 1042, 6):
        # Sample across width
        samples = [im.getpixel((x, y)) for x in range(20, w, 40)]
        max_s = max(sum(p) for p in samples)
        min_s = min(sum(p) for p in samples)
        # Check center (where home pill or home circle sits)
        center = im.getpixel((w // 2, y))
        print(f"y={y:4d}: center={center}, min_sum={min_s}, max_sum={max_s}")

inspect_bottom('touchpad-mode.webp')
inspect_bottom('utilities-dock.webp')
inspect_bottom('gaming-mode.webp')
