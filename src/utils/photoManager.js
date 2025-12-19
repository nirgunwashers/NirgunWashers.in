// Photo manager using Firestore for gallery photos
import { readDocOnce, subscribeToDoc, writeDoc, deleteDocument, getStorageInstance } from '../firebase'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

const COLLECTION = 'nirgun_admin'
const DOC_ID = 'gallery_photos'

/**
 * Fetch gallery photos (once). Returns array of photo objects with {id, url, alt}
 */
export async function fetchPhotos() {
  try {
    const data = await readDocOnce(COLLECTION, DOC_ID)
    if (data && Array.isArray(data.photos)) {
      return data.photos
    }
    return []
  } catch (err) {
    console.error('Failed to fetch photos from Firestore:', err)
    return []
  }
}

/**
 * Subscribe to gallery photos. Calls `onUpdate(photos)` whenever data changes.
 * Returns an unsubscribe function.
 */
export function subscribePhotos(onUpdate, onError) {
  let unsub = null

  ;(async () => {
    try {
      unsub = await subscribeToDoc(COLLECTION, DOC_ID, (data) => {
        if (!data || !data.photos) {
          onUpdate && onUpdate([])
          return
        }
        const photos = data.photos || []
        onUpdate && onUpdate(photos)
      }, (err) => {
        console.error('Photos subscription error:', err)
        onError && onError(err)
      })
    } catch (err) {
      console.error('Failed to subscribe to photos:', err)
      onError && onError(err)
    }
  })()

  return () => { if (unsub) unsub() }
}

/**
 * Save photos array to Firestore
 */
export async function savePhotos(photos) {
  try {
    await writeDoc(COLLECTION, DOC_ID, { photos })
    return true
  } catch (err) {
    console.error('Failed to save photos to Firestore:', err)
    return false
  }
}

/**
 * Upload a photo file to Firebase Storage and return the download URL
 */
export async function uploadPhoto(file) {
  try {
    const storage = await getStorageInstance()
    if (!storage) {
      throw new Error('Firebase Storage not initialized')
    }
    
    const timestamp = Date.now()
    const filename = `gallery/${timestamp}_${file.name}`
    const storageRef = ref(storage, filename)
    
    console.log('Uploading to:', filename)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    console.log('Upload successful:', url)
    
    return { url, filename }
  } catch (err) {
    console.error('Failed to upload photo:', err)
    throw err
  }
}

/**
 * Delete a photo from Firebase Storage
 */
export async function deletePhotoFromStorage(filename) {
  try {
    const storage = await getStorageInstance()
    if (!storage) {
      throw new Error('Firebase Storage not initialized')
    }
    const storageRef = ref(storage, filename)
    await deleteObject(storageRef)
    return true
  } catch (err) {
    console.error('Failed to delete photo from storage:', err)
    return false
  }
}

/**
 * Get the next available ID for a new photo
 */
export function getNextPhotoId(photos) {
  if (!photos || photos.length === 0) return 1
  const maxId = Math.max(...photos.map(p => p.id || 0))
  return maxId + 1
}

/**
 * Reset (delete) all photos document in Firestore
 */
export async function resetPhotos() {
  try {
    await deleteDocument(COLLECTION, DOC_ID)
    return true
  } catch (err) {
    console.error('Failed to reset photos in Firestore:', err)
    return false
  }
}
