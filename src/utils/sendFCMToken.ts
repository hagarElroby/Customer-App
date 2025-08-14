"use client";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseConfig } from "../../firebaseConfig";
import { addFCMToken } from "@/services/fcmToken/add-fcm-token";

export async function sendFCMToken() {
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    if (token) {
      await addFCMToken({ fcmToken: token });
      localStorage.setItem("FCMToken", token);
    }
  } catch (err) {
    console.error("Error getting FCM token:", err);
  }

  // Handle foreground messages here too
  onMessage(messaging, (payload) => {
    console.log("Message received in foreground:", payload);
  });
}
