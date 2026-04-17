/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',

  theme: {
    // Override defaults — use only our brand tokens
    fontFamily: {
      sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
    },

    colors: {
      // ── Primary — Emerald Green ──────────────────────────
      primary: {
        DEFAULT: '#3A9D7C',
        light:   '#62B89B',
        dark:    '#297A5E',
      },

      // ── Accent — Soft Teal ───────────────────────────────
      accent: {
        DEFAULT: '#4A9BA8',
        light:   '#6DB4BF',
        dark:    '#357885',
      },

      // ── Semantic ─────────────────────────────────────────
      success: '#3A9D7C',
      warning: '#D4943A',
      error:   '#C0554F',
      info:    '#4A9BA8',

      // ── Neutral scale (warm-tinted) ──────────────────────
      neutral: {
        50:  '#FAFAF8',
        100: '#F5F0E8',
        200: '#E8E2D9',
        300: '#D5CCBF',
        400: '#AFA49A',
        500: '#8C8077',
        600: '#655D54',
        700: '#4A443C',
        800: '#302B24',
        900: '#1C1814',
        950: '#0E0C0A',
      },

      // ── Bare utilities always needed ─────────────────────
      white:       '#FFFFFF',
      black:       '#000000',
      transparent: 'transparent',
      current:     'currentColor',
    },

    borderRadius: {
      none: '0',
      sm:   '6px',
      md:   '10px',
      lg:   '16px',
      xl:   '24px',
      full: '9999px',
    },

    boxShadow: {
      none: 'none',
      sm:   '0 1px 3px rgba(28,24,20,0.06), 0 1px 2px rgba(28,24,20,0.04)',
      md:   '0 4px 12px rgba(28,24,20,0.08), 0 2px 4px rgba(28,24,20,0.04)',
      lg:   '0 12px 28px rgba(28,24,20,0.12), 0 4px 8px rgba(28,24,20,0.06)',
    },

    extend: {
      // ── Max-widths ───────────────────────────────────────
      maxWidth: {
        content: '720px',
        wide:    '1080px',
      },

      // ── Motion durations ─────────────────────────────────
      transitionDuration: {
        fast:   '120ms',
        normal: '220ms',
        slow:   '380ms',
      },

      // ── Easing functions ─────────────────────────────────
      transitionTimingFunction: {
        default: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        enter:   'cubic-bezier(0, 0, 0.58, 1)',
        exit:    'cubic-bezier(0.42, 0, 1, 1)',
      },

      // ── Letter spacing ───────────────────────────────────
      letterSpacing: {
        display: '-0.02em',
        heading: '-0.01em',
        caps:    '0.06em',
        normal:  '0',
      },

      // ── Line heights ─────────────────────────────────────
      lineHeight: {
        display:    '1.15',
        heading:    '1.2',
        subheading: '1.25',
        tight:      '1.3',
        snug:       '1.35',
        body:       '1.7',
        relaxed:    '1.5',
        caption:    '1.4',
      },
    },
  },

  plugins: [],
}
