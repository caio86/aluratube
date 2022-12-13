import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB1iHinOZoQUK1xJfsy1jnRPSan6y3Bux8",
  authDomain: "aluratube-caio.firebaseapp.com",
  projectId: "aluratube-caio",
  storageBucket: "aluratube-caio.appspot.com",
  messagingSenderId: "22051209581",
  appId: "1:22051209581:web:24be31fa298e6e6a8fda64"
};

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)