import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonHeader, IonIcon, IonLabel, IonModal, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import './EventDetails.css';
import { useState, useEffect } from 'react';

// Structure for our event receieved from the previous location state
interface LocationState {
    event: {
        id: string;
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

// Format Date Helper Method
const formatDate = (timestamp: { seconds?: number; nanoseconds?: number } | undefined) => {
    if (!timestamp || typeof timestamp.seconds !== 'number') {
        return 'Unknown Date';
    }
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
};

//Sets up the Event Details page with the correctly sent Event object
const EventDetails: React.FC = () => {
    const location = useLocation<LocationState>();
    const { event } = location.state || {};
    const [isLoading, setIsLoading] = useState(true);

    // If the event is there, turn off the loading
    useEffect(() => {
        if (event) {
            setIsLoading(false);
        }
    }, [event]);

    // If the page is still loading, display that to the user.
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

    // If there is no event currently provided, display that to the user.
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

    // If there is an event provided, display the correct information to the user.
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Event Name: {event.EventName}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="page-content">
                <div className="grid-container">
                    <div className="grid-item"><strong>Food Items:</strong></div>
                    <div className="grid-item">{event.FoodDescription}</div>
                    <div className="grid-item"><strong>Location:</strong></div>
                    <div className="grid-item">{event.Building}</div>
                    <div className="grid-item"><strong>Room:</strong></div>
                    <div className="grid-item">{event.RoomNumber}</div>
                    <div className="grid-item"><strong>Allergens:</strong></div>
                    <div className="grid-item">{event.Allergens.map(id => event.AllergenMap[id] || id).join(', ')}</div>
                    <div className="grid-item"><strong>Created On:</strong></div>
                    <div className="grid-item">{formatDate(event.TimeCreated)}</div>
                </div>
                {event.ImageURL && (
                    <img src={event.ImageURL} alt="Food" className="event-image" />
                )}
            </IonContent>
            <IonFab slot="fixed" horizontal="end" vertical="bottom">
                <IonRouterLink routerLink="/pages/EventList">
                    <IonButton color="danger" size="large">Go Back</IonButton>
                </IonRouterLink>
            </IonFab>
        </IonPage>
    );
};

export default EventDetails;