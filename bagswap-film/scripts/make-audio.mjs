// Builds the film's soundtrack deterministically from code (no samples, no network):
//   public/audio/score.wav  — original score + interface/handoff sound design (no voice)
//   public/audio/mix.wav    — score ducked under the voiceover + VO stems from public/audio/vo/
// 120 BPM, D minor → F major resolve. 48 kHz stereo, 16-bit, exactly 30.000 s.
import fs from 'node:fs';
import path from 'node:path';
import { VO } from '../src/film/script.js';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SR = 48000;
const DUR = 30;
const N = SR * DUR;
const L = new Float32Array(N), Rr = new Float32Array(N); // music bus
const sendL = new Float32Array(N), sendR = new Float32Array(N); // reverb send
const sfxL = new Float32Array(N), sfxR = new Float32Array(N); // sound design (not ducked as hard)

let seed = 1234567;
const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296 * 2 - 1; };
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const smooth = (t) => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
const put = (bufL, bufR, i, v, pan = 0) => { if (i < 0 || i >= N) return; bufL[i] += v * Math.min(1, 1 - pan); bufR[i] += v * Math.min(1, 1 + pan); };

// Energy curve across the film (0..1): builds toward the handoff, resolves for the CTA.
const energy = (t) => {
  const k = [[0, 0.25], [3, 0.35], [7, 0.5], [12, 0.6], [17, 0.75], [19.8, 1.0], [23.6, 0.85], [24.2, 0.45], [30, 0.35]];
  for (let i = 1; i < k.length; i++) if (t <= k[i][0]) return k[i - 1][1] + (k[i][1] - k[i - 1][1]) * smooth((t - k[i - 1][0]) / (k[i][0] - k[i - 1][0]));
  return 0.35;
};

// ---------- pad + sub bass (chord changes every 4 s, resolve at 24 s) ----------
const chords = [
  [0, 38, [50, 53, 57, 62]],
  [4, 34, [46, 50, 53, 58]],
  [8, 41, [53, 57, 60, 65]],
  [12, 36, [48, 52, 55, 60]],
  [16, 38, [50, 53, 57, 62, 65]],
  [20, 34, [46, 50, 53, 58, 62]],
  [24, 41, [53, 57, 60, 64, 67]],
];
chords.forEach(([start, bass, notes], ci) => {
  const end = ci + 1 < chords.length ? chords[ci + 1][0] : DUR;
  const a = Math.max(0, start - 0.3), b = Math.min(DUR, end + 1.2);
  const i0 = Math.floor(a * SR), i1 = Math.floor(b * SR);
  const env = (t) => smooth((t - a) / 0.9) * (1 - smooth((t - end + 0.2) / 1.4)) * (ci === chords.length - 1 ? 1 - smooth((t - 27.6) / 2.4) : 1);
  notes.forEach((m, ni) => {
    const pan = ((ni % 2) * 2 - 1) * 0.35;
    [-7, 0, 7].forEach((cents, k) => {
      const fr = mtof(m) * Math.pow(2, cents / 1200);
      let ph = (ni * 0.13 + k * 0.37) % 1, lp = 0, lp2 = 0;
      for (let i = i0; i < i1; i++) {
        const t = i / SR;
        ph += fr / SR; if (ph >= 1) ph -= 1;
        const saw = 2 * ph - 1;
        const cutoff = 300 + 1500 * energy(t) + (t > 24 ? 400 : 0);
        const c = 1 - Math.exp((-2 * Math.PI * cutoff) / SR);
        lp += c * (saw - lp); lp2 += c * (lp - lp2);
        const v = lp2 * env(t) * 0.022;
        put(L, Rr, i, v, pan + (k - 1) * 0.2);
        put(sendL, sendR, i, v * 0.8, pan);
      }
    });
  });
  // sub bass, pumped by the kick
  const fb = mtof(bass);
  let ph = 0;
  for (let i = i0; i < i1; i++) {
    const t = i / SR;
    ph += fb / SR;
    const beatPos = (t % 0.5) / 0.5;
    const pump = t > 3 && t < 24 ? 0.55 + 0.45 * smooth(beatPos * 2.2) : 1;
    const v = (Math.sin(2 * Math.PI * ph) + 0.18 * Math.sin(4 * Math.PI * ph)) * env(t) * 0.11 * (0.5 + 0.5 * energy(t)) * pump;
    put(L, Rr, i, v);
  }
});

// ---------- drums: low pulse + ticks ----------
const kick = (t0, gain) => {
  const i0 = Math.floor(t0 * SR);
  let ph = 0;
  for (let j = 0; j < SR * 0.45; j++) {
    const t = j / SR;
    const f = 46 + 80 * Math.exp(-t / 0.035);
    ph += f / SR;
    const v = Math.sin(2 * Math.PI * ph) * Math.exp(-t / 0.16) * gain;
    put(L, Rr, i0 + j, v);
  }
};
const hat = (t0, gain, pan) => {
  const i0 = Math.floor(t0 * SR);
  let prev = 0;
  for (let j = 0; j < SR * 0.06; j++) {
    const nz = rnd();
    const hp = nz - prev; prev = nz;
    put(L, Rr, i0 + j, hp * Math.exp(-j / SR / 0.012) * gain, pan);
  }
};
for (let b = 0; b < 60; b++) {
  const t = b * 0.5;
  const sec = t;
  if (sec < 3 && b % 2 === 1) continue; // half-time pulse in the hook
  if (sec >= 23.5 && sec < 24) continue; // breath before the resolve
  if (sec >= 24 && b % 4 !== 0) continue; // sparse in the outro
  const g = sec < 3 ? 0.32 : sec >= 24 ? 0.22 * (1 - smooth((sec - 26) / 3)) : 0.3 + 0.22 * energy(sec);
  kick(t, g);
  if (sec >= 7 && sec < 23.5) {
    hat(t + 0.25, 0.05 + 0.05 * energy(sec), 0.3);
    if (sec >= 17) { hat(t + 0.125, 0.025, -0.4); hat(t + 0.375, 0.025, -0.4); }
  }
}

// ---------- sound design ----------
const whoosh = (t0, dur, gain, f0, f1, pan = 0) => {
  const i0 = Math.floor(t0 * SR);
  let bp1 = 0, bp2 = 0;
  for (let j = 0; j < dur * SR; j++) {
    const u = j / (dur * SR);
    const f = f0 * Math.pow(f1 / f0, u);
    const c = 1 - Math.exp((-2 * Math.PI * f) / SR);
    const nz = rnd();
    bp1 += c * (nz - bp1); bp2 += c * (bp1 - bp2);
    const v = (bp1 - bp2) * Math.sin(Math.PI * u) ** 1.5 * gain;
    put(sfxL, sfxR, i0 + j, v, pan * (u * 2 - 1));
    put(sendL, sendR, i0 + j, v * 0.5);
  }
};
const bell = (t0, midi, gain, decay = 1.6, pan = 0) => {
  const i0 = Math.floor(t0 * SR), f = mtof(midi);
  const partials = [[1, 1], [2.0, 0.35], [2.76, 0.22], [5.4, 0.08]];
  for (let j = 0; j < decay * 2.5 * SR; j++) {
    const t = j / SR;
    let v = 0;
    partials.forEach(([m, a]) => { v += Math.sin(2 * Math.PI * f * m * t) * a * Math.exp(-t / (decay / m ** 0.5)); });
    v *= gain * Math.min(1, t / 0.004);
    put(sfxL, sfxR, i0 + j, v, pan);
    put(sendL, sendR, i0 + j, v * 0.9, pan);
  }
};
const tick = (t0, gain, f = 2400, pan = 0) => {
  const i0 = Math.floor(t0 * SR);
  for (let j = 0; j < SR * 0.03; j++) {
    const t = j / SR;
    put(sfxL, sfxR, i0 + j, (Math.sin(2 * Math.PI * f * t) * 0.7 + rnd() * 0.3) * Math.exp(-t / 0.006) * gain, pan);
  }
};
const thud = (t0, gain) => {
  const i0 = Math.floor(t0 * SR);
  let ph = 0;
  for (let j = 0; j < SR * 0.6; j++) {
    const t = j / SR;
    ph += (38 + 40 * Math.exp(-t / 0.05)) / SR;
    put(sfxL, sfxR, i0 + j, Math.sin(2 * Math.PI * ph) * Math.exp(-t / 0.25) * gain);
  }
};
const F = (fr) => fr / 60;
// 1 · hook: beam sweep, reveal accent
whoosh(0, 1.0, 0.22, 400, 5200, 1);
thud(F(22), 0.35);
bell(F(24), 74, 0.05, 1.8);
bell(F(30), 81, 0.03, 1.6, 0.2);
whoosh(F(80), 1.6, 0.06, 2000, 9000); // rising texture under "Your next move."
// 2 · marketplace
whoosh(F(172), 1.2, 0.09, 300, 2000, -1);
whoosh(F(250), 0.55, 0.07, 900, 3500, 1);
whoosh(F(264), 0.55, 0.06, 900, 3500, 1);
tick(F(340), 0.05, 1800);
whoosh(F(400), 1.0, 0.12, 600, 6000); // through the card edge
// 3 · your terms — one tick per typed step, price, toggle
[468, 476, 483, 490, 498, 505, 512, 520].forEach((fr) => tick(F(fr), 0.07, 2600, -0.2));
[540].forEach((fr) => tick(F(fr), 0.05, 1900));
[548, 566].forEach((fr) => tick(F(fr), 0.07, 2600, 0.2));
tick(F(612), 0.05, 1900);
tick(F(630), 0.09, 1500); tick(F(633), 0.05, 3000);
// 4 · review
whoosh(F(716), 0.9, 0.08, 500, 3000);
[772, 786, 812, 826, 840].forEach((fr, i) => tick(F(fr), 0.035, 2000 + i * 150));
tick(F(904), 0.1, 1300); tick(F(908), 0.06, 2600);
bell(F(916), 69, 0.02, 0.8);
// 5 · the handoff
whoosh(F(1012), 1.1, 0.08, 400, 2500, -1);
whoosh(F(1068), 0.6, 0.06, 1200, 400); // anticipation
whoosh(F(1100), 1.6, 0.2, 300, 4200, 1); // the travel
whoosh(F(1102), 1.5, 0.06, 2500, 600, -1); // the payment, opposite way
bell(F(1146), 77, 0.035, 2.2, -0.2); bell(F(1146), 81, 0.03, 2.2, 0.2); bell(F(1148), 84, 0.02, 2.4); // exchange accent
thud(F(1190), 0.4);
bell(F(1192), 72, 0.05, 2.6);
// 6 · invitation
whoosh(F(1438), 1.2, 0.1, 500, 3000);
thud(F(1462), 0.32);
bell(F(1464), 65, 0.05, 3.2); bell(F(1468), 72, 0.035, 3.2); bell(F(1474), 76, 0.03, 3.2);
tick(F(1548), 0.04, 1700);

// ---------- reverb (Schroeder) on the send ----------
const reverb = (inp, delays, out, wet) => {
  const combs = delays.map((d) => ({ buf: new Float32Array(d), i: 0, lp: 0 }));
  const aps = [[556, 0.5], [441, 0.5]].map(([d, g]) => ({ buf: new Float32Array(d), i: 0, g }));
  for (let n = 0; n < N; n++) {
    let s = 0;
    for (const c of combs) {
      const y = c.buf[c.i];
      c.lp = y * 0.7 + c.lp * 0.3;
      c.buf[c.i] = inp[n] + c.lp * 0.82;
      c.i = (c.i + 1) % c.buf.length;
      s += y;
    }
    for (const a of aps) {
      const y = a.buf[a.i];
      const x = s + y * -a.g;
      a.buf[a.i] = x;
      a.i = (a.i + 1) % a.buf.length;
      s = y + x * a.g;
    }
    out[n] += s * wet;
  }
};
reverb(sendL, [1557, 1617, 1491, 1422], L, 0.07);
reverb(sendR, [1277, 1356, 1188, 1116], Rr, 0.07);

// ---------- voiceover + ducking ----------
const readWav = (p) => {
  const b = fs.readFileSync(p);
  let o = 12, fmt = null, data = null;
  while (o < b.length) {
    const id = b.toString('ascii', o, o + 4), size = b.readUInt32LE(o + 4);
    if (id === 'fmt ') fmt = { ch: b.readUInt16LE(o + 10), sr: b.readUInt32LE(o + 12), bits: b.readUInt16LE(o + 22) };
    if (id === 'data') data = b.subarray(o + 8, o + 8 + size);
    o += 8 + size + (size % 2);
  }
  if (!fmt || fmt.bits !== 16 || fmt.sr !== SR) throw new Error(`${p}: expected 16-bit ${SR} Hz WAV`);
  const frames = data.length / 2 / fmt.ch, out = new Float32Array(frames);
  for (let i = 0; i < frames; i++) out[i] = data.readInt16LE(i * 2 * fmt.ch) / 32768;
  return out;
};
const voL = new Float32Array(N), voR = new Float32Array(N);
const duck = new Float32Array(N).fill(1);
const present = [];
for (const line of VO) {
  const p = path.join(root, 'public/audio/vo', line.file);
  if (!fs.existsSync(p)) { console.warn(`missing VO slot ${line.file} — leaving it silent`); continue; }
  const s = readWav(p), i0 = Math.round((line.from / 60) * SR);
  for (let i = 0; i < s.length && i0 + i < N; i++) { voL[i0 + i] += s[i] * 0.9; voR[i0 + i] += s[i] * 0.9; }
  const a = i0 - 0.12 * SR, b = i0 + s.length + 0.3 * SR;
  for (let i = Math.max(0, Math.floor(a - 0.2 * SR)); i < Math.min(N, b + 0.5 * SR); i++) {
    const g = i < a ? 1 - 0.58 * smooth((i - (a - 0.2 * SR)) / (0.2 * SR)) : i > b ? 1 - 0.58 * (1 - smooth((i - b) / (0.5 * SR))) : 0.42;
    duck[i] = Math.min(duck[i], g);
  }
  present.push(`${line.file} @ ${(line.from / 60).toFixed(2)}s → ${(line.from / 60 + s.length / SR).toFixed(2)}s`);
}

// ---------- write ----------
const fadeOut = (i) => 1 - smooth((i / SR - 28.8) / 1.2);
const writeWav = (file, chL, chR) => {
  let peak = 1e-9;
  for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(chL[i]), Math.abs(chR[i]));
  const g = Math.pow(10, -1 / 20) / peak;
  const buf = Buffer.alloc(44 + N * 4);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8);
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
  for (let i = 0; i < N; i++) {
    buf.writeInt16LE(Math.round(clamp(chL[i] * g, -1, 1) * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(clamp(chR[i] * g, -1, 1) * 32767), 46 + i * 4);
  }
  fs.writeFileSync(file, buf);
};
const sL = new Float32Array(N), sR = new Float32Array(N), mL = new Float32Array(N), mR = new Float32Array(N);
for (let i = 0; i < N; i++) {
  const fo = fadeOut(i);
  sL[i] = (L[i] + sfxL[i]) * fo; sR[i] = (Rr[i] + sfxR[i]) * fo;
  const sfxDuck = 0.55 + 0.45 * duck[i];
  mL[i] = (L[i] * duck[i] * 0.55 + sfxL[i] * sfxDuck * 0.6) * fo + voL[i];
  mR[i] = (Rr[i] * duck[i] * 0.55 + sfxR[i] * sfxDuck * 0.6) * fo + voR[i];
}
fs.mkdirSync(path.join(root, 'public/audio'), { recursive: true });
writeWav(path.join(root, 'public/audio/score.wav'), sL, sR);
writeWav(path.join(root, 'public/audio/mix.wav'), mL, mR);
console.log('score.wav + mix.wav written (30.000 s, 48 kHz stereo)');
present.forEach((p) => console.log('  VO', p));
