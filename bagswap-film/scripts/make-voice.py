#!/usr/bin/env python3
"""Narration: a warm British female voice (Kokoro TTS v1.0, voice "bf_emma"), built offline.

Each line is assembled phrase by phrase with deliberate pauses, then fitted to its cue window
from src/film/script.js. Output: public/audio/vo/<slot>.wav (48 kHz mono, 16-bit, -18 LUFS).
A recorded take dropped into the same slot replaces it; then run `npm run audio && npm run render`.

Setup (model files are on GitHub, ~350 MB):
  pip install kokoro-onnx soundfile
  curl -LO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
  curl -LO https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
Usage: KOKORO_DIR=/path/to/models python3 scripts/make-voice.py
"""
import os
import subprocess
import tempfile

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS = os.environ.get("KOKORO_DIR", "voice")
OUT = os.path.join(ROOT, "public/audio/vo")
VOICE = os.environ.get("VO_VOICE", "bf_emma")
LANG = "en-gb"

# Segments: plain text, or "ph:" + IPA where the default reading is wrong
#   "memecoin" -> meme-coin, "O T C" -> the letters, URL "use" -> the verb /juːz/, "BagSwap" -> "bag swap".
# Each line: (slot, max seconds before the next cue, base speed, [(segment, pause after), ...])
LINES = [
    ("vo1", 2.4, 0.90, [("Every bag has a next move.", 0)]),
    ("vo2", 4.1, 0.94, [("ph:mˈiːt bˈaɡ swˈɒp.", 0.30),
                        ("ph:ɐ mˈiːmkˌɔɪn, ˈəʊ tˈiː sˈiː mˈɑːkɪtplˌeɪs.", 0)]),
    ("vo3", 4.4, 0.94, [("Find a buyer.", 0.30), ("Set your price.", 0.28), ("Choose your amount.", 0)]),
    ("vo4", 4.3, 0.95, [("Review what changes hands,", 0.16), ("then confirm in your wallet.", 0)]),
    ("vo5a", 1.3, 0.86, [("New hands.", 0)]),
    ("vo5b", 1.5, 0.86, [("Same bags.", 0)]),
    ("vo6", 4.0, 0.93, [("Explore the public testnet,", 0.18),
                        ("ph:at jˈuːz bˈaɡ swˈɒp dˈɒt kˈɒm.", 0)]),
]


def trim(x, sr, thresh=0.01, pad=0.03):
    idx = np.where(np.abs(x) > thresh)[0]
    if len(idx) == 0:
        return x
    a = max(0, idx[0] - int(pad * sr))
    b = min(len(x), idx[-1] + int(pad * 2 * sr))
    return x[a:b]


def render(k, segments, speed):
    parts, sr = [], 24000
    for seg, gap in segments:
        if seg.startswith("ph:"):
            s, sr = k.create(seg[3:], voice=VOICE, speed=speed, lang=LANG, is_phonemes=True)
        else:
            s, sr = k.create(seg, voice=VOICE, speed=speed, lang=LANG)
        s = trim(np.asarray(s, dtype=np.float32), sr)
        # short fades so joins never click
        f = int(0.008 * sr)
        s[:f] *= np.linspace(0, 1, f)
        s[-f:] *= np.linspace(1, 0, f)
        parts.append(s)
        if gap:
            parts.append(np.zeros(int(gap * sr), dtype=np.float32))
    return np.concatenate(parts), sr


def main():
    k = Kokoro(os.path.join(MODELS, "kokoro-v1.0.onnx"), os.path.join(MODELS, "voices-v1.0.bin"))
    os.makedirs(OUT, exist_ok=True)
    for slot, max_len, speed, segments in LINES:
        # Keep the natural pace; only nudge faster if the line would overrun its window.
        while True:
            audio, sr = render(k, segments, speed)
            dur = len(audio) / sr
            if dur <= max_len or speed >= 1.1:
                break
            speed = round(speed + 0.02, 2)
        with tempfile.NamedTemporaryFile(suffix=".wav") as tmp:
            sf.write(tmp.name, audio, sr)
            subprocess.run([
                "ffmpeg", "-loglevel", "error", "-y", "-i", tmp.name,
                "-af", "highpass=f=80,equalizer=f=220:t=q:w=1:g=1.5,equalizer=f=3500:t=q:w=1.4:g=1.5,"
                       "acompressor=threshold=-20dB:ratio=2.5:attack=6:release=90,loudnorm=I=-18:TP=-2:LRA=7",
                "-ar", "48000", "-ac", "1", "-c:a", "pcm_s16le", os.path.join(OUT, slot + ".wav"),
            ], check=True)
        print(f"{slot}.wav  {dur:.2f}s  (limit {max_len}s, speed {speed})")


if __name__ == "__main__":
    main()
