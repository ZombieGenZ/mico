/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        secondary: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #f97316 0%, #eab308 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #eab308 0%, #f59e0b 100%)',
        'gradient-accent': 'linear-gradient(135deg, #fb923c 0%, #fbbf24 100%)',
      },
      boxShadow: {
        'orange': '0 4px 14px 0 rgba(249, 115, 22, 0.39)',
        'yellow': '0 4px 14px 0 rgba(234, 179, 8, 0.39)',
        'glow': '0 0 20px rgba(249, 115, 22, 0.5)',
      }
    },
  },
  plugins: [],
};