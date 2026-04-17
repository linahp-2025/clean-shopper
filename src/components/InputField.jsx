/**
 * InputField
 *
 * Labelled, accessible text input for all form entry.
 * Spec: /docs/component-spec.md — Section 7
 *
 * Props:
 *   id          {string}              — required, links label and input
 *   label       {string}              — required, visible label
 *   value       {string}              — required, controlled value
 *   onChange    {(value) => void}     — required
 *   type        {string}              — optional, defaults to 'text'
 *   placeholder {string}              — optional
 *   helperText  {string}              — optional, guidance below input
 *   errorText   {string}              — optional, replaces helperText on error
 *   disabled    {boolean}             — optional
 *   required    {boolean}             — optional, adds required indicator
 *   leftIcon    {ReactNode}           — optional, icon inside input at left
 */

export default function InputField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  helperText,
  errorText,
  disabled = false,
  required = false,
  leftIcon,
}) {
  const hasError = Boolean(errorText)

  return (
    <div className="flex flex-col gap-1">

      {/* ── Label ────────────────────────────────────────────────────────── */}
      <label htmlFor={id} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label}
        {required && (
          <span className="text-error ml-0.5" aria-hidden="true">*</span>
        )}
      </label>

      {/* ── Input wrapper ────────────────────────────────────────────────── */}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-neutral-400 w-4 h-4 pointer-events-none flex items-center">
            {leftIcon}
          </span>
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-describedby={
            errorText ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          aria-invalid={hasError ? 'true' : undefined}
          className={`
            w-full bg-white dark:bg-neutral-800 border rounded-md
            ${leftIcon ? 'pl-9' : 'px-3'} px-3 py-2
            text-base text-neutral-800 dark:text-neutral-100
            placeholder:text-neutral-400 dark:placeholder:text-neutral-500
            leading-body
            transition-all duration-fast ease-default
            focus:outline-none focus:ring-2 focus:border-transparent
            ${hasError
              ? 'border-error focus:ring-error'
              : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 focus:ring-primary'
            }
            ${disabled
              ? 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400 cursor-not-allowed border-neutral-200 dark:border-neutral-600'
              : ''
            }
          `}
        />
      </div>

      {/* ── Helper / error text ──────────────────────────────────────────── */}
      {errorText && (
        <p id={`${id}-error`} className="text-xs text-error mt-0.5" role="alert">
          {errorText}
        </p>
      )}
      {!errorText && helperText && (
        <p id={`${id}-helper`} className="text-xs text-neutral-400 mt-0.5">
          {helperText}
        </p>
      )}

    </div>
  )
}
