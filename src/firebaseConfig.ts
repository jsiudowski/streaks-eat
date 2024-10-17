import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAnalytics } from "firebase/analytics";
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