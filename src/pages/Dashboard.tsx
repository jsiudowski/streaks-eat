import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonProgressBar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from '@ionic/react';
import { useParams } from 'react-router';
import './Dashboard.css'

const Dashboard: React.FC = () =>  {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>STREAKS EAT!</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className='align-content: center'>
              <IonButton routerLink="/pages/Login">Login</IonButton>
              <IonButton routerLink="/pages/Register" color="secondary">Register</IonButton>
            </IonContent>
        </IonPage>
    );
}

export default Dashboard;