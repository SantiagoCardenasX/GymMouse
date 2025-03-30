// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs9in8RAexyuu9wox7xEuCLAc1svWjy9g",
  authDomain: "gymmouse-1af11.firebaseapp.com",
  projectId: "gymmouse-1af11",
  storageBucket: "gymmouse-1af11.firebasestorage.app",
  messagingSenderId: "465121065851",
  appId: "1:465121065851:web:d1460102d30840c0cadbde",
};
 
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);