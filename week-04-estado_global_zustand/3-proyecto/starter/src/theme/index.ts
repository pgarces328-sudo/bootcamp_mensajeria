export const COLORS = {
  background: '#E2E8F0',
  surface: '#FFFFFF',
  surfaceMuted: '#F8FAFC',

  primary: '#1E293B',
  primaryLight: '#334155',
  accent: '#2563EB',

  text: '#0F172A',
  textMuted: '#64748B',
  border: '#CBD5E1',
  white: '#FFFFFF',

  successBackground: '#DCFCE7',
  successText: '#166534',

  warningBackground: '#FEF3C7',
  warningText: '#92400E',

  infoBackground: '#DBEAFE',
  infoText: '#1D4ED8',

  purpleBackground: '#EDE9FE',
  purpleText: '#6D28D9',

  dangerBackground: '#FEE2E2',
  dangerText: '#991B1B'
};

export const TYPOGRAPHY = {
  title: 26,
  sectionTitle: 20,
  cardTitle: 18,
  body: 14,
  bodyLarge: 16,
  caption: 12,
  small: 11,

  lineHeightBody: 20,
  lineHeightSubtitle: 20,

  weightRegular: '400' as const,
  weightMedium: '500' as const,
  weightSemiBold: '600' as const,
  weightBold: '700' as const,
  weightExtraBold: '800' as const
};

export const SPACING = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999
};

export const BORDER_WIDTH = {
  thin: 1
};

export const INTERACTION = {
  pressedOpacity: 0.85,
  pressedScale: 0.99
};

export const SHADOWS = {
  card: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3
  }
};