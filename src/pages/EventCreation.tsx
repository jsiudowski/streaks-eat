import React from 'react';
import {IonButtons, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonGrid, IonIcon, IonHeader, IonMenuButton, IonPage, IonFab, IonFabButton, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonLabel, IonListHeader, IonCardTitle, IonCheckbox, IonSelectOption, IonSelect, IonRouterLink } from '@ionic/react';
import { useParams } from 'react-router';
import { add } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const EventCreation: React.FC = () => {

    function addEventCard(){
        const history = useHistory();
        const cardDetails = {
            title: "Card Title",
            subtitle: "Card Subtitle",
            content: "Here's a small text description for the card content. Nothing more, nothing less."
        };
        history.push({
            pathname: '/pages/EventList',
            state: { cardDetails }
        });
    }

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
                    <IonLabel class="center"><h1>Location</h1></IonLabel>
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
                        <IonLabel class="center"><h1>Allergies Checklist:</h1></IonLabel>
                    </IonListHeader>
                    <IonList>
                            <IonItem>
                                <IonCheckbox alignment="start" class="checkbox-flex" justify='start'>Dairy</IonCheckbox>
                                <IonCheckbox alignment="start" class="checkbox-flex" justify='start'>Egg</IonCheckbox>
                            </IonItem>
                            <IonItem>
                                <IonCheckbox class="checkbox-flex" justify='start'>Fish</IonCheckbox>
                                <IonCheckbox class="checkbox-flex" justify='start'>Peanuts</IonCheckbox>
                            </IonItem>
                            <IonItem>
                                <IonCheckbox class="checkbox-flex" justify='start'>Sesame</IonCheckbox>
                                <IonCheckbox class="checkbox-flex" justify='start'>Shellfish</IonCheckbox>
                            </IonItem>
                            <IonItem>
                                <IonCheckbox class="checkbox-flex" justify='start'>Soy</IonCheckbox>
                                <IonCheckbox class="checkbox-flex" justify='start'>Tree Nuts</IonCheckbox>
                            </IonItem>
                            <IonItem>
                                <IonCheckbox class="checkbox-flex" justify='start'>Wheat</IonCheckbox>
                            </IonItem>
                        
                    </IonList>
                    </IonList>
                </IonList>
            </IonList>
            
            <IonFab slot="fixed" horizontal="end" vertical="bottom">
                <IonRouterLink routerLink="/pages/EventList" onClick={addEventCard}>
                   <IonFabButton className="addEventCard">
                      <IonIcon icon={add} color="white" aria-label="Create Event" />
                  </IonFabButton>
               </IonRouterLink>
            </IonFab>
        </IonContent>
    </IonPage>   
   );

}; 

export default EventCreation;