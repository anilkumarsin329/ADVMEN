/**
 * tailwind.config.js
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — Tailwind CSS v3 Configuration
 * All tokens mirror CSS variables in variables.css.
 * ─────────────────────────────────────────────────────────────
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    extend: {

      // ── Colors ─────────────────────────────────────────────
      colors: {
        brand: {
          black:          '#0A0A0A',
          orange:         '#FF6B00',
          'orange-light': '#FF8C38',
          'orange-dark':  '#CC5500',
          'orange-deeper':'#A34400',
          white:          '#F5F5F5',
        },
        surface: {
          0: '#0A0A0A',
          1: '#111111',
          2: '#161616',
          3: '#1A1A1A',
          4: '#222222',
        },
        gray: {
          950: '#080808',
          900: '#111111',
          800: '#1A1A1A',
          700: '#2A2A2A',
          600: '#3A3A3A',
          500: '#555555',
          400: '#888888',
          300: '#AAAAAA',
          200: '#CCCCCC',
          100: '#E8E8E8',
          50:  '#F5F5F5',
        },
        semantic: {
          success: '#22C55E',
          error:   '#EF4444',
          warning: '#F59E0B',
          info:    '#3B82F6',
        },
      },

      // ── Typography ─────────────────────────────────────────
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        body:    ['Satoshi', 'sans-serif'],
        mono:    ['Space Grotesk', 'monospace'],
      },

      fontSize: {
        'hero':        ['8rem',    { lineHeight: '1',    letterSpacing: '-0.04em' }],
        'display-2xl': ['7rem',    { lineHeight: '1.05', letterSpacing: '-0.04em' }],
        'display-xl':  ['6rem',    { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg':  ['4.5rem',  { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-md':  ['3.75rem', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-sm':  ['3rem',    { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'body-xl':     ['1.25rem', { lineHeight: '1.7' }],
        'body-lg':     ['1.125rem',{ lineHeight: '1.7' }],
        'label':       ['0.6875rem',{ lineHeight: '1.5', letterSpacing: '0.18em' }],
      },

      fontWeight: {
        light:     '300',
        regular:   '400',
        medium:    '500',
        semibold:  '600',
        bold:      '700',
        extrabold: '800',
      },

      lineHeight: {
        none:     '1',
        tight:    '1.05',
        snug:     '1.2',
        normal:   '1.5',
        relaxed:  '1.7',
        loose:    '2',
      },

      letterSpacing: {
        tighter: '-0.04em',
        tight:   '-0.02em',
        normal:  '0em',
        wide:    '0.04em',
        wider:   '0.08em',
        widest:  '0.18em',
        ultra:   '0.25em',
      },

      // ── Spacing ────────────────────────────────────────────
      spacing: {
        '4.5':  '1.125rem',
        '5.5':  '1.375rem',
        '13':   '3.25rem',
        '15':   '3.75rem',
        '18':   '4.5rem',
        '22':   '5.5rem',
        '26':   '6.5rem',
        '30':   '7.5rem',
        '34':   '8.5rem',
        '38':   '9.5rem',
        '42':   '10.5rem',
        '50':   '12.5rem',
        '54':   '13.5rem',
        '58':   '14.5rem',
        '68':   '17rem',
        '72':   '18rem',
        '76':   '19rem',
        '80':   '20rem',
        '84':   '21rem',
        '88':   '22rem',
        '92':   '23rem',
        '96':   '24rem',
        '100':  '25rem',
        '104':  '26rem',
        '112':  '28rem',
        '120':  '30rem',
        '128':  '32rem',
        '144':  '36rem',
        '160':  '40rem',
      },

      // ── Screens ────────────────────────────────────────────
      screens: {
        'xs':  '375px',
        'sm':  '640px',
        'md':  '768px',
        'lg':  '1024px',
        'xl':  '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },

      // ── Border Radius ──────────────────────────────────────
      borderRadius: {
        'xs':  '0.125rem',
        'sm':  '0.25rem',
        'md':  '0.5rem',
        'lg':  '0.75rem',
        'xl':  '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ── Box Shadows ────────────────────────────────────────
      boxShadow: {
        'xs':           '0 1px 2px rgba(0,0,0,0.4)',
        'sm':           '0 2px 8px rgba(0,0,0,0.4)',
        'md':           '0 4px 16px rgba(0,0,0,0.5)',
        'lg':           '0 8px 32px rgba(0,0,0,0.6)',
        'xl':           '0 16px 48px rgba(0,0,0,0.7)',
        '2xl':          '0 24px 64px rgba(0,0,0,0.8)',
        'card':         '0 2px 12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
        'card-hover':   '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,107,0,0.15)',
        'card-orange':  '0 4px 24px rgba(255,107,0,0.15), 0 0 0 1px rgba(255,107,0,0.12)',
        'glow-xs':      '0 0 12px rgba(255,107,0,0.20)',
        'glow-orange':  '0 0 30px rgba(255,107,0,0.30)',
        'glow-lg':      '0 0 60px rgba(255,107,0,0.40)',
        'glow-xl':      '0 0 100px rgba(255,107,0,0.50)',
        'glow-white':   '0 0 30px rgba(255,255,255,0.08)',
        'inner-glow':   'inset 0 0 30px rgba(255,107,0,0.08)',
        'inner-subtle': 'inset 0 1px 0 rgba(255,255,255,0.06)',
      },

      // ── Background Images ──────────────────────────────────
      backgroundImage: {
        'gradient-orange':    'linear-gradient(90deg, #FF6B00 0%, #FF8C38 100%)',
        'gradient-orange-135':'linear-gradient(135deg, #FF6B00 0%, #FF8C38 100%)',
        'gradient-hero':      'linear-gradient(135deg, #0A0A0A 0%, #140800 50%, #0A0A0A 100%)',
        'gradient-card':      'linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.95) 100%)',
        'gradient-radial-orange': 'radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.18) 0%, transparent 65%)',
        'gradient-radial-center': 'radial-gradient(ellipse at center, rgba(255,107,0,0.12) 0%, transparent 70%)',
        'gradient-fade-bottom': 'linear-gradient(180deg, transparent 0%, #0A0A0A 100%)',
        'gradient-fade-top':    'linear-gradient(0deg, transparent 0%, #0A0A0A 100%)',
        'gradient-shine':     'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
      },

      // ── Z-index ────────────────────────────────────────────
      zIndex: {
        '-1':  '-1',
        '60':  '60',
        '70':  '70',
        '80':  '80',
        '90':  '90',
        '100': '100',
        '9999':'9999',
      },

      // ── Transition Durations ───────────────────────────────
      transitionDuration: {
        '80':   '80ms',
        '150':  '150ms',
        '400':  '400ms',
        '500':  '500ms',
        '600':  '600ms',
        '800':  '800ms',
        '1000': '1000ms',
        '1200': '1200ms',
      },

      // ── Transition Timing ──────────────────────────────────
      transitionTimingFunction: {
        'out-expo':     'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo':  'cubic-bezier(0.87, 0, 0.13, 1)',
        'out-back':     'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'in-expo':      'cubic-bezier(0.7, 0, 0.84, 0)',
        'spring':       'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },

      // ── Keyframes ──────────────────────────────────────────
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-left': {
          '0%':   { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,107,0,0.25)' },
          '50%':      { boxShadow: '0 0 60px rgba(255,107,0,0.60)' },
        },
        'marquee': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'bounce-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-16px)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        'border-pulse': {
          '0%, 100%': { borderColor: 'rgba(255,107,0,0.3)' },
          '50%':      { borderColor: 'rgba(255,107,0,0.8)' },
        },
      },

      animation: {
        'fade-up':        'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':        'fade-in 0.5s ease both',
        'slide-in-left':  'slide-in-left 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'slide-in-right': 'slide-in-right 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'scale-in':       'scale-in 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
        'pulse-glow':     'pulse-glow 2.5s ease-in-out infinite',
        'marquee':        'marquee 30s linear infinite',
        'spin-slow':      'spin-slow 10s linear infinite',
        'bounce-y':       'bounce-y 2.5s ease-in-out infinite',
        'float':          'float 4s ease-in-out infinite',
        'shimmer':        'shimmer 2.5s linear infinite',
        'border-pulse':   'border-pulse 2s ease-in-out infinite',
      },
    },
  },

  plugins: [],
}
