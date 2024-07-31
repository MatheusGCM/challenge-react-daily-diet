/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
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
        'red-dark': '#bf3b44',
        'red-mid': '#f3babd',
        'red-light': '#f4e6e7',
        'green-dark': '#639339',
        'green-mid': '#cbe4b4',
        'green-light': '#e5f0db',
        'gray-1': '#1b1d1e',
        'gray-2': '#333638',
        'gray-3': '#5c6265',
        'gray-4': '#b9bbbc',
        'gray-5': '#dddedf',
        'gray-6': '#eff0f0',
        'gray-7': '#fafafa',
      },
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
