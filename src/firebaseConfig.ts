import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';

const config = {
    apiKey: "AIzaSyCyQOeqqsDjQFDdpJTden1kiVrEv8EOq88",
    authDomain: "streakseat.firebaseapp.com",
    projectId: "streakseat",
    storageBucket: "streakseat.appspot.com",
    messagingSenderId: "946747688782",
    appId: "1:946747688782:web:ca5fe4398e760e24cbc01f",
    measurementId: "G-V3MHX0XZGQ"
}

// Initialize Firebase
const app = firebase.initializeApp(config);
const analytics = getAnalytics(app);
const db = getFirestore(app);

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
