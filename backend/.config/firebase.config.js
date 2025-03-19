const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCEas8ZmwHt-EItFvqvheAG4azMJUjdHe0",
  authDomain: "shyaragold.firebaseapp.com",
  projectId: "shyaragold",
  storageBucket: "shyaragold.appspot.com",  // Fixed domain
  messagingSenderId: "479913539040",
  appId: "1:479913539040:web:8c5746b03f221aa915e785",
  measurementId: "G-PKYY8YPL7R"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

module.exports = { firebaseApp, auth, db };
