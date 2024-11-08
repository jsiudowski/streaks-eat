// Necessary imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, Firestore, setDoc, doc } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from "firebase/storage";

//This config is safe to leave in this file as the API Key is an identifier and not a security measure
// needed to communicate with the Firebase DB, Auth, Storage, etc.
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
const app = firebase.initializeApp(config); // Initialize App
const analytics = getAnalytics(app); // Initialize Analytics
const db = getFirestore(app); // Initialize Database
const storage = getStorage(app); // Initialize Storage
const auth = getAuth(app); // Initialize Auth

// If User Logs in or Logs out
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
  } else {

  }
});

interface UserData {
  id: string;
  Email: string;
  Year: string;
  Name: string;
  Allergens: number[];
  IsAdmin: boolean;
}

// Get a list of events from your database
export async function getEvents() {
  const eventsCol = collection(db, 'events');
  const eventSnapshot = await getDocs(eventsCol);
  const eventList = eventSnapshot.docs.map(doc => doc.data());
  return eventList;
}

// Add an event to the database
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

//Logs a user in
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

// Registers a user
export async function registerUser(username:string, password:string) {
  const email = `${username}@jcu.edu`

  try {
      const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
      const user = await createUser(email)
      if(res) {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      }
      console.log(user)
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
      id: doc.data().id,
      description: doc.data().description,
  }));
  return allergenList;
}

// Function to upload images and return the URL
export const uploadImage = async (imageUri: string): Promise<string> => {
  const response = await fetch(imageUri);
  const blob = await response.blob();

  const storageRef = ref(storage, `images/${Date.now()}.png`);
  await uploadBytes(storageRef, blob);

  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

// Creates a new User and adds them to our Users table in the Database
const createUser = async (email: string) => {
  const newUser = {
    Email: email.toLowerCase(),
    IsAdmin: false
  }
  try {
    const userRef = doc(collection(db, 'users'));
    await setDoc(userRef, newUser);
    console.log('User Added:', newUser);
    return true;
  }
  catch(error) {
    console.error('Error adding user:', error);
    return false;
  }
}

// Function to get user data based on email
export const getUserDataByEmail = async (email: string): Promise<UserData | null> => {
  const usersCol = collection(db, 'users');
  const userQuery = await getDocs(usersCol);
  const userData = userQuery.docs.find(doc => doc.data().Email === email);

  if (!userData) {
    console.error("No user found with the provided email:", email);
    return null;
  }

  return userData ? { id: userData.id, ...userData.data() } as UserData : null; 
};

// Function to update user profile
export const updateUserProfile = async (id:string, email: string, name: string, allergens: number[]) => {
    try {
      // Find the user document by email
      const userRef = doc(collection(db, 'users'), id); 

      await setDoc(userRef, {
        Email: email,
        Name: name,
        Allergens: allergens,
      }, { merge: true }); // Merge to keep other fields intact

      console.log('User profile updated successfully:', { email, name, allergens });
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
};

export default auth;
