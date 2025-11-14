// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "vingo-food-app-507ea.firebaseapp.com",
  projectId: "vingo-food-app-507ea",
  storageBucket: "vingo-food-app-507ea.firebasestorage.app",
  messagingSenderId: "290372281675",
  appId: "1:290372281675:web:04fce7aa4fc8f737a8f4ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export default app;