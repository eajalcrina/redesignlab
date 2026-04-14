import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'rl-red': '#F32769',
        'rl-dark': '#0D0D0D',
        'rl-neutral': '#F5F3F0',
        'rl-white': '#FAFAF8',

        'text-primary': '#0D0D0D',
        'text-secondary': 'rgba(13,13,13,0.6)',
        'text-tertiary': 'rgba(13,13,13,0.35)',
        'text-on-dark': '#FAFAF8',
        'text-muted': 'rgba(250,250,248,0.55)',

        'border-light': 'rgba(13,13,13,0.08)',
        'border-dark': 'rgba(250,250,248,0.10)',
      },
      fontSize: {
        // Display — DM Serif Display
        'display-2xl': ['80px', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-xl': ['64px', { lineHeight: '0.97', letterSpacing: '-0.03em' }],
        'display-lg': ['48px', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-md': ['36px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['28px', { lineHeight: '1.15', letterSpacing: '-0.015em' }],

        // Body — Inter
        'body-xl': ['20px', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'body-lg': ['18px', { lineHeight: '1.65' }],
        'body-md': ['16px', { lineHeight: '1.7' }],
        'body-sm': ['14px', { lineHeight: '1.6' }],
        'body-xs': ['12px', { lineHeight: '1.5' }],

        // Label — Inter uppercase
        'label-lg': ['13px', { lineHeight: '1', letterSpacing: '0.14em' }],
        'label-md': ['11px', { lineHeight: '1', letterSpacing: '0.16em' }],
        'label-sm': ['10px', { lineHeight: '1', letterSpacing: '0.18em' }],

        // Mono — JetBrains Mono
        'mono-lg': ['16px', { lineHeight: '1.5' }],
        'mono-md': ['14px', { lineHeight: '1.4' }],
        'mono-sm': ['12px', { lineHeight: '1.4' }],
      },
      fontFamily: {
        display: ['Mluvka', 'system-ui', 'sans-serif'],
        sans: ['Mluvka', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '30': '7.5rem',   // 120px
        '40': '10rem',    // 160px
        '60': '15rem',    // 240px
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        DEFAULT: '4px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
