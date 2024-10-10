import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonLabel, IonListHeader, IonCardTitle, IonCheckbox } from '@ionic/react';
import { useParams } from 'react-router';
import './MyProfile.css'

const MyProfile: React.FC = () => {
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
          <IonList>
              <IonListHeader>
                <IonLabel>My General Profile</IonLabel>
              </IonListHeader>
            <IonList>
              <IonItem>
                <IonInput label="Name" placeholder="Enter text"></IonInput>
              </IonItem>

              <IonItem>
                <IonInput label="Year" placeholder="Enter Year"></IonInput>
              </IonItem>

              <IonItem>
                <IonInput label="Email input" type="email" placeholder="email@domain.com"></IonInput>
              </IonItem>
              </IonList>
          </IonList>


          <IonList>
          <IonListHeader>
                <IonLabel>Allergies</IonLabel>
            </IonListHeader>
            <IonList>
              <IonItem>
                <IonCheckbox justify="start">Dairy</IonCheckbox>
                <IonCheckbox justify="start">Egg</IonCheckbox>
              </IonItem>
              <IonItem>
                <IonCheckbox justify="start">Fish</IonCheckbox>
                <IonCheckbox justify="start">Peanuts</IonCheckbox>
              </IonItem>
              <IonItem>
                <IonCheckbox justify="start">Sesame</IonCheckbox>
                <IonCheckbox justify="start">Shellfish</IonCheckbox>
              </IonItem>
              <IonItem>
                <IonCheckbox justify="start">Soy</IonCheckbox>
                <IonCheckbox justify="start">Tree Nuts</IonCheckbox>
              </IonItem>
              <IonItem>
                <IonCheckbox justify="start">Wheat</IonCheckbox>
              </IonItem>
            </IonList>
          </IonList>
          
          </IonContent>
        </IonPage>
    );
}; 

export default MyProfile;