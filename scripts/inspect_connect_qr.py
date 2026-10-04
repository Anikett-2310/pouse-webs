from PIL import Image
import os

ORIGINALS_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'media', 'originals')

for name in ['connect-qr.webp', 'bluetooth-discovery.webp']:
    im = Image.open(os.path.join(ORIGINALS_DIR, name))
    w, h = im.size
    print(f"=== {name} ===")
    for y in range(0, 70, 2):
        # check max pixel value across the entire width
        max_val = max(sum(im.getpixel((x, y))) for x in range(w))
        min_val = min(sum(im.getpixel((x, y))) for x in range(w))
        if max_val > 100:
            print(f"y={y:2d}: min_sum={min_val}, max_sum={max_val}")
