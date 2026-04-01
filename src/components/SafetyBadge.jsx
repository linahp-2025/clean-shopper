/**
 * SafetyBadge
 *
 * Colour-coded pill communicating a product's safety rating.
 * Uses semantic colour tokens — never change these for decoration.
 *
 * Props:
 *   score     {'clean' | 'caution' | 'avoid'}  — required, drives colour + label
 *   size      {'sm' | 'md'}                    — optional, default 'md'
 *                                                 sm → inside ProductCard
 *                                                 md → product detail page
 *   showIcon  {boolean}                         — optional, default true
 *   numScore  {number}                          — optional, numeric EWG score (0–100)
 */

const VARIANTS = {
  clean: {
    label: 'Clean',
    icon: '✓',
    classes: 'bg-success text-white',
  },
  caution: {
    label: 'Caution',
    icon: '⚠',
    classes: 'bg-warning text-white',
  },
  avoid: {
    label: 'Avoid',
    icon: '✕',
    classes: 'bg-error text-white',
  },
}

const SIZE = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-3 py-1 text-xs gap-1.5',
}

export default function SafetyBadge({
  score,
  size = 'md',
  showIcon = true,
  numScore,
}) {
  const variant = VARIANTS[score] ?? VARIANTS.caution
  const sizeClasses = SIZE[size]

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-semibold
        uppercase tracking-caps whitespace-nowrap
        ${sizeClasses}
        ${variant.classes}
      `}
      aria-label={`Safety rating: ${variant.label}${numScore != null ? `, score ${numScore}` : ''}`}
    >
      {showIcon && (
        <span aria-hidden="true">{variant.icon}</span>
      )}
      {numScore != null && (
        <span>{numScore}</span>
      )}
      <span>{variant.label}</span>
    </span>
  )
}
