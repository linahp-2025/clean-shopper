/**
 * SearchBar
 *
 * Primary product lookup input — full-width text field with a search icon,
 * optional clear button, and loading spinner state.
 * Spec: /docs/component-spec.md — Section 3
 *
 * Props:
 *   value       {string}               — required, controlled value
 *   onChange    {(value) => void}      — required
 *   onSubmit    {() => void}           — required, fires on Enter or icon press
 *   onClear     {() => void}           — optional, shows × when value is non-empty
 *   placeholder {string}               — optional, default shown below
 *   isLoading   {boolean}              — optional, spinner replaces search icon
 *   disabled    {boolean}              — optional
 */

// ── Icons ──────────────────────────────────────────────────────────────────────

function SearchIcon({ className }) {
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function ClearIcon({ className }) {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function SpinnerIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`animate-spin ${className}`}
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

// ── SearchBar ──────────────────────────────────────────────────────────────────

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  onClear,
  placeholder = 'Search products or ingredients…',
  isLoading = false,
  disabled = false,
}) {
  function handleKeyDown(e) {
    if (e.key === 'Enter') onSubmit()
  }

  const showClear = onClear && value && !disabled

  return (
    <div className="relative flex items-center w-full">

      {/* ── Left icon: spinner when loading, search otherwise ──────────────── */}
      <span className="absolute left-3 pointer-events-none">
        {isLoading
          ? <SpinnerIcon className="w-5 h-5 text-primary" />
          : <SearchIcon  className="w-5 h-5 text-neutral-400" />
        }
      </span>

      {/* ── Input ──────────────────────────────────────────────────────────── */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        aria-label="Search products"
        className={`
          w-full bg-white dark:bg-neutral-800 border rounded-lg
          pl-10 ${showClear ? 'pr-10' : 'pr-4'} py-3
          text-base text-neutral-800 dark:text-neutral-100
          placeholder:text-neutral-400 dark:placeholder:text-neutral-500
          leading-body shadow-sm
          transition-all duration-fast ease-default
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:shadow-md
          ${disabled
            ? 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400 cursor-not-allowed border-neutral-200 dark:border-neutral-600'
            : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
          }
        `}
      />

      {/* ── Right: clear button (only when value is non-empty) ─────────────── */}
      {showClear && (
        <button
          onClick={onClear}
          aria-label="Clear search"
          className="
            absolute right-3
            text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300
            transition-colors duration-fast ease-default
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-primary focus-visible:ring-offset-1
            rounded
          "
        >
          <ClearIcon className="w-4 h-4" />
        </button>
      )}

    </div>
  )
}
