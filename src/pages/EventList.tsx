import { IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './EventList.css';
import { add } from 'ionicons/icons';
import { getEvents } from '../firebaseConfig';

const EventList: React.FC = () => {
    
    const [busy, setBusy] = useState<boolean>(false)
    var ListOfEvents = new Array<any>
    
    async function GetEvents() {
        setBusy(true)
        const res = await getEvents();
        ListOfEvents = res;
        setBusy(false)
    }

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

            
            <IonList>
                <IonListHeader>
                    <IonLabel>Events Around Campus!</IonLabel>
                </IonListHeader>
                <IonItem *ngFor="#item of product_categories">
                    {{item.name}}
                </IonItem>
            </IonList>

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
