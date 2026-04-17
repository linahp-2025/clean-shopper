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
 *   activeRoute  {'browse' | 'search' | 'library' | 'list'}  — required
 *   onNavigate   {(route: string) => void}                    — required
 *   mode         {'light' | 'dark'}                           — required
 *   onModeChange {(mode: string) => void}                     — required
 *   onSignOut    {() => void}                                  — required, signs out and returns to sign-in
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

function SignOutIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={1.75}
      strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true"
    >
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

function BrowseIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={1.75}
      strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
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
  { route: 'browse',  label: 'Browse',   Icon: BrowseIcon  },
  { route: 'library', label: 'Library',  Icon: LibraryIcon },
  { route: 'list',    label: 'My List',  Icon: ListIcon    },
]

// ── Component ──────────────────────────────────────────────────────────────────

export default function NavBar({ activeRoute, onNavigate, mode, onModeChange, session, onSignOut }) {
  return (
    <>
      {/* ── Desktop top bar ─────────────────────────────────────────────── */}
      <header className="
        hidden md:flex
        w-full bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 shadow-sm
        px-8 h-14 items-center justify-between
      ">

        {/* Wordmark */}
        <span className="text-base font-semibold text-primary tracking-normal select-none">
          🌿 Clean Shopper
        </span>

        {/* Desktop nav links + ModeControl + auth */}
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
                          ? 'text-primary bg-neutral-100 dark:bg-neutral-800'
                          : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'
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

          {/* Sign out (signed in) or Sign in (not signed in) */}
          {session ? (
            <button
              onClick={onSignOut}
              aria-label="Sign out"
              title="Sign out"
              className="
                flex items-center gap-1.5 text-sm font-medium
                text-neutral-500 dark:text-neutral-400 hover:text-error
                transition-colors duration-fast ease-default
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-primary focus-visible:ring-offset-2
                rounded-md px-2 py-1
              "
            >
              <SignOutIcon className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('signin')}
              className="
                flex items-center gap-1.5 text-sm font-medium
                text-primary hover:text-primary-dark
                transition-colors duration-fast ease-default
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-primary focus-visible:ring-offset-2
                rounded-md px-2 py-1
              "
            >
              Sign in
            </button>
          )}
        </div>

      </header>

      {/* ── Mobile bottom bar ───────────────────────────────────────────── */}
      <nav
        aria-label="Primary navigation"
        className="
          md:hidden
          fixed bottom-0 inset-x-0
          bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 shadow-lg
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
                ${isActive ? 'text-primary' : 'text-neutral-400 dark:text-neutral-500'}
              `}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          )
        })}

        {/* Sign out (signed in) or Sign in (not signed in) — mobile */}
        {session ? (
          <button
            onClick={onSignOut}
            aria-label="Sign out"
            className="
              flex flex-col items-center gap-1
              text-xs font-medium text-neutral-400
              hover:text-error
              transition-colors duration-fast ease-default
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-primary focus-visible:ring-offset-2
              rounded-md px-3 py-1
            "
          >
            <SignOutIcon className="w-5 h-5" />
            Sign out
          </button>
        ) : (
          <button
            onClick={() => onNavigate('signin')}
            className="
              flex flex-col items-center gap-1
              text-xs font-medium text-primary
              transition-colors duration-fast ease-default
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-primary focus-visible:ring-offset-2
              rounded-md px-3 py-1
            "
          >
            <SignOutIcon className="w-5 h-5" />
            Sign in
          </button>
        )}
      </nav>

    </>
  )
}
