// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnUROYWtm_BscIL0UjjhR1xd_wrEDoBhA",
  authDomain: "getnpay-bfbd2.firebaseapp.com",
  databaseURL:
    "https://getnpay-bfbd2-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "getnpay-bfbd2",
  storageBucket: "getnpay-bfbd2.appspot.com",
  messagingSenderId: "1041137350983",
  appId: "1:1041137350983:web:f932622188833064cfb462",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);
const storage = getStorage(app);
export { app, storage, auth, db, rtdb };
