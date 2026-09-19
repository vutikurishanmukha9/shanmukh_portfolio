/**
 * DESIGN STUDIO // SHANMUKH
 * Core Design Tokens & Visual Architecture
 * 
 * Editorial Brutalism: Cream/Paper, Deep Ink, Signal Yellow,
 * Asymmetry, Thick Structural Borders, and Hard Brutalist Shadows.
 */

export const STUDIO_TOKENS = {
  colors: {
    // Core Identity
    ink: '#0A0A0A',
    paper: '#E3E6E8', // Cool Architectural Concrete / Hardware Silver (crisp contrast vs dev portfolio #fff7e8)
    white: '#FFFFFF',
    paperMuted: '#D7DBDF',
    paperDark: '#CBD0D5',

    // Primary Identity Accent
    signalYellow: '#FFD84D',
    signalYellowHover: '#F7CE38',

    // Project & Experiment Accent Colors (used strictly within contexts)
    electricBlue: '#5B8CFF',
    coral: '#FF6B57',
    mint: '#63D6A0',
    purple: '#A78BFA',
  },

  typography: {
    display: '"Space Grotesk", -apple-system, sans-serif',
    body: '"Inter", -apple-system, sans-serif',
    mono: '"JetBrains Mono", "IBM Plex Mono", monospace',
  },

  borders: {
    hairline: '1px solid #0A0A0A',
    solid: '2px solid #0A0A0A',
    heavy: '3px solid #0A0A0A',
    brutal: '4px solid #0A0A0A',
  },

  shadows: {
    sm: '2px 2px 0px #0A0A0A',
    md: '4px 4px 0px #0A0A0A',
    lg: '6px 6px 0px #0A0A0A',
    xl: '8px 8px 0px #0A0A0A',
    yellowMd: '4px 4px 0px #FFD84D',
    yellowLg: '6px 6px 0px #FFD84D',
  },

  springs: {
    tactile: { type: 'spring', stiffness: 400, damping: 25 },
    gentle: { type: 'spring', stiffness: 260, damping: 20 },
    snappy: { type: 'spring', stiffness: 500, damping: 30 },
    bouncy: { type: 'spring', stiffness: 350, damping: 15 },
  }
} as const;

export type StudioTokensType = typeof STUDIO_TOKENS;
