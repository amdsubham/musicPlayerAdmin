import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCPSOYdUYRz2LFRE40QJf74H6c5GoIVND0",
  authDomain: "musicplayer-4e559.firebaseapp.com",
  projectId: "musicplayer-4e559",
  storageBucket: "musicplayer-4e559.appspot.com",
  messagingSenderId: "478711783968",
  appId: "1:478711783968:web:8d9d5c54124d90766fd245",
  measurementId: "G-ZGYCNRVS64"
};
// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
