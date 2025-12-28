/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        dark: '#0A0A0A',
        light: '#F5F5F5',
        accent: '#333333',
        beige: '#c4bdb3',
      },
      // Standardized spacing scale (8px base unit)
      spacing: {
        'section-xs': '2rem',    // 32px - Small sections
        'section-sm': '4rem',    // 64px - Medium sections
        'section-md': '6rem',    // 96px - Large sections
        'section-lg': '8rem',    // 128px - Extra large sections
        'section-xl': '10rem',   // 160px - Hero sections
        'container-sm': '1rem',  // 16px - Small containers
        'container-md': '1.5rem', // 24px - Medium containers
        'container-lg': '3rem',  // 48px - Large containers
        'container-xl': '6rem',  // 96px - Extra large containers
      },
      // Standardized typography scale
      fontSize: {
        'display-xs': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl': ['6rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-2xl': ['7rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-3xl': ['8rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading-xs': ['1.25rem', { lineHeight: '1.4' }],
        'heading-sm': ['1.5rem', { lineHeight: '1.4' }],
        'heading-md': ['2rem', { lineHeight: '1.4' }],
        'heading-lg': ['2.5rem', { lineHeight: '1.4' }],
        'heading-xl': ['3rem', { lineHeight: '1.4' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-xl': ['1.25rem', { lineHeight: '1.6' }],
      },
      // Standardized container padding
      padding: {
        'page-xs': '1rem',      // 16px - Mobile
        'page-sm': '1.5rem',    // 24px - Tablet
        'page-md': '3rem',      // 48px - Desktop
        'page-lg': '6rem',      // 96px - Large desktop
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
};