import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonLoading, IonMenuButton, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { loginUser } from '../firebaseConfig';
import './Login.css';

const Login: React.FC = () => {
    const [busy, setBusy] = useState<boolean>(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State to track if login is successful
    const history = useHistory();
    const location = useLocation(); // To track navigation state or URL params
    const [alertMessage] = useIonToast();

    // Displays login success or failure to the user
    const showAlert = (message: string, position: 'top' | 'bottom' | 'middle' = 'top') => {
        alertMessage({
            message,
            duration: 1500,
            position,
        });
    };

    // Attempts to Log in the User
    async function LoginUser() {
        setBusy(true);

        // Validation checks
        if (username.trim() !== '' && password.trim() === '') {
            showAlert('Password is required');
            setBusy(false);
            return;
        }
        if (password.trim() !== '' && username.trim() === '') {
            showAlert('Username is required');
            setBusy(false);
            return;
        }
        if (username.trim() === '' || password.trim() === '') {
            showAlert('Username and Password are required!');
            setBusy(false);
            return;
        }

        // Attempt to log in
        const res = await loginUser(username, password);
        setBusy(false);

        if (res) {
            // Mark the login as successful
            setIsLoggedIn(true);

            // Reset the username and password immediately
            setUsername('');
            setPassword('');

            // Show success alert
            showAlert('Login successful.');
        } else {
            showAlert('Login failed. Please try again.');
        }
    }

    // Clears fields when navigating to the login page (or after sign-out)
    useEffect(() => {
        setUsername('');
        setPassword('');
        setIsLoggedIn(false);
    }, [location.pathname]); // Triggered when the component re-renders due to route change

    // Redirects to EventList after successful login
    useEffect(() => {
        if (isLoggedIn) {
            setTimeout(() => {
                history.push('/pages/EventList');
            }, 100); // Adds a small delay to ensure state updates
        }
    }, [isLoggedIn, history]);

    const handleLoginClick = (e: React.FormEvent) => {
        e.preventDefault();  // Prevent form submission (if used inside a form)
        LoginUser();
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                    <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonLoading message="Please wait..." duration={0} isOpen={busy} />
            <IonContent className="ion-padding">
                <form onSubmit={handleLoginClick}>
                    <IonInput
                        type={'text'} /*type is specified so keyboard will pop up? */
                        placeholder="Username?"
                        value={username}
                        onIonChange={(e: any) => setUsername(e.target.value)}
                    />
                    <IonInput
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password?"
                        value={password}
                        onIonChange={(e: any) => setPassword(e.detail.value!)}
                        style={{ flex: 1 }}
                    />
                    <IonButton onClick={LoginUser}>Login</IonButton>
                    <IonButton fill="clear" onClick={() => setShowPassword(!showPassword)}>
                        <IonIcon icon={showPassword ? eyeOff : eye} />
                    </IonButton>
                </form>

                <p className="register-text">New here? Create an account! <Link to="/pages/Register">Register</Link></p>
                
              <IonCard>
                  <IonCardHeader>
                      <IonCardTitle>Login Requirements:</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>Do not include '@jcu.edu' in username.</IonCardContent>
              </IonCard>
          </IonContent>
      </IonPage>
    );
};
export default Login;
