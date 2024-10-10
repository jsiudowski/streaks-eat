import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLabel, IonInput, IonItem, IonCheckbox, IonButton, IonCardTitle } from '@ionic/react';
import { useParams } from 'react-router';
const Login: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
        <IonToolbar>
            <IonButtons slot="start">
                <IonMenuButton />
            </IonButtons>
            <IonTitle>Login</IonTitle>
            </IonToolbar>
            <form className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked" >Username</IonLabel>
                    <IonInput />
                </IonItem>
                <IonItem> 
                    <IonLabel position="stacked">Password</IonLabel>
                    <IonInput type="password" />
                </IonItem>
                <IonButton className="ion-margin-top" type="submit" expand="block"> Login </IonButton>
                <IonItem lines="none">
                    <IonLabel>Remember me</IonLabel>
                    <IonCheckbox defaultChecked={true} slot="start" />
                </IonItem>
            </form>
        </IonHeader>
        </IonPage>
    );
}
export default Login;