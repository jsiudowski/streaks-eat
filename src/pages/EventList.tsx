import { IonCard, IonCardSubtitle, IonCardTitle, IonCardContent, IonCardHeader, IonButtons, IonFab, IonFabButton, IonHeader, IonIcon, IonMenuButton, IonPage, IonRouterLink, IonTitle, IonToolbar, IonContent } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './EventList.css';
import { add } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';

interface CardDetails {
  title: string;
  subtitle: string;
  content: string;
}

const EventList: React.FC = () => {
  const location = useLocation<{ cardDetails?: CardDetails }>();
  const [events, setEvents] = useState<CardDetails[]>([]);

  // When the page is loaded, check if there is new event data from location.state
  useEffect(() => {
    const newCardDetails = location.state?.cardDetails;
  
    if (newCardDetails) {
      setEvents((prevEvents) => [...prevEvents, newCardDetails]);
    }
  }, [location.state]);
  

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
        {events.length > 0 ? (
          events.map((event, index) => (
            <IonCard key={index}>
              <IonCardHeader>
                <IonCardSubtitle>{event.subtitle}</IonCardSubtitle>
                 <IonCardTitle>{event.title}</IonCardTitle>
              </IonCardHeader>
            <IonCardContent>{event.content}</IonCardContent>

            </IonCard>
          ))
        ) : (
          <p>No events to display.</p>
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
};

export default EventList;
