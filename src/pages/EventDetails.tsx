import { IonButton, IonContent, IonFab, IonHeader, IonIcon, IonLabel, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import './EventDetails.css';
import { useState, useEffect } from 'react';

// Update the interface for LocationState to match the expected structure
interface LocationState {
    event: {
        EventName: string;
        FoodDescription: string;
        Building: string;
        RoomNumber: string;
        Allergens: number[];
        TimeCreated: { seconds: number; nanoseconds?: number };
        ImageURL: string;
        AllergenMap: Record<number, string>;
    };
}

const formatDate = (timestamp: { seconds?: number, nanoseconds?: number } | undefined) => {
    if (!timestamp || typeof timestamp.seconds !== 'number') {
        return 'Unknown Date'; // Handle cases where timestamp is undefined or malformed
    }
    const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Format the date to a human-readable string
};

const EventDetails: React.FC = () => {
    const location = useLocation<LocationState>();
    const { event } = location.state || {};
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (event) {
            setIsLoading(false);
        }
    }, [event]);

    if (isLoading) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Loading Event Details...</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <p>Loading...</p>
                </IonContent>
            </IonPage>
        );
    }

  if (!event) {
      return (
          <IonPage>
              <IonHeader>
                  <IonToolbar>
                      <IonTitle>Event Details</IonTitle>
                  </IonToolbar>
              </IonHeader>
              <IonContent>
                  <p>No details available for this event.</p>
              </IonContent>
          </IonPage>
      );
  }

  return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Event Name: {event.EventName}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="page-content">
        <IonLabel>
          <p>Food Items: {event.FoodDescription}</p>
          <p>Room: {event.RoomNumber}</p>
          <p>Allergens: {event.Allergens.map((id: number) => event.AllergenMap[id] || id).join(', ')}</p>
          <p>Created On: {formatDate(event.TimeCreated)}</p>
        </IonLabel>
      {event.ImageURL && (
          <img src={event.ImageURL} alt="Food" style={{ width: '100px', height: '100px' }} />
      )}
      </IonContent>

        <IonFab slot="fixed" horizontal="end" vertical="bottom">
            <IonRouterLink routerLink="/pages/EventList">
                <IonButton color={'danger'} size="large">Go Back</IonButton>
            </IonRouterLink>
        </IonFab>
    </IonPage>
);
  }

  

export default EventDetails;
