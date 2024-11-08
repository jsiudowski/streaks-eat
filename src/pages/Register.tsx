import React, { useState } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonProgressBar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonInput, IonLoading, IonList, IonItem, useIonToast, IonIcon } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import './Register.css'
import { Link } from 'react-router-dom';
import { registerUser } from '../firebaseConfig';
import { eyeOff, eye } from 'ionicons/icons';

const Register: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [busy, setBusy] = useState<boolean>(false)
    const history = useHistory();
    const [alertMessage] = useIonToast();

    // Alert message for when user registers successfully or registration fails
    const showAlert = (message: string, position: 'top' | 'bottom' | 'middle' = 'top') => {
      alertMessage({
          message,
          duration: 1500,
          position,
      });
  };

  // Attempts to Register a user from the page inputs. Reports back with success or failure
  async function Register() {
      setBusy(true);
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
      if (password !== cpassword) {
          showAlert('Passwords do not match');
          setBusy(false);
          return; // Exit early
      }
      if (username.trim() === '' || password.trim() === '') {
          showAlert('Username and Password are required!');
          setBusy(false);
          return; // Exit early
      }

      //Attempt User Registration
      const res = await registerUser(username, password);
      setBusy(false);
      console.log(`${res ? 'Registration Success' : 'Registration Failed'}`);
        setBusy(false);
        if(res) {
          showAlert('Registration successful.');
          history.push('/pages/MyProfile');
        }
        else {
          showAlert('Registration failed. Please try again.');
        };
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
                <IonInput placeholder='Password?' type={showPassword ? 'text' : 'password'} onIonChange={(e: any) => setPassword(e.target.value)}/>
                <IonInput placeholder='Confirm Password?' type={showPassword ? 'text' : 'password'} onIonChange={(e: any) => setCPassword(e.target.value)}/>
              <IonButton onClick={Register}>Register</IonButton>
              <IonButton fill="clear" onClick={() => setShowPassword(!showPassword)}>
                    <IonIcon icon={showPassword ? eyeOff : eye} />
              </IonButton>

              <p className="login-text">Already have an account? <Link to="/pages/Login">Login</Link></p>

              <IonCard>
              <IonCardHeader>
                <IonCardTitle>Registration Requirements:</IonCardTitle>
                <IonCardSubtitle>Here are some requirements for registration:</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent><p>Do not include '@jcu.edu' in username.</p></IonCardContent>
              <IonCardContent>Password must contain:
              <p>- At Least 10 characters</p>
              <p>- At least one uppercase letter.</p>
              <p>- At least one lowercase letter</p>
              <p>- At least one number</p>
              <p>- At least one symbol.</p>
              </IonCardContent>
            </IonCard>
            </IonContent>
        </IonPage>
    );
}
export default Register;