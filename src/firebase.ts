import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyA_5HI6efUWvOjaGML6ZIVoA9OPnVNKC1E",
  authDomain: "instagram-f7802.firebaseapp.com",
  databaseURL: "https://instagram-f7802.firebaseio.com",
  projectId: "instagram-f7802",
  storageBucket: "instagram-f7802.appspot.com",
  messagingSenderId: "1078378161160",
  appId: "1:1078378161160:web:62d8843f03a7de3ea49dbd",
});

const db = firebase.firestore();
const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

export { db, increment, decrement };
