import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonListHeader, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { addSharp } from 'ionicons/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Buildings from '../Data/RoomsEdited.json';
import './EventCreation.css';

// Define the type for the structure of the JSON data
type BuildingsData = {
  [buildingName: string]: string[] | null; // Maps each building name to an array of room names or null
};

const EventCreation: React.FC = () => {
  const history = useHistory();

  // State to capture user input
  const [building, setBuilding] = useState<string>('');
  const [roomNumber, setRoomNumber] = useState<string>('');
  const [EventName, setEventName] = useState<string>('');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<string | undefined>(undefined);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>(undefined);

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
    'Other'
  ];

  // Handle button selection for allergies
  const toggleAllergy = (allergy: string) => {
    setAllergies((prev) => {
      if (prev.includes(allergy)) {
        return prev.filter((item) => item !== allergy);
      } else {
        return [...prev, allergy];
      }
    });
  };

  // Function to add a new event card
  const addEventCard = () => {
    const cardDetails = {
      title: `Event at ${building} - Room ${roomNumber}`,
      subtitle: `Event Name: ${EventName}`,
      content: `Allergies: ${allergies.join(', ')}`,
    };

    // Navigate to EventList page with state
    history.push({
      pathname: '/pages/EventList',
      state: { cardDetails }
    });

    // Clears all inputs upon click
    setBuilding('');
    setRoomNumber('');
    setEventName('');
    setAllergies([]);
    setSelectedBuilding(undefined);
    setSelectedRoom(undefined);
  };

  // Use type assertion to tell TypeScript the shape of the data
  const buildingsData = Buildings as BuildingsData; // Explicitly cast the imported JSON to BuildingsData type

  const handleBuildingChange = (e: any) => {
    setSelectedBuilding(e.detail.value);
    setSelectedRoom(undefined); // Reset room when the building changes
  };

  const handleRoomChange = (e: any) => {
    setSelectedRoom(e.detail.value);
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
          <IonLabel className="center"><h1>Event Name:</h1></IonLabel>
        </IonListHeader>
        <IonGrid>
          <IonItem>
            <IonInput label="Event Name" labelPlacement="floating"
              placeholder="What is the name of your event?"
              value={EventName}
              onIonInput={e => setEventName((e.target as unknown as HTMLInputElement).value)}
            />
          </IonItem>
        </IonGrid>

        {/* Building Select Dropdown */}
        <IonListHeader>
          <IonLabel className="Rooms"><h1>Location</h1></IonLabel>
        </IonListHeader>
        <IonItem>
          <IonSelect
            justify="start"
            placeholder="Building"
            value={selectedBuilding}
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
        {selectedBuilding && buildingsData[selectedBuilding] && (
          <IonItem>
            <IonSelect
              justify="start"
              placeholder="Room Number"
              value={selectedRoom}
              onIonChange={handleRoomChange}
            >
              {/* Dynamically create IonSelectOption for rooms in the selected building */}
              {buildingsData[selectedBuilding]?.map((room, roomIndex) => (
                <IonSelectOption key={roomIndex} value={room}>
                  {room}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        )}

        {/* Allergy Checkboxes */}
        <IonListHeader>
          <IonLabel className="center"><h1>Allergies Checklist:</h1></IonLabel>
        </IonListHeader>

        {/* Actual Grid Format For "2-Col-Per-Row" */}
        <IonGrid>
          {allergyOptions.map((allergy, index) => (
            index % 2 === 0 ? (
              <IonRow key={index} className="ion-justify-content-center">
                <IonCol size="5">
                  <IonButton
                    expand="full"
                    color={allergies.includes(allergy) ? "secondary" : "light"}
                    onClick={() => toggleAllergy(allergy)}
                  > 
                    {allergy} 
                  </IonButton>
                </IonCol>

                {allergyOptions[index + 1] && (
                  <IonCol size="5">
                    <IonButton
                      expand="full"
                      color={allergies.includes(allergyOptions[index + 1]) ? "secondary" : "light"}
                      onClick={() => toggleAllergy(allergyOptions[index + 1])}
                    > 
                      {allergyOptions[index + 1]} 
                    </IonButton>
                  </IonCol>
                )}
              </IonRow>
            ) : null
          ))}
        </IonGrid>

        {/* Button For Event Creation */}
        <IonFab slot="fixed" horizontal="end" vertical="bottom">
          <IonButton size="large" className="createEventButton" onClick={addEventCard}>
            <span className="icon-circle"><IonIcon icon={addSharp} /> </span> Create Event
          </IonButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default EventCreation;
