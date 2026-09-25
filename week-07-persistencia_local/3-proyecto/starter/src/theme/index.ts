export const COLORS = {
  background: '#0F1419',
  surface: '#1A2027',
  surfaceMuted: '#232B35',
  border: '#2E3742',
  text: '#F2F5F8',
  textMuted: '#A3AFBD',
  accent: '#FF8A3D',
  primary: '#FF8A3D',
  white: '#FFFFFF',
  successBackground: '#123322',
  successText: '#4ADE80',
  infoBackground: '#13293F',
  infoText: '#4FA3FF',
  warningBackground: '#3D2F12',
  warningText: '#F5B544',
  purpleBackground: '#241C3D',
  purpleText: '#A78BFA',
  dangerBackground: '#3D1A1A',
  dangerText: '#F87171',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 40,
} as const;

export const RADIUS = {
  sm: 6,
  md: 12,
  lg: 16,
  pill: 999,
} as const;

export const BORDER_WIDTH = {
  thin: 1,
} as const;

export const INTERACTION = {
  pressedOpacity: 0.7,
} as const;

export const SHADOWS = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
} as const;

export const TYPOGRAPHY = {
  title: 22,
  sectionTitle: 18,
  cardTitle: 17,
  body: 14,
  bodyLarge: 16,
  caption: 12,
  small: 11,
  weightBold: '700' as const,
  weightExtraBold: '800' as const,
  lineHeightBody: 20,
} as const;