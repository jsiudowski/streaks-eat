import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonProgressBar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { useParams } from 'react-router';
import './Map.css'

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
        <ol>
          <li>Boler College of Business</li>
          <li>Carroll Gate</li>
          <li>
            Dolan Center for Science & Technology
          </li>
          <li>
            Grasselli Library
          </li>
          <li>Lombardo Student Center - Bookstore</li>
          <li>Military Science ROTC</li>
          <li>O’Malley Center</li>
          <li>Rodman Hall - Office of Admission</li>
          <li>Schott Dining Hall</li>
          <li>St. Francis Chapel</li>
          <li>St. Ignatius Hall - Saxby’s Coffee Shop</li>
        </ol>

        <h2>RESIDENCE HALLS</h2>
        <ol start="12">
          <li>Bernet Hall</li>
          <li>Campion Hall</li>
          <li>Dolan Hall - University Counseling Center</li>
          <li>Hamlin Hall</li>
          <li>
            Millor Hall
          </li>
          <li>Murphy Hall - Student Health Center</li>
          <li>
            Pacelli Hall 
          </li>
          <li>Sutowski Hall</li>
        </ol>

        <h2>ATHLETIC FACILITIES</h2>
        <ol start="20">
          <li>DeCarlo Varsity Center</li>
          <li>
            Athletic, Event & Wellness Center
          </li>
          <li>Johnson Natatorium</li>
          <li>
            Recreation Complex
          </li>
          <li>Short Family Tennis Center</li>
          <li>Shula Stadium</li>
        </ol>
      </IonContent>
    </IonPage>
  );
};

export default Map;