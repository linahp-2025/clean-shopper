import { useState } from 'react'
import NavBar from './components/NavBar'
import BrowsePage from './features/browse/BrowsePage'
import SearchPage from './features/search/SearchPage'
import SignInPage from './features/auth/SignInPage'
import SignUpPage from './features/auth/SignUpPage'

export default function App() {
  const [activeRoute, setActiveRoute] = useState('signin')
  const [mode, setMode]               = useState('light')
  const [session, setSession]         = useState(null)

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
      />
      {renderPage()}
    </div>
  )
}
