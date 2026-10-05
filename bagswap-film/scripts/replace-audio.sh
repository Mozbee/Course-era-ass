#!/usr/bin/env bash
# Swaps the soundtrack in the finished MP4s for public/audio/mix.wav without touching the picture
# (video stream is copied bit-for-bit). Use after changing only the narration or score.
set -euo pipefail
cd "$(dirname "$0")/.."
for f in out/BagSwap-Intro-Landscape.mp4 out/BagSwap-Intro-Vertical.mp4; do
  ffmpeg -loglevel error -y -i "$f" -i public/audio/mix.wav -map 0:v:0 -map 1:a:0 \
    -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -t 30 -movflags +faststart "${f%.mp4}.tmp.mp4"
  mv "${f%.mp4}.tmp.mp4" "$f"
done
