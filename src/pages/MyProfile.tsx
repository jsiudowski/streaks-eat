import React, { useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonLabel, IonListHeader, IonCardTitle, IonCheckbox, IonGrid, IonCol, IonRow, IonButton } from '@ionic/react';
import { useParams } from 'react-router';
import './MyProfile.css'

const MyProfile: React.FC = () => {

  const [activeAllergies, setActiveAllergies] = useState<string[]>([]);

    const toggleAllergy = (allergy: string) => {
        setActiveAllergies((prev) => {
            if (prev.includes(allergy)) {
                return prev.filter(item => item !== allergy); // Remove if already active
            } else {
                return [...prev, allergy]; // Add if not active
            }
        });
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
            </IonGrid>
          </IonContent>
        </IonPage>
    );
}; 

export default MyProfile;