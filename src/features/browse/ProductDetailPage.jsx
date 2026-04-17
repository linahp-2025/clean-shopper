/**
 * ProductDetailPage
 *
 * Full product detail view — shown when a ProductCard is tapped on BrowsePage.
 * Displays name, brand, category, safety score, and description.
 * For caution/avoid products, fetches and shows up to 3 cleaner alternatives
 * from the same category.
 *
 * Feature-specific: src/features/browse/
 * Shared components used: SafetyBadge, ProductCard (src/components/)
 *
 * Props:
 *   product      {{ id, name, brand, category, description, safety_score, safety_level }}
 *   onBack       {() => void}           — return to Browse grid
 *   session      {object|null}          — Supabase session
 *   savedIds     {Set}                  — currently saved product IDs
 *   onToggleSave {(productId) => void}  — save/unsave handler
 */

import { useState, useEffect } from 'react'
import SafetyBadge from '../../components/SafetyBadge'
import ProductCard from '../../components/ProductCard'
import { supabase } from '../../lib/supabase'
import { getMockProductDetails } from '../../lib/mock-product-details'

// ── Back arrow icon ────────────────────────────────────────────────────────────

function ArrowLeftIcon({ className }) {
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
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

// ── Score meter ────────────────────────────────────────────────────────────────

function ScoreMeter({ score, level }) {
  const COLOR = {
    clean:   'bg-success',
    caution: 'bg-warning',
    avoid:   'bg-error',
  }
  const barColor = COLOR[level] ?? 'bg-neutral-300'
  const pct = Math.min(100, Math.max(0, score))

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-slow ease-enter`}
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        />
      </div>
      <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 w-8 text-right tabular-nums">
        {score}
      </span>
    </div>
  )
}

// ── Concern level config ───────────────────────────────────────────────────────

const INGREDIENT_LEVEL = {
  clean:   { dot: 'bg-success',  label: 'Clean',   text: 'text-success'  },
  caution: { dot: 'bg-warning',  label: 'Caution', text: 'text-warning'  },
  avoid:   { dot: 'bg-error',    label: 'Avoid',   text: 'text-error'    },
}

// ── Key Concerns ───────────────────────────────────────────────────────────────

function KeyConcerns({ concerns }) {
  if (!concerns.length) return null
  return (
    <section className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-700">
      <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-caps mb-3">
        Key Concerns
      </h2>
      <ul className="flex flex-wrap gap-2">
        {concerns.map((concern) => (
          <li
            key={concern}
            className="
              inline-flex items-center gap-1.5
              bg-error/10 dark:bg-error/20 text-error
              text-xs font-medium rounded-sm px-2.5 py-1
            "
          >
            <span className="w-1.5 h-1.5 rounded-full bg-error flex-shrink-0" aria-hidden="true" />
            {concern}
          </li>
        ))}
      </ul>
    </section>
  )
}

// ── Ingredients list ───────────────────────────────────────────────────────────

function IngredientsList({ ingredients }) {
  if (!ingredients.length) return null
  return (
    <section className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-700">
      <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-caps mb-3">
        Ingredients
      </h2>
      <ul className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-700">
        {ingredients.map(({ name, level }) => {
          const cfg = INGREDIENT_LEVEL[level] ?? INGREDIENT_LEVEL.clean
          return (
            <li key={name} className="flex items-center justify-between py-2.5 gap-4">
              <span className="text-sm text-neutral-700 dark:text-neutral-300">{name}</span>
              <span className={`
                inline-flex items-center gap-1.5
                text-xs font-medium whitespace-nowrap flex-shrink-0
                ${cfg.text}
              `}>
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} aria-hidden="true" />
                {cfg.label}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

// ── Alternatives section ───────────────────────────────────────────────────────

function Alternatives({ category, excludeId, session, savedIds, onToggleSave }) {
  const [alts, setAlts]       = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const userId = session?.user?.id ?? null

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('products')
        .select('id, name, brand, category, description, safety_score, safety_level')
        .eq('category', category)
        .eq('safety_level', 'clean')
        .neq('id', excludeId)
        .order('safety_score', { ascending: false })
        .limit(3)

      setAlts(data ?? [])
      setIsLoading(false)
    }
    load()
  }, [category, excludeId])

  if (!isLoading && alts.length === 0) return null

  return (
    <section className="mt-10 pt-8 border-t border-neutral-200 dark:border-neutral-700">
      <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-heading mb-1">
        Cleaner alternatives
      </h2>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
        These products in the same category have a clean safety rating.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <ProductCard key={i} isLoading />)
          : alts.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                safetyScore={p.safety_level}
                numScore={p.safety_score}
                category={p.category}
                description={p.description}
                onClick={() => {}}
                onSave={userId ? () => onToggleSave(p.id) : undefined}
                isSaved={savedIds.has(p.id)}
              />
            ))
        }
      </div>
    </section>
  )
}

// ── ProductDetailPage ──────────────────────────────────────────────────────────

export default function ProductDetailPage({
  product,
  onBack,
  session,
  savedIds,
  onToggleSave,
}) {
  const { id, name, brand, category, description, safety_score, safety_level } = product
  const userId  = session?.user?.id ?? null
  const isSaved = savedIds.has(id)
  const showAlternatives = safety_level === 'caution' || safety_level === 'avoid'

  const { key_concerns, ingredients } = getMockProductDetails(id)

  return (
    <div className="max-w-wide mx-auto px-8 py-10">

      {/* ── Back link ────────────────────────────────────────────────────── */}
      <button
        onClick={onBack}
        className="
          inline-flex items-center gap-1.5 mb-8
          text-sm font-medium text-neutral-500 dark:text-neutral-400
          hover:text-neutral-800 dark:hover:text-neutral-100
          transition-colors duration-fast ease-default
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md
        "
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Browse
      </button>

      {/* ── Product header ────────────────────────────────────────────────── */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 px-8 py-8 mb-8">

        {/* Category + badge row */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="
            inline-flex items-center
            bg-neutral-100 dark:bg-neutral-700 text-accent dark:text-accent-light
            text-xs font-medium tracking-caps uppercase
            rounded-sm px-2 py-1 leading-none
          ">
            {category}
          </span>
          <SafetyBadge score={safety_level} numScore={safety_score} size="md" />
        </div>

        {/* Name */}
        <h1 className="text-3xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-heading mb-1">
          {name}
        </h1>

        {/* Brand */}
        {brand && (
          <p className="text-sm text-neutral-400 dark:text-neutral-500 mb-6">
            by {brand}
          </p>
        )}

        {/* Score meter */}
        <div className="mb-6">
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-caps mb-2">
            Safety Score
          </p>
          <ScoreMeter score={safety_score} level={safety_level} />
        </div>

        {/* Description */}
        <p className="text-base text-neutral-600 dark:text-neutral-300 leading-body">
          {description}
        </p>

        {/* Key concerns */}
        <KeyConcerns concerns={key_concerns} />

        {/* Ingredients */}
        <IngredientsList ingredients={ingredients} />

        {/* Save button */}
        {userId && (
          <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-700 flex justify-end">
            <button
              onClick={() => onToggleSave(id)}
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                border transition-colors duration-fast ease-default
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-primary focus-visible:ring-offset-2
                ${isSaved
                  ? 'bg-primary text-white border-primary hover:bg-primary-dark'
                  : 'bg-white dark:bg-neutral-700 text-primary border-primary hover:bg-neutral-100 dark:hover:bg-neutral-600'
                }
              `}
              aria-label={isSaved ? 'Remove from list' : 'Save to list'}
            >
              <BookmarkIcon filled={isSaved} />
              {isSaved ? 'Saved' : 'Save to list'}
            </button>
          </div>
        )}
      </div>

      {/* ── Alternatives ─────────────────────────────────────────────────── */}
      {showAlternatives && (
        <Alternatives
          category={category}
          excludeId={id}
          session={session}
          savedIds={savedIds}
          onToggleSave={onToggleSave}
        />
      )}

    </div>
  )
}

// ── Bookmark icon (inline — avoids adding icon dep) ───────────────────────────

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
