import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonLabel, IonListHeader, IonCardTitle, IonCheckbox, IonGrid, IonCol, IonRow } from '@ionic/react';
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
              <IonRow class="ion-justify-content-center">
                <IonCol size="4">
                  <IonItem>
                    <IonCheckbox>Dairy</IonCheckbox>
                  </IonItem>
                </IonCol>
                <IonCol size="4">
                  <IonItem>
                    <IonCheckbox>Egg</IonCheckbox>
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow class="ion-justify-content-center">
                <IonCol size="5">
                  <IonItem>
                    <IonCheckbox>Fish</IonCheckbox>
                  </IonItem>
                </IonCol>
                <IonCol size="5">
                  <IonItem>
                    <IonCheckbox>Peanuts</IonCheckbox>
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow class="ion-justify-content-center">
                <IonCol size="5">
                  <IonItem>
                    <IonCheckbox>Sesame</IonCheckbox>
                  </IonItem>
                </IonCol>
                <IonCol size="5">
                  <IonItem>
                    <IonCheckbox>Shellfish</IonCheckbox>
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow class="ion-justify-content-center">
                <IonCol size="5">
                  <IonItem>
                    <IonCheckbox>Soy</IonCheckbox>
                  </IonItem>
                </IonCol>
                <IonCol size="5">
                  <IonItem>
                    <IonCheckbox>Tree Nuts</IonCheckbox>
                  </IonItem>
                </IonCol>
              </IonRow>

              <IonRow class="ion-justify-content-center">
                <IonCol size="4">
                  <IonItem>
                    <IonCheckbox>Wheat</IonCheckbox>
                  </IonItem>
                </IonCol>
                <IonCol size="4">
                  <IonItem>
                    <IonCheckbox>Gluten</IonCheckbox>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>


          </IonContent>
        </IonPage>
    );
}; 

export default MyProfile;