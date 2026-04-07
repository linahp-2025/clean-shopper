/**
 * SearchPage
 *
 * Search view — SearchBar at top, results grid below.
 * Queries Supabase products table for partial matches across
 * name, brand, and description using ilike.
 * Save state persisted to saved_products table for signed-in users.
 *
 * Layout: src/features/search/ — feature-specific, not shared.
 * Shared components used: SearchBar, ProductCard (src/components/)
 */

import { useState, useEffect, useCallback } from 'react'
import SearchBar from '../../components/SearchBar'
import ProductCard from '../../components/ProductCard'
import { supabase } from '../../lib/supabase'
import { fetchSavedIds, saveProduct, unsaveProduct } from '../../lib/savedProducts'

// ── Empty state ────────────────────────────────────────────────────────────────

function NoResults({ query }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 py-16 px-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-12 h-12 text-neutral-300"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
      <p className="text-base font-semibold text-neutral-700">
        No results for &ldquo;{query}&rdquo;
      </p>
      <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
        Try a different keyword — a brand name, ingredient, or category
        like &ldquo;soap&rdquo;, &ldquo;Seventh Generation&rdquo;, or &ldquo;fragrance-free&rdquo;.
      </p>
    </div>
  )
}

// ── Prompt state (before first search) ────────────────────────────────────────

function SearchPrompt() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 py-16 px-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-12 h-12 text-neutral-300"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <p className="text-base font-semibold text-neutral-700">
        Search for a product
      </p>
      <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
        Type a product name, brand, or ingredient — like &ldquo;dish soap&rdquo;,
        &ldquo;Dr. Bronner&rdquo;, or &ldquo;castile&rdquo;.
      </p>
    </div>
  )
}

// ── SearchPage ─────────────────────────────────────────────────────────────────

export default function SearchPage({ session }) {
  const [query, setQuery]             = useState('')
  const [results, setResults]         = useState([])
  const [savedIds, setSavedIds]       = useState(new Set())
  const [isLoading, setIsLoading]     = useState(false)
  const [error, setError]             = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  const userId = session?.user?.id ?? null

  // ── Load saved IDs when session is available ──────────────────────────────
  useEffect(() => {
    if (!userId) return
    fetchSavedIds(userId).then(setSavedIds)
  }, [userId])

  // ── Supabase search — ilike across name, brand, description ───────────────
  const runSearch = useCallback(async (searchQuery) => {
    const trimmed = searchQuery.trim()
    if (!trimmed) return

    setIsLoading(true)
    setError(null)
    setHasSearched(true)

    const { data, error } = await supabase
      .from('products')
      .select('id, name, brand, category, description, safety_score, safety_level')
      .or(
        `name.ilike.%${trimmed}%,` +
        `brand.ilike.%${trimmed}%,` +
        `description.ilike.%${trimmed}%`
      )
      .order('safety_score', { ascending: false })

    if (error) {
      setError('Search failed. Please try again.')
      console.error('Supabase search error:', error.message)
      setResults([])
    } else {
      setResults(data)
    }

    setIsLoading(false)
  }, [])

  function handleChange(value) {
    setQuery(value)
    if (!value.trim()) {
      setResults([])
      setHasSearched(false)
      setError(null)
    }
  }

  function handleClear() {
    setQuery('')
    setResults([])
    setHasSearched(false)
    setError(null)
  }

  // ── Toggle save — persists to Supabase when signed in ────────────────────
  async function toggleSave(productId) {
    if (!userId) return

    const isSaved = savedIds.has(productId)

    // Optimistic update
    setSavedIds((prev) => {
      const next = new Set(prev)
      isSaved ? next.delete(productId) : next.add(productId)
      return next
    })

    // Persist to Supabase
    const { error } = isSaved
      ? await unsaveProduct(userId, productId)
      : await saveProduct(userId, productId)

    // Revert on error
    if (error) {
      setSavedIds((prev) => {
        const next = new Set(prev)
        isSaved ? next.add(productId) : next.delete(productId)
        return next
      })
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-wide mx-auto px-8 py-12">

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-neutral-800 tracking-heading mb-1">
          Search Products
        </h1>
        <p className="text-sm text-neutral-500 leading-relaxed">
          Find products by name, brand, or ingredient. We&rsquo;ll show you the safety rating.
        </p>
      </div>

      {/* ── Search bar ───────────────────────────────────────────────────── */}
      <div className="mb-8">
        <SearchBar
          value={query}
          onChange={handleChange}
          onSubmit={() => runSearch(query)}
          onClear={handleClear}
          isLoading={isLoading}
        />
      </div>

      {/* ── Error ────────────────────────────────────────────────────────── */}
      {error && (
        <div className="mb-6 px-4 py-3 bg-error text-white text-sm rounded-md">
          {error}
        </div>
      )}

      {/* ── Loading skeletons ─────────────────────────────────────────────── */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProductCard key={i} isLoading />
          ))}
        </div>
      )}

      {/* ── Results ──────────────────────────────────────────────────────── */}
      {!isLoading && hasSearched && !error && (
        <>
          {results.length > 0 ? (
            <>
              <p className="text-xs text-neutral-400 font-medium mb-4">
                {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query.trim()}&rdquo;
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    safetyScore={product.safety_level}
                    numScore={product.safety_score}
                    category={product.category}
                    description={product.description}
                    onClick={() => {}}
                    onSave={userId ? () => toggleSave(product.id) : undefined}
                    isSaved={savedIds.has(product.id)}
                  />
                ))}
              </div>
            </>
          ) : (
            <NoResults query={query.trim()} />
          )}
        </>
      )}

      {/* ── Prompt (before first search) ──────────────────────────────────── */}
      {!isLoading && !hasSearched && !error && <SearchPrompt />}

    </div>
  )
}
