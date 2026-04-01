/**
 * ProductCard
 *
 * Displays a single product summary — name, safety badge, category tag,
 * and short description — as a tappable card.
 *
 * Props:
 *   name        {string}                         — required
 *   safetyScore {'clean' | 'caution' | 'avoid'}  — required, drives SafetyBadge
 *   numScore    {number}                          — optional, numeric EWG score
 *   category    {string}                          — required
 *   description {string}                          — required, max ~120 chars
 *   onClick     {() => void}                      — required, navigate to detail
 *   onSave      {() => void}                      — optional, shows save button
 *   isSaved     {boolean}                         — optional, filled save icon
 *   isLoading   {boolean}                         — optional, skeleton shimmer
 */

import SafetyBadge from './SafetyBadge'

// ── Save icon ──────────────────────────────────────────────────────────────────
function BookmarkIcon({ filled }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  )
}

// ── Loading skeleton ───────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <article className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 flex flex-col gap-4 animate-pulse">
      <div className="flex items-center justify-between gap-3">
        <div className="h-5 w-24 bg-neutral-200 rounded-sm" />
        <div className="h-5 w-16 bg-neutral-200 rounded-full" />
      </div>
      <div className="h-6 w-3/4 bg-neutral-200 rounded-md" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-full bg-neutral-200 rounded-md" />
        <div className="h-4 w-5/6 bg-neutral-200 rounded-md" />
      </div>
    </article>
  )
}

// ── ProductCard ────────────────────────────────────────────────────────────────
export default function ProductCard({
  name,
  safetyScore,
  numScore,
  category,
  description,
  onClick,
  onSave,
  isSaved = false,
  isLoading = false,
}) {
  if (isLoading) return <Skeleton />

  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      className="
        bg-white rounded-lg shadow-sm border border-neutral-200
        px-6 pt-5 pb-6 flex flex-col gap-3
        cursor-pointer
        transition-shadow duration-fast ease-default
        hover:shadow-md hover:border-neutral-300
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-primary focus-visible:ring-offset-2
      "
    >

      {/* ── Top row: category tag + safety badge ──────────────────────────── */}
      <div className="flex items-center justify-between gap-3">

        <span className="
          inline-flex items-center
          bg-neutral-100 text-accent
          text-xs font-medium tracking-caps uppercase
          rounded-sm px-2 py-1
          leading-none
        ">
          {category}
        </span>

        <SafetyBadge score={safetyScore} numScore={numScore} size="sm" />

      </div>

      {/* ── Product name ───────────────────────────────────────────────────── */}
      <h3 className="text-xl font-semibold text-neutral-800 leading-tight tracking-heading">
        {name}
      </h3>

      {/* ── Description ───────────────────────────────────────────────────── */}
      <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3 mt-1">
        {description}
      </p>

      {/* ── Footer: save button (only when onSave provided) ───────────────── */}
      {onSave && (
        <div className="flex justify-end mt-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onSave()
            }}
            aria-label={isSaved ? 'Remove from library' : 'Save to library'}
            className={`
              p-1.5 rounded-md
              transition-colors duration-fast ease-default
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-primary focus-visible:ring-offset-2
              ${isSaved
                ? 'text-primary hover:text-primary-dark'
                : 'text-neutral-400 hover:text-primary'
              }
            `}
          >
            <BookmarkIcon filled={isSaved} />
          </button>
        </div>
      )}

    </article>
  )
}
