import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        primary: 'var(--primary)',
        'primary-strong': 'var(--primary-strong)',
        'accent-blue': 'var(--accent-blue)',
        'accent-violet': 'var(--accent-violet)',
        'ring-dotted': 'var(--ring-dotted)',
        success: 'var(--success)',
        warn: 'var(--warn)',
        danger: 'var(--danger)',
        text: 'var(--text)',
        'text-dim': 'var(--text-dim)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 0.25rem)',
        '2xl': 'calc(var(--radius) + 0.5rem)',
        '3xl': 'calc(var(--radius) + 1rem)'
      },
      backgroundImage: {
        brandGradient: 'linear-gradient(90deg, var(--accent-blue), var(--accent-violet))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;

