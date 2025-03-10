// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjKKwoKahMDZbhp__MMjig47k3Tdt3GH0",
    authDomain: "rock-paper-scissors-95cb5.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-95cb5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rock-paper-scissors-95cb5",
    storageBucket: "rock-paper-scissors-95cb5.firebasestorage.app",
    messagingSenderId: "1055715671952",
    appId: "1:1055715671952:web:938e2fa78ac180cce87d15",
    measurementId: "G-ZE1RWMYYMM"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

// Sign in the user anonymously
signInAnonymously(auth)
  .then(() => {
    console.log("Signed in anonymously");
  })
  .catch((error) => {
    console.error("Authentication error:", error);
  });

export { database, ref, set, onValue };
