import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonLoading, IonMenuButton, IonPage, IonRouterLink, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { DocumentData } from 'firebase/firestore'; // Import DocumentData from Firestore
import { addSharp } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getAllergens, getEvents } from '../firebaseConfig'; // Adjust the import path as needed
import "./EventList.css";

// Define a type for the event
interface Event {
    id?: string; // Optional unique ID for each event
    EventName: string; // Add EventName type
    FoodDescription: string;
    Building: string;
    RoomNumber: string;
    Allergens: number[];
    TimeCreated: { seconds: number; nanoseconds?: number };
    ImageURL: string;
}

// Define a type for the location state
interface LocationState {
    refresh?: boolean; // Indicate if we should refresh the events
}

const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation<LocationState>();
    const history = useHistory();
    const [allergenMap, setAllergenMap] = useState<Record<number, string>>({});
    const [showWarning, setShowWarning] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const fetchAllergens = async () => {
        try {
            const allergensData = await getAllergens(); // Ensure this function fetches data correctly
            const map: Record<number, string> = {};
            allergensData.forEach((allergen: any) => {
                map[allergen.id] = allergen.description; // Ensure this matches your allergen structure
            });
            setAllergenMap(map);
            console.log('Allergen Map:', allergenMap);
        } catch (err) {
            console.error('Failed to load allergens', err);
        }
    };

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const eventsData: DocumentData[] = await getEvents(); // Fetch events from Firebase
            // Map the fetched data to match the Event type
            const formattedEvents: Event[] = eventsData.map((doc) => ({
                id: doc.id, // If your document has an ID
                EventName: doc.EventName || 'Unnamed Event', // Fetch EventName from data
                FoodDescription: doc.FoodDescription || '',
                Building: doc.Building || '',
                RoomNumber: doc.RoomNumber || '',
                FoodPicture: doc.FoodPicture || '',
                Allergens: doc.Allergens || [],
                TimeCreated: doc.TimeCreated || { seconds: 0 }, // Provide a default value if necessary
                ImageURL: doc.ImageURL || ''
            }));
            formattedEvents.sort((a, b) => {
                return (b.TimeCreated.seconds - a.TimeCreated.seconds); // Sort in descending order
            });
            setEvents(formattedEvents);
        } catch (err) {
            setError('Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    // useEffect to fetch events when component mounts
    useEffect(() => {
        fetchAllergens(); // Fetch allergens initially
        if (!events.length) {
            fetchEvents();
        }
    }, []); // Empty dependency array means it runs once when the component mounts

    // useEffect to check for location state and fetch events if refresh is required
    useEffect(() => {
        if (location.state?.refresh) {
            fetchAllergens(); // Fetch allergens initially
            fetchEvents(); // Fetch events if coming from EventCreation with refresh state
            history.replace({ ...location, state: {} }); // Clear the refresh state to prevent repeated fetching
        }
    }, [location.state?.refresh]); // Only run if refresh changes

    const formatDate = (timestamp: { seconds?: number, nanoseconds?: number } | undefined) => {
        if (!timestamp || typeof timestamp.seconds !== 'number') {
            return 'Unknown Date'; // Handle cases where timestamp is undefined or malformed
        }
        const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
        return date.toLocaleString(); // Format the date to a human-readable string
    };

    //*Upon clicking a card, displays warning to proceed if event contains allergy listed as "other"
    const handleCardClick = (event: Event) => {
        const hasOtherAllergen = event.Allergens.includes(10);
        
        if (hasOtherAllergen) {
            setSelectedEvent(event); // Store the selected event for later use
            setShowWarning(true); // Show the warning modal
        } else {
            navigateToEventDetails(event); // Navigate directly if no caution is needed
        }
    };
    // navigates to event details pages if proceeding is true 
    const navigateToEventDetails = (event: Event) => {
        const eventDetails = {     
            EventName: event.EventName || 'Unnamed Event',
            FoodDescription: event.FoodDescription || 'No Description Available',
            Building: event.Building || 'Unknown Building',
            RoomNumber: event.RoomNumber || 'Unknown Room',
            Allergens: event.Allergens || 'No Allergens Reported',
            TimeCreated: event.TimeCreated,
            ImageURL: event.ImageURL || '',
            AllergenMap: allergenMap || ''
        };
    
        history.replace({
            pathname: '/pages/EventDetails',
            state: { event: eventDetails } // Only pass eventDetails
        });
    };

    const handleConfirm = () => {
        if (selectedEvent) {
            navigateToEventDetails(selectedEvent);
        }
        setShowWarning(false);
    };

    const handleCancel = () => {
        setShowWarning(false);
    };

    // Group events by building
    const groupedEvents = events.reduce((acc, event) => {
        const building = event.Building || 'Unknown Building';
        if (!acc[building]) {
            acc[building] = [];
        }
        acc[building].push(event);
        return acc;
    }, {} as Record<string, Event[]>);

    if (loading) {
        return (
            <IonLoading isOpen={loading} message={'Loading events...'} />
        );
    }

    if (error) {
        return (
            <IonContent>
                <p>{error}</p>
            </IonContent>
        );
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Event List</IonTitle>
                </IonToolbar>
            </IonHeader>

            {/* List of all events available */}
            <IonContent>
                {Object.keys(groupedEvents).map((building, index) => (
                    <div key={index}>
                        <div className="building-name">{building}</div> {/* Style the building name */}
                        <IonList>
                            {groupedEvents[building].map((event: Event, idx: number) => (
                                <IonItem key={event.id || idx} button onClick={() => handleCardClick(event)}>
                                    <IonLabel>
                                        <h3>{event.EventName ?? 'Unnamed Event'}</h3> {/* Show event name */}
                                        <p>{event.FoodDescription ?? 'No Description Available'}</p>
                                        <p>Room: {event.RoomNumber}</p>
                                        <p>Allergens: {event.Allergens.map((id: number) => allergenMap[id] || id).join(', ')}</p>
                                        <p>Created On: {formatDate(event.TimeCreated)}</p> {/* Format date if needed */}            
                                    </IonLabel>
                                    {event.ImageURL && (
                                        <img src={event.ImageURL} alt="Food" style={{ width: '100px', height: 'auto' }} />
                                    )}
                                </IonItem>
                            ))}
                        </IonList>
                    </div>
                ))}

                {/* Warning card for the event if there is an allergy listed as "other"*/}
                {showWarning && (
                    <div className="overlay">
                        <IonCard className="confirmation-card">
                            <IonCardHeader>
                                <IonCardTitle>Caution!</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p>There's an Allergy Listed as "Other". Discretion advised.</p>
                                <IonRow className="ion-justify-content-center">
                                    <IonCol size="5">
                                        <IonButton expand="full" onClick={handleConfirm} color="primary">Proceed</IonButton>
                                    </IonCol>
                                    <IonCol size="5">
                                        <IonButton expand="full" onClick={handleCancel} color="light">Exit</IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonCardContent>
                        </IonCard>
                    </div>
                )}
            </IonContent>
            
            {/* Event Creation button   (Displays only if Warning Card is not shown) */}
            {!showWarning && (
                <IonFab slot='fixed' horizontal='end' vertical='bottom'>
                    <IonRouterLink
                        routerLink='/pages/EventCreation'
                        routerDirection="forward"
                        onClick={() => history.push('/pages/EventCreation', { refresh: true })}
                    >
                        <IonButton size="default" className='addEventButton'>
                            <span className='icon-circle'><IonIcon icon={addSharp}></IonIcon></span> Add Event
                        </IonButton>
                    </IonRouterLink>
                </IonFab>
            )}
        </IonPage>
    );
};

export default EventList;
