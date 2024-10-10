import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonLabel, IonListHeader, IonCardTitle, IonCheckbox, IonSelectOption, IonSelect } from '@ionic/react';
import { useParams } from 'react-router';

const EventCreation: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Create an Event</IonTitle>
          </IonToolbar>
          </IonHeader>

          <IonContent>
            <IonList>
                <IonListHeader>
                    <IonLabel><h3>Location</h3></IonLabel>
                </IonListHeader>
                <IonList>
                <IonSelect justify='start' placeholder="Building">
                    <IonSelectOption value="apple">Apple</IonSelectOption>
                    <IonSelectOption value="banana">Banana</IonSelectOption>
                    <IonSelectOption value="orange">Orange</IonSelectOption>
                </IonSelect>
                <IonSelect justify='start' placeholder="Room Number">
                    <IonSelectOption value="apple">Apple</IonSelectOption>
                    <IonSelectOption value="banana">Banana</IonSelectOption>
                    <IonSelectOption value="orange">Orange</IonSelectOption>
                </IonSelect>
                <IonItem>
                    <IonInput label="Food Items" placeholder="Enter The Items of Food"></IonInput>
                </IonItem>

                <IonList>
                    <IonListHeader>
                        <IonLabel>Allergies Checklist:</IonLabel>
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
                </IonList>
            </IonList>
          </IonContent>
        </IonPage>
    );
}; 

export default EventCreation;