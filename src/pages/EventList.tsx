import {IonCard, IonCardSubtitle, IonCardTitle, IonCardContent, IonCardHeader, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonMenuButton, IonPage, IonRouterLink, IonTitle, IonToolbar, IonContent } from '@ionic/react';
import React from 'react';
import './EventList.css';
import { add } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';

const EventList: React.FC = () => {
    
    interface CardDetails {
        title: string;
        subtitle: string;
        content: string;
    }
    interface LocationState {
        cardDetails: CardDetails;
    }

    const location = useLocation<LocationState>();
    const cardDetails = location.state?.cardDetails;

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

            <IonContent>
                {cardDetails ? (
                    <div>
                        <p>Title: {cardDetails.title}</p>
                        <p>Subtitle: {cardDetails.subtitle}</p>
                        <p>Content: {cardDetails.content}</p>
                    </div>
                ) : (
                    <p>No event details provided.</p>
                )}
            </IonContent>

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
