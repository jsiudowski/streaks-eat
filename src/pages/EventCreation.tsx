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
  IonRow,
  IonCol,
  IonIcon,
  IonModal, // Import IonModal
  IonSearchbar, // Import IonSearchbar
  IonList,
} from '@ionic/react';
import { addSharp } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { addEvents } from '../firebaseConfig'; // Import Firestore configuration
import './EventCreation.css';
import Buildings from '../Data/RoomsEdited.json';

//Define the type for the structure of the JSON data
type BuildingsData = {
  [buildingName: string]: string[] | null; // Map each building name to an array 
};

const EventCreation: React.FC = () => {
  const history = useHistory();

  const [building, setBuilding] = useState<string>('');
  const [roomNumber, setRoomNumber] = useState<string>('');
  const [eventName, setEventName] = useState<string>('');
  const [allergens, setAllergens] = useState<number[]>([]); // Keep the allergens as a number array
  const [foodItems, setFoodItems] = useState<string>('');
  const [buildingSearchQuery, setBuildingSearchQuery] = useState<string>(''); // State for building search input
  const [roomSearchQuery, setRoomSearchQuery] = useState<string>(''); // State for room search input
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState<boolean>(false); // State for the building modal
  const [isRoomModalOpen, setIsRoomModalOpen] = useState<boolean>(false); // State for the room modal

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

  const buildingsData = Buildings as BuildingsData;

  // Function to filter buildings based on search query
  const filteredBuildings = Object.keys(buildingsData).filter((buildingName) =>
    buildingName.toLowerCase().includes(buildingSearchQuery.toLowerCase())
  );

  // Function to filter rooms based on search query within the selected building
  const filteredRooms =
    building && buildingsData[building]
      ? buildingsData[building]!.filter((room) =>
          room.toLowerCase().includes(roomSearchQuery.toLowerCase())
        )
      : [];

  const toggleAllergy = (allergyIndex: number) => {
    setAllergens((prev) => {
      if (prev.includes(allergyIndex)) {
        return prev.filter((item) => item !== allergyIndex);
      } else {
        return [...prev, allergyIndex];
      }
    });
  };

  const addEventCard = async () => {
    const newEvent = {
      Building: building,
      RoomNumber: roomNumber,
      FoodDescription: eventName,
      Allergens: allergens, // Maintain the allergens as a number array
      TimeCreated: new Date(),
    };

    try {
      const success = await addEvents(newEvent);

      if (success) {
        setBuilding('');
        setRoomNumber('');
        setEventName('');
        setAllergens([]);
        history.push('/pages/EventList', { refresh: true });
      }
    } catch (error) {
      console.error('Error adding event to Firebase:', error);
    }
  };

  const handleBuildingChange = (selectedBuilding: string) => {
    setBuilding(selectedBuilding);
    setRoomNumber(''); // Reset room when building changes
    setIsBuildingModalOpen(false); // Close the building modal after selection
  };

  const handleRoomChange = (selectedRoom: string) => {
    setRoomNumber(selectedRoom);
    setIsRoomModalOpen(false); // Close the room modal after selection
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

        <IonListHeader>
          <IonLabel className="Rooms"><h1>Location</h1></IonLabel>
        </IonListHeader>

        {/* Button to open the custom building selection modal */}
        <IonItem button onClick={() => setIsBuildingModalOpen(true)}>
          <IonLabel>
            {building || 'Select Building'}
          </IonLabel>
        </IonItem>

        {/* Custom Modal for Building Selection */}
        <IonModal isOpen={isBuildingModalOpen} onDidDismiss={() => setIsBuildingModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Select a Building</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsBuildingModalOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonSearchbar
              value={buildingSearchQuery}
              onIonInput={(e) => setBuildingSearchQuery((e.target as unknown as HTMLInputElement).value)}
              placeholder="Search Buildings"
            />
            <IonList>
              {filteredBuildings.map((buildingName, index) => (
                <IonItem
                  button
                  key={index}
                  onClick={() => handleBuildingChange(buildingName)}
                >
                  {buildingName}
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonModal>

        {/* Button to open the custom room selection modal, only if a building is selected */}
        {building && (
          <IonItem button onClick={() => setIsRoomModalOpen(true)}>
            <IonLabel>
              {roomNumber || 'Select Room Number'}
            </IonLabel>
          </IonItem>
        )}

        {/* Custom Modal for Room Selection */}
        <IonModal isOpen={isRoomModalOpen} onDidDismiss={() => setIsRoomModalOpen(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Select a Room</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsRoomModalOpen(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonSearchbar
              value={roomSearchQuery}
              onIonInput={(e) => setRoomSearchQuery((e.target as unknown as HTMLInputElement).value)}
              placeholder="Search Rooms"
            />
            <IonList>
              {filteredRooms.map((room, roomIndex) => (
                <IonItem
                  button
                  key={roomIndex}
                  onClick={() => handleRoomChange(room)}
                >
                  {room}
                </IonItem>
              ))}
            </IonList>
          </IonContent>
        </IonModal>

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
                onClick={() => toggleAllergy(index)}
              >
                {allergy}
              </IonButton>
            </IonCol>
          ))}
        </IonRow>

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
