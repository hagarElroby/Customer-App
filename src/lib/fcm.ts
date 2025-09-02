import {
  getMessaging,
  onMessage,
  type MessagePayload,
} from "firebase/messaging";
import { firebaseApp } from "../../firebaseConfig";

let messaging: ReturnType<typeof getMessaging> | null = null;

export function getClientMessaging() {
  if (typeof window === "undefined") return null; // SSR safe
  if (!messaging) {
    try {
      messaging = getMessaging(firebaseApp);
    } catch (err) {
      console.warn("Firebase messaging not supported:", err);
      return null;
    }
  }
  return messaging;
}

export function listenForNotifications(
  handler: (payload: MessagePayload) => void,
) {
  if (typeof window === "undefined") return;

  const m = getClientMessaging();
  if (!m) return;

  return onMessage(m, handler);
}

// import {
//   getMessaging,
//   onMessage,
//   type MessagePayload,
// } from "firebase/messaging";
// import { firebaseApp } from "../../firebaseConfig";

// const messaging = getMessaging(firebaseApp);

// export function listenForNotifications(
//   handler: (payload: MessagePayload) => void,
// ) {
//   if (!messaging) return;

//   // Foreground notifications
//   return onMessage(messaging, (payload) => {
//     console.log("Foreground notification:", payload);
//     handler(payload);
//   });
// }
