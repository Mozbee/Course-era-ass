import React from 'react';
import { Composition } from 'remotion';
import { Film } from './Film.jsx';
import { DURATION, FPS, FORMATS } from './film/core.js';

export const Root = () => (
  <>
    <Composition
      id="BagSwapLandscape"
      component={Film}
      durationInFrames={DURATION}
      fps={FPS}
      width={FORMATS.landscape.width}
      height={FORMATS.landscape.height}
      defaultProps={{ format: 'landscape', audio: true }}
    />
    <Composition
      id="BagSwapVertical"
      component={Film}
      durationInFrames={DURATION}
      fps={FPS}
      width={FORMATS.vertical.width}
      height={FORMATS.vertical.height}
      defaultProps={{ format: 'vertical', audio: true }}
    />
  </>
);
