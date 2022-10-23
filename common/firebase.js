// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, signOut} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbtbvWzhgC_jLJbpH-TDxmJZaTaqfb0_o",
  authDomain: "ezbnk-9e4c5.firebaseapp.com",
  projectId: "ezbnk-9e4c5",
  storageBucket: "ezbnk-9e4c5.appspot.com",
  messagingSenderId: "104053551373",
  appId: "1:104053551373:web:6f040edd71915382550044",
  measurementId: "G-B4PWY2205W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);
export const logout = async () => {
  await signOut(auth);
}
export const storage = getStorage(app);