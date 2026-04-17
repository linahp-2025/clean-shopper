/**
 * BrowsePage
 *
 * Browse view — responsive grid of ProductCards filterable by category.
 * Products fetched live from Supabase.
 * Save state persisted to saved_products table for signed-in users.
 *
 * Layout: src/features/browse/ — feature-specific, not shared.
 * Shared components used: ProductCard (src/components/)
 */

import { useState, useEffect } from 'react'
import ProductCard from '../../components/ProductCard'
import SearchBar from '../../components/SearchBar'
import ProductDetailPage from './ProductDetailPage'
import { supabase } from '../../lib/supabase'
import { fetchSavedIds, saveProduct, unsaveProduct } from '../../lib/savedProducts'

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
          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-800 dark:hover:text-neutral-100'
        }
      `}
    >
      {label}
    </button>
  )
}

// ── BrowsePage ─────────────────────────────────────────────────────────────────

export default function BrowsePage({ session }) {
  const [products, setProducts]             = useState([])
  const [savedIds, setSavedIds]             = useState(new Set())
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery]                   = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isLoading, setIsLoading]           = useState(true)
  const [error, setError]                   = useState(null)

  const userId = session?.user?.id ?? null

  // ── Fetch products + saved state on mount ─────────────────────────────────
  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      setError(null)

      const { data, error: productsError } = await supabase
        .from('products')
        .select('id, name, brand, category, description, safety_score, safety_level')
        .order('category')
        .order('name')

      if (productsError) {
        setError('Could not load products. Please try again.')
        console.error('Supabase error:', productsError.message)
        setIsLoading(false)
        return
      }

      setProducts(data)

      if (userId) {
        const ids = await fetchSavedIds(userId)
        setSavedIds(ids)
      }

      setIsLoading(false)
    }

    loadData()
  }, [userId])

  // ── Derive categories dynamically from fetched data ───────────────────────
  const categories = ['All', ...new Set(products.map((p) => p.category))]

  // ── Combined filter: category + search query ──────────────────────────────
  const trimmed = query.trim().toLowerCase()
  const visibleProducts = products.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    const matchesQuery    = !trimmed ||
      p.name.toLowerCase().includes(trimmed) ||
      (p.brand ?? '').toLowerCase().includes(trimmed) ||
      p.description.toLowerCase().includes(trimmed)
    return matchesCategory && matchesQuery
  })

  function handleQueryChange(value) {
    setQuery(value)
  }

  function handleClear() {
    setQuery('')
  }

  // ── Toggle save — persists to Supabase when signed in ────────────────────
  async function toggleSave(productId) {
    if (!userId) return

    const isSaved = savedIds.has(productId)

    setSavedIds((prev) => {
      const next = new Set(prev)
      isSaved ? next.delete(productId) : next.add(productId)
      return next
    })

    const { error } = isSaved
      ? await unsaveProduct(userId, productId)
      : await saveProduct(userId, productId)

    if (error) {
      setSavedIds((prev) => {
        const next = new Set(prev)
        isSaved ? next.add(productId) : next.delete(productId)
        return next
      })
    }
  }

  // ── Result count label ────────────────────────────────────────────────────
  function resultLabel() {
    const count = visibleProducts.length
    const parts = []
    if (activeCategory !== 'All') parts.push(`in ${activeCategory}`)
    if (trimmed) parts.push(`matching "${query.trim()}"`)
    return `${count} ${count === 1 ? 'product' : 'products'}${parts.length ? ' ' + parts.join(', ') : ''}`
  }

  if (selectedProduct) {
    return (
      <ProductDetailPage
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        session={session}
        savedIds={savedIds}
        onToggleSave={toggleSave}
      />
    )
  }

  return (
    <div className="max-w-wide mx-auto px-8 py-12">

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-heading mb-1">
          Browse Products
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          AI-assessed ingredient safety ratings. Tap a card to see the full breakdown.
        </p>
      </div>

      {/* ── Search bar ───────────────────────────────────────────────────── */}
      {!error && (
        <div className="mb-6">
          <SearchBar
            value={query}
            onChange={handleQueryChange}
            onSubmit={() => {}}
            onClear={handleClear}
            placeholder="Search by name, brand, or ingredient…"
          />
        </div>
      )}

      {/* ── Error banner ─────────────────────────────────────────────────── */}
      {error && (
        <div className="mb-6 px-4 py-3 bg-error text-white text-sm rounded-md">
          {error}
        </div>
      )}

      {/* ── Category filters ─────────────────────────────────────────────── */}
      {!error && (
        <div className="flex flex-wrap gap-2 mb-6">
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
        <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium mb-4">
          {resultLabel()}
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
            onClick={() => setSelectedProduct(product)}
            onSave={userId ? () => toggleSave(product.id) : undefined}
            isSaved={savedIds.has(product.id)}
          />
        ))}

      </div>
    </div>
  )
}
