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
  IonGrid,
  IonFabButton,
} from '@ionic/react';
import { addSharp, camera } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { addEvents, uploadImage } from '../firebaseConfig'; // Import Firebase
import './EventCreation.css';
import Buildings from '../Data/RoomsEdited.json';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // Import Camera 
import { defineCustomElements } from '@ionic/pwa-elements/loader'; // Custom camera elements

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
  const [image, setImage] = useState<string | undefined>();// State for image functionality for camera

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

  // Function for camera to be allowed to take a picture
  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,    
      source:CameraSource.Prompt
    });

    setImage(image.webPath); // Save the image URI
  };

  defineCustomElements(window);

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
    try {
        const foodPictureUrl = image ? await uploadImage(image) : ''; // Upload the image and get URL

        const newEvent = {
            Building: building,
            EventName: eventName,
            RoomNumber: roomNumber,
            FoodDescription: foodItems,
            Allergens: allergens,
            TimeCreated: new Date(),
            ImageURL: foodPictureUrl // Use the uploaded image URL
        };

        const success = await addEvents(newEvent);

        if (success) {
            // Reset the form
            setBuilding('');
            setRoomNumber('');
            setEventName('');
            setAllergens([]);
            setFoodItems('');
            setImage(undefined); // Reset image
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
      <IonRow class="ion-justify-content-center">
          <IonCol size="10">
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
          </IonCol>
        </IonRow>

        <IonListHeader>
          <IonLabel className="center"><h1>Location:</h1></IonLabel>
        </IonListHeader>

        {/* Button to open the custom building selection modal */}
        <IonRow class="ion-justify-content-center">
          <IonCol size="10">
          <IonItem button onClick={() => setIsBuildingModalOpen(true)}>
            <IonLabel>
              {building || 'Select Building'}
            </IonLabel>
          </IonItem>
          </IonCol>
        </IonRow>

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
          <IonRow class="ion-justify-content-center">
            <IonCol size="10">
            <IonItem button onClick={() => setIsRoomModalOpen(true)}>
              <IonLabel>
                {roomNumber || 'Select Room Number'}
              </IonLabel>
            </IonItem>
            </IonCol>
          </IonRow>
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

        {/* Food Items */}
        <IonGrid>
          <IonListHeader>
            <IonLabel className="center"><h1>Food Present:</h1></IonLabel>
          </IonListHeader>
          <IonRow class="ion-justify-content-center">
            <IonCol size="10">
              <IonInput 
                  label="Food Items" labelPlacement="floating"
                  placeholder="List all items at your event:"
                  value={foodItems}
                  onIonInput={e => setFoodItems((e.target as unknown as HTMLInputElement).value)}
                />
              </IonCol>
            </IonRow>
        </IonGrid>

        {/* Provide picture for food */}
        <IonListHeader>
            <IonLabel className="center"><h2>Insert Photo of Food:</h2></IonLabel>
        </IonListHeader>
        <IonContent className="custom-content">
          <IonFab class="fab-container" vertical="top" horizontal="end" slot="fixed">
              <IonFabButton onClick={takePicture}>
                <IonIcon icon={camera} />
              </IonFabButton>
          </IonFab>
          {image && <img src={image} alt="Captured" />}
        </IonContent>

        {/* Provide the checklist for allergies */}
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
