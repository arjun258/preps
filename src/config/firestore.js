// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOAqhpVaKvZAyXw_3fyd4R9amBCLceHQM",
  authDomain: "apni-e-dukaan.firebaseapp.com",
  projectId: "apni-e-dukaan",
  storageBucket: "apni-e-dukaan.firebasestorage.app",
  messagingSenderId: "779198651481",
  appId: "1:779198651481:web:dbe0a6be9dbe1ddc0da548",
  measurementId: "G-8R2BTKGX6Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);