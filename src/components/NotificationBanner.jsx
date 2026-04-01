/**
 * NotificationBanner
 *
 * An inline contextual banner for success, warning, error, and info states.
 * Soft tinted treatment — calm left-border accent suits the wellness aesthetic.
 *
 * Props:
 *   variant    {'success' | 'warning' | 'error' | 'info'}
 *   title      {string}          — optional bold label
 *   message    {string}          — body copy
 *   dismissible {boolean}        — show ✕ dismiss button (default false)
 *   onDismiss  {function}        — called when dismissed (if dismissible)
 */

import { useState } from 'react'

// ── Variant config — all classes are Tailwind token keys ──────────────────
const VARIANTS = {
  success: {
    border:     'border-l-success',
    iconColor:  'text-success',
    titleColor: 'text-primary-dark',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0 mt-px">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" />
      </svg>
    ),
  },
  warning: {
    border:     'border-l-warning',
    iconColor:  'text-warning',
    titleColor: 'text-warning',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0 mt-px">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
      </svg>
    ),
  },
  error: {
    border:     'border-l-error',
    iconColor:  'text-error',
    titleColor: 'text-error',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0 mt-px">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" />
      </svg>
    ),
  },
  info: {
    border:     'border-l-info',
    iconColor:  'text-info',
    titleColor: 'text-accent-dark',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0 mt-px">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" />
      </svg>
    ),
  },
}

export default function NotificationBanner({
  variant = 'info',
  title,
  message,
  dismissible = false,
  onDismiss,
}) {
  const [dismissed, setDismissed] = useState(false)
  const { border, iconColor, titleColor, icon } = VARIANTS[variant] ?? VARIANTS.info

  if (dismissed) return null

  function handleDismiss() {
    setDismissed(true)
    onDismiss?.()
  }

  return (
    <div
      role="alert"
      className={`
        flex items-start gap-3
        bg-neutral-100 border border-neutral-200 border-l-4 ${border}
        rounded-md px-4 py-3
        transition-opacity duration-normal ease-default
      `}
    >
      {/* Icon */}
      <span className={iconColor}>
        {icon}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className={`text-sm font-semibold leading-snug mb-1 ${titleColor}`}>
            {title}
          </p>
        )}
        <p className="text-sm text-neutral-600 leading-relaxed">
          {message}
        </p>
      </div>

      {/* Dismiss button */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          aria-label="Dismiss notification"
          className="
            shrink-0 mt-px
            text-neutral-400 hover:text-neutral-600
            transition-colors duration-fast ease-default
            rounded-sm focus-visible:ring-2 focus-visible:ring-primary
          "
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      )}
    </div>
  )
}
