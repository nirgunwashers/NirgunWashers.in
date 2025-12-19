import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Welcome.css'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import { fetchPrices, subscribePrices } from '../utils/priceManager'
import { fetchPhotos, subscribePhotos } from '../utils/photoManager'
import gallery1 from '../../images/1000151753.jpg'
import gallery2 from '../../images/WhatsApp Image 2025-11-15 at 22.07.44_1a05f13b.jpg'
import gallery3 from '../../images/Professional Laundry and Dry Cleaning Services Delivering Excellence in Garment Care Since Establishment.png'

function GalleryCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [images, setImages] = useState([
    { src: gallery1, alt: 'Nirgun Washers Facility' },
    { src: gallery2, alt: 'Professional Laundry Equipment' },
    { src: gallery3, alt: 'Quality Service' }
  ])

  // Fetch photos from Firestore
  useEffect(() => {
    let unsub = null
    const init = async () => {
      try {
        const photos = await fetchPhotos()
        // If we have photos from Firestore, use them; otherwise keep defaults
        if (photos && photos.length > 0) {
          const formattedPhotos = photos.map(p => ({ src: p.url, alt: p.alt }))
          setImages(formattedPhotos)
        }

        // Subscribe to updates
        unsub = subscribePhotos((photosUpdate) => {
          if (photosUpdate && photosUpdate.length > 0) {
            const formattedPhotos = photosUpdate.map(p => ({ src: p.url, alt: p.alt }))
            setImages(formattedPhotos)
          } else {
            // Fall back to default images if no photos in Firestore
            setImages([
              { src: gallery1, alt: 'Nirgun Washers Facility' },
              { src: gallery2, alt: 'Professional Laundry Equipment' },
              { src: gallery3, alt: 'Quality Service' }
            ])
          }
        })
      } catch (err) {
        console.error('Failed to load gallery photos:', err)
      }
    }
    init()
    return () => { if (unsub) unsub() }
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div className="gallery-carousel">
      <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
      <button className="carousel-btn carousel-btn-prev" onClick={prevSlide} aria-label="Previous slide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button className="carousel-btn carousel-btn-next" onClick={nextSlide} aria-label="Next slide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Welcome() {
  const { language } = useLanguage()
  const t = translations[language].welcome
  const catalogServices = translations[language].catalog.services

  // Get prices for the preview section (service IDs: 2, 6, 7, 3)
  const washIronService = catalogServices.find(s => s.id === 2)
  const dryCleanService = catalogServices.find(s => s.id === 6)
  const sareeService = catalogServices.find(s => s.id === 7)
  const beddingService = catalogServices.find(s => s.id === 3)

  const [remotePrices, setRemotePrices] = useState(null)

  useEffect(() => {
    let unsub = null
    const init = async () => {
      try {
        const prices = await fetchPrices(language)
        setRemotePrices(prices)
        unsub = subscribePrices(language, (p) => {
          setRemotePrices(p || null)
        })
      } catch (err) {
        console.error('Failed to load remote prices:', err)
      }
    }
    init()
    return () => { if (unsub) unsub() }
  }, [language])

  const washIronPrice = (remotePrices && remotePrices[2] !== undefined) ? remotePrices[2] : (washIronService ? washIronService.price : 99)
  const dryCleanPrice = (remotePrices && remotePrices[6] !== undefined) ? remotePrices[6] : (dryCleanService ? dryCleanService.price : 80)
  const sareePrice = (remotePrices && remotePrices[7] !== undefined) ? remotePrices[7] : (sareeService ? sareeService.price : 220)
  const beddingPrice = (remotePrices && remotePrices[3] !== undefined) ? remotePrices[3] : (beddingService ? beddingService.price : 120)

  return (
    <main className="welcome">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="hero-eyebrow page-eyebrow">{t.eyebrow}</p>
            <h1>
              {t.heroTitleMain}
              <span> {t.heroTitleHighlight}</span>
            </h1>
            <p className="hero-subtitle">{t.heroSubtitle}</p>
            <div className="hero-buttons">
              <Link to="/catalog" className="btn btn-primary">
                {t.primaryCta}
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                {t.secondaryCta}
              </Link>
            </div>
            <div className="hero-trust">
              <div className="hero-trust-badges">
                {t.badges.map((badge) => (
                  <span key={badge}>{badge}</span>
                ))}
              </div>
              <div className="hero-stats">
                {t.stats.map(({ value, label }) => (
                  <article key={label} className="stat-card">
                    <span className="stat-value">{value}</span>
                    <span className="stat-label">{label}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-testimonials">
            <div className="original-shop-box">
              <div className="shop-badge">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>{t.originalShopHeading}</span>
              </div>
              <h3 className="shop-name">{t.shopName}</h3>
              <p className="shop-location">{t.shopLocation}</p>
              <p className="shop-address">{t.shopAddress}</p>
              <div className="shop-stats">
                <div className="shop-rating">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>{t.shopRating}</span>
                </div>
                <div className="shop-review-count">{t.shopReviews}</div>
              </div>
            </div>

            <div className="featured-reviews-section">
              <h4 className="featured-reviews-title">{t.featuredReviewsHeading}</h4>
              <div className="featured-reviews">
                {t.reviews.slice(0, 3).map((review, index) => (
                  <div key={index} className="featured-review-card">
                    <div className="featured-review-header">
                      <div className="featured-reviewer-avatar">
                        {review.name.charAt(0)}
                      </div>
                      <div className="featured-reviewer-info">
                        <h5 className="featured-reviewer-name">{review.name}</h5>
                        <div className="featured-review-rating">
                          {[...Array(review.rating)].map((_, i) => (
                            <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="featured-review-text">"{review.text}"</p>
                  </div>
                ))}
              </div>
              <a 
                href="https://maps.app.goo.gl/xaNe5sDB9H8FEDTRA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="view-all-reviews-btn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {t.viewAllReviews}
                <svg viewBox="0 0 24 24" fill="currentColor" className="arrow-icon">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="service-flow">
        <div className="service-flow-container">
          <h2 className="service-flow-heading">How It Works</h2>
          <div className="service-flow-steps">
            <div className="flow-step">
              <div className="flow-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M6 12H2M22 12h-4M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83"/>
                  <path d="M12 8 L8 12 L12 16 L16 12 Z"/>
                </svg>
              </div>
              <div className="flow-number">1</div>
              <h3>Visit Us</h3>
              <p>Bring your garments to our facility at your convenience.</p>
            </div>
            <div className="flow-step">
              <div className="flow-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 19c0-3.5 2-6 6-6s6 2.5 6 6"/>
                  <path d="M12 13V8"/>
                  <path d="M9 8c0-1.5 1.5-3 3-3s3 1.5 3 3"/>
                </svg>
              </div>
              <div className="flow-number">2</div>
              <h3>Expert Cleaning</h3>
              <p>Handled by certified textile & couture specialists with care.</p>
            </div>
            <div className="flow-step">
              <div className="flow-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L4 6v6c0 5 8 10 8 10s8-5 8-10V6l-8-4z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>
              <div className="flow-number">3</div>
              <h3>Delivery</h3>
              <p>Fresh, crisp, ready-to-wear clothing delivered to you.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-section">
        <div className="gallery-container">
          <div className="section-header compact">
            <p className="page-eyebrow">Gallery</p>
            <h2>Our Facility & Services</h2>
            <p className="section-copy">Take a look at our state-of-the-art equipment and quality service</p>
          </div>
          <GalleryCarousel />
        </div>
      </section>

      <section className="pricing-preview">
        <div className="pricing-preview-container">
          <h2>Starting Prices</h2>
          <div className="pricing-grid">
            <div className="price-item">
              <div className="price-label">{washIronService?.name || 'Wash & Iron'}</div>
              <div className="price-value">₹{washIronPrice}<span className="price-unit">/{washIronService?.unit || 'kg'}</span></div>
            </div>
            <div className="price-item">
              <div className="price-label">{dryCleanService?.name || 'Dry Cleaning'}</div>
              <div className="price-value">₹{dryCleanPrice}{dryCleanService?.unit && dryCleanService.unit !== 'per kg' ? <span className="price-unit">/{dryCleanService.unit}</span> : ''}</div>
            </div>
            <div className="price-item">
              <div className="price-label">{sareeService?.name || 'Saree Cleaning'}</div>
              <div className="price-value">₹{sareePrice}{sareeService?.unit && sareeService.unit !== 'per kg' ? <span className="price-unit">/{sareeService.unit}</span> : ''}</div>
            </div>
            <div className="price-item">
              <div className="price-label">{beddingService?.name || 'Bedding'}</div>
              <div className="price-value">₹{beddingPrice}<span className="price-unit">/{beddingService?.unit || 'kg'}</span></div>
            </div>
          </div>
          <Link to="/catalog" className="pricing-link">
            View Full Pricing →
          </Link>
        </div>
      </section>
    </main>
  )
}
