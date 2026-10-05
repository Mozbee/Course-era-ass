#!/usr/bin/env bash
# Placeholder voiceover: a synthetic British male voice (Piper TTS, "en-gb-alan-low").
# Replace any public/audio/vo/<id>.wav with a recorded take (48 kHz mono WAV) and rerun `npm run audio`.
# Needs: pip install piper-tts; the voice from
#   https://github.com/rhasspy/piper/releases/download/v0.0.2/voice-en-gb-alan-low.tar.gz
# Usage: VOICE_DIR=/path/to/voice bash scripts/make-voice.sh
set -euo pipefail
cd "$(dirname "$0")/.."
VOICE_DIR="${VOICE_DIR:-voice}"
OUT=public/audio/vo
mkdir -p "$OUT"
say() { # id, spoken text (spelled for pronunciation), length scale
  echo "$2" | python3 -m piper -m "$VOICE_DIR/en-gb-alan-low.onnx" -c "$VOICE_DIR/en-gb-alan-low.onnx.json" \
    -f "$OUT/$1.raw.wav" --length-scale "$3" --noise-scale 0.5 --noise-w 0.6 >/dev/null 2>&1
  ffmpeg -loglevel error -y -i "$OUT/$1.raw.wav" \
    -af "highpass=f=70,lowpass=f=7600,equalizer=f=180:t=q:w=1:g=2.5,equalizer=f=3200:t=q:w=1.2:g=2,acompressor=threshold=-20dB:ratio=3:attack=5:release=80,silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,areverse,loudnorm=I=-18:TP=-2:LRA=7" \
    -ar 48000 -ac 1 -c:a pcm_s16le "$OUT/$1.wav"
  rm "$OUT/$1.raw.wav"
}
say vo1  "Every bag has a next move."                              1.12
say vo2  "Meet bag swap. A memecoin O T C marketplace."            1.0
say vo3  "Find a buyer. Set your price. Choose your amount."       1.08
say vo4  "Review what changes hands, then confirm in your wallet." 1.06
say vo5a "New hands."                                              1.18
say vo5b "Same bags."                                              1.18
say vo6  "Explore the public testnet, at use bag swap dot com."    1.08
for f in "$OUT"/*.wav; do printf '%s %ss\n' "$(basename "$f")" "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f")"; done
