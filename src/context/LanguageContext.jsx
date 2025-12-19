import { createContext, useContext } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  // Language is now hardcoded to English only
  const language = 'en'
  const setLanguage = () => {} // No-op function for compatibility

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')
  return context
}

