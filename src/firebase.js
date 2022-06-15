import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_DATABASE_URL,
} = process.env;

const firebaseConfig = {
  // apiKey: FIREBASE_API_KEY,
  // authDomain: FIREBASE_AUTH_DOMAIN,
  // databaseURL: FIREBASE_DATABASE_URL,
  // projectId: FIREBASE_PROJECT_ID,
  // storageBucket: FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  // appId: FIREBASE_APP_ID,
  // measurementId: FIREBASE_MEASUREMENT_ID,
  apiKey: "AIzaSyAnlSRQTQl-bzlTs1h1YAJWj1CVr-r64K0",
  authDomain: "deya-therapy-2.firebaseapp.com",
  databaseURL:
    "https://deya-therapy-2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "deya-therapy-2",
  storageBucket: "deya-therapy-2.appspot.com",
  messagingSenderId: "858341603776",
  appId: "1:858341603776:web:695c2ba7e4ce38a7037025",
  measurementId: "G-82LVSP2CT9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
