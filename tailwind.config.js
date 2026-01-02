/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#814bd2', // Purple accent
        secondary: '#6366f1', // Indigo
        accent: '#a855f7', // Light purple
        dark: '#0a0a0f', // Deep dark background
        light: '#e2e8f0', // Light text
        techGray: '#1a1a2e', // Dark card background
        surface: '#12121a', // Slightly lighter surface
        muted: '#94a3b8', // Muted text
        gradient: {
          start: '#814bd2',
          mid: '#6366f1',
          end: '#a855f7',
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
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
      addUtilities(newUtilities)
    },
  ],
}