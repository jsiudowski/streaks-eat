import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonHeader, IonIcon, IonLabel, IonModal, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import './EventDetails.css';
import { useState, useEffect } from 'react';
import { updateEvent } from '../firebaseConfig'; 

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

const formatDate = (timestamp: { seconds?: number; nanoseconds?: number } | undefined) => {
    if (!timestamp || typeof timestamp.seconds !== 'number') {
        return 'Unknown Date';
    }
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
};

const EventDetails: React.FC = () => {
    const location = useLocation<LocationState>();
    const history = useHistory();
    const { event } = location.state || {};
    const [isLoading, setIsLoading] = useState(true);
    const [foodDescription, setFoodDescription] = useState<string>(event?.FoodDescription || '');
    const [showModal, setShowModal] = useState(false); // State for modal visibility

    useEffect(() => {
        if (event) {
            setIsLoading(false);
            setFoodDescription(event.FoodDescription);
        }
    }, [event]);

    // Warning confirmation card upon clicking no food button 
    const handleNoFoodClick = () => {
        setShowModal(true); // Show confirmation modal
    };

    const handleConfirm = async () => {
        setFoodDescription('No Food');
        if (event?.id) {
            await updateEvent(event.id, { FoodDescription: 'No Food' }); // Updates database
            history.push('/pages/EventList', { refresh: true }); // Trigger refresh on the Event List
        }
        setShowModal(false); // Close modal after confirmation
    };

    const handleCancel = () => {
        setShowModal(false); // Close modal without doing anything
    };

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
                <div className="grid-container">
                    <div className="grid-item"><strong>Food Items:</strong></div>
                    <div className="grid-item">{foodDescription}</div>
                    <div className="grid-item"><strong>Room:</strong></div>
                    <div className="grid-item">{event.RoomNumber}</div>
                    <div className="grid-item"><strong>Allergens:</strong></div>
                    <div className="grid-item">{event.Allergens.map((id: number) => event.AllergenMap[id] || id).join(', ')}</div>
                    <div className="grid-item"><strong>Created On:</strong></div>
                    <div className="grid-item">{formatDate(event.TimeCreated)}</div>
                </div>
                {event.ImageURL && (
                    <img src={event.ImageURL} alt="Food" className="event-image" />
                )}
                <IonButton onClick={handleNoFoodClick} color="warning">No Food</IonButton>

                {/* Confirmation Modal For "No Food" Change */}
                {showModal && (
                    <div className="overlay">
                        <IonCard className="confirmation-card">
                            <IonCardHeader>
                                <IonCardTitle>Confirm Update</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p>Are you sure you want to update the Food Listing?</p>
                                <p>This action can not be undone</p>
                                <IonRow className="ion-justify-content-center">
                                    <IonCol size="5">
                                        <IonButton expand="full" onClick={handleConfirm} color="primary">Yes</IonButton>
                                    </IonCol>
                                    <IonCol size="5">
                                        <IonButton expand="full" onClick={handleCancel} color="light">No</IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonCardContent>
                        </IonCard>
                    </div>
                )}
            </IonContent>

            {/* Return to event list button (Displays only if Warning Card is not shown) */}
            {!showModal && ( // Only show the FAB button if the modal is not active
                <IonFab slot="fixed" horizontal="end" vertical="bottom">
                    <IonRouterLink routerLink="/pages/EventList">
                        <IonButton color={'danger'} size="large">Go Back</IonButton>
                    </IonRouterLink>
                </IonFab>
            )}
        </IonPage>
    );
};

export default EventDetails;