// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqrnnj7hPf-KMxm7C9OLBUUBCtJN-LNN0",
  authDomain: "hiv3-affb4.firebaseapp.com",
  projectId: "hiv3-affb4",
  storageBucket: "hiv3-affb4.appspot.com",
  messagingSenderId: "150148841582",
  appId: "1:150148841582:web:70c8a6ae4742f78dcba67f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);