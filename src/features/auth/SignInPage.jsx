/**
 * SignInPage
 *
 * Email + password sign-in via Supabase Auth.
 * Uses the existing supabase client from src/lib/supabase.js — no new connection.
 * Feature-specific: src/features/auth/
 */

import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import InputField from '../../components/InputField'
import Button from '../../components/Button'

export default function SignInPage({ onNavigate, onSignIn }) {
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors]       = useState({})

  function validate() {
    const next = {}
    if (!email.trim())    next.email    = 'Email is required.'
    if (!password)        next.password = 'Password is required.'
    return next
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const fieldErrors = validate()
    if (Object.keys(fieldErrors).length) { setErrors(fieldErrors); return }

    setErrors({})
    setIsLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    setIsLoading(false)

    if (error) {
      setErrors({
        form: error.message === 'Invalid login credentials'
          ? 'Incorrect email or password. Please try again.'
          : error.message,
      })
    } else {
      onSignIn?.(data.session)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-6">

        {/* ── Wordmark ─────────────────────────────────────────────────── */}
        <div className="text-center">
          <p className="text-base font-semibold text-primary mb-1">🌿 Clean Shopper</p>
          <h1 className="text-3xl font-semibold text-neutral-800 dark:text-neutral-100 tracking-heading">
            Welcome back
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Sign in to your account to continue.
          </p>
        </div>

        {/* ── Card ─────────────────────────────────────────────────────── */}
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 p-8">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

            {/* Form-level error */}
            {errors.form && (
              <div className="px-4 py-3 bg-error text-white text-sm rounded-md" role="alert">
                {errors.form}
              </div>
            )}

            <InputField
              id="signin-email"
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
              id="signin-password"
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Your password"
              errorText={errors.password}
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
              Sign in
            </Button>

          </form>
        </div>

        {/* ── Sign up link ──────────────────────────────────────────────── */}
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
          Don&rsquo;t have an account?{' '}
          <button
            onClick={() => onNavigate('signup')}
            className="text-primary font-medium hover:text-primary-dark transition-colors duration-fast"
          >
            Create one
          </button>
        </p>

      </div>
    </div>
  )
}
