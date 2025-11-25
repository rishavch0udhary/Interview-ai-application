// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // <-- ADD THIS

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4tpHybKjFkDonZHWBj9U3RGg8RAmmNY8",
  authDomain: "prepwise-6ecb3.firebaseapp.com",
  projectId: "prepwise-6ecb3",
  storageBucket: "prepwise-6ecb3.firebasestorage.app",
  messagingSenderId: "690849937106",
  appId: "1:690849937106:web:fa822f5f3ec1b2c879df0b",
  measurementId: "G-KV0DCF75L8"
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// Initialize Auth
const auth = getAuth(app);

// Export auth
export { auth, analytics };
