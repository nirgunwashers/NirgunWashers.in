// Price manager using Firestore for real-time cross-device sync
import { readDocOnce, subscribeToDoc, writeDoc, deleteDocument } from '../firebase'

const COLLECTION = 'nirgun_admin'
const DOC_ID = 'prices'

/**
 * Fetch prices for a language (once). If not present in Firestore, returns null.
 */
export async function fetchPrices(language) {
  try {
    const data = await readDocOnce(COLLECTION, DOC_ID)
    if (data && data[language]) {
      return data[language]
    }
    return null
  } catch (err) {
    console.error('Failed to fetch prices from Firestore:', err)
    return null
  }
}

/**
 * Subscribe to prices for a language. Calls `onUpdate(pricesObj)` whenever data changes.
 * Returns an unsubscribe function.
 */
export function subscribePrices(language, onUpdate, onError) {
  let unsub = null
  subscribeToDoc(COLLECTION, DOC_ID, (data) => {
    if (!data) {
      onUpdate && onUpdate(null)
      return
    }
    const prices = data[language] || null
    onUpdate && onUpdate(prices)
  }, (err) => {
    console.error('Prices subscription error:', err)
    onError && onError(err)
  }).then((u) => {
    unsub = u
  }).catch(err => {
    console.error('Failed to subscribe to prices:', err)
    onError && onError(err)
  })

  return () => {
    if (unsub) unsub()
  }
}

/**
 * Save prices for a specific language to Firestore (merge).
 */
export async function savePrices(language, prices) {
  try {
    await writeDoc(COLLECTION, DOC_ID, { [language]: prices })
    return true
  } catch (err) {
    console.error('Failed to save prices to Firestore:', err)
    return false
  }
}

/**
 * Update a single service price (merges into the language object)
 */
export async function updateServicePrice(serviceId, language, price) {
  try {
    const existing = await readDocOnce(COLLECTION, DOC_ID)
    const langData = existing && existing[language] ? existing[language] : {}
    langData[serviceId] = price
    await writeDoc(COLLECTION, DOC_ID, { [language]: langData })
    return true
  } catch (err) {
    console.error('Failed to update service price in Firestore:', err)
    return false
  }
}

/**
 * Reset (delete) prices document in Firestore
 */
export async function resetPrices() {
  try {
    await deleteDocument(COLLECTION, DOC_ID)
    return true
  } catch (err) {
    console.error('Failed to reset prices in Firestore:', err)
    return false
  }
}

/**
 * Utility used by other modules: merge prices into services array
 */
export function getServicesWithUpdatedPrices(services, languagePrices) {
  if (!languagePrices) return services
  return services.map(service => ({
    ...service,
    price: languagePrices[service.id] !== undefined ? languagePrices[service.id] : service.price
  }))
}


