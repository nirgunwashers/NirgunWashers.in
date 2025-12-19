import './About.css'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'

export default function About() {
  const { language } = useLanguage()
  const t = translations[language].about

  return (
    <main className="about">
      <section className="about-hero">
        <h1>{t.heroHeading}</h1>
        <p>{t.heroCopy}</p>
      </section>

      <section className="about-content">
        <div className="about-container">
          {t.sections.map((section) => (
            <div key={section.title} className="about-section">
              <h2>{section.title}</h2>
              {section.paragraphs &&
                section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

              {section.difference && (
                <ul className="difference-list">
                  {section.difference.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
