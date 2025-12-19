// Catalog manager using Firestore for real-time cross-device sync
import { readDocOnce, subscribeToDoc, writeDoc, deleteDocument } from '../firebase'

const COLLECTION = 'nirgun_admin'
const DOC_ID = 'catalogs'

/**
 * Fetch catalogs for language (once). If not present in Firestore, returns originalCatalogs.
 */
export async function fetchCatalogs(language, originalCatalogs) {
  try {
    const data = await readDocOnce(COLLECTION, DOC_ID)
    if (data && Array.isArray(data[language])) {
      return data[language]
    }
    return originalCatalogs
  } catch (err) {
    console.error('Failed to fetch catalogs from Firestore:', err)
    return originalCatalogs
  }
}

/**
 * Subscribe to catalogs for a language. Calls `onUpdate(catalogs)` whenever data changes.
 * Returns an unsubscribe function.
 */
export function subscribeCatalogs(language, onUpdate, onError) {
  let unsub = null

  ;(async () => {
    try {
      unsub = await subscribeToDoc(COLLECTION, DOC_ID, (data) => {
        if (!data) {
          onUpdate && onUpdate(null)
          return
        }
        const catalogs = data[language] || null
        onUpdate && onUpdate(catalogs)
      }, (err) => {
        console.error('Catalogs subscription error:', err)
        onError && onError(err)
      })
    } catch (err) {
      console.error('Failed to subscribe to catalogs:', err)
      onError && onError(err)
    }
  })()

  return () => { if (unsub) unsub() }
}

/**
 * Save catalogs for a specific language to Firestore (merge).
 */
export async function saveCatalogsForLanguage(language, catalogs) {
  try {
    await writeDoc(COLLECTION, DOC_ID, { [language]: catalogs })
    return true
  } catch (err) {
    console.error('Failed to save catalogs to Firestore:', err)
    return false
  }
}

/**
 * Reset (delete) all catalogs document in Firestore
 */
export async function resetCatalogs() {
  try {
    await deleteDocument(COLLECTION, DOC_ID)
    return true
  } catch (err) {
    console.error('Failed to reset catalogs in Firestore:', err)
    return false
  }
}

/**
 * Get the next available ID for a new catalog
 */
export function getNextCatalogId(catalogs) {
  if (!catalogs || catalogs.length === 0) return 1
  const maxId = Math.max(...catalogs.map(c => c.id || 0))
  return maxId + 1
}

