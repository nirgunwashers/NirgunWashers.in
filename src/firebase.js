import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  deleteDoc
} from 'firebase/firestore'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth'
import { getStorage } from 'firebase/storage'

let db = null
let app = null
let storage = null

async function initFirebase() {
  if (db) return db
  try {
    // Load firebase config created by the owner
    const cfgModule = await import('./firebaseConfig.js')
    const firebaseConfig = cfgModule.default || cfgModule
    app = initializeApp(firebaseConfig)
    db = getFirestore(app)
    storage = getStorage(app)
    return db
  } catch (err) {
    console.error('Firebase initialization failed. Create `src/firebaseConfig.js` from `src/firebaseConfig.example.js` and fill in your Firebase config.')
    throw new Error('Firebase not configured. See `src/firebaseConfig.example.js` for instructions.')
  }
}

export async function getDb() {
  return await initFirebase()
}

export async function getStorageInstance() {
  await initFirebase()
  return storage
}

// Auth helpers
export async function getAuthInstance() {
  await initFirebase()
  return getAuth()
}

export async function signIn(email, password) {
  await initFirebase()
  const auth = getAuth()
  return signInWithEmailAndPassword(auth, email, password)
}

export async function signOut() {
  await initFirebase()
  const auth = getAuth()
  return firebaseSignOut(auth)
}

export async function onAuthChange(callback) {
  await initFirebase()
  const auth = getAuth()
  return onAuthStateChanged(auth, callback)
}

// Helper to read a document once
export async function readDocOnce(collectionName, docId) {
  const db = await initFirebase()
  const ref = doc(db, collectionName, docId)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data() : null
}

// Helper to write (merge) a document
export async function writeDoc(collectionName, docId, data) {
  const db = await initFirebase()
  const ref = doc(db, collectionName, docId)
  await setDoc(ref, data, { merge: true })
}

// Helper to listen to a document in real-time
export async function subscribeToDoc(collectionName, docId, onUpdate, onError) {
  const db = await initFirebase()
  const ref = doc(db, collectionName, docId)
  return onSnapshot(ref, (snap) => {
    if (!snap.exists()) {
      onUpdate(null)
    } else {
      onUpdate(snap.data())
    }
  }, onError)
}

// Helper to delete a document
export async function deleteDocument(collectionName, docId) {
  const db = await initFirebase()
  const ref = doc(db, collectionName, docId)
  await deleteDoc(ref)
}
