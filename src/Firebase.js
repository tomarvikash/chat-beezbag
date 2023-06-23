// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

 
const firebaseConfig = {
  apiKey: "AIzaSyDsvHyRAM1HwPchGZZysgNoO6kXbwWjnLA",
  authDomain: "beezbaggpt.firebaseapp.com",
  projectId: "beezbaggpt",
  storageBucket: "beezbaggpt.appspot.com",
  messagingSenderId: "1008640464393",
  appId: "1:1008640464393:web:1de202e4260ae545798ad8",
  measurementId: "G-L4G8S12YK7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
 const db = getFirestore();
const storage = getStorage();

export {auth,app,db,storage};