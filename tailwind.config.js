/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        plum: {
          DEFAULT: '#8B2A3A',
          700: '#732331',
          800: '#5D1C28',
          light: '#B45A68',
        },
        ivory: {
          DEFAULT: '#FAF3EC',
        },
        mist: '#E3D1D2',
        blush: {
          DEFAULT: '#EFD6D3',
          dark: '#EFD6D3',
        },
        rose: '#E8DFD3',
        mauve: '#C9D6C5',
        sand: '#E8DFD3',
        tan: '#E8DFD3',
        charcoal: {
          DEFAULT: '#3E2C30',
          light: '#3E2C30',
          muted: '#3E2C30',
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
