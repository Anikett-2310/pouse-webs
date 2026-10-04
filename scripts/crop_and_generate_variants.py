import os
import shutil
from PIL import Image

MEDIA_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'media')
ORIGINALS_DIR = os.path.join(MEDIA_DIR, 'originals')

# Cropping definitions: (top_crop, bottom_crop) in pixels from original 540x1042 image
# Remember: Do NOT crop PC screenshots (pc-tray-menu, pc-preferences).
CROP_CONFIG = {
    'touchpad-mode.webp': (60, 54),       # 1042 - 54 = 988
    'motion-mode.webp': (60, 54),
    'touchless-mode.webp': (60, 76),
    'gaming-mode.webp': (60, 72),
    'remote-screen.webp': (60, 72),
    'utilities-dock.webp': (60, 72),
    'connect-qr.webp': (60, 76),
    'bluetooth-discovery.webp': (60, 76),
    'hero-phone.webp': (60, 54),
}

def process_screenshots():
    cropped_dims = {}

    for name, (top, bottom) in CROP_CONFIG.items():
        orig_path = os.path.join(ORIGINALS_DIR, name)
        if not os.path.exists(orig_path):
            print(f"Skipping {name}, not in originals")
            continue

        im = Image.open(orig_path)
        w, h = im.size
        # Crop: left=0, upper=top, right=w, lower=h - bottom
        cropped = im.crop((0, top, w, h - bottom))
        cw, ch = cropped.size
        print(f"Cropped {name}: {w}x{h} -> {cw}x{ch} (aspect ratio: {cw/ch:.4f})")

        # Save cropped master to public/media/<name>
        out_master = os.path.join(MEDIA_DIR, name)
        cropped.save(out_master, 'WEBP', quality=90, method=6)
        cropped_dims[name] = (cw, ch)

        # Generate -360w, -540w, -720w variants
        # Note: the original width is 540.
        # For 360w: width=360, height=int(ch * 360 / cw)
        # For 540w: width=540, height=ch
        # For 720w: width=720, height=int(ch * 720 / cw)
        base_name = name.replace('.webp', '')
        
        # 360w
        h360 = int(round(ch * 360 / cw))
        im360 = cropped.resize((360, h360), Image.Resampling.LANCZOS)
        im360.save(os.path.join(MEDIA_DIR, f"{base_name}-360w.webp"), 'WEBP', quality=88, method=6)

        # 540w
        cropped.save(os.path.join(MEDIA_DIR, f"{base_name}-540w.webp"), 'WEBP', quality=90, method=6)

        # 720w
        h720 = int(round(ch * 720 / cw))
        im720 = cropped.resize((720, h720), Image.Resampling.LANCZOS)
        im720.save(os.path.join(MEDIA_DIR, f"{base_name}-720w.webp"), 'WEBP', quality=90, method=6)

    # PC screenshots: DO NOT CROP
    pc_shots = ['pc-tray-menu.webp', 'pc-preferences.webp']
    for pc_name in pc_shots:
        orig_path = os.path.join(ORIGINALS_DIR, pc_name)
        if os.path.exists(orig_path):
            with Image.open(orig_path) as im:
                cropped_dims[pc_name] = im.size
                print(f"Uncropped PC screenshot {pc_name}: {im.size}")

    print("\nSummary of image dimensions:")
    for k, v in cropped_dims.items():
        print(f"'{k}': {{ width: {v[0]}, height: {v[1]}, aspect: '{v[0]}/{v[1]}' }}")

if __name__ == '__main__':
    process_screenshots()
