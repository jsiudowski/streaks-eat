import { IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonMenuButton, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './EventList.css';

const EventList: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>List of Events</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonFab slot="fixed" horizontal="end" vertical="bottom">
          <IonRouterLink href='/pages/EventCreation' routerLink="/pages/EventCreation">
           <IonFabButton className="add event">
              <IonFabButton>
                <IonIcon name="add-outline" color="white" aria-label="add event"></IonIcon>
              </IonFabButton>
            </IonFabButton>
           </IonRouterLink>
        </IonFab>
        </IonPage>
    );
}

export default EventList;