from PIL import Image
import os

MEDIA_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'media')
im = Image.open(os.path.join(MEDIA_DIR, 'gaming-mode.webp'))

# Check non-background pixels:
# The background is dark. Let's find bounding box of bright elements.
print("gaming-mode bbox of content with threshold > 40:")
gray = im.convert('L')
threshold = 30
bbox = gray.point(lambda p: 255 if p > threshold else 0).getbbox()
print("Bbox:", bbox)
