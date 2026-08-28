/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#18352F',
          50: '#E8EDEB',
          100: '#C7D3CE',
          200: '#9FB0A9',
          300: '#71877D',
          400: '#4A6157',
          500: '#2E4A40',
          600: '#18352F',
          700: '#132823',
          800: '#0E1D19',
          900: '#0A1512',
        },
        sage: {
          DEFAULT: '#71877D',
          light: '#A3B5A8',
          dark: '#5A6E62',
        },
        ivory: {
          DEFAULT: '#F7F3EC',
          dark: '#EFE9DD',
        },
        sand: {
          DEFAULT: '#E9DFD0',
          light: '#F0E8DA',
          dark: '#D9CDB7',
        },
        charcoal: {
          DEFAULT: '#252525',
          light: '#4A4A4A',
          muted: '#6B6B6B',
        },
        gold: {
          DEFAULT: '#B69A6A',
          light: '#CBB488',
          dark: '#9A8050',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display': ['clamp(2rem, 4.5vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'section': ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
