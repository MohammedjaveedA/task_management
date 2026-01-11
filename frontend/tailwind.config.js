/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'oklch(0.97 0.01 255.53)',
          100: 'oklch(0.93 0.03 255.53)',
          200: 'oklch(0.86 0.06 255.53)',
          300: 'oklch(0.74 0.12 255.53)',
          400: 'oklch(0.62 0.19 255.53)',
          500: 'oklch(0.51 0.26 255.53)',
          600: 'oklch(0.45 0.31 255.53)',
          700: 'oklch(0.37 0.32 255.53)',
          800: 'oklch(0.29 0.28 255.53)',
          900: 'oklch(0.22 0.22 255.53)',
        }
      }
    },
  },
  plugins: [],
}