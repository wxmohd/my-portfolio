/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00BFFF', // Deep sky blue
        secondary: '#3A86FF', // Blue
        accent: '#00FFFF', // Cyan for tech feel
        dark: '#0F172A', // Dark blue for contrast
        light: '#F0F9FF', // Light blue background
        techGray: '#1E1E2E', // Dark tech background
        neonBlue: '#00F0FF', // Neon blue for accents
        darkBlue: '#172554', // Dark blue
        mint: '#4ADE80', // Mint green accent
        gradient: {
          start: '#00BFFF',
          mid: '#3A86FF',
          end: '#00FFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
        tech: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 5px rgba(255, 102, 196, 0.5), 0 0 20px rgba(255, 102, 196, 0.3)',
        'glow': '0 0 10px rgba(0, 255, 255, 0.7)',
        'soft': '0 4px 20px rgba(138, 43, 226, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'tech-pattern': "url('/tech-pattern.svg')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'typewriter': 'typewriter 2s steps(40) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '0% 0' },
        },
        typewriter: {
          to: { width: '100%' }
        }
      },
    },
  },
  plugins: [],
}