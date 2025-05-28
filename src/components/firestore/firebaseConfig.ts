import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGQofm0s_LXPKV1Bx8yQH4GzVaKCbboWU",
  authDomain: "pesquisa-e5742.firebaseapp.com",
  projectId: "pesquisa-e5742",
  storageBucket: "pesquisa-e5742.appspot.com",
  messagingSenderId: "901448402837",
  appId: "1:901448402837:web:56e0acbb9774a3e073589c",
  measurementId: "G-0Y1N3CKJB4"
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);