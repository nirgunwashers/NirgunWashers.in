import { useState } from 'react'
import './Maps.css'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'

export default function Maps() {
  const [mapType, setMapType] = useState('2d')
  const { language } = useLanguage()
  const t = translations[language].maps

  const businessLocation = {
    lat: 18.6476,
    lng: 73.7724,
    name: t.locationName,
    address: t.addressLine
  }

  return (
    <main className="maps">
      <section className="maps-hero">
        <h1>{t.heroHeading}</h1>
        <p>{t.heroCopy}</p>
      </section>

      <section className="maps-content">
        <div className="maps-container">
          <div className="map-selector">
            <button 
              className={`map-btn ${mapType === '2d' ? 'active' : ''}`}
              onClick={() => setMapType('2d')}
            >
              {t.buttons['2d']}
            </button>
            <button 
              className={`map-btn ${mapType === '3d' ? 'active' : ''}`}
              onClick={() => setMapType('3d')}
            >
              {t.buttons['3d']}
            </button>
          </div>

          {mapType === '2d' ? (
            <div className="map-wrapper">
              <iframe
                width="100%"
                height="500"
                frameBorder="0"
                src="https://maps.google.com/maps?q=18.646812,73.764786&hl=en&z=17&output=embed"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          ) : (
            <div className="map-wrapper">
              <iframe
                width="100%"
                height="500"
                frameBorder="0"
                src="https://www.google.com/maps/embed?pb=!4v1763992941067!6m8!1m7!1sRIOgxrphQhohIhRg0mBPIA!2m2!1d18.64681789174605!2d73.76503913360145!3f38.439823!4f0!5f0.7820865974627469"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <p className="map-note">{t.mapNote}</p>
            </div>
          )}

          <div className="location-info">
            <h2>{businessLocation.name}</h2>
            
            <div className="address-section">
              <div>
                <h4>Address</h4>
                <p>{businessLocation.address}</p>
              </div>
            </div>

            <div className="contact-details">
              <div className="detail-item">
                <div>
                  <h4>{t.contact.phoneLabel}</h4>
                  <p><a href="tel:+917770099299">{t.contact.phoneValue}</a></p>
                </div>
              </div>
              <div className="detail-item">
                <div>
                  <h4>{t.contact.emailLabel}</h4>
                  <p><a href="mailto:nirgunwashers@gmail.com">{t.contact.emailValue}</a></p>
                </div>
              </div>
              <div className="detail-item">
                <div>
                  <h4>{t.contact.hoursLabel}</h4>
                  <p>{t.contact.hoursValue}</p>
                </div>
              </div>
            </div>

            <div className="directions-btn">
              <a 
                href="https://share.google/Ct6swCF3ghxfYrwoc"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-get-directions"
              >
                {t.directions}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
