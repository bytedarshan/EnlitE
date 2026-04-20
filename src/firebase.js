// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // <-- ADD THIS NEW IMPORT

// REPLACE THESE WITH YOUR ACTUAL KEYS FROM FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyD3xM7igYnZ12j9JKGhNGCSn3EKHZVUJZ0",
  authDomain: "enlite-clinic.firebaseapp.com",
  projectId: "enlite-clinic",
  storageBucket: "enlite-clinic.firebasestorage.app",
  messagingSenderId: "956864848677",
  appId: "1:956864848677:web:0c00ef2d5018f68b8670cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the database so our Dashboard can use it
export const db = getFirestore(app);
export const auth = getAuth(app); // <-- ADD THIS NEW EXPORT