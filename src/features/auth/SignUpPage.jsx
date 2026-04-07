/**
 * SignUpPage
 *
 * Email + password sign-up via Supabase Auth.
 * Uses the existing supabase client from src/lib/supabase.js — no new connection.
 * Feature-specific: src/features/auth/
 */

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import InputField from '../../components/InputField'
import Button from '../../components/Button'

export default function SignUpPage({ onNavigate }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess]   = useState(false)

  // ── Field-level errors ────────────────────────────────────────────────────
  const [errors, setErrors] = useState({})

  function validate() {
    const next = {}
    if (!email.trim())           next.email    = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(email)) next.email = 'Enter a valid email address.'
    if (!password)               next.password = 'Password is required.'
    else if (password.length < 6) next.password = 'Password must be at least 6 characters.'
    if (!confirm)                next.confirm  = 'Please confirm your password.'
    else if (confirm !== password) next.confirm = 'Passwords do not match.'
    return next
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const fieldErrors = validate()
    if (Object.keys(fieldErrors).length) { setErrors(fieldErrors); return }

    setErrors({})
    setIsLoading(true)

    const { error } = await supabase.auth.signUp({ email: email.trim(), password })

    setIsLoading(false)

    if (error) {
      setErrors({ form: error.message })
    } else {
      setSuccess(true)
    }
  }

  // ── Success state ─────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8 w-full max-w-sm text-center flex flex-col gap-4">
          <div className="text-4xl">✉️</div>
          <h2 className="text-xl font-semibold text-neutral-800">Check your email</h2>
          <p className="text-sm text-neutral-500 leading-relaxed">
            We sent a confirmation link to <strong className="text-neutral-700">{email}</strong>.
            Click it to activate your account, then sign in.
          </p>
          <Button variant="primary" fullWidth onClick={() => onNavigate('signin')}>
            Go to sign in
          </Button>
        </div>
      </div>
    )
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-6">

        {/* ── Wordmark ─────────────────────────────────────────────────── */}
        <div className="text-center">
          <p className="text-base font-semibold text-primary mb-1">🌿 Clean Shopper</p>
          <h1 className="text-3xl font-semibold text-neutral-800 tracking-heading">
            Create an account
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Start researching safer products today.
          </p>
        </div>

        {/* ── Card ─────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-8">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

            {/* Form-level error */}
            {errors.form && (
              <div className="px-4 py-3 bg-error text-white text-sm rounded-md" role="alert">
                {errors.form}
              </div>
            )}

            <InputField
              id="signup-email"
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              errorText={errors.email}
              required
              disabled={isLoading}
            />

            <InputField
              id="signup-password"
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="At least 6 characters"
              helperText="Must be at least 6 characters."
              errorText={errors.password}
              required
              disabled={isLoading}
            />

            <InputField
              id="signup-confirm"
              label="Confirm password"
              type="password"
              value={confirm}
              onChange={setConfirm}
              placeholder="Re-enter your password"
              errorText={errors.confirm}
              required
              disabled={isLoading}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
            >
              Create account
            </Button>

          </form>
        </div>

        {/* ── Sign in link ──────────────────────────────────────────────── */}
        <p className="text-sm text-neutral-500 text-center">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('signin')}
            className="text-primary font-medium hover:text-primary-dark transition-colors duration-fast"
          >
            Sign in
          </button>
        </p>

      </div>
    </div>
  )
}
