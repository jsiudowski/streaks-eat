import React, { useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonProgressBar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonInput, IonLoading } from '@ionic/react';
import { useParams } from 'react-router';
import './Register.css'
import { Link } from 'react-router-dom';
import { registerUser } from '../firebaseConfig';

const Register: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [busy, setBusy] = useState<boolean>(false)

    async function Register() {
        //validation
        setBusy(true)
        if(password !== cpassword) {
            console.log('Passwords do not match')
        }
        if(username.trim() === '' || password.trim() === '') {
            console.log('Username and Password are required!')
        }

        const res = await registerUser(username, password)
        console.log(username, password, cpassword)

        setBusy(false)
    }

    return (
        <IonPage>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Register</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonLoading message="Please wait..." duration={0} isOpen={busy}/>
            <IonContent className="ion-padding">
                <IonInput placeholder="Username?" onIonChange={(e: any) => setUsername(e.target.value)}/>
                <IonInput placeholder='Password?' onIonChange={(e: any) => setPassword(e.target.value)}/>
                <IonInput placeholder='Confirm Password?' onIonChange={(e: any) => setCPassword(e.target.value)}/>
              <IonButton onClick={Register}>Register</IonButton>

              <p>Already have an account? <Link to="/pages/Login">Login</Link></p>
            </IonContent>
        </IonPage>
    );
}
export default Register;