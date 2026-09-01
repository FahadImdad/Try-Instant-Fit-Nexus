from pathlib import Path
import subprocess

from PIL import Image, ImageDraw, ImageFilter
import imageio_ffmpeg


PACKAGE = Path(__file__).resolve().parent
FRAMES = PACKAGE / "frames"
GENERATED = PACKAGE / "generated-share-flow"
OUTPUT = PACKAGE / "try-instant-fit-complete-share-flow.mp4"
ADD_PHOTO = Path(r"C:\Users\Administrator\Downloads\Untitled design (1).png")


def gradient_circle(canvas, box, left=(71, 80, 255), right=(25, 199, 224)):
    x0, y0, x1, y1 = box
    size = x1 - x0
    grad = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    px = grad.load()
    for y in range(size):
        for x in range(size):
            t = x / max(1, size - 1)
            c = tuple(round(left[i] * (1 - t) + right[i] * t) for i in range(3))
            px[x, y] = (*c, 255)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size - 1, size - 1), fill=255)
    canvas.paste(grad, (x0, y0), mask)


def add_action_buttons(source: Path, output: Path, tapped=False):
    im = Image.open(source).convert("RGBA")
    draw = ImageDraw.Draw(im)
    # Two compact icon-only actions in the existing white result card.
    gradient_circle(im, (505, 1110, 551, 1156))
    gradient_circle(im, (575, 1110, 621, 1156))
    draw.line((528, 1120, 528, 1141), fill="white", width=4)
    draw.line((520, 1134, 528, 1142, 536, 1134), fill="white", width=4)
    draw.line((518, 1147, 538, 1147), fill="white", width=4)
    draw.line((590, 1135, 608, 1125), fill="white", width=4)
    draw.line((590, 1135, 608, 1145), fill="white", width=4)
    draw.ellipse((586, 1130, 596, 1140), fill="white")
    draw.ellipse((603, 1120, 613, 1130), fill="white")
    draw.ellipse((603, 1140, 613, 1150), fill="white")
    if tapped:
        draw.ellipse((567, 1102, 629, 1164), outline=(32, 199, 226, 210), width=5)
        draw.ellipse((560, 1095, 636, 1171), outline=(32, 199, 226, 90), width=3)
    im.convert("RGB").save(output, quality=96)


def add_share_sheet(source: Path, output: Path):
    im = Image.open(source).convert("RGBA")
    overlay = Image.new("RGBA", im.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    # Dim only the phone content and place a clean icon-only mobile share sheet.
    od.rounded_rectangle((380, 470, 735, 1260), radius=40, fill=(3, 18, 50, 105))
    od.rounded_rectangle((397, 815, 716, 1176), radius=26, fill=(250, 250, 252, 255))
    od.rounded_rectangle((529, 830, 584, 836), radius=3, fill=(185, 190, 201, 255))
    colors = [(82, 112, 255), (23, 196, 221), (127, 91, 230), (62, 174, 120)]
    centers = [446, 517, 588, 659]
    for x, color in zip(centers, colors):
        od.ellipse((x - 23, 872, x + 23, 918), fill=(*color, 255))
        od.ellipse((x - 7, 881, x + 7, 895), fill=(255, 255, 255, 255))
        od.arc((x - 14, 890, x + 14, 916), 190, 350, fill=(255, 255, 255, 255), width=4)
    # Generic sharing destinations, all icon-only.
    for x in centers:
        od.rounded_rectangle((x - 24, 955, x + 24, 1003), radius=12, fill=(235, 238, 245, 255))
    od.line((435, 986, 457, 970), fill=(41, 77, 155, 255), width=4)
    od.line((435, 986, 458, 995), fill=(41, 77, 155, 255), width=4)
    od.ellipse((503, 971, 531, 997), outline=(41, 77, 155, 255), width=4)
    od.line((576, 995, 600, 969), fill=(41, 77, 155, 255), width=4)
    od.line((576, 969, 600, 995), fill=(41, 77, 155, 255), width=4)
    od.rounded_rectangle((646, 970, 672, 996), radius=4, outline=(41, 77, 155, 255), width=4)
    od.line((659, 964, 659, 985), fill=(41, 77, 155, 255), width=4)
    od.line((652, 972, 659, 964, 666, 972), fill=(41, 77, 155, 255), width=4)
    od.rounded_rectangle((420, 1040, 693, 1100), radius=14, fill=(235, 238, 245, 255))
    od.line((448, 1070, 665, 1070), fill=(178, 185, 199, 255), width=5)
    im = Image.alpha_composite(im, overlay)
    im.convert("RGB").save(output, quality=96)


def main():
    GENERATED.mkdir(parents=True, exist_ok=True)
    actions = GENERATED / "08-result-actions.jpg"
    tap_share = GENERATED / "09-tap-share.jpg"
    share_sheet = GENERATED / "10-share-sheet.jpg"
    add_action_buttons(FRAMES / "08-real-result-screen.png", actions)
    add_action_buttons(FRAMES / "08-real-result-screen.png", tap_share, tapped=True)
    add_share_sheet(FRAMES / "08-real-result-screen.png", share_sheet)

    scenes = [
        (FRAMES / "01-discover-outfit.png", 1.6),
        (FRAMES / "02-scan-qr.png", 1.5),
        (ADD_PHOTO, 1.5),
        (FRAMES / "05-real-photo-ready-screen.png", 1.4),
        (FRAMES / "06-real-tap-try-on-screen.png", 0.7),
        (FRAMES / "07-real-processing-screen.png", 1.7),
        (FRAMES / "08-real-result-screen.png", 1.5),
        (actions, 1.2),
        (tap_share, 0.5),
        (share_sheet, 2.0),
        (FRAMES / "10-confident-checkout.png", 2.0),
    ]
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    clips = []
    for i, (source, duration) in enumerate(scenes):
        clip = GENERATED / f"clip-{i:02d}.mp4"
        subprocess.run([
            ffmpeg, "-hide_banner", "-loglevel", "error", "-y",
            "-loop", "1", "-i", str(source), "-t", str(duration), "-an",
            "-vf", "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,format=yuv420p",
            "-r", "30", "-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p", str(clip)
        ], check=True)
        clips.append(clip)
    concat = GENERATED / "concat.txt"
    concat.write_text("".join(f"file '{p.as_posix()}'\n" for p in clips), encoding="utf-8")
    subprocess.run([
        ffmpeg, "-hide_banner", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0",
        "-i", str(concat), "-c", "copy", "-movflags", "+faststart", str(OUTPUT)
    ], check=True)
    print(OUTPUT)


if __name__ == "__main__":
    main()
