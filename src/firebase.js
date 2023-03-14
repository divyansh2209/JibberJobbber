import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";
import { getFirestore } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2S2W6_RL16xpuyKjjclkPZGXT3hAqa3s",
  authDomain: "auth-be97a.firebaseapp.com",
  projectId: "auth-be97a",
  storageBucket: "auth-be97a.appspot.com",
  messagingSenderId: "737715484336",
  appId: "1:737715484336:web:ce9c0b174c6e6359162d75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
