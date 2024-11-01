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

interface UserData {
  id: string;
  Email: string;
  Year: string; // Adjust this if it's a number
  Name: string;
  Allergens: number[]; // Assuming Allergens is an array of strings
}

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
      const user = await createUser(email)
      console.log(user)
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

// Function to upload images and return the URL
export const uploadImage = async (imageUri: string): Promise<string> => {
  const response = await fetch(imageUri);
  const blob = await response.blob();

  const storageRef = ref(storage, `images/${Date.now()}.png`);
  await uploadBytes(storageRef, blob);

  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

const createUser = async (email: string) => {
  const newUser = {
    Email: email,
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

  return userData ? { id: userData.id, ...userData.data() } as UserData : null; // Ensure proper typing
};

// Function to update user profile
export const updateUserProfile = async (id:string, email: string, year: string, name: string, allergens: number[]) => {
    try {
      // Find the user document by email
      const userRef = doc(collection(db, 'users'), id); 

      await setDoc(userRef, {
        Email: email,
        Year: year,
        Name: name,
        Allergens: allergens,
      }, { merge: true }); // Merge to keep other fields intact

      console.log('User profile updated successfully:', { email, year, name, allergens });
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
};

export default auth;
