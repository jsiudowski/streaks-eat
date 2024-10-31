import React, { useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonLabel, IonListHeader, IonCardTitle, IonCheckbox, IonGrid, IonCol, IonRow, IonButton, IonCard, IonCardContent, IonCardHeader } from '@ionic/react';
import { useParams } from 'react-router';
import './MyProfile.css'

const MyProfile: React.FC = () => {

  const [activeAllergies, setActiveAllergies] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

    const toggleAllergy = (allergy: string) => {
        setActiveAllergies((prev) => {
            if (prev.includes(allergy)) {
                return prev.filter(item => item !== allergy); // Remove if already active
            } else {
                return [...prev, allergy]; // Add if not active
            }
        });
    };

  //Update profile handlers
  const handleUpdateProfile = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    // Logic for confirming the profile update
    console.log("Profile updated with allergies:", activeAllergies);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

    const allergyOptions = [
        "Dairy", 
        "Egg", 
        "Fish", 
        "Peanuts",
        "Sesame", 
        "Shellfish", 
        "Soy", 
        "Tree Nuts",
        "Wheat", 
        "Gluten"
    ];

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

          {/*  General Profile  */}
          <IonContent>
              <IonListHeader>
                <IonLabel class="center"><h1>My Profile</h1></IonLabel>
              </IonListHeader>
              
            <IonGrid>
              <IonRow class="ion-justify-content-center">
                <IonCol size="9">
                  <IonItem>
                    <IonInput label="Name:" placeholder="Enter text"></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol size="5">
                  <IonItem>
                    <IonInput label="Year:" placeholder="Enter Year"></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow class="ion-justify-content-center">
                <IonCol size="10">
                  <IonItem>
                    <IonInput label="Email input:" type="email" placeholder="email@domain.com"></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>

        {/*  Allergies Checkbox  */}
          <IonListHeader>
            <IonLabel class="center"><h1>My Allergies:</h1></IonLabel>
          </IonListHeader>

          <IonGrid>
            {allergyOptions.map((allergy, index) => (
              index % 2 === 0 ? (
                <IonRow key={index} class="ion-justify-content-center">
                  <IonCol size="5">
                    <IonButton
                      expand="full"
                      color={activeAllergies.includes(allergy) ? "secondary" : "light"}
                      onClick={() => toggleAllergy(allergy)}
                      >{allergy}</IonButton>
                  </IonCol>
                  {allergyOptions[index + 1] && (
                    <IonCol size="5">
                      <IonButton
                        expand="full"
                        color={activeAllergies.includes(allergyOptions[index + 1]) ? "secondary" : "light"}
                        onClick={() => toggleAllergy(allergyOptions[index + 1])}
                        > {allergyOptions[index + 1]} </IonButton>
                    </IonCol>
                  )}
                  </IonRow>) : null
                  
              ))}
              <IonCol size="5">
                <IonRow class="ion-justify-content-center" onClick={handleUpdateProfile}>
                  <IonButton>
                    Update Profile
                  </IonButton>
                </IonRow>
              </IonCol>
            </IonGrid>

            {/* Confirmation Card */}
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
          </IonContent>
        </IonPage>
    );
}; 

export default MyProfile;