import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonLoading } from '@ionic/react';
import { getEvents } from '../firebaseConfig'; // Adjust the import path as needed

const EventList: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsData = await getEvents();
                setEvents(eventsData);
            } catch (err) {
                setError('Failed to load events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

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
                    <IonTitle>Event List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {events.map((event, index) => (
                        <IonItem key={index}>
                            <IonLabel>
                                <h2>{event.Building}</h2>
                                <p>{event.RoomNumber}</p>
                                <p>{event.Allergens}</p>
                                <p>{event.FoodDescription}</p>
                                <p>{event.TimeCreated}</p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default EventList;
