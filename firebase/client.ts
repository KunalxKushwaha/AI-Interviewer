// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9yk5aa2FMyQLsPxumo9peD_OPKKWWk00",
  authDomain: "hirevision-43ce5.firebaseapp.com",
  projectId: "hirevision-43ce5",
  storageBucket: "hirevision-43ce5.firebasestorage.app",
  messagingSenderId: "328007478685",
  appId: "1:328007478685:web:98e2f75c662289f455d374",
  measurementId: "G-MCLWWREKJV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);