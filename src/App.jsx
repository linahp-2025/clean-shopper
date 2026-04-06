import { useState } from 'react'
import NavBar from './components/NavBar'
import BrowsePage from './features/browse/BrowsePage'
import SearchPage from './features/search/SearchPage'

export default function App() {
  const [activeRoute, setActiveRoute] = useState('browse')
  const [mode, setMode]               = useState('light')

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
