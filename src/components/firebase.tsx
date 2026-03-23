// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqpkS5JJy6OgOpuIwKyp2uqg-5Rwhzfk8",
  authDomain: "voyage-ledger-vrnke.firebaseapp.com",
  projectId: "voyage-ledger-vrnke",
  storageBucket: "voyage-ledger-vrnke.firebasestorage.app",
  messagingSenderId: "610332807604",
  appId: "1:610332807604:web:e576a351a2601834f822e1",
  measurementId: "G-QBJS6RJEWB"
};

window = global.window;

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);