/**
 * NavBar
 *
 * Top-level navigation bar — persistent across all views.
 * Desktop: horizontal bar pinned to the top.
 * Mobile: fixed bottom tab bar (md:hidden).
 *
 * The "Home" view maps to the 'search' route — Search is the app's
 * landing page. Pass activeRoute="search" to highlight it.
 *
 * Props:
 *   activeRoute  {'search' | 'library' | 'list'}  — required
 *   onNavigate   {(route: string) => void}         — required
 *   mode         {'light' | 'dark'}                — required, passed from app-level state
 *   onModeChange {(mode: string) => void}          — required, updates app-level mode state
 */

import ModeControl from './ModeControl'

// ── Icons (inline SVG — no icon library dependency) ───────────────────────────

function SearchIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={1.75}
      strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

function LibraryIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={1.75}
      strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true"
    >
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  )
}

function ListIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={1.75}
      strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  )
}

// ── Nav config ─────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { route: 'search',  label: 'Search',   Icon: SearchIcon  },
  { route: 'library', label: 'Library',  Icon: LibraryIcon },
  { route: 'list',    label: 'My List',  Icon: ListIcon    },
]

// ── Component ──────────────────────────────────────────────────────────────────

export default function NavBar({ activeRoute, onNavigate, mode, onModeChange }) {
  return (
    <>
      {/* ── Desktop top bar ─────────────────────────────────────────────── */}
      <header className="
        hidden md:flex
        w-full bg-white border-b border-neutral-200 shadow-sm
        px-8 h-14 items-center justify-between
      ">

        {/* Wordmark */}
        <span className="text-base font-semibold text-primary tracking-normal select-none">
          🌿 Clean Shopper
        </span>

        {/* Desktop nav links + ModeControl */}
        <div className="flex items-center gap-4">
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-1" role="list">
              {NAV_ITEMS.map(({ route, label }) => {
                const isActive = activeRoute === route
                return (
                  <li key={route}>
                    <button
                      onClick={() => onNavigate(route)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`
                        text-sm font-medium px-3 py-1 rounded-md
                        transition-colors duration-fast ease-default
                        focus-visible:outline-none focus-visible:ring-2
                        focus-visible:ring-primary focus-visible:ring-offset-2
                        ${isActive
                          ? 'text-primary bg-neutral-100'
                          : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100'
                        }
                      `}
                    >
                      {label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <ModeControl mode={mode} onChange={onModeChange} size="sm" />
        </div>

      </header>

      {/* ── Mobile bottom bar ───────────────────────────────────────────── */}
      <nav
        aria-label="Primary navigation"
        className="
          md:hidden
          fixed bottom-0 inset-x-0
          bg-white border-t border-neutral-200 shadow-lg
          flex justify-around items-center h-16 px-4
        "
      >
        {NAV_ITEMS.map(({ route, label, Icon }) => {
          const isActive = activeRoute === route
          return (
            <button
              key={route}
              onClick={() => onNavigate(route)}
              aria-current={isActive ? 'page' : undefined}
              className={`
                flex flex-col items-center gap-1
                text-xs font-medium
                transition-colors duration-fast ease-default
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-primary focus-visible:ring-offset-2
                rounded-md px-3 py-1
                ${isActive ? 'text-primary' : 'text-neutral-400'}
              `}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          )
        })}
      </nav>

    </>
  )
}
