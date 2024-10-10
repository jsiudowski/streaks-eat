import React from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonItem,
  IonList,
} from '@ionic/react';
import './Map.css';

const Map: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Map of John Carroll</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Image Section */}
        <IonCard className="ion-card-responsive img">
          <img src="src/pages/Photos/JCUMAP.png" alt="Map of John Carroll" />
        </IonCard>

        {/* Numbered List Section */}
        <h2>ACADEMIC & SERVICE BUILDINGS</h2>
        <IonList>
          <IonItem>1. Boler College of Business</IonItem>
          <IonItem>2. Carroll Gate</IonItem>
          <IonItem>3. Dolan Center for Science & Technology</IonItem>
          <IonItem>4. Grasselli Library</IonItem>
          <IonItem>5. Lombardo Student Center - Bookstore</IonItem>
          <IonItem>6. Military Science ROTC</IonItem>
          <IonItem>7. O’Malley Center</IonItem>
          <IonItem>8. Rodman Hall - Office of Admission</IonItem>
          <IonItem>9. Schott Dining Hall</IonItem>
          <IonItem>10. St. Francis Chapel</IonItem>
          <IonItem>11. St. Ignatius Hall - Saxby’s Coffee Shop</IonItem>
        </IonList>

        <h2>RESIDENCE HALLS</h2>
        <IonList>
          <IonItem>12.Bernet Hall</IonItem>
          <IonItem>13. Campion Hall</IonItem>
          <IonItem>14. Dolan Hall - University Counseling Center</IonItem>
          <IonItem>15. Hamlin Hall</IonItem>
          <IonItem>16. Millor Hall</IonItem>
          <IonItem>17. Murphy Hall - Student Health Center</IonItem>
          <IonItem>18. Pacelli Hall</IonItem>
          <IonItem>19. Sutowski Hall</IonItem>
        </IonList>

        <h2>ATHLETIC FACILITIES</h2>
        <IonList>
          <IonItem>20. DeCarlo Varsity Center</IonItem>
          <IonItem>21. Athletic, Event & Wellness Center</IonItem>
          <IonItem>22. Johnson Natatorium</IonItem>
          <IonItem>23. Recreation Complex</IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Map;
