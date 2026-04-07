import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import BrowsePage from './features/browse/BrowsePage'
import SearchPage from './features/search/SearchPage'
import SignInPage from './features/auth/SignInPage'
import SignUpPage from './features/auth/SignUpPage'
import { supabase } from './lib/supabase'

export default function App() {
  const [activeRoute, setActiveRoute] = useState('browse')
  const [mode, setMode]               = useState('light')
  const [session, setSession]         = useState(null)
  const [authChecked, setAuthChecked] = useState(false)

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
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
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

  // ── Auth pages — no NavBar ────────────────────────────────────────────────
  if (!session) {
    if (activeRoute === 'signup') {
      return <SignUpPage onNavigate={setActiveRoute} />
    }
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
    setActiveRoute('signin')
  }

  // ── Authenticated app ─────────────────────────────────────────────────────
  function renderPage() {
    switch (activeRoute) {
      case 'search': return <SearchPage />
      case 'browse': return <BrowsePage />
      default:       return <BrowsePage />
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <NavBar
        activeRoute={activeRoute}
        onNavigate={setActiveRoute}
        mode={mode}
        onModeChange={setMode}
        onSignOut={handleSignOut}
      />
      {renderPage()}
    </div>
  )
}
