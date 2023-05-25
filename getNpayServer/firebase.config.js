const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
const { getDatabase } = require("firebase/database");
const { getStorage } = require("firebase/storage");

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);
const storage = getStorage(app);

module.exports = { app, storage, auth, db, rtdb };
