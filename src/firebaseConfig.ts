import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const config = {
    apiKey: "AIzaSyCyQOeqqsDjQFDdpJTden1kiVrEv8EOq88",
    authDomain: "streakseat.firebaseapp.com",
    projectId: "streakseat",
    storageBucket: "streakseat.appspot.com",
    messagingSenderId: "946747688782",
    appId: "1:946747688782:web:419bcf45db5f80d8cbc01f",
    measurementId: "G-6YRW2L2BYY"
  };

// Initialize Firebase
const app = firebase.initializeApp(config);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

// Get a list of events from your database
export async function getEvents() {
  const eventsCol = collection(db, 'events');
  const eventSnapshot = await getDocs(eventsCol);
  const eventList = eventSnapshot.docs.map(doc => doc.data());
  return eventList;
}

export async function loginUser(username: string, password: string) {

    const email = `${username}@jcu.edu`

    try {
        const res = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log(res);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

export async function registerUser(username:string, password:string) {
    const email = `${username}@jcu.edu`

    try {
        const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
        console.log(res)
        return true
    }
    catch(error) {
        console.log(error)
        return false
    }
}
