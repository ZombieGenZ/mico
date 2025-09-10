export const ROUTES = {
  HOME: '/',
  VEHICLES: '/vehicles',
  VEHICLE_DETAIL: '/vehicles/:id',
  SERVICES: '/services',
  NEWS: '/news',
  NEWS_DETAIL: '/news/:id',
  ABOUT: '/about',
  CONTACT: '/contact',
  QUOTE: '/quote',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_VEHICLES: '/admin/vehicles',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_NEWS: '/admin/news',
  ADMIN_QUOTES: '/admin/quotes',
  ADMIN_SETTINGS: '/admin/settings',
  LOGIN: '/login',
  ADMIN_CUSTOMERS: '/admin/customers',
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_BRANDS: '/admin/brands',
  ADMIN_TOPICS: '/admin/topics',
} as const;

export const COLORS = {
  richBlack: '#0D1B2A',
  vividYellow: '#FFD60A',
  accent: '#FFC300',
  dark: '#000814',
  mediumDark: '#1B263B',
  lightYellow: '#FFF3CD',
  white: '#FFFFFF',
  grayLight: '#F8F9FA',
  gray: '#6C757D',
  grayDark: '#343A40',
  success: '#28A745',
  error: '#DC3545',
  warning: '#FFC107',
  info: '#17A2B8',
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

export const DEMO_CREDENTIALS = {
  email: 'admin@xecongtrinhvn.com',
  password: 'XeCoTr2024!',
};