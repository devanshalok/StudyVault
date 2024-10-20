// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyrfhdArU_IRsESIDl0IYismlrJR7h4Fc",
  authDomain: "studyvault-85907.firebaseapp.com",
  databaseURL: "https://studyvault-85907-default-rtdb.firebaseio.com",
  projectId: "studyvault-85907",
  storageBucket: "studyvault-85907.appspot.com",
  messagingSenderId: "132065334489",
  appId: "1:132065334489:web:901e47ac65c176cad21ac8",
  measurementId: "G-MKSQ9YQ43Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {database};