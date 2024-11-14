import React from 'react';
import { useParams } from 'react-router';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonImg, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonInput, IonLoading, IonList, IonItem, useIonToast, IonIcon } from '@ionic/react';
import StreaksEatLogo from '../pages/Photos/StreaksEatLogo.png';
import './Contact.css';

const Contact: React.FC = () => {

    return (

        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                <IonMenuButton />
                </IonButtons>
                <IonTitle>Contact</IonTitle>
            </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
            <IonHeader collapse="condense">
                <IonToolbar>
                <IonTitle size="large">Contact</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Contact Information</IonCardTitle>
                </IonCardHeader>
            </IonCard>

            <IonImg src={StreaksEatLogo} alt="Streaks Eat Logo" ></IonImg>  
            </IonContent>
            
        </IonPage>
    );
}
export default Contact;