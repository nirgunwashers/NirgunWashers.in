**Simple Firebase setup for Admin real-time sync**

Follow these non-technical steps so admin changes appear on all devices immediately.

1. Create a Firebase project
   - Open: https://console.firebase.google.com/
   - Click "Add project" and follow the prompts.

2. Add a Web app to your Firebase project
   - In Project Overview click the web icon (</>) to register a web app.
   - Give it a name (example: `nirgun-web`) and click "Register app".

3. Enable Firestore database
   - In the left menu go to "Firestore Database" and click "Create database".
   - Choose your location and start in "Test mode" (for small private use). Click "Enable".

4. Get your Firebase config
   - In Project Settings -> Your apps -> select the web app you created.
   - Copy the config object (keys like apiKey, authDomain, projectId, etc.).

5. Add config to the project files
   - In this repo, copy `src/firebaseConfig.example.js` to `src/firebaseConfig.js`.
   - Replace the placeholder values with the ones you copied from Firebase.

6. Install dependencies and run the app
   - Open a terminal in the project folder and run:

```powershell
npm install
npm run dev
```

7. Test real-time sync
   - Open the website and visit the Admin panel on two different devices or browser windows.
   - Log in (default password: `admin123`), change a price or catalog and click Save.
   - The other device should update automatically within a second or two.

Notes and safety
 - This setup uses Firestore (hosted by Google). Keep your Firebase project private.
 - For production use, update Firestore security rules to restrict writes to authorized users.
 - If you need, I can help set secure rules or provide an alternative backend.
