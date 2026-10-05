#!/usr/bin/env bash
# Converts Remotion's full-range JPEG frames to broadcast-range yuv420p and adds fast-start metadata.
set -euo pipefail
cd "$(dirname "$0")/.."
for f in out/BagSwap-Intro-Landscape.mp4 out/BagSwap-Intro-Vertical.mp4; do
  [ -f "$f" ] || continue
  pf=$(ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt -of csv=p=0 "$f" | tr -d ",\n")
  if [ "$pf" != "yuvj420p" ]; then echo "$f already finalized ($pf)"; continue; fi
  ffmpeg -loglevel error -y -i "$f" -vf "scale=in_range=full:out_range=tv,format=yuv420p" \
    -c:v libx264 -preset slow -crf 17 -profile:v high -level 4.2 -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
    -c:a copy -movflags +faststart "${f%.mp4}.tmp.mp4"
  mv "${f%.mp4}.tmp.mp4" "$f"
  ffprobe -v error -count_frames -select_streams v -show_entries stream=width,height,pix_fmt,r_frame_rate,nb_read_frames -of compact "$f"
done
