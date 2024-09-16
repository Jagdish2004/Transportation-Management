const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyC0d-X2xUu1tLHDQBaZViNlisYH2rqa2Zk",
  authDomain: "transportation-managemen-3c13c.firebaseapp.com",
  projectId: "transportation-managemen-3c13c",
  storageBucket: "transportation-managemen-3c13c.appspot.com",
  messagingSenderId: "433708799953",
  appId: "1:433708799953:web:efae3113a77775eee032f0",
  measurementId: "G-01BD1ZP6F4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const database = getDatabase(app);

// Function to add route
const addRoute = (routeId, coordinates) => {
  set(ref(database, 'routes/' + routeId), {
    coordinates
  });
};

module.exports = { addRoute };
