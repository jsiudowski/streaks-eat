import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

/* Page Variables 
These are the variables that have to be imported from their respective file directory.
  We are importing constants from the files that are created. 
*/
import Login from './pages/Login';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';
import MyProfile from './pages/MyProfile';
import Map from './pages/Map';
import EventList from './pages/EventList';
import EventCreation from './pages/EventCreation';
import EventDetails from './pages/EventDetails';
import { UserProvider } from './UserContext';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

setupIonicReact();
const App: React.FC = () => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check user auth state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);  // User is logged in
      } else {
        setIsAuthenticated(false); // User is not logged in
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  
  return (
    <IonApp>
      <UserProvider>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Switch>
            <Route path="/" exact={true}>
              {isAuthenticated ? <Redirect to="/pages/EventList" /> : <Redirect to="/pages/Login" />}
            </Route>
            <Route path="/pages/Login" component={Login} exact ></Route>
            <Route path="/pages/Register" component={Register} exact></Route>
            <Route path="/pages/AboutUs" component={AboutUs}></Route>
            <Route path="/pages/MyProfile" component={MyProfile} key={location.pathname}></Route>
            <Route path="/pages/Map" component={Map}></Route>
            <Route path="/pages/EventList" component={EventList} key={location.pathname}></Route>
            <Route path="/pages/EventCreation" component={EventCreation}></Route>
            <Route path="/pages/EventDetails" component={EventDetails} exact={true}></Route>
            </Switch>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
      </UserProvider>
    </IonApp>
  );
};
export default App;
