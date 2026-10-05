// Voiceover script with frame cues (60 fps). One line per audio slot.
// Pronunciation: "BagSwap" = "bag swap"; "OTC" = the letters O T C; URL = "use bagswap dot com".
// `file` is the slot the render looks for in public/audio/vo/. Drop in a recorded take with the same name to replace it.

export const VO = [
  { id: 'vo1', scene: 'hook', from: 24, text: 'Every bag has a next move.', file: 'vo1.wav' },
  { id: 'vo2', scene: 'market', from: 195, text: 'Meet BagSwap. A memecoin O T C marketplace.', file: 'vo2.wav' },
  { id: 'vo3', scene: 'terms', from: 456, text: 'Find a buyer. Set your price. Choose your amount.', file: 'vo3.wav' },
  { id: 'vo4', scene: 'review', from: 744, text: 'Review what changes hands, then confirm in your wallet.', file: 'vo4.wav' },
  { id: 'vo5a', scene: 'handoff', from: 1110, text: 'New hands.', file: 'vo5a.wav' },
  { id: 'vo5b', scene: 'handoff', from: 1200, text: 'Same bags.', file: 'vo5b.wav' },
  { id: 'vo6', scene: 'invite', from: 1500, text: 'Explore the public testnet at use bagswap dot com.', file: 'vo6.wav' },
];
