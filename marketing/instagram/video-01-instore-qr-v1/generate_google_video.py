from __future__ import annotations

import os
import subprocess
import time
from pathlib import Path

from google import genai
from google.genai import types
import imageio_ffmpeg


ROOT = Path(__file__).resolve().parents[3]
PACKAGE = Path(__file__).resolve().parent
FRAMES = PACKAGE / "frames"
GENERATED = PACKAGE / "generated"
OUTPUT = PACKAGE / "try-instant-fit-instore-qr-google.mp4"


def load_key() -> str:
    env_path = ROOT / ".env.txt"
    for raw in env_path.read_text(encoding="utf-8-sig").splitlines():
        if "=" not in raw:
            continue
        name, value = raw.split("=", 1)
        if name.strip() == "VIDEO_API_KEY":
            return value.strip().strip('"').strip("'")
    raise RuntimeError("VIDEO_API_KEY was not found in .env.txt")


def image(path: Path) -> types.Image:
    return types.Image(image_bytes=path.read_bytes(), mime_type="image/png")


def generate_transition(client: genai.Client, start: Path, output: Path, prompt: str) -> None:
    if output.exists():
        print(f"Using existing {output.name}", flush=True)
        return
    print(f"Generating {output.name}", flush=True)
    operation = client.models.generate_videos(
        model="veo-3.1-fast-generate-preview",
        prompt=prompt,
        image=image(start),
        config=types.GenerateVideosConfig(
            number_of_videos=1,
            duration_seconds=8,
            aspect_ratio="9:16",
            resolution="720p",
            person_generation="allow_adult",
            negative_prompt=(
                "captions, subtitles, added text, logos, watermarks, distorted hands, "
                "changed garments, altered QR code, warped phone, illegible interface"
            ),
        ),
    )
    while not operation.done:
        print("Waiting for Veo...", flush=True)
        time.sleep(20)
        operation = client.operations.get(operation)
    if operation.error:
        raise RuntimeError(str(operation.error))
    video = operation.response.generated_videos[0].video
    client.files.download(file=video)
    video.save(str(output))


def main() -> None:
    GENERATED.mkdir(parents=True, exist_ok=True)
    client = genai.Client(api_key=load_key())

    generate_transition(
        client,
        FRAMES / "01-discover-outfit.png",
        GENERATED / "01-discover-to-scan.mp4",
        "A premium Pakistani fashion boutique. The adult woman admires the sage green embroidered formal outfit and naturally raises her phone, preparing to scan its QR code. Smooth restrained camera movement, realistic fabric and hands, editorial commercial lighting. No on-screen words or graphic overlays.",
    )

    selected = [
        (GENERATED / "01-discover-to-scan.mp4", 0.0),
        (FRAMES / "02-scan-qr.png", 1.1),
        (Path(r"C:\Users\Administrator\Downloads\Untitled design (1).png"), 1.6),
        (FRAMES / "05-real-photo-ready-screen.png", 1.4),
        (FRAMES / "06-real-tap-try-on-screen.png", 0.8),
        (FRAMES / "07-real-processing-screen.png", 1.5),
        (FRAMES / "08-real-result-screen.png", 1.8),
        (FRAMES / "10-confident-checkout.png", 2.0),
    ]

    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    temp = GENERATED / "assembly"
    temp.mkdir(exist_ok=True)
    clips: list[Path] = []
    for idx, (source, duration) in enumerate(selected):
        clip = temp / f"{idx:02d}.mp4"
        if source.suffix.lower() == ".mp4":
            subprocess.run([ffmpeg, "-y", "-i", str(source), "-an", "-vf", "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920", "-r", "30", "-c:v", "libx264", "-pix_fmt", "yuv420p", str(clip)], check=True)
        else:
            subprocess.run([ffmpeg, "-y", "-loop", "1", "-i", str(source), "-t", str(duration), "-an", "-vf", "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920", "-r", "30", "-c:v", "libx264", "-pix_fmt", "yuv420p", str(clip)], check=True)
        clips.append(clip)

    concat_file = temp / "concat.txt"
    concat_file.write_text("".join(f"file '{p.as_posix()}'\n" for p in clips), encoding="utf-8")
    subprocess.run([ffmpeg, "-y", "-f", "concat", "-safe", "0", "-i", str(concat_file), "-c", "copy", "-movflags", "+faststart", str(OUTPUT)], check=True)
    print(f"OUTPUT={OUTPUT}", flush=True)


if __name__ == "__main__":
    main()
