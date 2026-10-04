from PIL import Image
import os

MEDIA_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'media')

im = Image.open(os.path.join(MEDIA_DIR, 'gaming-mode.webp'))
# Is there an analog stick or D-pad?
# Where are the controls?
# Let's inspect brightness grid across 10x10 blocks
w, h = im.size
print("Brightness map 10x10 blocks for gaming-mode:")
for row in range(10):
    line = ""
    for col in range(10):
        box = (col * w // 10, row * h // 10, (col + 1) * w // 10, (row + 1) * h // 10)
        crop = im.crop(box)
        stat = sum(sum(p) for p in crop.getdata()) // (crop.size[0] * crop.size[1])
        line += f"{stat:3d} "
    print(line)
