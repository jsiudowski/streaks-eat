import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonProgressBar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from '@ionic/react';
import { useParams } from 'react-router';
import './Dashboard.css'

const Dashboard: React.FC = () =>  {
    return (
        <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>STREAKS EAT!</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonButton routerLink="/Login">Login</IonButton>
              <IonButton routerLink="/Register" color="secondary">Register</IonButton>
            </IonContent>
        </IonPage>
    );
}

export default Dashboard;