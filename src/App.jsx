import { useState } from 'react'
import NavBar from './components/NavBar'
import BrowsePage from './features/browse/BrowsePage'

export default function App() {
  const [activeRoute, setActiveRoute] = useState('search')
  const [mode, setMode]               = useState('light')

  return (
    <div className="min-h-screen bg-neutral-50">
      <NavBar
        activeRoute={activeRoute}
        onNavigate={setActiveRoute}
        mode={mode}
        onModeChange={setMode}
      />
      <BrowsePage />
    </div>
  )
}
