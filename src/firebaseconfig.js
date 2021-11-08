// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN6iq3p3EJEyqf82PAocJWniT_YAPQga8",
  authDomain: "blog-e38ee.firebaseapp.com",
  projectId: "blog-e38ee",
  storageBucket: "blog-e38ee.appspot.com",
  messagingSenderId: "72733205522",
  appId: "1:72733205522:web:d5beca71e5b4a0c08864cb"
};

// Initialize Firebase


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);