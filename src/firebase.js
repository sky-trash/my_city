// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfEIiUXecBng8XPq02vKJJ1BGm8fGnEVE",
  authDomain: "city-64a14.firebaseapp.com",
  projectId: "city-64a14",
  storageBucket: "city-64a14.firebasestorage.app",
  messagingSenderId: "454881872771",
  appId: "1:454881872771:web:4e416082796d482fae84b6",
  measurementId: "G-QB2J1F8JXD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);