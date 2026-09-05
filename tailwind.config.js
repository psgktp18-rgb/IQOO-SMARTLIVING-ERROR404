/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iqoo: {
          yellow: '#FFC000',
          yellowHover: '#FFD000',
          orange: '#FF5E00',
          black: '#08080B',
          chassis: '#0F1015',
          card: '#15161F',
          cardHover: '#1B1C27',
          border: '#262938',
          borderHighlight: '#3B3E52',
          muted: '#8B93A7',
          light: '#F4F5F8',
        },
        mode: {
          focus: {
            DEFAULT: '#FFC000',
            light: '#FFF8E1',
            dark: '#B28500',
            glow: 'rgba(255, 192, 0, 0.35)',
            subtle: 'rgba(255, 192, 0, 0.12)'
          },
          relaxing: {
            DEFAULT: '#00E5FF',
            light: '#E0F7FA',
            dark: '#0097A7',
            glow: 'rgba(0, 229, 255, 0.35)',
            subtle: 'rgba(0, 229, 255, 0.12)'
          },
          sleeping: {
            DEFAULT: '#4F46E5',
            light: '#EEF2FF',
            dark: '#312E81',
            glow: 'rgba(79, 70, 229, 0.35)',
            subtle: 'rgba(79, 70, 229, 0.12)'
          },
          away: {
            DEFAULT: '#94A3B8',
            light: '#F8FAFC',
            dark: '#334155',
            glow: 'rgba(148, 163, 184, 0.35)',
            subtle: 'rgba(148, 163, 184, 0.12)'
          },
          hosting: {
            DEFAULT: '#FF5E00',
            light: '#FFF3E0',
            dark: '#C44100',
            glow: 'rgba(255, 94, 0, 0.35)',
            subtle: 'rgba(255, 94, 0, 0.12)'
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'iqoo-glow': '0 0 30px rgba(255, 192, 0, 0.28)',
        'iqoo-card': '0 10px 30px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'glow-focus': '0 0 30px rgba(255, 192, 0, 0.3)',
        'glow-relaxing': '0 0 30px rgba(0, 229, 255, 0.3)',
        'glow-sleeping': '0 0 30px rgba(79, 70, 229, 0.3)',
        'glow-away': '0 0 30px rgba(148, 163, 184, 0.3)',
        'glow-hosting': '0 0 30px rgba(255, 94, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
