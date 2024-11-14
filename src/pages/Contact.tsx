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
                <IonTitle>Contact Information</IonTitle>
            </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
            <IonHeader collapse="condense">
                <IonToolbar>
                <IonTitle size="large">Contact Us!</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Phone, email, etc.</IonCardTitle>
                </IonCardHeader>
            </IonCard>

            <IonImg src={StreaksEatLogo} alt="Streaks Eat Logo" ></IonImg>  
            </IonContent>
            
        </IonPage>
    );
}
export default Contact;