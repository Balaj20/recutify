// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB9OrICZ2v1jcamMtKBFuPDAJVLd6ysDIs",
//   authDomain: "indeed-clone-3f168.firebaseapp.com",
//   projectId: "indeed-clone-3f168",
//   storageBucket: "indeed-clone-3f168.appspot.com",
//   messagingSenderId: "485710660412",
//   appId: "1:485710660412:web:3eda9d882a5a3a75d15439"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDj9x1RAvjZk1BmR-zLyOfeppjGJEQog9M",
  authDomain: "recutify-75308.firebaseapp.com",
  projectId: "recutify-75308",
  storageBucket: "recutify-75308.appspot.com",
  messagingSenderId: "742029118612",
  appId: "1:742029118612:web:976f2086dd97c5cf987881",
  measurementId: "G-FH6Y1FCL66"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);