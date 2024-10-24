import React, { useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, useIonToast, IonPage, IonTitle, IonToolbar, IonLabel, IonInput, IonItem, IonCheckbox, IonButton, IonCardTitle, IonLoading, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { loginUser } from '../firebaseConfig';


const Login: React.FC = () => {

    const [busy, setBusy] = useState<boolean>(false)
    const history = useHistory();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alertMessage] = useIonToast();

    const showAlert = (message: string, position: 'top' | 'bottom' | 'middle' = 'top') => {
      alertMessage({
          message,
          duration: 1500,
          position,
      });
  };
  

    async function LoginUser() {
        setBusy(true)
        
        {/* Checks to see if there are user inputs in either field*/}
        if (username.trim() !== '' && password.trim() === '') {
          showAlert('Password is required ');
          setBusy(false);
          return; // Exit early
        }
        if (password.trim() !== '' && username.trim() === '') {
            showAlert('Username is required');
            setBusy(false);
            return; // Exit early
        }
        if (username.trim() === '' || password.trim() === '') {
          showAlert('Username and Password are required!');
          setBusy(false);
          return; // Exit early
        }

        {/* all fields are checked | ensures if login is successful or not */}
        const res = await loginUser(username, password);
        console.log(`${res ? 'Login Success' : 'Login Failed'}`)
        setBusy(false)
        if(res) {
          showAlert('Login successful.');
          history.push('/pages/EventList');
        }
        else {
          showAlert('Login failed. Please try again.');
        };
        
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

              <IonCard>
              <IonCardHeader>
                <IonCardTitle>Login Requirements:</IonCardTitle>
                <IonCardSubtitle>Here are some requirements for logging in:</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>Do not include '@jcu.edu' in username.</IonCardContent>
            </IonCard>
            </IonContent>
        </IonPage>
    );
}
export default Login;
