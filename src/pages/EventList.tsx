import { IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonMenuButton, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './EventList.css';
import { add } from 'ionicons/icons';

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
                <IonRouterLink routerLink="/pages/EventCreation">
                    <IonFabButton className="add-event">
                        <IonIcon icon={add} color="white" aria-label="add event" />
                    </IonFabButton>
                </IonRouterLink>
            </IonFab>
        </IonPage>
    );
}

export default EventList;
