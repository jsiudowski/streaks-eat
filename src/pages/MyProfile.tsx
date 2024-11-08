import React, { useEffect, useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonListHeader, IonItem, IonInput, IonLabel, IonGrid, IonCol, IonRow, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonToast, IonCardSubtitle } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { getUserDataByEmail, getAllergens, updateUserProfile } from '../firebaseConfig'; // Adjust the import path as necessary
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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

// Displays current logged in user's name, year, email, and allergens. Can be updated on this page too.
const MyProfile: React.FC = () => {
  const history = useHistory();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeAllergies, setActiveAllergies] = useState<number[]>([]);
  const [allergenDescriptions, setAllergenDescriptions] = useState<Allergen[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth();

    // Listen to changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserLoggedIn(true);
        const userData = await getUserDataByEmail(user.email!);
        if (userData) {
          setUserData(userData);
          setActiveAllergies(userData.Allergens || []);
          setName(userData.Name);
        }
  
        const descriptions = await getAllergens();
        setAllergenDescriptions(descriptions);
      } else {
        setUserLoggedIn(false);
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  //Toggles allergy inputs on and off
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
      const success = await updateUserProfile(userData.id, userData.Email, name, activeAllergies);
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
    setToastMessage("Sign Out successful!");
    setToastVisible(true);
    history.replace('/pages/Login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>My Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonToast isOpen={toastVisible} message={toastMessage} duration={2000} onDidDismiss={() => setToastVisible(false)} />

        <IonListHeader>
          <IonLabel className="center"><h1>My Profile</h1></IonLabel>
        </IonListHeader>

        {/* Conditional Rendering for Logged In State */}
        {userLoggedIn ? (
          <>
            {/* Display Profile Information when Logged In */}
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
          </>
        ) : (
          // Display Login and Registration buttons if not logged in
          <IonGrid className="centered-text">
            <IonCard>
              <IonCardHeader>
                <h1>Hello!!</h1>
                <h3>Welcome to Streaks Eat!!</h3>
              </IonCardHeader>
              <IonCardContent>
                <p>It appears that you are not logged in, or have a registered account.</p>
                <p>Would you like to log in or register?</p>
              </IonCardContent>
              <IonRow className="centered-row">
                <IonCol size="5">
                  <IonButton expand="full" routerLink="/pages/Login" color="primary">
                    Login
                  </IonButton>
                </IonCol>
                <IonCol size="5">
                  <IonButton expand="full" routerLink="/pages/Register" color="primary">
                    Register
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonCard>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};
export default MyProfile;