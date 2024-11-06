import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonLoading, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { loginUser } from '../firebaseConfig';

// Sets up the login page for the app
const Login: React.FC = () => {
    const [busy, setBusy] = useState<boolean>(false)
    const history = useHistory();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [alertMessage] = useIonToast();

    // Field to display login success or failure to the user
    const showAlert = (message: string, position: 'top' | 'bottom' | 'middle' = 'top') => {
      alertMessage({
          message,
          duration: 1500,
          position,
      });
  };

    // Attempts to Log in a User. Has conditions for both success and failure
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
          <IonLoading message="Please wait..." duration={0} isOpen={busy} />
          <IonContent className="ion-padding">
              <IonInput placeholder="Username?" onIonChange={(e: any) => setUsername(e.target.value)} />
              <IonInput
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password?"
                  onIonChange={(e: any) => setPassword(e.detail.value!)} // Make sure to set password here
                  style={{ flex: 1 }}
              />
              <IonButton onClick={LoginUser}>Login</IonButton>
              <IonButton fill="clear" onClick={() => setShowPassword(!showPassword)}>
                  <IonIcon icon={showPassword ? eyeOff : eye} />
              </IonButton>

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
