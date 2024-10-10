import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonProgressBar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { useParams } from 'react-router';
import './DolanScience.css'


/* 
Creates the page dedicated to the Dolan Science Center and the contents it holds. 
This page, along with many others, are dedicated to displaying the location 
of the building and active event notification. These notifications will include 
food description, allergy notice, and room number located within the building.  
*/

const DolanScience: React.FC = () => {

    const { name } = useParams<{ name: string; }>();

    return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Dolan Science</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Dolan Science</IonTitle>
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

export default DolanScience;