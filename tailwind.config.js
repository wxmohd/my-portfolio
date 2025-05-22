/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          softPink: '#F9E6F0',
          darkPurple: '#3D1E6D',
          techBlue: '#1A73E8',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          fancy: ['"DM Serif Display"', 'serif'],
        }
      },
    },
    plugins: [],
  }
  