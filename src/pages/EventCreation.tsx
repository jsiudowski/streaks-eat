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
  IonGrid,
} from '@ionic/react';
import { addSharp } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { addEvents } from '../firebaseConfig'; // Import Firestore configuration
import './EventCreation.css';
import Buildings from '../Data/RoomsEdited.json';

// Define the type for the structure of the JSON data
type BuildingsData = {
    [buildingName: string]: string[] | null; // Maps each building name to an array of room names or null
  };
  

const EventCreation: React.FC = () => {
  const history = useHistory();

  // State to capture user input
  const [building, setBuilding] = useState<string>('');
  const [roomNumber, setRoomNumber] = useState<string>('');
  const [eventName, setEventName] = useState<string>('');
  const [allergens, setAllergens] = useState<number[]>([]); // Keep the allergens as a number array
  const[foodItems, setFoodItems]= useState<string>('');

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

  // Use type assertion to tell TypeScript the shape of the data
  const buildingsData = Buildings as BuildingsData; // Explicitly cast the imported JSON to BuildingsData type

  const handleBuildingChange = (e: any) => {
    setBuilding(e.detail.value);
    setRoomNumber(''); // Reset room when the building changes
  };

  const handleRoomChange = (e: any) => {
    setRoomNumber(e.detail.value);
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

        {/* Building Select Dropdown */}
        <IonListHeader>
          <IonLabel className="Rooms"><h1>Location</h1></IonLabel>
        </IonListHeader>
        <IonItem>
          <IonSelect
            justify="start"
            placeholder="Building"
            value={building}
            onIonChange={handleBuildingChange}
          >
            {/* Dynamically create IonSelectOption for each building */}
            {Object.keys(buildingsData).map((buildingName, index) => (
              <IonSelectOption key={index} value={buildingName}>
                {buildingName}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        {/* Room Select Dropdown, shown only if a building is selected */}
        {building && buildingsData[building] && (
          <IonItem>
            <IonSelect
              justify="start"
              placeholder="Room Number"
              value={roomNumber}
              onIonChange={handleRoomChange}
            >
              {/* Dynamically create IonSelectOption for rooms in the selected building */}
              {buildingsData[building]?.map((room, roomIndex) => (
                <IonSelectOption key={roomIndex} value={room}>
                  {room}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        )}

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