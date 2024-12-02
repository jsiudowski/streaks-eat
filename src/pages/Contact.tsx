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
                <IonCardSubtitle>Thank you for utilizing our app! If you have questions about our app or need help with a feature: </IonCardSubtitle>
                    <IonCardTitle>Contact</IonCardTitle>
                    <IonCardContent> <b>Email</b>: csdi@jcu.edu.</IonCardContent>
                    <IonCardTitle>Location:</IonCardTitle>
                    <IonCardContent><b>Building</b>: Lombardo Student Center</IonCardContent>
                    <IonCardContent><b>Office</b>: Center For Student Diversity and Inclusion</IonCardContent>
                    <IonCardContent><b>Room Number</b>: 202 </IonCardContent>
                </IonCardHeader>
            </IonCard>

            <IonImg src={StreaksEatLogo} alt="Streaks Eat Logo" ></IonImg>  
            </IonContent>
            
        </IonPage>
    );
}
export default Contact;