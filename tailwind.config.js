/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          // Black (dominant)
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#d4d4d4',
          300: '#a3a3a3',
          400: '#737373',
          500: '#525252',
          600: '#000000', // Main black
          700: '#000000',
          800: '#000000',
          900: '#000000',
          // Yellow accent
          yellow: '#FFD700', // Bright yellow
          'yellow-dark': '#FFC107',
          'yellow-light': '#FFEB3B',
        },
        brand: {
          black: '#000000',
          white: '#FFFFFF',
          yellow: '#FFD700',
          'yellow-dark': '#FFC107',
        },
      },
    },
  },
  plugins: [],
}
