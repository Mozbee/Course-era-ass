# BagSwap — The Next Handoff

A 30-second product film for BagSwap, the memecoin OTC marketplace on Solana. One blue bag runs through the whole film. It starts as a hero object, anchors the marketplace, sits in the order form and the review panel, passes from seller to buyer, and resolves into the closing brand mark.

| | |
|---|---|
| Landscape master | 1920 × 1080, 60 fps, 1,800 frames (exactly 30 s) |
| Vertical social | 1080 × 1920, 60 fps, 1,800 frames, laid out separately (not cropped) |
| Video | H.264 High, yuv420p (BT.709, TV range), CRF 17, fast-start |
| Audio | AAC 192 kb/s, 48 kHz stereo: original score, sound design and a British female voiceover |

## What's in this folder

**Already generated:**

- `out/BagSwap-Intro-Landscape.mp4` and `out/BagSwap-Intro-Vertical.mp4`: the finished renders.
- `out/BagSwap-Storyboard-*.jpg` and `out/stills/`: one still per scene, captured from the real composition.
- `public/audio/score.wav`: the score and sound design, with no voice.
- `public/audio/mix.wav`: the final mix used in both renders.
- `public/audio/vo/*.wav`: the voiceover stems, one per line.
- `preview.html`: a browser player with play, pause, replay, a scrubber, scene jumps and a format switch.

**Not included:** the optional 8-second website loop. It was not built.

## Edit

The whole film comes from three files:

- `src/film/core.js`: timing, layouts and motion. `computeFrame(frame, format)` is a pure function of the frame number. Scene windows, positions for each format, and every ease and keyframe live here. There is no unseeded randomness, no clock and no network.
- `src/film/template.js`: the stage markup, built from editable HTML/SVG layers. Cards, type and the bag are live layers, not screenshots.
- `src/film/script.js`: the voiceover lines, their cue frames and their audio slot filenames.

`src/Film.jsx` fills the template for each frame. `src/Root.jsx` registers the `BagSwapLandscape` and `BagSwapVertical` compositions. Both compositions share all content and timing; only their layout differs.

The vertical layout keeps essential text inside about 120 px side gutters, 220 px top clearance and 320 px bottom clearance.

## Preview

```bash
npm ci
npx http-server -c-1 .     # then open http://localhost:8080/preview.html
npm run studio             # Remotion Studio, for frame-accurate scrubbing
```

## Render

```bash
npm ci
npm run audio                                   # rebuilds score.wav and mix.wav from code and the VO stems
export BROWSER_EXECUTABLE=/path/to/chrome-headless-shell   # optional; Remotion downloads one if unset
npm run render                                  # both MP4s into out/, then finalize.sh (yuv420p, fast-start)
npm run stills                                  # storyboard stills (uses Playwright)
```

If `BROWSER_EXECUTABLE` is unset, remove the `--browser-executable` flag from the two render scripts.

## Audio

- **Score:** original and generated in code by `scripts/make-audio.mjs`, with no samples. It is a 120 BPM D-minor pulse with sub-bass and a filtered pad. It builds toward the handoff and resolves to F major for the call to action. The script also adds interface ticks, card movement, a handoff accent, and a landing and logo flare. The music ducks by about 7.5 dB under each voice line and fades out over the last 1.2 s.
- **Voice:** a warm, conversational British female voice, built offline with Kokoro TTS v1.0 (Apache-2.0), voice `bf_emma`, by `scripts/make-voice.py` (`npm run voice`).
  - Each line is assembled phrase by phrase with deliberate pauses (for example "Find a buyer. · Set your price. · Choose your amount."), kept at a natural pace and checked against its cue window.
  - Pronunciation is pinned with phonemes where needed: "bag swap", "meme-coin", O-T-C as letters, and "use" in the URL as the verb.
  - To use a recorded take, replace the matching `public/audio/vo/<slot>.wav` (48 kHz, 16-bit mono WAV) and run `npm run audio:replace`. That rebuilds the mix and swaps only the audio in both MP4s, copying the video stream untouched.

### Voiceover script and slots

| Slot | Cue | Line (as written) | Spoken as |
|---|---|---|---|
| vo1.wav | 0.40 s (f24) | Every bag has a next move. | — |
| vo2.wav | 3.25 s (f195) | Meet BagSwap. A memecoin O T C marketplace. | "bag swap", O-T-C as letters |
| vo3.wav | 7.60 s (f456) | Find a buyer. Set your price. Choose your amount. | — |
| vo4.wav | 12.40 s (f744) | Review what changes hands, then confirm in your wallet. | — |
| vo5a.wav | 18.50 s (f1110) | New hands. | as the bag travels |
| vo5b.wav | 20.00 s (f1200) | Same bags. | as the bag settles |
| vo6.wav | 25.00 s (f1500) | Explore the public testnet at use bagswap dot com. | "use bagswap dot com" |

Voice direction: an adult female British voice, warm, confident, conversational and expressive, with realistic pauses. No trailer delivery and no celebrity imitation. Each line must fit before the next cue; the current takes run 1.1–4.2 s and all end before the next cue.

## Scenes

| # | Frames | Beat | On screen |
|---|---|---|---|
| 1 | 0–179 | A blue light sweep reveals the bag; the B resolves; slow push | Your next move. |
| 2 | 180–419 | The bag turns and anchors the marketplace; the sell listing comes forward | Meet BagSwap. / The memecoin OTC marketplace. |
| 3 | 420–719 | Through the card edge into a sell-listing form: amount, then price, then partial fills | Your amount. / Your price. / Your terms. |
| 4 | 720–1019 | The form reorganises into a trade summary; the confirm button is pressed | Know what changes hands. |
| 5 | 1020–1439 | Signature handoff: the bag arcs from seller to buyer while 20 USDC travels the other way | New hands. / Same bags. |
| 6 | 1440–1799 | Match-cut to the brand mark; closing frame | BagSwap · Explore the public testnet · usebagswap.com · Solana devnet · Test tokens only · Mainnet disabled |

The call to action is fully settled by frame 1610 and holds still to frame 1799, about 3.2 s.

## Accuracy guardrails

- Every value is illustrative and labelled: "Illustrative example · not live orders", "Demo example", "Illustrative handoff" and "Illustrative · no transaction".
- The numbers stay consistent throughout: 1,000,000 BONK; the buyer pays 20 USDC; the seller platform fee is 0.5% = 0.1 USDC; the seller receives 19.9 USDC. Solana network fees are stated as separate.
- The film shows no wallet signature, transaction hash, receipt or live price. It makes no claim of a token, airdrop, audit, guaranteed liquidity, instant execution, zero fees or a mainnet launch, and shows no X handle.
- **Logo:** no logo file was supplied, so the bag mark is a vector rebuild traced from the website header. It keeps the flared tied top, the neck gap, the rounded body and the black B, with depth, rim light and a sheen added. To use the official artwork, replace the bag `<svg>` in `src/film/template.js` with an `<img>` of the PNG.

Fonts: Manrope (SIL OFL) is bundled in `public/fonts/`.
