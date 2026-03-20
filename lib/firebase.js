import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMRY1a38so88ZsBOiG7D89vqrJHhgmYVI",
  authDomain: "the-unadopted.firebaseapp.com",
  projectId: "the-unadopted",
  storageBucket: "the-unadopted.firebasestorage.app",
  messagingSenderId: "275870665557",
  appId: "1:275870665557:web:096816e0afc4cfc6ffbddc",
  measurementId: "G-MZP12Q6RZR",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
