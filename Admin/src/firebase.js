// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkPeWdlhSGRCeUHyrTIO5cyY4bXH5-p1E",
  authDomain: "shopkeeper-eb411.firebaseapp.com",
  projectId: "shopkeeper-eb411",
  storageBucket: "shopkeeper-eb411.appspot.com",
  messagingSenderId: "961959959633",
  appId: "1:961959959633:web:a5901d93995e1fbed32c70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app