from PIL import Image
import os

MEDIA_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'media')

im = Image.open(os.path.join(MEDIA_DIR, 'gaming-mode.webp'))
print("gaming-mode cropped size:", im.size)
# Let's save a rotated version or inspect
# If a user holds phone in landscape, but Android took portrait screenshot, or did the app lock orientation to landscape?
# Let's inspect where text like 'Pouse' or button labels appear in gaming-mode
