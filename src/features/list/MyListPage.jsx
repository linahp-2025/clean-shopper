/**
 * MyListPage
 *
 * Displays all products the signed-in user has saved.
 * Fetches saved_products joined to products via Supabase select.
 * Users can unsave items directly from this page.
 * Unauthenticated users see a prompt to sign in.
 *
 * Layout: src/features/list/ — feature-specific, not shared.
 * Shared components used: ProductCard (src/components/)
 */

import { useState, useEffect, useCallback } from 'react'
import ProductCard from '../../components/ProductCard'
import { supabase } from '../../lib/supabase'
import { unsaveProduct } from '../../lib/savedProducts'

// ── Empty state ────────────────────────────────────────────────────────────────

function EmptyList({ onNavigate }) {
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
        <line x1="8"  y1="6"  x2="21" y2="6"  />
        <line x1="8"  y1="12" x2="21" y2="12" />
        <line x1="8"  y1="18" x2="21" y2="18" />
        <line x1="3"  y1="6"  x2="3.01" y2="6"  />
        <line x1="3"  y1="12" x2="3.01" y2="12" />
        <line x1="3"  y1="18" x2="3.01" y2="18" />
      </svg>
      <p className="text-base font-semibold text-neutral-700">
        Your list is empty
      </p>
      <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
        Browse or search for products and tap the save button to add them here.
      </p>
      <button
        onClick={() => onNavigate('browse')}
        className="
          mt-2 px-4 py-2 rounded-md text-sm font-medium
          bg-primary text-white
          hover:bg-primary-dark
          transition-colors duration-fast ease-default
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-primary focus-visible:ring-offset-2
        "
      >
        Browse products
      </button>
    </div>
  )
}

// ── Sign-in prompt for unauthenticated users ───────────────────────────────────

function SignInPrompt({ onNavigate }) {
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
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
      <p className="text-base font-semibold text-neutral-700">
        Sign in to see your list
      </p>
      <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
        Your saved products are stored to your account. Sign in to view and manage them.
      </p>
      <button
        onClick={() => onNavigate('signin')}
        className="
          mt-2 px-4 py-2 rounded-md text-sm font-medium
          bg-primary text-white
          hover:bg-primary-dark
          transition-colors duration-fast ease-default
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-primary focus-visible:ring-offset-2
        "
      >
        Sign in
      </button>
    </div>
  )
}

// ── MyListPage ─────────────────────────────────────────────────────────────────

export default function MyListPage({ session, onNavigate }) {
  const [savedProducts, setSavedProducts] = useState([])
  const [isLoading, setIsLoading]         = useState(true)
  const [error, setError]                 = useState(null)

  const userId = session?.user?.id ?? null

  // ── Fetch saved products joined to product details ────────────────────────
  const loadSavedProducts = useCallback(async () => {
    if (!userId) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    const { data, error } = await supabase
      .from('saved_products')
      .select(`
        product_id,
        created_at,
        products (
          id,
          name,
          brand,
          category,
          description,
          safety_score,
          safety_level
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      setError('Could not load your list. Please try again.')
      console.error('MyListPage fetch error:', error.message)
    } else {
      // Flatten the join result — extract the nested products object
      setSavedProducts(data.map((row) => ({ ...row.products, savedAt: row.created_at })))
    }

    setIsLoading(false)
  }, [userId])

  useEffect(() => {
    loadSavedProducts()
  }, [loadSavedProducts])

  // ── Unsave a product and remove it from the list ──────────────────────────
  async function handleUnsave(productId) {
    // Optimistic removal
    setSavedProducts((prev) => prev.filter((p) => p.id !== productId))

    const { error } = await unsaveProduct(userId, productId)

    // Revert on error
    if (error) {
      loadSavedProducts()
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-wide mx-auto px-8 py-12">

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-neutral-800 tracking-heading mb-1">
          My List
        </h1>
        <p className="text-sm text-neutral-500 leading-relaxed">
          Products you&rsquo;ve saved for reference. Tap the save button to remove one.
        </p>
      </div>

      {/* ── Not signed in ────────────────────────────────────────────────── */}
      {!userId && <SignInPrompt onNavigate={onNavigate} />}

      {/* ── Error banner ─────────────────────────────────────────────────── */}
      {userId && error && (
        <div className="mb-6 px-4 py-3 bg-error text-white text-sm rounded-md">
          {error}
        </div>
      )}

      {/* ── Loading skeletons ─────────────────────────────────────────────── */}
      {userId && isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProductCard key={i} isLoading />
          ))}
        </div>
      )}

      {/* ── Empty state ──────────────────────────────────────────────────── */}
      {userId && !isLoading && !error && savedProducts.length === 0 && (
        <EmptyList onNavigate={onNavigate} />
      )}

      {/* ── Saved products grid ───────────────────────────────────────────── */}
      {userId && !isLoading && !error && savedProducts.length > 0 && (
        <>
          <p className="text-xs text-neutral-400 font-medium mb-4">
            {savedProducts.length} {savedProducts.length === 1 ? 'product' : 'products'} saved
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                safetyScore={product.safety_level}
                numScore={product.safety_score}
                category={product.category}
                description={product.description}
                onClick={() => {}}
                onSave={() => handleUnsave(product.id)}
                isSaved={true}
              />
            ))}
          </div>
        </>
      )}

    </div>
  )
}
