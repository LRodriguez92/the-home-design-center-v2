export const theme = {
  colors: {
    primary: '#C9A227',  // Subtle gold
    secondary: '#8C7853',  // Warm bronze
    background: '#0F0F0F',  // Rich black
    surface: '#1C1F33',  // Deep navy
    text: '#F5F5F5',  // Off-white
    textMuted: '#B0B0B0',  // Light gray
    onPrimary: '#0F0F0F',  // Rich black (for text on gold)
    onSecondary: '#F5F5F5',  // Off-white (for text on bronze)
    onBackground: '#F5F5F5',  // Off-white
    onSurface: '#F5F5F5',  // Off-white
  },
  fontSizes: {
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
    xlarge: '1.5rem',
    xxlarge: '2rem',
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    xlarge: '2rem',
  },
  borderRadius: {
    small: '0.25rem',
    medium: '0.5rem',
    large: '1rem',
  },
}

export type Theme = typeof theme

