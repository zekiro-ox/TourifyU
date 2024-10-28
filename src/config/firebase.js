// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOytYa9l1gmwyX60Dmv5hV3ApZYadO5Dc",
  authDomain: "tourifyu.firebaseapp.com",
  projectId: "tourifyu",
  storageBucket: "tourifyu.appspot.com",
  messagingSenderId: "1060336331226",
  appId: "1:1060336331226:web:e40223c535579ab5bbb8e3",
  measurementId: "G-6BD45EC11J",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
