import { useState } from 'react'
import NavBar from './components/NavBar'
import ProductCard from './components/ProductCard'
import NotificationBanner from './components/NotificationBanner'

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Dr. Bronner's Pure Castile Soap",
    safetyScore: 'clean',
    numScore: 92,
    category: 'Personal Care',
    description:
      'Organic, fair trade, no synthetic preservatives or detergents.',
  },
  {
    id: 2,
    name: 'Branch Basics Concentrate',
    safetyScore: 'clean',
    category: 'All-Purpose Cleaner',
    description:
      'Plant-based concentrate free from synthetic fragrances, dyes, and preservatives. EWG Verified — every ingredient disclosed and safety-assessed.',
  },
  {
    id: 3,
    name: 'Method All-Purpose Cleaner',
    safetyScore: 'caution',
    category: 'All-Purpose Cleaner',
    description:
      'Biodegradable formula with mostly low-hazard ingredients. Contains synthetic fragrance blend — exact components undisclosed.',
  },
  {
    id: 4,
    name: 'Scrubbing Bubbles Bathroom Cleaner',
    safetyScore: 'avoid',
    category: 'Bathroom Cleaner',
    description:
      'Contains DEGBE and undisclosed fragrance ingredients flagged for respiratory irritation and endocrine disruption at regular exposure levels.',
  },
]

export default function App() {
  const [activeRoute, setActiveRoute] = useState('search')

  return (
    <div className="min-h-screen bg-neutral-50">
      <NavBar activeRoute={activeRoute} onNavigate={setActiveRoute} />
    <div className="px-8 py-16">

      {/* Page header */}
      <div className="max-w-wide mx-auto mb-12">
        <h1 className="text-3xl font-semibold text-neutral-800 tracking-heading mb-2">
          Product Library
        </h1>
        <p className="text-sm text-neutral-500">
          AI-assessed ingredient safety for every product in your list.
        </p>
      </div>

      {/* Notification banners */}
      <div className="max-w-wide mx-auto flex flex-col gap-3 mb-12">
        <NotificationBanner
          variant="success"
          title="Product saved to library"
          message="Branch Basics Concentrate has been added to your Cleaning Supplies list."
          dismissible
        />
        <NotificationBanner
          variant="info"
          title="EWG data last updated 6 months ago"
          message="Ingredient safety scores may not reflect the most recent formulation. Verify on EWG Skin Deep before purchasing."
        />
        <NotificationBanner
          variant="warning"
          title="Unverified ingredient detected"
          message="This product contains a fragrance blend with undisclosed components. Full safety assessment is not possible."
          dismissible
        />
        <NotificationBanner
          variant="error"
          title="Harmful ingredient flagged"
          message="Sodium Lauryl Sulfate is rated 4–6 by EWG and is associated with skin irritation and organ toxicity at repeated exposure."
          dismissible
        />
      </div>

      {/* Card grid */}
      <div className="max-w-wide mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_PRODUCTS.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

    </div>
    </div>
  )
}
