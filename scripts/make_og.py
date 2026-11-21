"""Build public/og.png, the link-preview image.

It takes the in-game "Code activation" dialog (scripts/source/code-activation.png),
replaces the code in the input field with TEXT, and centres the dialog on a
1200x630 dark card.

    python scripts/make_og.py
    python scripts/make_og.py --text "something else"

Needs Pillow and Windows' Bahnschrift font (close to Tarkov's Bender).
"""
import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONT = "C:/Windows/Fonts/bahnschrift.ttf"
S = 1.6  # dialog scale on the card

ap = argparse.ArgumentParser()
ap.add_argument("--text", default="tarkovcodes.pages.dev")
ap.add_argument("--src", default=ROOT / "scripts/source/code-activation.png", type=Path)
ap.add_argument("--out", default=ROOT / "public/og.png", type=Path)
args = ap.parse_args()

dlg = Image.open(args.src).convert("RGB")
w, h = dlg.size
dlg = dlg.resize((round(w * S), round(h * S)), Image.LANCZOS)

# Input interior in source pixels (border excluded), found by scanning the image.
x0, x1, y0, y1 = 30, 388, 198, 227
sx0, sx1, sy0, sy1 = round(x0 * S), round(x1 * S), round(y0 * S), round(y1 * S)
clean_x = round(360 * S)  # an empty spot inside the field, right of the old text
px = dlg.load()
for y in range(sy0, sy1 + 1):
    c = px[clean_x, y]  # keeps the field's scan-line pattern row by row
    for x in range(sx0, sx1 + 1):
        px[x, y] = c

font = ImageFont.truetype(FONT, round(15 * S))
try:
    font.set_variation_by_name("Bold")
except Exception:
    pass
d = ImageDraw.Draw(dlg)
cy = (y0 + y1) / 2 * S
d.text((round(38 * S), cy), args.text, font=font, fill=(200, 200, 191), anchor="lm")

# Card: Tarkov site background with a soft teal glow from the top.
W, H = 1200, 630
card = Image.new("RGB", (W, H), (19, 20, 20))
glow = Image.new("L", (W, H), 0)
ImageDraw.Draw(glow).ellipse((W / 2 - 520, -380, W / 2 + 520, 260), fill=120)
glow = glow.filter(ImageFilter.GaussianBlur(110))
card.paste(Image.new("RGB", (W, H), (40, 110, 95)), (0, 0), glow)

dx, dy = (W - dlg.width) // 2, (H - dlg.height) // 2
shadow = Image.new("L", (W, H), 0)
ImageDraw.Draw(shadow).rectangle((dx - 6, dy + 4, dx + dlg.width + 6, dy + dlg.height + 14), fill=200)
shadow = shadow.filter(ImageFilter.GaussianBlur(18))
card.paste(Image.new("RGB", (W, H), (0, 0, 0)), (0, 0), shadow)
card.paste(dlg, (dx, dy))
ImageDraw.Draw(card).rectangle((dx - 1, dy - 1, dx + dlg.width, dy + dlg.height), outline=(58, 62, 62))

card.save(args.out, optimize=True)
print(f"wrote {args.out} {card.size}")
