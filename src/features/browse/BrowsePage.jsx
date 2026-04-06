/**
 * BrowsePage
 *
 * Browse view — responsive grid of ProductCards filterable by category.
 * Products fetched live from Supabase. Save state is local (no persistence in V1 yet).
 *
 * Layout: src/features/browse/ — feature-specific, not shared.
 * Shared components used: ProductCard (src/components/)
 */

import { useState, useEffect } from 'react'
import ProductCard from '../../components/ProductCard'
import { supabase } from '../../lib/supabase'

// ── Category filter pill ───────────────────────────────────────────────────────

function FilterPill({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap
        transition-colors duration-fast ease-default
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-primary focus-visible:ring-offset-2
        ${isActive
          ? 'bg-primary text-white'
          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-800'
        }
      `}
    >
      {label}
    </button>
  )
}

// ── BrowsePage ─────────────────────────────────────────────────────────────────

export default function BrowsePage() {
  const [products, setProducts]             = useState([])
  const [savedIds, setSavedIds]             = useState(new Set())
  const [activeCategory, setActiveCategory] = useState('All')
  const [isLoading, setIsLoading]           = useState(true)
  const [error, setError]                   = useState(null)

  // ── Fetch products from Supabase ──────────────────────────────────────────
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('products')
        .select('id, name, brand, category, description, safety_score, safety_level')
        .order('category')
        .order('name')

      if (error) {
        setError('Could not load products. Please try again.')
        console.error('Supabase error:', error.message)
      } else {
        setProducts(data)
      }

      setIsLoading(false)
    }

    fetchProducts()
  }, [])

  // ── Derive categories dynamically from fetched data ───────────────────────
  const categories = ['All', ...new Set(products.map((p) => p.category))]

  // ── Filter ────────────────────────────────────────────────────────────────
  const visibleProducts = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory)

  function toggleSave(id) {
    setSavedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="max-w-wide mx-auto px-8 py-12">

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-neutral-800 tracking-heading mb-1">
          Browse Products
        </h1>
        <p className="text-sm text-neutral-500 leading-relaxed">
          AI-assessed ingredient safety ratings. Tap a card to see the full breakdown.
        </p>
      </div>

      {/* ── Error banner ─────────────────────────────────────────────────── */}
      {error && (
        <div className="mb-6 px-4 py-3 bg-error text-white text-sm rounded-md">
          {error}
        </div>
      )}

      {/* ── Category filters ─────────────────────────────────────────────── */}
      {!error && (
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <FilterPill
              key={cat}
              label={cat}
              isActive={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
      )}

      {/* ── Result count ─────────────────────────────────────────────────── */}
      {!isLoading && !error && (
        <p className="text-xs text-neutral-400 font-medium mb-4">
          {visibleProducts.length} {visibleProducts.length === 1 ? 'product' : 'products'}
          {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
        </p>
      )}

      {/* ── Product grid ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Loading skeletons */}
        {isLoading && Array.from({ length: 6 }).map((_, i) => (
          <ProductCard key={i} isLoading />
        ))}

        {/* Live products */}
        {!isLoading && visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            safetyScore={product.safety_level}
            numScore={product.safety_score}
            category={product.category}
            description={product.description}
            onClick={() => {}}
            onSave={() => toggleSave(product.id)}
            isSaved={savedIds.has(product.id)}
          />
        ))}

      </div>
    </div>
  )
}
