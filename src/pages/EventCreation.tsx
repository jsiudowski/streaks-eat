import React, { useState } from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonFab,
  IonButton,
  IonTitle,
  IonToolbar,
  IonListHeader,
  IonItem,
  IonInput,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonRow,
  IonCol,
  IonIcon,
} from '@ionic/react';
import { addSharp } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { addEvents } from '../firebaseConfig'; // Import Firestore configuration
import './EventCreation.css';

const EventCreation: React.FC = () => {
  const history = useHistory();

  // State to capture user input
  const [building, setBuilding] = useState<string>('');
  const [roomNumber, setRoomNumber] = useState<string>('');
  const [eventName, setEventName] = useState<string>('');
  const [allergens, setAllergens] = useState<number[]>([]); // Keep the allergens as a number array

  const allergyOptions = [
    'Dairy',
    'Egg',
    'Fish',
    'Peanuts',
    'Sesame',
    'Shellfish',
    'Soy',
    'Tree Nuts',
    'Wheat',
    'Gluten',
    'Other',
  ];

  // Handle button selection
  const toggleAllergy = (allergyIndex: number) => {
    setAllergens((prev) => {
      if (prev.includes(allergyIndex)) {
        return prev.filter((item) => item !== allergyIndex);
      } else {
        return [...prev, allergyIndex];
      }
    });
  };

  // Function to add a new event card and send data to Firebase
  const addEventCard = async () => {
    // Prepare the event data to send to Firebase
    const newEvent = {
      Building: building,
      RoomNumber: roomNumber,
      FoodDescription: eventName,
      Allergens: allergens, // Maintain the allergens as a number array
      TimeCreated: new Date(),
    };

    try {
      // Call the addEvents function to add the event to Firebase
      const success = await addEvents(newEvent);

      if (success) {
        // Clear all inputs upon successful submission
        setBuilding('');
        setRoomNumber('');
        setEventName('');
        setAllergens([]); // Reset allergens array
        // After the event is created, navigate back with refresh state
        history.push('/pages/EventList', { refresh: true });
      }
    } catch (error) {
      console.error('Error adding event to Firebase:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Create an Event</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {/* Event Name Input */}
        <IonListHeader>
          <IonLabel className="center">
            <h1>Event Name:</h1>
          </IonLabel>
        </IonListHeader>
        <IonItem>
          <IonInput
            label="Event Name"
            labelPlacement="floating"
            placeholder="What is the name of your event?"
            value={eventName}
            onIonInput={(e) => setEventName((e.target as unknown as HTMLInputElement).value)}
          />
        </IonItem>

        {/* Event Locations Input */}
        <IonListHeader>
          <IonLabel className="center">
            <h1>Event Locations:</h1>
          </IonLabel>
        </IonListHeader>
        <IonListHeader>
          <IonLabel className="center">
            <p>Please Set Building & Room Number!</p>
          </IonLabel>
        </IonListHeader>
        <IonRow className="ion-justify-content-center">
          <IonCol size="5">
            <IonSelect
              label="Building"
              labelPlacement="floating"
              placeholder="Building"
              value={building}
              onIonChange={(e) => setBuilding(e.detail.value!)}
            >
              <IonSelectOption value="Apple">Apple</IonSelectOption>
              <IonSelectOption value="Banana">Banana</IonSelectOption>
              <IonSelectOption value="Orange">Orange</IonSelectOption>
            </IonSelect>
          </IonCol>
          <IonCol size="5">
            <IonSelect
              label="Room Number"
              labelPlacement="floating"
              placeholder="Room Number"
              value={roomNumber}
              onIonChange={(e) => setRoomNumber(e.detail.value!)}
            >
              <IonSelectOption value="101">101</IonSelectOption>
              <IonSelectOption value="102">102</IonSelectOption>
              <IonSelectOption value="103">103</IonSelectOption>
            </IonSelect>
          </IonCol>
        </IonRow>

        {/* Allergy Checkboxes */}
        <IonListHeader>
          <IonLabel className="center">
            <h1>Allergies Checklist:</h1>
          </IonLabel>
        </IonListHeader>
        <IonRow className="ion-justify-content-center">
          {allergyOptions.map((allergy, index) => (
            <IonCol size="5" key={index}>
              <IonButton
                expand="full"
                color={allergens.includes(index) ? 'secondary' : 'light'}
                onClick={() => toggleAllergy(index)} // Use index instead of allergy string
              >
                {allergy}
              </IonButton>
            </IonCol>
          ))}
        </IonRow>

        {/* Button For Event Creation */}
        <IonFab slot="fixed" horizontal="end" vertical="bottom">
          <IonButton size="large" className="createEventButton" onClick={addEventCard}>
            <span className="icon-circle">
              <IonIcon icon={addSharp} />
            </span>
            Create Event
          </IonButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default EventCreation;
