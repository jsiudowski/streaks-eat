// Necessary imports
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore/lite';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

/* for notifications */
import 'firebase/compat/messaging';
import { getToken, onMessage } from "firebase/messaging";


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


const firebaseApp = firebase.initializeApp(config);


// Listen for authentication state changes
// If User Logs in or Logs out
onAuthStateChanged(auth, (user) => {
  if (user) {
    // The user is signed in
  } else {
    // The user is signed out
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
      if(res) {
        //Creates a user entry in our users collection if the Auth create was successful
        const userCreate = await createUser(email, res.user?.uid);
        console.log(userCreate);
      }
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

    const messaging = firebaseApp.messaging();
    export const getFcmToken = async () => {
      try {
        const token = await getToken(messaging, {
          vapidKey: 'BI2LbVIxDr8lK6G-_3QY884BJG_AcpwTA416c-fFsngIwYdfxk4QCjEvnftA886BbYIM9St5GeLUAhxgggEgbUo '
        });
        console.log('FCM Token:', token);
        return token;
      } catch (error) {
        console.error('Error getting token:', error);
      }
    };
    
    // Handle incoming messages
    onMessage(messaging, (payload) => {
      console.log('Message received: ', payload);
      // Show notification (e.g., a toast)
    });
    


// Creates a new User and adds them to our Users table in the Database
const createUser = async (email: string, uid: string | undefined) => {
  const newUser = {
    Name: '',
    Email: email.toLowerCase(),
    IsAdmin: false,
    Allergens: []
  }
  try {
    const userRef = doc(collection(db, 'users'), uid);
    await setDoc(userRef, newUser);
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
      
      return true;

    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
};

//Signs out the currently signed in User
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

export { auth, messaging };

// Define setupNotifications function
export function setupNotifications() {
  const sendPushNotificationRequest = async (eventName: string, building: string) => {
    const message = {
      eventName,
      building,
    };
    
    try {
      const response = await fetch('https://sendnotification-7ea2lpfala-uc.a.run.app', {  // Backend endpoint to handle notification sending found after a deploy statement in terminal
        //put in terminal to find sending address->      firebase deploy --only functions

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
  
      if (response.ok) {
        console.log('Push notification request sent');
      } else {
        console.error('Failed to send push notification request');
      }
    } catch (error) {
      console.error('Error sending notification request:', error);
    }
  };
}

