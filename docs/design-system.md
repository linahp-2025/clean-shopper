# Clean Shopper Design System

**Version:** 1.0  |  **Date:** 2026-03-30  |  **Platform:** Web (React + Tailwind CSS)

---

## Design Direction

Clean Shopper should feel trustworthy and approachable — a wellness-credible space that helps ingredient-conscious consumers research products with confidence. The visual language draws from brands like Thrive Market and Grove Collaborative: generous layouts, natural color, and calm typography that communicates transparency without feeling clinical.

The interface gets out of the way. Information is clear, hierarchy is obvious, and whitespace is used generously to create a sense of care and quality.

---

## Design Principles

**Credible, not clinical.** The product deals with safety data, but it shouldn't feel like a lab report. Warmth and approachability are as important as accuracy.

**Generous by default.** Breathing room signals quality. Tight layouts feel anxious; generous layouts feel considered.

**Trust through consistency.** Color carries meaning — especially for ingredient safety states. Use semantic colors consistently so users never have to re-learn what green or amber means.

**Legible at every size.** From hero headlines to EWG scores to badge labels, every text element should be comfortable to read without effort.

---

## Color System

### Palette Philosophy

The palette is anchored in nature — a vibrant emerald green that reads as safe, clean, and trustworthy without feeling medicinal. Warm sand surfaces add approachability. A soft teal accent provides energy and contrast for interactive moments. The neutral scale is warm-tinted to keep the overall feel organic rather than cold.

### Primary Colors

| Token | Tailwind Key | Hex | Usage |
|-------|-------------|-----|-------|
| Primary | `primary.DEFAULT` | `#3A9D7C` | Primary actions, links, active states, clean indicators |
| Primary Light | `primary.light` | `#62B89B` | Hover states, selected backgrounds, subtle highlights |
| Primary Dark | `primary.dark` | `#297A5E` | Pressed states, high-emphasis text on light surfaces |

### Accent

| Token | Tailwind Key | Hex | Usage |
|-------|-------------|-----|-------|
| Accent | `accent.DEFAULT` | `#4A9BA8` | Badges, tags, featured callouts, info states |
| Accent Light | `accent.light` | `#6DB4BF` | Hover on accent elements |
| Accent Dark | `accent.dark` | `#357885` | Pressed accent, high-emphasis accent text |

### Semantic Colors

| Role | Tailwind Key | Hex | Usage |
|------|-------------|-----|-------|
| Success | `success` | `#3A9D7C` | Clean ingredient confirmed, saved to library. Shares primary — clean IS safe. |
| Warning | `warning` | `#D4943A` | Ingredient caution, unverified claim, partial match. Warm amber, not alarming. |
| Error | `error` | `#C0554F` | Harmful ingredient flagged, action failed. Muted red — serious, not aggressive. |
| Info | `info` | `#4A9BA8` | Contextual tips, explanations. Shares accent teal. |

### Surface & Neutral Scale

| Token | Tailwind Key | Hex | Usage |
|-------|-------------|-----|-------|
| Page BG | `neutral.50` | `#FAFAF8` | Main canvas — warm near-white |
| Sand Surface | `neutral.100` | `#F5F0E8` | Card backgrounds, sidebar, secondary surfaces |
| Subtle Border | `neutral.200` | `#E8E2D9` | Dividers, input borders, subtle separators |
| Disabled BG | `neutral.300` | `#D5CCBF` | Disabled states, placeholder fills |
| Placeholder | `neutral.400` | `#AFA49A` | Placeholder text, tertiary icons |
| Secondary Text | `neutral.500` | `#8C8077` | Metadata, captions, secondary labels |
| Body Text | `neutral.600` | `#655D54` | Primary body copy — warm dark brown |
| Emphasized | `neutral.700` | `#4A443C` | Subheadings, emphasized body text |
| Headings | `neutral.800` | `#302B24` | Page titles, primary headings |
| Maximum | `neutral.900` | `#1C1814` | Display text, maximum contrast. Rarely used. |

### Surface Colors

| Surface | Hex | Usage |
|---------|-----|-------|
| Page background | `#FAFAF8` | Main canvas |
| Card | `#FFFFFF` | Product cards, modals, elevated panels |
| Secondary surface | `#F5F0E8` | Sidebar, preferences panel, section backgrounds |
| Overlay | `rgba(28, 24, 20, 0.4)` | Modal/drawer backdrop |

### Accessibility

**Target:** WCAG AA minimum across all text. AAA where achievable.

Key contrast ratios (approximate):
- `neutral.600` on `neutral.50`: **~5.0:1** — passes AA, body text ✓
- `neutral.800` on white: **~13:1** — passes AAA, headings ✓
- `primary.dark` on white: **~5.5:1** — passes AA, link text ✓
- `error` on white: **~4.5:1** — passes AA for large text; pair with icon for small text ✓

---

## Typography

### Philosophy

Poppins only. Modern, friendly, and highly legible across all sizes. Its geometric construction keeps things clean; its rounded forms keep it warm. Multiple weights (300–600) cover the full type hierarchy without needing a second typeface.

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
```

**Tailwind font family:**
```js
fontFamily: {
  sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
}
```

### Type Scale

Scale ratio: 1.25 (major third)

| Token | Tailwind | Size | Weight | Line Height | Usage |
|-------|----------|------|--------|-------------|-------|
| Display | `text-4xl` | 2.25rem (36px) | 300 | 1.15 | Hero moments, landing headline |
| H1 | `text-3xl` | 1.875rem (30px) | 600 | 1.2 | Page titles |
| H2 | `text-2xl` | 1.5rem (24px) | 600 | 1.25 | Section headings |
| H3 | `text-xl` | 1.25rem (20px) | 600 | 1.3 | Card titles, subsection heads |
| H4 | `text-base` | 1rem (16px) | 600 | 1.35 | Label headings, sidebar titles |
| Body | `text-base` | 1rem (16px) | 400 | 1.7 | Paragraphs, product descriptions |
| Small | `text-sm` | 0.875rem (14px) | 400 | 1.5 | Metadata, helper text, captions |
| Caption | `text-xs` | 0.75rem (12px) | 500 | 1.4 | Badges, tags, timestamps |

### Letter Spacing

| Context | Value | Tailwind |
|---------|-------|---------|
| Display | `-0.02em` | `tracking-tight` |
| H1 | `-0.01em` | `tracking-tight` |
| All-caps labels | `0.06em` | `tracking-widest` |
| Body and below | `0` | `tracking-normal` |

---

## Spacing System

### Philosophy

Generous and gallery-like. The wellness sensibility of references like Thrive Market and Grove Collaborative comes in large part from how freely space is used. Crowded layouts feel anxious; open layouts feel confident and trustworthy.

### Base Unit

**4px.** All spacing values are multiples of 4.

### Scale

| Token | Tailwind | Value | Usage |
|-------|----------|-------|-------|
| `space-1` | `p-1` / `m-1` | 4px | Icon-to-text micro gap |
| `space-2` | `p-2` / `m-2` | 8px | Tag padding, tight pairs |
| `space-3` | `p-3` / `m-3` | 12px | Related element gaps |
| `space-4` | `p-4` / `m-4` | 16px | Default internal card padding |
| `space-6` | `p-6` / `m-6` | 24px | Card-to-card gaps, form fields |
| `space-8` | `p-8` / `m-8` | 32px | Section padding, sidebar margins |
| `space-10` | `p-10` / `m-10` | 40px | Major content breaks |
| `space-12` | `p-12` / `m-12` | 48px | Section-to-section spacing |
| `space-16` | `p-16` / `m-16` | 64px | Page section rhythm, hero spacing |

### Layout Metrics

| Property | Value | Notes |
|----------|-------|-------|
| Content max-width | `720px` | Conversational/detail views |
| Wide max-width | `1080px` | Product comparison, search results |
| Page margin (desktop) | `32px` | `px-8` |
| Page margin (mobile) | `16px` | `px-4` |
| Section spacing | `48px` | `py-12` |

---

## Shape & Borders

### Philosophy

Softly rounded throughout. Rounded corners reinforce the approachable, wellness-oriented feel. Nothing is sharp or angular.

### Border Radius

| Token | Tailwind | Value | Usage |
|-------|----------|-------|-------|
| `radius-sm` | `rounded-md` | 6px | Badges, tags, chips |
| `radius-md` | `rounded-lg` | 10px | Buttons, inputs, dropdowns |
| `radius-lg` | `rounded-2xl` | 16px | Cards, panels, chat bubbles |
| `radius-xl` | `rounded-3xl` | 24px | Featured cards, hero containers |
| `radius-full` | `rounded-full` | 9999px | Avatars, pill buttons, toggles |

### Borders

| Type | Value | Tailwind |
|------|-------|---------|
| Default | `1px solid #E8E2D9` | `border border-neutral-200` |
| Subtle | `1px solid #F5F0E8` | `border border-neutral-100` |
| Focus ring | `2px solid #5C8B6E`, `2px offset` | `ring-2 ring-primary ring-offset-2` |

### Shadows

| Level | Value | Tailwind | Usage |
|-------|-------|---------|-------|
| `shadow-sm` | `0 1px 3px rgba(28,24,20,0.06), 0 1px 2px rgba(28,24,20,0.04)` | `shadow-sm` | Cards, subtle lift |
| `shadow-md` | `0 4px 12px rgba(28,24,20,0.08), 0 2px 4px rgba(28,24,20,0.04)` | `shadow-md` | Popovers, floating elements |
| `shadow-lg` | `0 12px 28px rgba(28,24,20,0.12), 0 4px 8px rgba(28,24,20,0.06)` | `shadow-lg` | Modals, drawers |

---

## Motion

### Philosophy

Smooth and deliberate. Transitions exist to make the interface feel polished — not to entertain. Nothing bounces, nothing races. Calm pace matches the calm product.

### Duration Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Fast | `120ms` | Hover color shifts, icon swaps |
| Normal | `220ms` | Dropdowns, tooltips, tab switches |
| Slow | `380ms` | Modals, sidebars, page transitions |

### Easing

| Token | Value | Usage |
|-------|-------|-------|
| Default | `cubic-bezier(0.25, 0.1, 0.25, 1)` | General transitions |
| Enter | `cubic-bezier(0, 0, 0.58, 1)` | Elements arriving — eases to rest |
| Exit | `cubic-bezier(0.42, 0, 1, 1)` | Elements leaving |

### Reduced Motion

Wrap all transitions in `@media (prefers-reduced-motion: no-preference)`. When reduced motion is enabled: instant transitions, opacity-only crossfades.

---

## Responsive Breakpoints

Using Tailwind defaults:

| Name | Value | Layout behaviour |
|------|-------|-----------------|
| `sm` | 640px | Single column. Cards stack. Sidebar becomes full-screen drawer. |
| `md` | 768px | 2-column card grid. Chat/search narrows to max-width. |
| `lg` | 1024px | Sidebar persists. Two-panel layouts available. |
| `xl` | 1280px | Centred max-width container with generous margins. |

---

## Tailwind Config Extension

Add to `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
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
        success: '#3A9D7C',
        warning: '#D4943A',
        error:   '#C0554F',
        info:    '#4A9BA8',
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
      },
      borderRadius: {
        sm:   '6px',
        md:   '10px',
        lg:   '16px',
        xl:   '24px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(28,24,20,0.06), 0 1px 2px rgba(28,24,20,0.04)',
        md: '0 4px 12px rgba(28,24,20,0.08), 0 2px 4px rgba(28,24,20,0.04)',
        lg: '0 12px 28px rgba(28,24,20,0.12), 0 4px 8px rgba(28,24,20,0.06)',
      },
      maxWidth: {
        content: '720px',
        wide:    '1080px',
      },
      transitionDuration: {
        fast:   '120ms',
        normal: '220ms',
        slow:   '380ms',
      },
      transitionTimingFunction: {
        default: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        enter:   'cubic-bezier(0, 0, 0.58, 1)',
        exit:    'cubic-bezier(0.42, 0, 1, 1)',
      },
    },
  },
  plugins: [],
}
```

---

## Dark Mode

Not in scope for V1. The warm neutral palette is the primary experience. Dark mode may be revisited in V2.

---

## Open Decisions

1. **Poppins weight for body.** Weight 400 is specified. If body copy feels too light at small sizes on certain screens, bump to 500 — Poppins' medium weight is very readable and still warm.

2. **Accent frequency.** Teal (`#4A9BA8`) is reserved for badges, tags, and callouts. Avoid using it for primary actions — that's the sage green's job. The boundary needs monitoring once real screens exist.

3. **Ingredient score display.** EWG scores and safety ratings may need a dedicated data display treatment (monospace? colored backgrounds?). Not defined here — revisit once the ingredient detail component is built.

4. **Illustration and iconography style.** Not covered in V1. Icon library (Lucide? Heroicons?) and any illustration style should be defined before Phase 2 UI work.
