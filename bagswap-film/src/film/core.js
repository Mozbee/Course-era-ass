// BagSwap — "The Next Handoff"
// Deterministic film core: computeFrame(frame, format) returns every style string and
// text value the shared template (template.js) needs. No randomness without a seed,
// no network, no clocks — the same frame always renders the same picture.
//
// The body of computeFrame is mirrored verbatim in the canvas preview
// (Main.dc.html → Component.film). Edit here, then paste the body across.

export const FPS = 60;
export const DURATION = 1800; // exactly 30 s
export const FORMATS = {
  landscape: { width: 1920, height: 1080 },
  vertical: { width: 1080, height: 1920 },
};

// Scene windows — start-inclusive, end-exclusive frames.
export const SCENES = [
  { id: 'hook', name: 'The hook', from: 0, to: 180 },
  { id: 'market', name: 'The marketplace', from: 180, to: 420 },
  { id: 'terms', name: 'Your terms', from: 420, to: 720 },
  { id: 'review', name: 'Review', from: 720, to: 1020 },
  { id: 'handoff', name: 'The signature handoff', from: 1020, to: 1440 },
  { id: 'invite', name: 'The invitation', from: 1440, to: 1800 },
];

export function computeFrame(frame, fmt) {
  const f = Math.max(0, Math.min(1799, frame));
  const V = fmt === 'vertical';
  const W = V ? 1080 : 1920;
  const H = V ? 1920 : 1080;
  const cl = (x) => Math.min(1, Math.max(0, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const eo = (t) => 1 - Math.pow(1 - t, 3);
  const eo5 = (t) => 1 - Math.pow(1 - t, 5);
  const eio = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const ss = (t) => t * t * (3 - 2 * t);
  const n = (x) => Math.round(x * 100) / 100;
  const n4 = (x) => Math.round(x * 10000) / 10000;
  const R = (fr, a, b) => cl((fr - a) / (b - a));
  const r = (a, b) => R(f, a, b);
  const win = (a, b, c, d) => Math.min(eo(r(a, b)), 1 - eio(r(c, d)));
  const kf = (keys) => {
    if (f <= keys[0][0]) return keys[0][1];
    for (let i = 1; i < keys.length; i++) {
      if (f <= keys[i][0]) {
        const t = (f - keys[i - 1][0]) / (keys[i][0] - keys[i - 1][0]);
        return lerp(keys[i - 1][1], keys[i][1], eio(t));
      }
    }
    return keys[keys.length - 1][1];
  };
  const vis = (o) => 'opacity:' + n(cl(o)) + ';visibility:' + (cl(o) < 0.002 ? 'hidden' : 'visible') + ';';
  const pos = (x, y, o, extra, anchor) =>
    'left:' + n(x) + 'px;top:' + n(y) + 'px;' + vis(o) +
    'transform:translate(' + (anchor === 'l' ? '0' : '-50%') + ',-50%) ' + (extra || '') + ';';
  const rise = (t, d) => 'translateY(' + n((1 - eo5(cl(t))) * d) + 'px)';
  const mask = (t) => 'transform:translateY(' + n((1 - eo5(cl(t))) * 112) + '%);';
  const quad = (a, c, b, t) => [
    (1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0],
    (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1],
  ];
  const line = (a, b, o) => {
    const dx = b[0] - a[0], dy = b[1] - a[1];
    return 'left:' + n((a[0] + b[0]) / 2) + 'px;top:' + n((a[1] + b[1]) / 2) + 'px;width:' + n(Math.hypot(dx, dy)) + 'px;' + vis(o) +
      'transform:translate(-50%,-50%) rotate(' + n((Math.atan2(dy, dx) * 180) / Math.PI) + 'deg);';
  };

  // ---------- layout (per format; timing is shared) ----------
  const cx = W / 2;
  const hook = V ? [540, 800] : [960, 440];
  const mk = V ? [540, 470, 0.55] : [560, 390, 0.62];
  const formR = V ? { x: 120, y: 734, w: 840, h: 611, s: 840 / 880 } : { x: 810, y: 240, w: 880, h: 640, s: 1 };
  const revR = V ? { x: 120, y: 593, w: 840, h: 535, s: 840 / 1100 } : { x: 410, y: 250, w: 1100, h: 700, s: 1 };
  const slot = (q) => [q.x + 68 * q.s, q.y + 68 * q.s, (56 / 380) * q.s];
  const sF = slot(formR);
  const sR = slot(revR);
  const formC = [formR.x + formR.w / 2, formR.y + formR.h / 2];
  const revC = [revR.x + revR.w / 2, revR.y + revR.h / 2];
  const restS = V ? [540, 400] : [480, 400];
  const restB = V ? [540, 1030] : [1440, 400];
  const ctrl = V ? [1010, 715] : [960, 100];
  const avS = V ? [540, 655] : [480, 675];
  const avB = V ? [540, 1285] : [1440, 675];
  const uFrom = V ? [430, 1180] : [1330, 640];
  const uCtrl = V ? [150, 895] : [960, 920];
  const uTo = V ? [430, 610] : [590, 640];
  const mid = V ? [540, 800] : [960, 520];
  const fin = V ? [540, 560, 0.55] : [960, 320, 0.5];

  const v = { W: W, H: H, fsH: V ? 54 : 68, cw: V ? 840 : 620 };

  // ---------- the bag: one object, one continuous path through the film ----------
  const dl = Math.hypot(ctrl[0] - restS[0], ctrl[1] - restS[1]);
  const dir0 = [(ctrl[0] - restS[0]) / dl, (ctrl[1] - restS[1]) / dl];
  const bagPose = (fr) => {
    const Q = (a, b) => R(fr, a, b);
    let x = hook[0], y, s, rot = 0, ry, sx = 1, sy = 1, u;
    const p1 = Q(0, 180);
    y = hook[1] + 26 * (1 - eo(p1));
    s = 0.86 + 0.14 * eo(p1); // slow camera push
    u = eio(Q(172, 252));
    x = lerp(x, mk[0], u); y = lerp(y, mk[1], u); s = lerp(s, mk[2], u); rot = -5 * u;
    ry = -26 * eio(Q(176, 240)) + 14 * eio(Q(236, 320));
    y += Math.sin((fr - 252) / 46) * 7 * Q(252, 290) * (1 - Q(380, 400));
    u = eio(Q(392, 446)); // into the order form header
    x = lerp(x, sF[0], u); y = lerp(y, sF[1], u); s = lerp(s, sF[2], u); rot = lerp(rot, 0, u); ry = lerp(ry, 0, u);
    u = eio(Q(722, 778)); // follows the panel as it reorganises
    x = lerp(x, sR[0], u); y = lerp(y, sR[1], u); s = lerp(s, sR[2], u);
    u = eio(Q(1012, 1072)); // out to the seller
    x = lerp(x, restS[0], u); y = lerp(y, restS[1], u); s = lerp(s, 0.42, u);
    const an = Math.sin(Math.PI * Q(1072, 1102)); // anticipation
    x -= dir0[0] * 16 * an; y -= dir0[1] * 16 * an; sx *= 1 + 0.05 * an; sy *= 1 - 0.05 * an;
    const tt = Q(1102, 1190); // the handoff arc
    if (tt > 0) {
      const e = eio(tt);
      const q = quad(restS, ctrl, restB, e);
      x = q[0]; y = q[1];
      rot = (V ? -10 : 10) * Math.sin(Math.PI * e);
      s *= 1 + 0.1 * Math.sin(Math.PI * e);
    }
    const st = Q(1190, 1262); // tiny damped settle
    if (st > 0) {
      const d = Math.exp(-4.5 * st) * Math.sin(st * Math.PI * 4) * (1 - st);
      sx *= 1 + 0.07 * d; sy *= 1 - 0.07 * d; y += 6 * d;
    }
    y += Math.sin((fr - 1262) / 52) * 5 * Q(1262, 1300) * (1 - Q(1420, 1440));
    u = eio(Q(1440, 1506)); // match-cut into the brand mark
    x = lerp(x, fin[0], u); y = lerp(y, fin[1], u); s = lerp(s, fin[2], u); rot = lerp(rot, 0, u);
    return { x: x, y: y, s: s, rot: rot, ry: ry, sx: sx, sy: sy };
  };

  const bp = bagPose(f);
  const beamX = lerp(V ? 220 : 420, W + 320, ss(r(0, 54)));
  const bagW = 380 * bp.s;
  const cover = cl((beamX - (bp.x - bagW / 2)) / bagW);
  const clip = f < 60 ? 'clip-path:inset(-30% ' + (cover >= 1 ? '-30' : n((1 - cover) * 100)) + '% -30% -30%);' : '';
  const glowA = kf([[0, 0], [18, 0.2], [40, 0.95], [90, 0.55], [380, 0.5], [440, 0.25], [1012, 0.25], [1072, 0.5], [1146, 0.95], [1230, 0.6], [1440, 0.55], [1506, 0.8], [1580, 0.6]]);
  v.bag = pos(bp.x, bp.y, 1,
    'perspective(1200px) rotateY(' + n(bp.ry) + 'deg) rotate(' + n(bp.rot) + 'deg) scale(' + n4(bp.s * bp.sx) + ',' + n4(bp.s * bp.sy) + ')') +
    clip + 'filter:drop-shadow(0 0 ' + n(22 + 34 * glowA) + 'px rgba(37,99,235,' + n(glowA * 0.85) + ')) drop-shadow(0 24px 30px rgba(0,0,0,0.55));';
  v.bagBody = 'opacity:' + n(0.12 + 0.88 * eo(r(26, 84))) + ';';
  const bt = eo(r(40, 88));
  v.bagB = 'opacity:' + n(bt) + ';filter:blur(' + n(9 * (1 - bt)) + 'px);';
  let sh = -200;
  if (f < 70) sh = ((beamX - bp.x) / bagW) * 200 + 100;
  [[236, 300], [1176, 1236], [1508, 1572]].forEach((w) => {
    const t = r(w[0], w[1]);
    if (t > 0 && t < 1) sh = lerp(-80, 280, eio(t));
  });
  v.sheen = 'transform:translateX(' + n(sh - 30) + 'px);';
  for (let k = 1; k <= 3; k++) {
    const fr = f - 4 * k;
    const tr = R(fr, 1102, 1190);
    const gp = bagPose(fr);
    v['g' + k] = pos(gp.x, gp.y, tr > 0 && tr < 1 ? [0.32, 0.18, 0.09][k - 1] : 0,
      'rotate(' + n(gp.rot) + 'deg) scale(' + n4(gp.s) + ')');
  }

  // ---------- atmosphere ----------
  v.beam = 'left:' + n(beamX) + 'px;top:0;height:' + H + 'px;' + vis(1 - r(40, 62));
  const gx = kf([[0, hook[0]], [172, hook[0]], [252, mk[0]], [392, mk[0]], [446, formC[0]], [722, formC[0]], [778, revC[0]], [1012, revC[0]], [1072, mid[0]], [1440, mid[0]], [1506, fin[0]]]);
  const gy = kf([[0, hook[1]], [172, hook[1]], [252, mk[1]], [392, mk[1]], [446, formC[1]], [722, formC[1]], [778, revC[1]], [1012, revC[1]], [1072, mid[1]], [1440, mid[1]], [1506, fin[1]]]);
  const go = kf([[0, 0.12], [34, 0.85], [180, 0.7], [252, 0.55], [446, 0.4], [1072, 0.45], [1146, 0.8], [1260, 0.5], [1440, 0.5], [1506, 0.8], [1800, 0.8]]);
  v.bg = pos(gx, gy, go, '');
  let seed = 20261005;
  const rnd = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = 0; i < 14; i++) {
    const px = rnd() * W, py = rnd() * H, sp = 0.12 + rnd() * 0.3, sz = 2 + rnd() * 3, ph = rnd() * 6.28;
    const y = (((py - f * sp) % H) + H) % H;
    const x = px + Math.sin(f / 90 + ph) * 14;
    const o = (0.18 + 0.4 * Math.pow(Math.sin(f / 55 + ph), 2)) * eo(r(10, 60));
    v['p' + i] = 'left:' + n(x) + 'px;top:' + n(y) + 'px;width:' + n(sz) + 'px;height:' + n(sz) + 'px;opacity:' + n(o) + ';';
  }

  // ---------- 1 · the hook ----------
  v.s1 = pos(hook[0], V ? 1160 : 820, 1 - eio(r(160, 184)), 'translateY(' + n(-24 * eio(r(160, 184))) + 'px)');
  v.s1i = mask(r(92, 128));

  // ---------- 2 · the marketplace ----------
  const out2 = 1 - eio(r(392, 418));
  v.meet = pos(mk[0], V ? 690 : 660, out2, '');
  v.meetI = mask(r(204, 236));
  v.sub = pos(mk[0], V ? 772 : 745, out2, '');
  v.subI = mask(r(286, 318));
  const buyP = V ? [540, 1020] : [1330, 395];
  const sellP = V ? [540, 1310] : [1330, 690];
  const tIn1 = eo5(r(250, 296)), tIn2 = eo5(r(264, 310));
  const foc = eio(r(338, 380));
  const buyOut = 1 - eio(r(396, 424));
  const tilt = V ? 0.4 : 1;
  v.buy = pos(buyP[0] + (1 - tIn1) * 90, buyP[1], tIn1 * lerp(1, 0.5, foc) * buyOut,
    'perspective(1400px) rotateY(' + n(lerp(-24, -8, tIn1) * tilt) + 'deg) scale(' + n4(lerp(1, 0.94, foc)) + ')') + 'width:' + v.cw + 'px;';
  const sellZ = eio(r(404, 446));
  v.sell = pos(sellP[0] + (1 - tIn2) * 90, sellP[1], tIn2 * (1 - eio(r(424, 446))),
    'perspective(1400px) rotateY(' + n(lerp(-24, -8, tIn2) * tilt * (1 - foc * 0.6)) + 'deg) scale(' + n4(lerp(1, 1.05, foc) + 0.08 * sellZ) + ')') + 'width:' + v.cw + 'px;';
  v.note2 = pos(V ? 540 : 1330, V ? 1500 : 868, eo(r(300, 330)) * buyOut, '');
  const eT = eio(r(404, 440));
  const sweep = eio(r(432, 474));
  v.edge = pos(lerp(sellP[0], formC[0], eT), lerp(sellP[1] - 130, formR.y, eT) + sweep * formR.h, win(404, 416, 466, 482), '') +
    'width:' + n(lerp(v.cw * 1.05, formR.w, eT)) + 'px;';

  // ---------- 3 · your terms ----------
  const morph = eio(r(720, 778));
  const shellOut = eio(r(1004, 1040));
  const clip3 = 'clip-path:inset(0 0 ' + n((1 - sweep) * 100) + '% 0 round 28px);';
  v.shell = 'left:' + n(lerp(formR.x, revR.x, morph)) + 'px;top:' + n(lerp(formR.y, revR.y, morph)) + 'px;width:' +
    n(lerp(formR.w, revR.w, morph)) + 'px;height:' + n(lerp(formR.h, revR.h, morph)) + 'px;' +
    vis((f < 432 ? 0 : 1) * (1 - shellOut)) + clip3 + 'transform:scale(' + n4(1 - 0.04 * shellOut) + ');';
  v.form = 'left:' + formR.x + 'px;top:' + formR.y + 'px;' + vis((f < 432 ? 0 : 1) * (1 - eio(r(712, 738)))) + clip3 +
    'transform:scale(' + n4(formR.s) + ') translateY(' + n(-14 * eio(r(712, 738))) + 'px);';
  const amtSteps = ['0', '1', '10', '100', '1,000', '10,000', '100,000', '1,000,000'];
  const ai = Math.min(7, Math.floor(r(468, 520) * 7.999));
  v.amt = amtSteps[ai];
  v.amtC = ai === 0 ? 'color:#475569;' : 'color:#FFFFFF;';
  const pi = Math.min(2, Math.floor(r(548, 566) * 2.999));
  v.price = ['0', '2', '20'][pi];
  v.priceC = pi === 0 ? 'color:#475569;' : 'color:#FFFFFF;';
  const blink = Math.floor(f / 16) % 2 === 0 ? 1 : 0;
  v.car1 = 'opacity:' + (f >= 454 && f < 538 ? (f >= 468 && f < 522 ? 1 : blink) : 0) + ';';
  v.car2 = 'opacity:' + (f >= 540 && f < 612 ? (f >= 548 && f < 568 ? 1 : blink) : 0) + ';';
  const tg = eio(r(622, 640));
  v.knob = 'transform:translateX(' + n(tg * 28) + 'px);';
  v.trackOn = 'opacity:' + n(tg) + ';';
  v.pf = tg > 0.5 ? 'Allowed' : 'Off';
  const rects = [[40, 132, 800, 132], [40, 292, 800, 132], [452, 452, 388, 108]];
  const m1 = eio(r(536, 552)), m2 = eio(r(606, 622));
  const rr = [0, 1, 2, 3].map((i) => lerp(lerp(rects[0][i], rects[1][i], m1), rects[2][i], m2));
  v.ring = 'left:' + n(rr[0]) + 'px;top:' + n(rr[1]) + 'px;width:' + n(rr[2]) + 'px;height:' + n(rr[3]) + 'px;' + vis(win(452, 466, 690, 712));
  const tP = V ? [[540, 330], [540, 420], [540, 510]] : [[150, 400], [150, 500], [150, 600]];
  const lineT = [460, 538, 614];
  for (let i = 0; i < 3; i++) {
    const dim = i < 2 ? lerp(1, 0.32, eio(r(lineT[i + 1], lineT[i + 1] + 16))) : 1;
    v['t' + (i + 1)] = pos(tP[i][0], tP[i][1], dim * (1 - eio(r(704, 730))), '', V ? 'c' : 'l');
    v['t' + (i + 1) + 'i'] = mask(r(lineT[i], lineT[i] + 28));
  }

  // ---------- 4 · review ----------
  v.rev = 'left:' + revR.x + 'px;top:' + revR.y + 'px;' + vis(r(756, 790) * (1 - eio(r(1000, 1030)))) +
    'transform:scale(' + n4(revR.s) + ') ' + rise(r(756, 790), 12) + ';';
  [772, 786, 812, 826, 840, 854, 866].forEach((a, i) => {
    v['r' + (i + 1)] = vis(eo(r(a, a + 24))) + 'transform:' + rise(r(a, a + 24), 16) + ';';
  });
  v.hl = vis(win(858, 876, 1000, 1020) * 0.9);
  const press = Math.sin(Math.PI * r(902, 918));
  v.btn = 'transform:scale(' + n4(1 - 0.03 * press) + ');';
  v.btnL = f < 912 ? 'Confirm in wallet' : 'Waiting for wallet approval';
  v.btnN = vis(eo(r(914, 934)));
  v.spin = vis(eo(r(914, 934))) + 'transform:rotate(' + n(f * 6) + 'deg);';
  v.kn = pos(cx, V ? 400 : 160, 1 - eio(r(1000, 1024)), '');
  v.knI = mask(r(744, 776));

  // ---------- 5 · the signature handoff ----------
  const avOut = 1 - eio(r(1428, 1452));
  const inS = eo5(r(1034, 1072)), inB = eo5(r(1046, 1084));
  v.avS = pos(avS[0], avS[1], inS * avOut, 'scale(' + n4(0.86 + 0.14 * inS) + ')');
  v.avB = pos(avB[0], avB[1], inB * avOut, 'scale(' + n4(0.86 + 0.14 * inB) + ')');
  v.ownS = 'opacity:' + n(1 - eio(r(1150, 1190))) + ';';
  v.ownB = 'opacity:' + n(eio(r(1186, 1222))) + ';';
  v.cSa = 'opacity:' + n(1 - eio(r(1192, 1212))) + ';';
  v.cSb = 'opacity:' + n(eio(r(1204, 1228))) + ';';
  v.cBa = 'opacity:' + n(1 - eio(r(1192, 1212))) + ';';
  v.cBb = 'opacity:' + n(eio(r(1204, 1228))) + ';';
  v.arcD = 'M' + restS[0] + ' ' + restS[1] + ' Q' + ctrl[0] + ' ' + ctrl[1] + ' ' + restB[0] + ' ' + restB[1];
  v.usdD = 'M' + uFrom[0] + ' ' + uFrom[1] + ' Q' + uCtrl[0] + ' ' + uCtrl[1] + ' ' + uTo[0] + ' ' + uTo[1];
  const pathO = win(1046, 1086, 1428, 1452);
  v.arc = 'opacity:' + n(pathO * 0.5) + ';stroke-dashoffset:' + n(-f * 0.6) + ';';
  v.usdArc = 'opacity:' + n(pathO * 0.22) + ';stroke-dashoffset:' + n(f * 0.6) + ';';
  v.trail = 'stroke-dasharray:1 1;stroke-dashoffset:' + n4(1 - eio(r(1102, 1190))) + ';opacity:' + n(win(1102, 1112, 1240, 1320) * 0.9) + ';';
  const ue = eio(r(1102, 1190));
  const uq = quad(uFrom, uCtrl, uTo, ue);
  v.usd = pos(uq[0], uq[1], win(1094, 1108, 1186, 1204), 'scale(' + n4(1 - 0.3 * r(1186, 1204)) + ')');
  const bMid = quad(restS, ctrl, restB, 0.5), uMid = quad(uFrom, uCtrl, uTo, 0.5);
  const pm = [(bMid[0] + uMid[0]) / 2, (bMid[1] + uMid[1]) / 2];
  const pt = r(1140, 1190);
  v.pulse = pos(pm[0], pm[1], pt > 0 && pt < 1 ? (1 - pt) * 0.9 : 0, 'scale(' + n4(0.2 + 2.2 * eo(pt)) + ')');
  v.link = line(bMid, uMid, win(1136, 1146, 1150, 1174) * 0.85);
  const lt = r(1188, 1236);
  v.land = pos(restB[0], restB[1], lt > 0 && lt < 1 ? (1 - lt) * 0.8 : 0, 'scale(' + n4(0.5 + 1.1 * eo(lt)) + ')');
  v.nh = pos(cx, V ? 1462 : 900, avOut, '');
  v.nhI = mask(r(1112, 1140));
  v.sb = pos(cx, V ? 1548 : 985, avOut, '');
  v.sbI = mask(r(1198, 1226));
  v.ill = pos(cx, V ? 270 : 110, win(1052, 1080, 1428, 1450), '');

  // ---------- 6 · the invitation ----------
  const fl = r(1462, 1522);
  v.flare = pos(fin[0], fin[1], fl > 0 && fl < 1 ? (1 - fl) * 0.8 : 0, 'scale(' + n4(0.4 + 1.8 * eo(fl)) + ')');
  v.wm = pos(fin[0], V ? 790 : 512, 1, '');
  v.wmI = mask(r(1488, 1528)) + 'letter-spacing:' + n4(lerp(0.12, -0.035, eo5(r(1488, 1540)))) + 'em;';
  v.tag = pos(cx, V ? 896 : 612, eo(r(1522, 1552)), rise(r(1522, 1552), 18));
  v.cta = pos(cx, V ? 1040 : 724, eo(r(1546, 1578)), rise(r(1546, 1578), 22));
  v.url = pos(cx, V ? 1142 : 820, eo(r(1562, 1594)), rise(r(1562, 1594), 18));
  v.sup = pos(cx, V ? 1232 : 902, eo(r(1578, 1610)), rise(r(1578, 1610), 14));
  return v;
}
