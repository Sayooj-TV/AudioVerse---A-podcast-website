// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4utBoNeM46KpjQZ8ouMaI_uIV5G2bSJQ",
  authDomain: "audio-verse-react-app.firebaseapp.com",
  projectId: "audio-verse-react-app",
  storageBucket: "audio-verse-react-app.appspot.com",
  messagingSenderId: "636150980425",
  appId: "1:636150980425:web:4abded5e5f24470737c498",
  measurementId: "G-VG1BQKPYL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage =getStorage(app);
const auth = getAuth(app);

export {auth,db,storage};
