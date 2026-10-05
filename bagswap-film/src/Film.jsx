import React, { useMemo } from 'react';
import { AbsoluteFill, Audio, continueRender, delayRender, staticFile, useCurrentFrame } from 'remotion';
import { computeFrame } from './film/core.js';
import { TEMPLATE } from './film/template.js';

// Manrope ships in public/fonts so renders never hit the network.
const fontHandle = delayRender('Loading Manrope');
Promise.all(
  [500, 600, 700, 800].map((w) => {
    const face = new FontFace('Manrope', `url(${staticFile(`fonts/manrope-latin-${w}-normal.woff2`)}) format('woff2')`, { weight: String(w) });
    document.fonts.add(face);
    return face.load();
  }),
).then(() => continueRender(fontHandle), (err) => { console.error(err); continueRender(fontHandle); });

const fill = (v) => TEMPLATE.replace(/\{\{\s*v\.([\w$]+)\s*\}\}/g, (_, k) => (v[k] === undefined ? '' : String(v[k])));

export const Film = ({ format, audio }) => {
  const frame = useCurrentFrame();
  const html = useMemo(() => fill(computeFrame(frame, format)), [frame, format]);
  return (
    <AbsoluteFill style={{ backgroundColor: '#05070D' }}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {/* One premixed track: score + sound design ducked under the VO (built by `npm run audio`). */}
      {audio ? <Audio src={staticFile('audio/mix.wav')} /> : null}
    </AbsoluteFill>
  );
};
