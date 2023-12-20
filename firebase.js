// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqOO1l03nRlxj7wf-T6Fvznt8_H-SUAPw",
  authDomain: "sdnails.firebaseapp.com",
  databaseURL: "https://sdnails-default-rtdb.firebaseio.com",
  projectId: "sdnails",
  storageBucket: "sdnails.appspot.com",
  messagingSenderId: "722443491412",
  appId: "1:722443491412:web:a7f923284b3825871cf5c1",
  measurementId: "G-D2JL9KQ9FD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication
const firestore = getFirestore(app);
const analytics = getAnalytics(app);
// const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage),
//   });

//module.exports = firebaseConfig;
export { app, auth, firestore, analytics, firebaseConfig};