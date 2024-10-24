import React, { useEffect, useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonLoading,
    IonRouterLink,
    IonButton,
    IonFab,
    IonIcon,
    IonButtons,
    IonMenuButton
} from '@ionic/react';
import { getEvents } from '../firebaseConfig'; // Adjust the import path as needed
import { addSharp } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { DocumentData } from 'firebase/firestore'; // Import DocumentData from Firestore
import './EventList.css';

// Define a type for the event
interface Event {
    id?: string; // Optional unique ID for each event
    FoodDescription: string;
    Building: string;
    RoomNumber: string;
    Allergens: string[];
    TimeCreated: { seconds: number; nanoseconds?: number };
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

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const eventsData: DocumentData[] = await getEvents(); // Fetch events from Firebase
            // Map the fetched data to match the Event type
            const formattedEvents: Event[] = eventsData.map((doc) => ({
                id: doc.id, // If your document has an ID
                FoodDescription: doc.FoodDescription || '',
                Building: doc.Building || '',
                RoomNumber: doc.RoomNumber || '',
                Allergens: doc.Allergens || [],
                TimeCreated: doc.TimeCreated || { seconds: 0 } // Provide a default value if necessary
            }));
            setEvents(formattedEvents);
        } catch (err) {
            setError('Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    // useEffect to fetch events when component mounts
    useEffect(() => {
        fetchEvents(); // Fetch events initially
    }, []); // Empty dependency array means it runs once when the component mounts

    // useEffect to check for location state and fetch events if refresh is required
    useEffect(() => {
        if (location.state?.refresh) {
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

    const handleCardClick = (event: Event) => {
        history.push({
            pathname: '/pages/EventDetails',
            state: { event } // Pass the entire event object
        });
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
            <IonContent>
                {Object.keys(groupedEvents).map((building, index) => (
                    <div key={index}>
                        <div className="building-name">{building}</div> {/* Style the building name */}
                        <IonList>
                            {groupedEvents[building].map((event: Event, idx: number) => (
                                <IonItem key={event.id || idx} button onClick={() => handleCardClick(event)}>
                                    <IonLabel>
                                        <h3>{event.FoodDescription}</h3>
                                        <p>Room: {event.RoomNumber}</p>
                                        <p>Allergens: {event.Allergens.join(', ')}</p> {/* Display allergens */}
                                        <p>Created On: {formatDate(event.TimeCreated)}</p> {/* Format date if needed */}
                                    </IonLabel>
                                </IonItem>
                            ))}
                        </IonList>
                    </div>
                ))}
            </IonContent>

            <IonFab slot='fixed' horizontal='end' vertical='bottom'>
                <IonRouterLink
                    routerLink='/pages/EventCreation'
                    routerDirection="forward"
                    onClick={() => history.push('/pages/EventCreation', { refresh: true })}
                >
                    <IonButton size="large" className='addEventButton'>
                        <span className='icon-circle'><IonIcon icon={addSharp}></IonIcon></span> Add Event
                    </IonButton>
                </IonRouterLink>
            </IonFab>
        </IonPage>
    );
};

export default EventList;
