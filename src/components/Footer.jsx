import './Footer.css'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { language } = useLanguage()
  const footerCopy = translations[language].footer
  const navCopy = translations[language].nav

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Nirgun Washers</h3>
            <p>{footerCopy.description}</p>
          </div>
          <div className="footer-section">
            <h4>{footerCopy.quickLinks}</h4>
            <ul>
              <li><a href="/">{navCopy.home}</a></li>
              <li><a href="/about">{navCopy.about}</a></li>
              <li><a href="/catalog">{navCopy.services}</a></li>
              <li><a href="/contact">{navCopy.contact}</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>{footerCopy.contactInfo}</h4>
            <p>{footerCopy.addressLabel}: Shop No. 135/6, Opp. Akurdi Railway Station (Backside), Near Vaishno Devi Mandir, Gurudwara Road, Akurdi, Pimpri-Chinchwad, Maharashtra 411033</p>
            <p>{footerCopy.phoneLabel}: {navCopy.phone}</p>
            <p>{footerCopy.emailLabel}: nirgunwashers@gmail.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{footerCopy.copyright(currentYear)}</p>
          <p className="developer-credit">
            Developed by Team <span className="team-sky">S.K.Y.
              <span className="sky-tooltip">
                <strong>S</strong> - Sarthak Kharche<br/>
                <strong>K</strong> - Krushna Nirmalkar<br/>
                <strong>Y</strong> - Yash Kumar Tripathi
              </span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
