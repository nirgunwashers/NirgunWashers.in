// Copy this file to `src/firebaseConfig.js` and fill in your Firebase config
// How to get these values: https://console.firebase.google.com/ -> Project Settings -> Your apps

export default {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
}

// After copying, create a file `src/firebaseConfig.js` with the same default export
// containing your project's config. This app uses Firestore to store catalogs
// and prices so changes appear on all devices immediately.
