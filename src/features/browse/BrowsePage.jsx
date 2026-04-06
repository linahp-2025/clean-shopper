/**
 * BrowsePage
 *
 * Browse view — responsive grid of ProductCards filterable by category.
 * Placeholder data only. Save state is local (no persistence in V1 yet).
 *
 * Layout: src/features/browse/ — feature-specific, not shared.
 * Shared components used: ProductCard (src/components/)
 */

import { useState } from 'react'
import ProductCard from '../../components/ProductCard'

// ── Placeholder data ───────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 1,
    name: "Dr. Bronner's Pure Castile Soap",
    safetyScore: 'clean',
    numScore: 94,
    category: 'Personal Care',
    description:
      'Organic, fair trade, and EWG Verified. Free from synthetic preservatives, detergents, and artificial fragrance. Every ingredient disclosed.',
  },
  {
    id: 2,
    name: 'Acure Brightening Facial Scrub',
    safetyScore: 'caution',
    category: 'Personal Care',
    description:
      'Contains sea kelp and glycolic acid. Three of twelve ingredients rated moderate concern by EWG — synthetic fragrance components undisclosed.',
  },
  {
    id: 3,
    name: 'Branch Basics Concentrate',
    safetyScore: 'clean',
    numScore: 98,
    category: 'Home Cleaning',
    description:
      'Plant-based, fragrance-free, EWG Verified. Every ingredient third-party tested and rated 1–2 on Skin Deep. Certified B Corp.',
  },
  {
    id: 4,
    name: 'Method All-Purpose Cleaner',
    safetyScore: 'caution',
    category: 'Home Cleaning',
    description:
      'Biodegradable surfactants, mostly low-hazard — but synthetic fragrance blend is undisclosed. Full safety assessment not possible.',
  },
  {
    id: 5,
    name: 'Babyganics Shampoo + Body Wash',
    safetyScore: 'clean',
    numScore: 88,
    category: 'Baby Care',
    description:
      'Tear-free, plant-derived formula. Free from sulfates, parabens, and artificial fragrance. Dermatologist-tested and pediatrician-approved.',
  },
  {
    id: 6,
    name: 'Desitin Rapid Relief Cream',
    safetyScore: 'avoid',
    category: 'Baby Care',
    description:
      'Zinc oxide is effective, but formulation contains BHA and synthetic fragrance components flagged by EWG at moderate-to-high concern levels.',
  },
]

const CATEGORIES = ['All', 'Personal Care', 'Home Cleaning', 'Baby Care']

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
  const [savedIds, setSavedIds]           = useState(new Set())
  const [activeCategory, setActiveCategory] = useState('All')

  const visibleProducts = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory)

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

      {/* ── Category filters ─────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <FilterPill
            key={cat}
            label={cat}
            isActive={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          />
        ))}
      </div>

      {/* ── Result count ─────────────────────────────────────────────────── */}
      <p className="text-xs text-neutral-400 font-medium mb-4">
        {visibleProducts.length} {visibleProducts.length === 1 ? 'product' : 'products'}
        {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
      </p>

      {/* ── Product grid ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            safetyScore={product.safetyScore}
            numScore={product.numScore}
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
