#!/usr/bin/env python3
"""Generate Chrome Web Store image assets (24-bit PNG, no alpha)."""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, "docs", "store")
SCREENSHOT = os.path.join(ROOT, "docs", "screenshot.png")
ICON = os.path.join(ROOT, "icons", "icon128.png")

BG = (13, 17, 23)          # GitHub dark #0d1117
FG = (230, 237, 243)       # #e6edf3
MUTED = (139, 148, 158)    # #8b949e
ACCENT = (88, 166, 255)    # #58a6ff

TITLE_FONT = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
BODY_FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"


def font(path, size):
    return ImageFont.truetype(path, size)


def fit_font(path, text, max_width, start, min_size=10):
    size = start
    while size > min_size:
        f = font(path, size)
        if f.getlength(text) <= max_width:
            return f
        size -= 1
    return font(path, min_size)


def flat_screenshot():
    im = Image.open(SCREENSHOT).convert("RGBA")
    bg = Image.new("RGB", im.size, (255, 255, 255))
    bg.paste(im, mask=im.split()[3])
    return bg


def cropped_to_aspect(img, aspect):
    """Crop the bottom off so the image matches the target aspect ratio."""
    w, h = img.size
    target_h = round(w / aspect)
    if target_h <= h:
        return img.crop((0, 0, w, target_h))
    target_w = round(h * aspect)
    return img.crop((0, 0, target_w, h))


def white_icon(size):
    icon = Image.open(ICON).convert("RGBA").resize((size, size), Image.LANCZOS)
    alpha = icon.split()[3]
    white = Image.new("RGBA", (size, size), (255, 255, 255, 0))
    white.putalpha(alpha)
    solid = Image.new("RGBA", (size, size), FG + (255,))
    solid.putalpha(alpha)
    return solid


def save(img, name):
    path = os.path.join(OUT, name)
    img.convert("RGB").save(path, "PNG")
    out = Image.open(path)
    print(f"{name}: {out.size} mode={out.mode}")


def make_screenshot():
    shot = cropped_to_aspect(flat_screenshot(), 1280 / 800)
    shot = shot.resize((1280, 800), Image.LANCZOS)
    save(shot, "screenshot-1280x800.png")


def make_small_promo():
    W, H = 440, 280
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    isz = 84
    icon = white_icon(isz)
    img.paste(icon, ((W - isz) // 2, 40), icon)

    title = "Recent GitHub Repos"
    tf = fit_font(TITLE_FONT, title, W - 48, 30)
    tw = tf.getlength(title)
    d.text(((W - tw) / 2, 150), title, font=tf, fill=FG)

    tag = "Jump to your recent repos"
    bf = fit_font(BODY_FONT, tag, W - 48, 18)
    bw = bf.getlength(tag)
    d.text(((W - bw) / 2, 200), tag, font=bf, fill=MUTED)

    save(img, "promo-small-440x280.png")


def make_marquee():
    W, H = 1400, 560
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    pad = 80

    shot = cropped_to_aspect(flat_screenshot(), 1280 / 800)
    box_w, box_h = 620, 440
    scale = min(box_w / shot.width, box_h / shot.height)
    shot = shot.resize((round(shot.width * scale), round(shot.height * scale)), Image.LANCZOS)
    shot_x = W - shot.width - pad
    img.paste(shot, (shot_x, (H - shot.height) // 2))

    text_max = shot_x - pad - 40
    isz = 88
    icon = white_icon(isz)
    tf = fit_font(TITLE_FONT, "Recent GitHub Repos", text_max, 60)
    bf = font(BODY_FONT, 26)
    lines = ["Fuzzy-search recently visited repos —", "jump to Code, PRs, Issues & Actions."]

    title_h = tf.getbbox("Ag")[3]
    line_h = 36
    block_h = isz + 28 + title_h + 20 + line_h * len(lines)
    y = (H - block_h) // 2

    img.paste(icon, (pad, y), icon)
    y += isz + 28
    d.text((pad, y), "Recent GitHub Repos", font=tf, fill=FG)
    y += title_h + 20
    for line in lines:
        d.text((pad, y), line, font=bf, fill=MUTED)
        y += line_h

    save(img, "promo-marquee-1400x560.png")


def main():
    os.makedirs(OUT, exist_ok=True)
    make_screenshot()
    make_small_promo()
    make_marquee()


if __name__ == "__main__":
    main()
