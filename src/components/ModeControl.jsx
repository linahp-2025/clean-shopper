/**
 * ModeControl
 *
 * Pill-shaped toggle between light and dark mode.
 * Controlled externally — mode state lives at app level.
 *
 * Props:
 *   mode      {'light' | 'dark'}                    — required, current active mode
 *   onChange  (mode: 'light' | 'dark') => void       — required, called on toggle
 *   size      {'sm' | 'md'}                          — optional, default 'md'
 *
 * V1 note: dark mode styles are out of scope. This component is built for
 * V2 readiness — the toggle renders and fires onChange, but dark styles
 * are not applied until V2.
 */

// ── Icons ──────────────────────────────────────────────────────────────────────

function SunIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1"  x2="12" y2="3"  />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22"  x2="5.64"  y2="5.64"  />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1"  y1="12" x2="3"  y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" />
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
    </svg>
  )
}

function MoonIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

// ── Size config ────────────────────────────────────────────────────────────────

const SIZE = {
  md: { segment: 'px-3 py-1.5 text-sm gap-1.5', icon: 'w-4 h-4' },
  sm: { segment: 'px-2 py-1   text-xs gap-1',   icon: 'w-3 h-3' },
}

// ── ModeControl ────────────────────────────────────────────────────────────────

export default function ModeControl({ mode, onChange, size = 'md' }) {
  const { segment, icon } = SIZE[size] ?? SIZE.md

  const activeClasses   = 'bg-white text-neutral-800 shadow-sm'
  const inactiveClasses = 'bg-transparent text-neutral-400 hover:text-neutral-600'

  const baseSegment = [
    'inline-flex items-center rounded-full font-medium',
    'transition-all duration-normal ease-default',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-primary focus-visible:ring-offset-1',
    segment,
  ].join(' ')

  return (
    <div
      role="group"
      aria-label="Display mode"
      className="inline-flex items-center rounded-full bg-neutral-100 border border-neutral-200 p-0.5 gap-0.5"
    >
      {/* ── Light segment ──────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => onChange('light')}
        aria-pressed={mode === 'light'}
        aria-label="Switch to light mode"
        className={`${baseSegment} ${mode === 'light' ? activeClasses : inactiveClasses}`}
      >
        <SunIcon className={icon} />
        <span>Light</span>
      </button>

      {/* ── Dark segment ───────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => onChange('dark')}
        aria-pressed={mode === 'dark'}
        aria-label="Switch to dark mode"
        className={`${baseSegment} ${mode === 'dark' ? activeClasses : inactiveClasses}`}
      >
        <MoonIcon className={icon} />
        <span>Dark</span>
      </button>
    </div>
  )
}
