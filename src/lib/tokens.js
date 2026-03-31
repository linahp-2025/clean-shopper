/**
 * Clean Shopper — Design Tokens
 * Design System v1.0 | 2026-03-30
 *
 * Single source of truth for all design values in JavaScript.
 * Mirrors tailwind.config.js and src/styles/globals.css exactly.
 * Use in component logic, dynamic styles, and tests.
 *
 * Usage:
 *   import tokens from '@/lib/tokens'
 *   const bg = tokens.colors.primary.DEFAULT
 */

const tokens = {

  // ── Colors ────────────────────────────────────────────────
  colors: {
    primary: {
      DEFAULT: '#3A9D7C',
      light:   '#62B89B',
      dark:    '#297A5E',
    },

    accent: {
      DEFAULT: '#4A9BA8',
      light:   '#6DB4BF',
      dark:    '#357885',
    },

    semantic: {
      success: '#3A9D7C',
      warning: '#D4943A',
      error:   '#C0554F',
      info:    '#4A9BA8',
    },

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
    },

    surface: {
      page:      '#FAFAF8',
      card:      '#FFFFFF',
      secondary: '#F5F0E8',
      overlay:   'rgba(28, 24, 20, 0.4)',
    },
  },

  // ── Typography ────────────────────────────────────────────
  typography: {
    fontFamily: {
      sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
    },

    fontSize: {
      display: '2.25rem',   // 36px
      h1:      '1.875rem',  // 30px
      h2:      '1.5rem',    // 24px
      h3:      '1.25rem',   // 20px
      h4:      '1rem',      // 16px
      body:    '1rem',      // 16px
      small:   '0.875rem',  // 14px
      caption: '0.75rem',   // 12px
    },

    fontWeight: {
      light:    300,
      regular:  400,
      medium:   500,
      semibold: 600,
    },

    lineHeight: {
      display:    1.15,
      heading:    1.2,
      subheading: 1.25,
      tight:      1.3,
      snug:       1.35,
      body:       1.7,
      relaxed:    1.5,
      caption:    1.4,
    },

    letterSpacing: {
      display: '-0.02em',
      heading: '-0.01em',
      caps:    '0.06em',
      normal:  '0',
    },
  },

  // ── Spacing — 4px base unit ───────────────────────────────
  spacing: {
    1:  '4px',
    2:  '8px',
    3:  '12px',
    4:  '16px',
    6:  '24px',
    8:  '32px',
    10: '40px',
    12: '48px',
    16: '64px',
  },

  // ── Layout ────────────────────────────────────────────────
  layout: {
    maxWidth: {
      content: '720px',
      wide:    '1080px',
    },
    pageMargin: {
      desktop: '32px',
      mobile:  '16px',
    },
  },

  // ── Border Radius ─────────────────────────────────────────
  borderRadius: {
    sm:   '6px',
    md:   '10px',
    lg:   '16px',
    xl:   '24px',
    full: '9999px',
  },

  // ── Borders ───────────────────────────────────────────────
  borders: {
    default:    '1px solid #E8E2D9',
    subtle:     '1px solid #F5F0E8',
    focusRing:  '2px solid #3A9D7C',
    focusOffset: '2px',
  },

  // ── Shadows ───────────────────────────────────────────────
  shadows: {
    sm: '0 1px 3px rgba(28,24,20,0.06), 0 1px 2px rgba(28,24,20,0.04)',
    md: '0 4px 12px rgba(28,24,20,0.08), 0 2px 4px rgba(28,24,20,0.04)',
    lg: '0 12px 28px rgba(28,24,20,0.12), 0 4px 8px rgba(28,24,20,0.06)',
  },

  // ── Motion ────────────────────────────────────────────────
  motion: {
    duration: {
      fast:   '120ms',
      normal: '220ms',
      slow:   '380ms',
    },
    easing: {
      default: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      enter:   'cubic-bezier(0, 0, 0.58, 1)',
      exit:    'cubic-bezier(0.42, 0, 1, 1)',
    },
  },

  // ── Breakpoints (for reference — use Tailwind classes in JSX) ──
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
}

export default tokens
