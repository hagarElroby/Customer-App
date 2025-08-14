import { initializeApp } from "firebase/app";
import { getMessaging, type Messaging } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const VAPID_KEY = process.env.VITE_FIREBASE_VAPID_KEY;
const app = initializeApp(firebaseConfig);

// export const messaging = getMessaging(app);

export let messaging: Messaging;

if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  messaging = getMessaging(app);
}
