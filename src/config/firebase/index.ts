import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAm5LBqHT60zb0yfkbfx4Bu7iWHmS2M6i0",
  authDomain: "occupational-health-b555f.firebaseapp.com",
  projectId: "occupational-health-b555f",
  storageBucket: "occupational-health-b555f.appspot.com",
  messagingSenderId: "997033588545",
  appId: "1:997033588545:web:ed934368b69403cb0793c0",
  measurementId: "G-TMNL8M1V6F",
};

initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
