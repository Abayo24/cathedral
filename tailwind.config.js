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
        // Both pass WCAG AA (4.5:1) as body text on white, cream and ivory.
        muted: '#6b6058',
        faint: '#7a6f62',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-baskerville)', '"Times New Roman"', 'serif'],
        ui: ['var(--font-jost)', 'Tahoma', 'sans-serif'],
      },
      // Softer, navy-tinted shadows — less "material drop shadow", more printed depth.
      boxShadow: {
        sm: '0 1px 2px rgba(7, 19, 37, 0.05)',
        DEFAULT: '0 2px 6px -1px rgba(7, 19, 37, 0.07), 0 1px 2px rgba(7, 19, 37, 0.04)',
        md: '0 4px 14px -3px rgba(7, 19, 37, 0.09), 0 2px 4px -2px rgba(7, 19, 37, 0.05)',
        lg: '0 12px 30px -10px rgba(7, 19, 37, 0.15), 0 4px 8px -4px rgba(7, 19, 37, 0.06)',
        xl: '0 22px 50px -18px rgba(7, 19, 37, 0.22), 0 8px 16px -8px rgba(7, 19, 37, 0.08)',
        '2xl': '0 36px 70px -28px rgba(7, 19, 37, 0.30)',
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
        'fade-in': 'fadeIn 0.3s ease both',
      },
    },
  },
  plugins: [],
}

module.exports = config
