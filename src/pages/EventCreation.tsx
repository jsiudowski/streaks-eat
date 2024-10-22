import React, { useState } from 'react';
import { IonButtons, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonGrid, IonIcon, IonHeader, IonMenuButton, IonPage, IonFab, IonFabButton, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonLabel, IonListHeader, IonCardTitle, IonCheckbox, IonSelectOption, IonSelect } from '@ionic/react';
import { add } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

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
    'Gluten'
  ];


  // Handle checkbox selection
  const handleAllergyChange = (allergy: string) => {
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
        <IonList>
          <IonListHeader>
            <IonLabel class="center"><h1>Location</h1></IonLabel>
          </IonListHeader>
          <IonList>
          <IonItem>
              <IonInput
                placeholder="What is the name of your event?"
                value={EventName}
                onIonInput={e => setEventName((e.target as unknown as HTMLInputElement).value)}
              />
            </IonItem>
            <IonSelect placeholder="Building" value={building} onIonChange={e => setBuilding(e.detail.value!)}>
              <IonSelectOption value="Apple">Apple</IonSelectOption>
              <IonSelectOption value="Banana">Banana</IonSelectOption>
              <IonSelectOption value="Orange">Orange</IonSelectOption>
            </IonSelect>
            <IonSelect placeholder="Room Number" value={roomNumber} onIonChange={e => setRoomNumber(e.detail.value!)}>
              <IonSelectOption value="101">101</IonSelectOption>
              <IonSelectOption value="102">102</IonSelectOption>
              <IonSelectOption value="103">103</IonSelectOption>
            </IonSelect>


           {/* Allergy Checkboxes */}
           <IonList>
              <IonListHeader>
                <IonLabel class="center"><h1>Allergies Checklist:</h1></IonLabel>
              </IonListHeader>
              <IonList>
                {allergyOptions.map((allergy) => (
                  <IonItem key={allergy}>
                    <IonCheckbox
                      checked={allergies.includes(allergy)}
                      onIonChange={() => handleAllergyChange(allergy)}
                    /> {allergy}
                  </IonItem>
                ))}
              </IonList>
            </IonList>
          </IonList>
        </IonList>
        
        <IonFab slot="fixed" horizontal="end" vertical="bottom">
          <IonFabButton className="addEventCard" onClick={addEventCard}>
            <IonIcon icon={add} color="white" aria-label="Create Event" />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default EventCreation;