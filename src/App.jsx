import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Welcome from './pages/Welcome'
import About from './pages/About'
import Catalog from './pages/Catalog'
import Maps from './pages/Maps'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import ScrollToTop from './ScrollToTop'
import { LanguageProvider } from './context/LanguageContext'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/about" element={<About />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Footer />
          {/* Floating Call Button for Mobile */}
          <a href="tel:+917770099299" className="floating-call-btn" aria-label="Call us">
            <span className="floating-call-icon">📞</span>
          </a>
        </div>
        <Analytics />
        <SpeedInsights />
      </Router>
    </LanguageProvider>
  )
}

export default App
