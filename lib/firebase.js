// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Only initialize if window is defined (client-side check)
let app;
if (typeof window !== "undefined") {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
} else {
    // During SSR, just leave app undefined (no Firebase init on server)
    app = undefined;
}

const auth = app ? getAuth(app) : undefined;
const db = app ? getFirestore(app) : undefined;

export { auth, db };
