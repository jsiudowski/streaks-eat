import { IonButton, IonContent, IonFab, IonHeader, IonIcon, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { addSharp } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';

interface LocationState {
    event?: {
      title: string;
      subtitle: string;
      contentFood: string;
      contentAllergies: string;
    };
  }

  const EventDetails: React.FC = () => {
    const location = useLocation<LocationState>();
    const { event } = location.state || {};
    
    if (!event) {
        return (
          <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Event Details</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <p>No details available for this event.</p>
            </IonContent>
          </IonPage>
        );
      }
    
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{event.title}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <h2>{event.subtitle}</h2>
            <p>{event.contentFood}</p>
            <p>{event.contentAllergies}</p>
          </IonContent>

          <IonFab slot="fixed" horizontal="end" vertical="bottom">
            <IonRouterLink routerLink="/pages/EventList">
                <IonButton color={'danger'} size="large"> go back</IonButton>
            </IonRouterLink>
          </IonFab>
        </IonPage>
      );
    };
export default EventDetails;