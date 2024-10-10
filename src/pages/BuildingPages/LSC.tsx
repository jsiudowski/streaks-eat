
import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonProgressBar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { useParams } from 'react-router';
import './LSC.css'

const LSC: React.FC = () => {

    const { name } = useParams<{ name: string; }>();

    return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Lombardo Student Center</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Lombardo Student Center</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonCard>
            <IonCardHeader>
                <IonCardTitle>Welcome to Food Finder!</IonCardTitle>
                <IonCardSubtitle>Developed by Abedelhadi Tawil, Jon Siudowski, Alyssa Augustein, and Gavin Weiser.</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>This app will strive to reduce food waste and decrease food insecurity, through the use of a mobile event calendar with real-time notifications.</IonCardContent>
            </IonCard>
        </IonContent>
      </IonPage>
    );
};

export default LSC;
