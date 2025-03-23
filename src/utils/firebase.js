// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApBESMEJVH-H8RKsBJuGwrjPsQZdJVVPI",
  authDomain: "controle-receitas.firebaseapp.com",
  projectId: "controle-receitas",
  storageBucket: "controle-receitas.firebasestorage.app",
  messagingSenderId: "269595798531",
  appId: "1:269595798531:web:9d9478d04432da168bb236",
  measurementId: "G-EL96S69F9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportar Firestore
export { db };