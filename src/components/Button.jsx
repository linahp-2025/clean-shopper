/**
 * Button
 *
 * Primary interactive control for all user actions.
 * Spec: /docs/component-spec.md — Section 6
 *
 * Props:
 *   children   {ReactNode}                          — required
 *   variant    {'primary' | 'secondary' | 'ghost'}  — optional, default 'primary'
 *   size       {'sm' | 'md' | 'lg'}                 — optional, default 'md'
 *   onClick    {() => void}                          — optional
 *   type       {'button' | 'submit' | 'reset'}       — optional, default 'button'
 *   disabled   {boolean}                             — optional
 *   isLoading  {boolean}                             — optional
 *   fullWidth  {boolean}                             — optional
 *   leftIcon   {ReactNode}                           — optional
 *   rightIcon  {ReactNode}                           — optional
 */

function SpinnerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      className="animate-spin w-4 h-4"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

// ── Variant styles ─────────────────────────────────────────────────────────────

const VARIANT_CLASSES = {
  primary: {
    base:     'bg-primary text-white shadow-sm',
    hover:    'hover:bg-primary-dark',
    active:   'active:bg-primary-dark active:scale-[0.98]',
    disabled: 'disabled:bg-neutral-300 disabled:text-neutral-400 disabled:shadow-none',
  },
  secondary: {
    base:     'bg-white text-primary border border-primary',
    hover:    'hover:bg-neutral-100',
    active:   'active:bg-neutral-100 active:scale-[0.98]',
    disabled: 'disabled:border-neutral-300 disabled:text-neutral-400',
  },
  ghost: {
    base:     'bg-transparent text-primary',
    hover:    'hover:bg-neutral-100',
    active:   'active:bg-neutral-200 active:scale-[0.98]',
    disabled: 'disabled:text-neutral-400',
  },
}

const SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
}

// ── Button ─────────────────────────────────────────────────────────────────────

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
}) {
  const { base, hover, active, disabled: disabledClass } = VARIANT_CLASSES[variant]
  const sizeClass = SIZE_CLASSES[size]
  const isDisabled = disabled || isLoading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center rounded-md font-medium
        transition-all duration-fast ease-default
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-primary focus-visible:ring-offset-2
        disabled:cursor-not-allowed
        ${base} ${hover} ${active} ${disabledClass}
        ${sizeClass}
        ${fullWidth ? 'w-full' : ''}
      `}
    >
      {isLoading ? (
        <>
          <SpinnerIcon />
          <span>{children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="flex items-center">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="flex items-center">{rightIcon}</span>}
        </>
      )}
    </button>
  )
}
