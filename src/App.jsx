import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import BrowsePage from './features/browse/BrowsePage'
import MyListPage from './features/list/MyListPage'
import SignInPage from './features/auth/SignInPage'
import SignUpPage from './features/auth/SignUpPage'
import { supabase } from './lib/supabase'

export default function App() {
  const [activeRoute, setActiveRoute] = useState('browse')
  const [mode, setMode]               = useState('light')
  const [session, setSession]         = useState(null)
  const [authChecked, setAuthChecked] = useState(false)

  // ── Sync dark class on <html> ─────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }, [mode])

  // ── Restore session on load + keep in sync ────────────────────────────────
  useEffect(() => {
    // Check for an existing session in localStorage
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setAuthChecked(true)
    })

    // Keep session state in sync (sign-in, sign-out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    )

    return () => subscription.unsubscribe()
  }, [])

  // ── Wait for auth check before rendering anything ─────────────────────────
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"
          className="animate-spin w-6 h-6 text-primary"
          aria-label="Loading"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      </div>
    )
  }

  // ── Auth-only pages (no NavBar) ───────────────────────────────────────────
  if (activeRoute === 'signup') {
    return <SignUpPage onNavigate={setActiveRoute} />
  }
  if (activeRoute === 'signin') {
    return (
      <SignInPage
        onNavigate={setActiveRoute}
        onSignIn={(s) => { setSession(s); setActiveRoute('browse') }}
      />
    )
  }

  // ── Sign out ──────────────────────────────────────────────────────────────
  async function handleSignOut() {
    await supabase.auth.signOut()
    setSession(null)
    setActiveRoute('browse')
  }

  // ── All users (signed in or not) can browse and search ───────────────────
  function renderPage() {
    switch (activeRoute) {
      case 'list':   return <MyListPage session={session} onNavigate={setActiveRoute} />
      case 'browse': return <BrowsePage session={session} />
      default:       return <BrowsePage session={session} />
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <NavBar
        activeRoute={activeRoute}
        onNavigate={setActiveRoute}
        mode={mode}
        onModeChange={setMode}
        session={session}
        onSignOut={handleSignOut}
      />
      {renderPage()}
    </div>
  )
}
