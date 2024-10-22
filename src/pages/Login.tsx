import React, { useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonLabel, IonInput, IonItem, IonCheckbox, IonButton, IonCardTitle, IonLoading } from '@ionic/react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { loginUser } from '../firebaseConfig';

const Login: React.FC = () => {

    const [busy, setBusy] = useState<boolean>(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    async function LoginUser() {
        setBusy(true)
        const res = await loginUser(username, password);
        console.log(`${res ? 'Login Success' : 'Login Failed'}`)
        setBusy(false)
    }

    return (
        <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Login</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonLoading message="Please wait..." duration={0} isOpen={busy}/>
            <IonContent className="ion-padding">
                <IonInput placeholder="Username?" onIonChange={(e: any) => setUsername(e.target.value)}/>
                <IonInput placeholder='Password?' onIonChange={(e: any) => setPassword(e.target.value)}/>
              <IonButton onClick={LoginUser}>Login</IonButton>

              <p>New here? Create an account! <Link to="/pages/Register">Register</Link></p>
            </IonContent>
        </IonPage>
    );
}
export default Login;