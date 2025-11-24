import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Catalog.css'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'

import { getServicesWithUpdatedPrices, fetchPrices, subscribePrices } from '../utils/priceManager'
import { fetchCatalogs, subscribeCatalogs } from '../utils/catalogManager'


const serviceIcons = {
  1: ( // Wash & Fold - Stacked clothes
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="6" width="16" height="3" rx="0.5"/>
      <rect x="5" y="10" width="14" height="3" rx="0.5"/>
      <rect x="6" y="14" width="12" height="3" rx="0.5"/>
    </svg>
  ),
  2: ( // Wash & Iron - T-shirt with iron
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 4h8l2 2v14H6V6l2-2z"/>
      <path d="M8 4L6 6M16 4l2 2"/>
      <path d="M10 10h4M9 13h6"/>
    </svg>
  ),
  3: ( // Dry Cleaning - Hanger
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="5" r="2"/>
      <path d="M12 7v3"/>
      <path d="M6 20h12l-2-10H8l-2 10z"/>
    </svg>
  ),
  4: ( // Ironing - Iron
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 4v3"/>
      <path d="M5 10h14l2 8H3l2-8z"/>
      <circle cx="9" cy="14" r="0.8" fill="currentColor"/>
      <circle cx="12" cy="14" r="0.8" fill="currentColor"/>
      <circle cx="15" cy="14" r="0.8" fill="currentColor"/>
    </svg>
  ),
  5: ( // Quilt Wash - Blanket
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2z"/>
      <path d="M2 10h20M2 14h20"/>
    </svg>
  ),
  6: ( // Dry Cleaning - Sparkle/Clean
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2v8M12 14v8M2 12h8M14 12h8"/>
      <path d="M5 5l5 5M14 14l5 5M19 5l-5 5M10 14l-5 5"/>
    </svg>
  ),
  7: ( // Saree - Draped fabric
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 4v16c3 0 3-2 6-2s3 2 6 2V4"/>
      <path d="M6 4c3 0 3 2 6 2s3-2 6-2"/>
      <path d="M6 12c3 0 3 2 6 2s3-2 6-2"/>
    </svg>
  ),
  8: ( // Blazer - Suit jacket
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 22V8l3-6h8l3 6v14"/>
      <path d="M12 2v20"/>
      <path d="M5 8h6M13 8h6"/>
      <circle cx="8" cy="12" r="0.8" fill="currentColor"/>
      <circle cx="16" cy="12" r="0.8" fill="currentColor"/>
    </svg>
  ),
  9: ( // Shoe - Sneaker
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 18h16v3H4z"/>
      <path d="M6 18V12c0-2 1-4 3-5l3-3h4v6c1 1 2 2 2 4v4"/>
      <path d="M9 12h6"/>
    </svg>
  ),
  10: ( // Sofa - Couch
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="10" width="16" height="7" rx="1"/>
      <path d="M4 10V9c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v1"/>
      <path d="M2 12v3c0 .6.4 1 1 1h1M21 12v3c0 .6-.4 1-1 1h-1"/>
    </svg>
  ),
  11: ( // Curtains - Window drapes
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 3h18v2H3z"/>
      <path d="M5 5c0 2-1 4-1 6s1 4 1 6"/>
      <path d="M9 5c0 2 1 4 1 6s-1 4-1 6"/>
      <path d="M15 5c0 2-1 4-1 6s1 4 1 6"/>
      <path d="M19 5c0 2 1 4 1 6s-1 4-1 6"/>
    </svg>
  ),
  12: ( // Helmet - Safety helmet
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 15h14"/>
      <path d="M12 3C7.6 3 4 6.6 4 11v4h16v-4c0-4.4-3.6-8-8-8z"/>
      <rect x="4" y="15" width="3" height="3" rx="1"/>
      <rect x="17" y="15" width="3" height="3" rx="1"/>
    </svg>
  )
}

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { language } = useLanguage()
  const t = translations[language].catalog

  // Services state (starts with original translations)
  const [servicesState, setServicesState] = useState(t.services)

  useEffect(() => {
    let unsubCats = null
    let unsubPrices = null
    let mounted = true

    const init = async () => {
      try {
        const catalogs = await fetchCatalogs(language, t.services)
        const pricesData = await fetchPrices(language)
        const merged = getServicesWithUpdatedPrices(catalogs || t.services, pricesData)
        if (mounted) setServicesState(merged)

        unsubCats = subscribeCatalogs(language, async (catsUpdate) => {
          const latestPrices = await fetchPrices(language)
          if (mounted) setServicesState(getServicesWithUpdatedPrices(catsUpdate || t.services, latestPrices))
        })

        unsubPrices = subscribePrices(language, (pricesUpdate) => {
          const newPrices = pricesUpdate || {}
          if (mounted) setServicesState(prev => prev.map(s => ({
            ...s,
            price: newPrices[s.id] !== undefined ? newPrices[s.id] : s.price
          })))
        })
      } catch (err) {
        console.error('Catalog load error:', err)
        if (mounted) setServicesState(t.services)
      }
    }

    init()

    return () => {
      mounted = false
      if (unsubCats) unsubCats()
      if (unsubPrices) unsubPrices()
    }
  }, [language, t.services])

  const filteredServices = selectedCategory === 'all' ? servicesState : servicesState.filter((s) => s.category === selectedCategory)

  return (
    <main className="catalog">
      <section className="catalog-hero">
        <h1>{t.heroHeading}</h1>
        <p>{t.heroCopy}</p>
      </section>

      <section className="catalog-content">
        <div className="catalog-container">
          <div className="category-filter">
            <button
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              {t.filters.all}
            </button>
            <button
              className={`filter-btn ${selectedCategory === 'general' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('general')}
            >
              {t.filters.general}
            </button>
            <button
              className={`filter-btn ${selectedCategory === 'ironing' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('ironing')}
            >
              {t.filters.ironing}
            </button>
            <button
              className={`filter-btn ${selectedCategory === 'dry-clean' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('dry-clean')}
            >
              {t.filters.dryClean}
            </button>
            <button
              className={`filter-btn ${selectedCategory === 'special' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('special')}
            >
              {t.filters.special}
            </button>
          </div>

          <div className="services-grid">
            {filteredServices.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  {serviceIcons[service.id] || serviceIcons[1]}
                </div>
                <div className="service-header">
                  <h3>{service.name}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
                <div className="service-price">
                  <span className="price">₹{service.price}</span>
                  <span className="unit">/{service.unit}</span>
                </div>
                <div className="service-features">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="feature">
                      <span className="checkmark"></span>
                      {feature}
                    </div>
                  ))}
                </div>
                <Link to="/contact" className="service-btn">
                  {t.requestButton}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-info">
        <div className="pricing-container">
          <h2>{t.infoHeading}</h2>
          <div className="info-grid">
            {t.infoCards.map((card) => (
              <div key={card.title} className="info-card">
                <h4>{card.title}</h4>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
