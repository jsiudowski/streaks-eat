import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonProgressBar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { useParams } from 'react-router';
import './Boler.css'

const Boler: React.FC = () => {

    const { name } = useParams<{ name: string; }>();

    return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Boler College of Business</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Boler</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonCard>
            <IonCardHeader>
                <IonCardTitle>Welcome to Cut-Back Crumbs!</IonCardTitle>
                <IonCardSubtitle>Developed by Abedelhadi Tawil, Jon Siudowski, Alyssa Augustein, and Gavin Weiser.</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>This app will strive to reduce food waste and decrease food insecurity, through the use of a mobile event calendar with real-time notifications.</IonCardContent>
            </IonCard>
        </IonContent>
      </IonPage>
    );
};

export default Boler;