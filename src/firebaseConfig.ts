import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, Firestore, setDoc, doc } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";

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
const storage = getStorage(app); // Initialize storage

const auth = getAuth(app);
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

export async function addEvents(event: {Building: string, RoomNumber: string, FoodDescription: string, Allergens: number[], TimeCreated: Date, ImageURL: string}) {
  try {
    const eventRef = doc(collection(db, 'events'));
    await setDoc(eventRef, event);
    console.log('Event Added:', event);
    return true;
  }
  catch(error) {
    console.error('Error adding event:', error);
    return false;
  }
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

// Get a list of allergens from your database
export async function getAllergens() {
  const allergensCol = collection(db, 'allergies'); 
  const allergenSnapshot = await getDocs(allergensCol);
  const allergenList = allergenSnapshot.docs.map(doc => ({
      id: doc.data().id, // Assuming you have an 'id' field
      description: doc.data().description, // Assuming you have a 'description' field
  }));
  return allergenList;
}

// Function to update food availability for an event
export const updateEvent = async (eventId: string, data: Partial<{ FoodDescription: string }>) => {
  const eventRef = doc(db, 'events', eventId); // Specify the document to update
  await setDoc(eventRef, data, { merge: true }); // Use merge to only update specific fields
};

// Function to upload images and return the URL
export const uploadImage = async (imageUri: string): Promise<string> => {
  const response = await fetch(imageUri);
  const blob = await response.blob();

  const storageRef = ref(storage, `images/${Date.now()}.png`);
  await uploadBytes(storageRef, blob);

  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export default auth;
