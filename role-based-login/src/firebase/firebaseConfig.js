// /src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0d-X2xUu1tLHDQBaZViNlisYH2rqa2Zk",
  authDomain: "transportation-managemen-3c13c.firebaseapp.com",
  projectId: "transportation-managemen-3c13c",
  storageBucket: "transportation-managemen-3c13c.appspot.com",
  messagingSenderId: "433708799953",
  appId: "1:433708799953:web:efae3113a77775eee032f0",
  measurementId: "G-01BD1ZP6F4"
};

const app = initializeApp(firebaseConfig);

