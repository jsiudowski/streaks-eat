import React, { useState } from 'react';
import { IonButtons, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonGrid, IonIcon, IonHeader, IonMenuButton, IonPage, IonFab, IonFabButton, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonLabel, IonListHeader, IonCardTitle, IonCheckbox, IonSelectOption, IonSelect, IonRow, IonCol, IonButton } from '@ionic/react';
import { add, addSharp } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './EventCreation.css'

const EventCreation: React.FC = () => {
  const history = useHistory();

  // State to capture user input
  const [building, setBuilding] = useState<string>('');
  const [roomNumber, setRoomNumber] = useState<string>('');
  const [EventName, setEventName] = useState<string>('');
  const [allergies, setAllergies] = useState<string[]>([]);

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

  // Handle button selection
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
            <IonLabel class="center"><h1>Event Name:</h1></IonLabel>
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

          <IonListHeader>
            <IonLabel class="center"><h1>Event Locations:</h1></IonLabel>
          </IonListHeader>
          <IonListHeader>
            <IonLabel class="center"><p>Please Set Building & Room Number !</p></IonLabel>
          </IonListHeader>

          <IonGrid>
            <IonRow class="ion-justify-content-center">
              <IonCol size="5">
                <IonSelect label="Building" labelPlacement="floating" placeholder="Building" value={building} onIonChange={e => setBuilding(e.detail.value!)}>
                  <IonSelectOption value="Apple">Apple</IonSelectOption>
                  <IonSelectOption value="Banana">Banana</IonSelectOption>
                  <IonSelectOption value="Orange">Orange</IonSelectOption>
                </IonSelect>
              </IonCol>
              <IonCol size="5">
                <IonSelect label="Room Number" labelPlacement="floating" placeholder="Room Number" value={roomNumber} onIonChange={e => setRoomNumber(e.detail.value!)}>
                  <IonSelectOption value="101">101</IonSelectOption>
                  <IonSelectOption value="102">102</IonSelectOption>
                  <IonSelectOption value="103">103</IonSelectOption>
                </IonSelect>
              </IonCol>
            </IonRow>
          </IonGrid>

           {/* Allergy Checkboxes */}
              <IonListHeader>
                <IonLabel class="center"><h1>Allergies Checklist:</h1></IonLabel>
              </IonListHeader>

              {/*  Actual Grid Format For "2-Col-Per-Row"  */}
              <IonGrid>
                {allergyOptions.map((allergy, index) => (
                  index % 2 == 0 ? (
                <IonRow key={index} class="ion-justify-content-center">
                  <IonCol size="5">
                    <IonButton
                      expand="full"
                      color={allergies.includes(allergy) ? "secondary" : "light"}
                      onClick={() => toggleAllergy(allergy)}
                      > {allergy} </IonButton>
                  </IonCol>

                  {allergyOptions[index + 1] && (
                  <IonCol size="5">
                    <IonButton
                      expand="full"
                      color={allergies.includes(allergyOptions[index + 1]) ? "secondary" : "light"}
                      onClick={() => toggleAllergy(allergyOptions[index + 1])}
                      > {allergyOptions[index + 1]} </IonButton>
                  </IonCol>
                )}
              </IonRow>
            ) : null
          ))}
        </IonGrid>

          {/*   Button For Event Creation   */}
        <IonFab slot="fixed" horizontal="end" vertical="bottom">
          <IonButton size="large" className="createEventButton" onClick={addEventCard}>
            <span className="icon-circle"><IonIcon icon={addSharp}/> </span> Create Event
          </IonButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default EventCreation;