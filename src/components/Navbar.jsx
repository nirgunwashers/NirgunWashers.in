import { Link } from 'react-router-dom'
import { useState } from 'react'
import './Navbar.css'
import logoMark from '../../images/IMG-20251115-WA0028.jpg'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const t = translations[language].nav

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={logoMark} alt="Nirgun Washers logo" className="logo-mark" />
        </Link>

        <button
          className={`menu-toggle ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="navbar-right">
          <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={closeMenu}>
                {t.home}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={closeMenu}>
                {t.about}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/catalog" className="nav-link" onClick={closeMenu}>
                {t.services}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/maps" className="nav-link" onClick={closeMenu}>
                {t.location}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={closeMenu}>
                {t.contact}
              </Link>
            </li>
            <li className="nav-item nav-cta-mobile">
              <Link to="/contact" className="nav-cta" onClick={closeMenu}>
                {t.bookPickup}
              </Link>
            </li>
          </ul>

          <div className="nav-cta-desktop">
            <a href="tel:+917770099299" className="nav-phone" title="Call +91 77700 99299" aria-label="Call us">
              <span className="phone-icon">📞</span>
            </a>
            <Link to="/contact" className="nav-cta">
              {t.bookPickup}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
