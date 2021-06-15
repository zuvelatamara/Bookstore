//Database konfiguracioni fajl i povezivanje...
import { firebase } from "@firebase/app";
import "firebase/analytics"; //google analitika
import "firebase/auth"; //autentifikacija
import "firebase/storage"; //slike
import "firebase/firestore"; //baza podataka

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaCxsEXTvZjh8_yBsU3ogcIRZ-KC-bRxQ",
  authDomain: "bookshopvueapp.firebaseapp.com",
  projectId: "bookshopvueapp",
  storageBucket: "bookshopvueapp.appspot.com",
  messagingSenderId: "878373153765",
  appId: "1:878373153765:web:b2a5ee9e5c18cac04ddd0c",
  measurementId: "G-JDHTEE5L29"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// utils
const db = firebase.firestore();
const storage = firebase.storage().ref();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const romanceCollection = db.collection("romance");
const horrorCollection = db.collection("horror");
const scifiCollection = db.collection("scifi");
const classicsCollection = db.collection("classics");
const peopleCollection = db.collection("people");

// export utils/refs
export {
  db,
  storage,
  auth,
  usersCollection,
  romanceCollection,
  horrorCollection,
  scifiCollection,
  classicsCollection,
  peopleCollection
};
