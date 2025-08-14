importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js");

firebase.initializeApp({
apiKey: "AIzaSyCZzEk7c6acwLBP9LsV6nxGEOTHisSiLCc",
  authDomain: "dizzly-11f31.firebaseapp.com",
  projectId: "dizzly-11f31",
  storageBucket: "dizzly-11f31.firebasestorage.app",
  messagingSenderId: "1072406110021",
  appId: "1:1072406110021:web:b4db4266134a96c2bc282c",
  measurementId: "G-6JKGXR6XLS"
});

firebase.messaging();

self.addEventListener("push", (event) => {
  const data = event.data.json();
  const eventObj = data.event ? JSON.parse(data.event) : null;

  if (eventObj) {
    self.registration.showNotification("Auction Update", {
      body: `${eventObj.eventName} - ${eventObj.auctionName}`,
      icon: eventObj.auctionImage
    });
  }
});
