/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F4EE',
        champagne: '#E8D8C5',
        dustyRose: '#C88F91',
        mutedMauve: '#A78B9A',
        deepPlum: '#3F3040',
        warmCharcoal: '#29262B',
        antiqueGold: '#C6A56B',
        softSage: '#A7B5A0',
        
        // Semantic extended palettes
        palette: {
          ivory: '#F8F4EE',
          champagne: '#E8D8C5',
          dustyRose: '#C88F91',
          mutedMauve: '#A78B9A',
          deepPlum: '#3F3040',
          warmCharcoal: '#29262B',
          antiqueGold: '#C6A56B',
          softSage: '#A7B5A0',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        bengali: ['"Hind Siliguri"', '"Noto Serif Bengali"', 'sans-serif'],
        script: ['"Caveat"', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-gentle': 'pulseGentle 3s ease-in-out infinite',
        'flame': 'flameFlicker 0.4s ease-in-out infinite',
        'smoke': 'smokePuff 1.2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(1.02)' },
        },
        flameFlicker: {
          '0%, 100%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.95' },
          '25%': { transform: 'scale(1.06, 0.94) rotate(1.5deg)', opacity: '1' },
          '50%': { transform: 'scale(0.96, 1.04) rotate(-1.5deg)', opacity: '0.9' },
          '75%': { transform: 'scale(1.04, 0.98) rotate(1deg)', opacity: '1' },
        },
        smokePuff: {
          '0%': { opacity: '0.8', transform: 'translateY(0) scale(0.6)' },
          '100%': { opacity: '0', transform: 'translateY(-40px) scale(1.6) rotate(12deg)' },
        }
      }
    },
  },
  plugins: [],
}
