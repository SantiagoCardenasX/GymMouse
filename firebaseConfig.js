// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
 
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAs9in8RAexyuu9wox7xEuCLAc1svWjy9g",
//   authDomain: "gymmouse-1af11.firebaseapp.com",
//   projectId: "gymmouse-1af11",
//   storageBucket: "gymmouse-1af11.firebasestorage.app",
//   messagingSenderId: "465121065851",
//   appId: "1:465121065851:web:d1460102d30840c0cadbde",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCeAiRPiW_uH37LmPcn0sZLi1ytYIWAqhY",
  authDomain: "gym-mouse.firebaseapp.com",
  projectId: "gym-mouse",
  storageBucket: "gym-mouse.firebasestorage.app",
  messagingSenderId: "1005952414187",
  appId: "1:1005952414187:web:a097204210f5ea1def69ae"
};
 
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);