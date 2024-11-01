import React, { useEffect, useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonListHeader, IonItem, IonInput, IonLabel, IonGrid, IonCol, IonRow, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonToast } from '@ionic/react';
import { getAuth } from 'firebase/auth';
import { getUserDataByEmail, getAllergens, updateUserProfile } from '../firebaseConfig'; // Adjust the import path as necessary
import './MyProfile.css';

interface UserData {
  id: string;
  Email: string;
  Year: string; 
  Name: string;
  Allergens: number[];
}

interface Allergen {
  id: number;
  description: string;
}

const MyProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeAllergies, setActiveAllergies] = useState<number[]>([]);
  const [allergenDescriptions, setAllergenDescriptions] = useState<Allergen[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userData = await getUserDataByEmail(user.email!);
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

  const toggleAllergy = (allergyId: number) => {
    setActiveAllergies((prev) => {
      if (prev.includes(allergyId)) {
        return prev.filter(id => id !== allergyId);
      } else {
        return [...prev, allergyId];
      }
    });
  };

  const handleUpdateProfile = () => {
    setShowConfirmation(true);
  };

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

  const handleCancel = () => {
    setShowConfirmation(false);
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
          {allergenDescriptions.map((allergen) => (
            <IonRow key={allergen.id} className="ion-justify-content-center">
              <IonCol size="5">
                <IonButton
                  expand="full"
                  color={activeAllergies.includes(allergen.id) ? "secondary" : "light"}
                  onClick={() => toggleAllergy(allergen.id)}
                >
                  {allergen.description}
                </IonButton>
              </IonCol>
            </IonRow>
          ))}
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
        <IonToast
          isOpen={toastVisible}
          onDidDismiss={() => setToastVisible(false)}
          message={toastMessage}
          duration={2000} // Duration in milliseconds
        />
      </IonContent>
    </IonPage>
  );
};

export default MyProfile;
