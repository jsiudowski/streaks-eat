import React, { useEffect, useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonListHeader, IonItem, IonInput, IonLabel, IonGrid, IonCol, IonRow, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonToast } from '@ionic/react';
import { getAuth } from 'firebase/auth';
import { useHistory, useLocation } from 'react-router-dom';
import { getUserDataByEmail, getAllergens, updateUserProfile } from '../firebaseConfig'; // Adjust the import path as necessary
import './MyProfile.css';

// Structure for our UserData to be loaded and saved
interface UserData {
  id: string;
  Email: string;
  Year: string; 
  Name: string;
  Allergens: number[];
  IsAdmin: boolean;
}

//Structure for our allergen mappings from our database
interface Allergen {
  id: number;
  description: string;
}

// Define a type for the location state
interface LocationState {
  refresh?: boolean; // Indicate if we should refresh the events
}

// Displays current logged in user's name, year, email, and allergens. Can be updated on this page too.
const MyProfile: React.FC = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeAllergies, setActiveAllergies] = useState<number[]>([]);
  const [allergenDescriptions, setAllergenDescriptions] = useState<Allergen[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  useEffect(() => {
    // Fetching User and Allergen Data
    const fetchData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userData = await getUserDataByEmail(user.email!);
        console.log("User data fetched:", userData);
        if (userData) {
          setUserData(userData);
          setActiveAllergies(userData.Allergens || []);
          setName(userData.Name);
          setYear(userData.Year);
        }

        const descriptions = await getAllergens();
        setAllergenDescriptions(descriptions);
      }
    };

    fetchData();
  }, []);

  // useEffect to check for location state and fetch events if refresh is required
  useEffect(() => {
    if (location.state?.refresh) {
        // Fetching User and Allergen Data
    const fetchData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userData = await getUserDataByEmail(user.email!);
        console.log("User data fetched:", userData);
        if (userData) {
          setUserData(userData);
          setActiveAllergies(userData.Allergens || []);
          setName(userData.Name);
          setYear(userData.Year);
        }

        const descriptions = await getAllergens();
        setAllergenDescriptions(descriptions);
      }
    };

    fetchData();
        history.replace({ ...location, state: {} }); // Clear the refresh state to prevent repeated fetching
    }
}, [location.state?.refresh]); // Only run if refresh changes

  // Toggles allergy inputs on and off
  const toggleAllergy = (allergyId: number) => {
    setActiveAllergies((prev) => {
      if (prev.includes(allergyId)) {
        return prev.filter(id => id !== allergyId);
      } else {
        return [...prev, allergyId];
      }
    });
  };

  // Handles Submit
  const handleUpdateProfile = () => {
    setShowConfirmation(true);
  };

  // Updates the User Profile
  const handleConfirm = async () => {
    if (userData) {
      const success = await updateUserProfile(userData.id, userData.Email, year, name, activeAllergies);
      if (success) {
        setToastMessage("Profile updated successfully!");
        setToastVisible(true); // Show the toast
      } else {
        setToastMessage("Failed to update profile.");
        setToastVisible(true); // Show the toast
      }
      setShowConfirmation(false);
    }
  };

  // Handles Cancel
  const handleCancel = () => {
    setShowConfirmation(false);
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    const auth = getAuth();
    await auth.signOut();
    history.push('/pages/Login', { refresh: true }); // Redirect to login page after signing out
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>My Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonToast
          isOpen={toastVisible}
          onDidDismiss={() => setToastVisible(false)}
          message={toastMessage}
          duration={2000} // Duration in milliseconds
        />
        <IonListHeader>
          <IonLabel className="center"><h1>My Profile</h1></IonLabel>
        </IonListHeader>
        
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="9">
              <IonItem>
                <IonInput 
                  label="Name:"
                  placeholder="Enter your name"
                  value={name}
                  onIonChange={e => setName(e.detail.value!)} ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size="5">
              <IonItem>
                <IonInput 
                  label="Year:"
                  placeholder="Enter Year"
                  value={year}
                  onIonChange={e => setYear(e.detail.value!)} ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="10">
              <IonItem>
                <IonInput label="Email:" type="email" placeholder="email@domain.com" value={userData?.Email} readonly ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonListHeader>
          <IonLabel className="center"><h1>My Allergies:</h1></IonLabel>
        </IonListHeader>

        <IonGrid>
          <IonRow className="ion-justify-content-center">
            {allergenDescriptions.map((allergen) => (
                <IonCol key={allergen.id} size="5">
                  <IonButton
                    expand="full"
                    color={activeAllergies.includes(allergen.id) ? "secondary" : "light"}
                    onClick={() => toggleAllergy(allergen.id)}
                  >
                    {allergen.description}
                  </IonButton>
                </IonCol>
            ))}
          </IonRow>
          <IonCol size="5">
            <IonRow className="ion-justify-content-center" onClick={handleUpdateProfile}>
              <IonButton>
                Update Profile
              </IonButton>
            </IonRow>
          </IonCol>
        </IonGrid>

        {showConfirmation && (
          <div className="overlay">
            <IonCard className="confirmation-card">
              <IonCardHeader>
                <IonCardTitle>Caution!</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>Are you sure you want to save changes?</p>
                <IonRow className="ion-justify-content-center">
                  <IonCol size="5">
                    <IonButton expand="full" onClick={handleConfirm} color="primary">Proceed</IonButton>
                  </IonCol>
                  <IonCol size="5">
                    <IonButton expand="full" onClick={handleCancel} color="light">Exit</IonButton>
                  </IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          </div>
        )}

        {/* Sign Out Button */}
        <IonRow className="ion-justify-content-center">
          <IonButton onClick={handleSignOut} color="danger">
            Sign Out
          </IonButton>
        </IonRow>

      </IonContent>
    </IonPage>
  );
};

export default MyProfile;
