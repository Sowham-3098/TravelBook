// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore,collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfKqzqfTFZ09-TGixnW7NKc2A47tw23ME",
  authDomain: "travelbook-8586a.firebaseapp.com",
  projectId: "travelbook-8586a",
  storageBucket: "travelbook-8586a.appspot.com",
  messagingSenderId: "222318594630",
  appId: "1:222318594630:web:b73d99330fc2e8ebf59847"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const tripsRef = collection(db, 'trips');
export const expensesRef = collection(db, 'expenses');

export default app;