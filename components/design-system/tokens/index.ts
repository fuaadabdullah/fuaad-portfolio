// Design Tokens

export const colors = {
  primary: 'var(--color-accent)',
  secondary: '#ffffff',
  background: '#000000',
  text: '#ffffff',
  muted: '#ffffff80', // 50% opacity
  border: '#ffffff20', // 20% opacity
} as const;

export const spacing = {
  xs: '0.25rem', // 4px
  sm: '0.5rem',  // 8px
  md: '1rem',    // 16px
  lg: '1.5rem',  // 24px
  xl: '2rem',    // 32px
  '2xl': '3rem', // 48px
} as const;

export const fontSizes = {
  xs: '0.75rem', // 12px
  sm: '0.875rem', // 14px
  md: '1rem',     // 16px
  lg: '1.125rem', // 18px
  xl: '1.25rem',  // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '2rem',   // 32px
} as const;

export const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const radii = {
  none: '0',
  sm: '0.25rem', // 4px
  md: '0.5rem',  // 8px
  lg: '0.75rem', // 12px
  full: '9999px',
} as const;