/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          DEFAULT: '#B91C2E',
          dark: '#8B1220',
          light: '#FCE8EB',
        },
        royal: {
          DEFAULT: '#1A56A0',
          dark: '#0F3872',
          light: '#E8F0FB',
        },
        gold: {
          DEFAULT: '#C8960C',
          mid: '#E0AB20',
          pale: '#FDF3D0',
        },
        navy: {
          DEFAULT: '#071325',
          mid: '#0d1f3c',
        },
        parchment: '#e8e1d0',
        ivory: '#f2ede0',
        cream: '#faf7f2',
        muted: '#6b6058',
        faint: '#bbb0a0',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-baskerville)', '"Times New Roman"', 'serif'],
        ui: ['var(--font-jost)', 'Tahoma', 'sans-serif'],
      },
      backgroundImage: {
        'heraldic-hero': 'linear-gradient(160deg, rgba(15,56,114,0.80) 0%, rgba(7,19,37,0.84) 50%, rgba(139,18,32,0.75) 100%)',
        'royal-dark': 'linear-gradient(135deg, #0F3872 0%, #071325 100%)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(.22,.61,.36,1) both',
        'fade-in': 'fadeIn 1.2s ease both',
      },
    },
  },
  plugins: [],
}

module.exports = config
