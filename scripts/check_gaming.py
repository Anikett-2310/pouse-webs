from PIL import Image
import os

ORIGINALS_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'media', 'originals')

im = Image.open(os.path.join(ORIGINALS_DIR, 'gaming-mode.webp'))
print(f"gaming-mode size: {im.size}")
# Let's inspect where the controls are (e.g. analog stick, buttons)
# Check vertical profile: is the app UI in portrait with a bottom nav, or is it landscape rotated?
# In gaming-mode.webp:
# Look at y=500..600
sample = [im.getpixel((x, 500)) for x in range(0, 540, 50)]
print("gaming-mode y=500 row sample:", sample)
