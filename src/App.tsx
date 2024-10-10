import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

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
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import MyProfile from './pages/MyProfile';
import Locations from './pages/Locations';
import Map from './pages/Map';
import EventList from './pages/EventList';
import DolanScience from './pages/BuildingPages/DolanScience';
import OmalleyCenter from './pages/BuildingPages/OmalleyCenter';
import Boler from './pages/BuildingPages/Boler';
import LSC from './pages/BuildingPages/LSC';
import SIH from './pages/BuildingPages/SIH';
import EventCreation from './pages/EventCreation';



setupIonicReact();
const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/pages/Dashboard" />
            </Route>
            <Route path="/pages/Login" component={Login}></Route>
            <Route path="/pages/Dashboard" component={Dashboard}></Route>
            <Route path="/pages/AboutUs" component={AboutUs}></Route>
            <Route path="/pages/MyProfile" component={MyProfile}></Route>
            <Route path="/pages/Locations" component={Locations}></Route>
            <Route path="/pages/Map" component={Map}></Route>
            <Route path="/pages/EventList" component={EventList}></Route>
            <Route path="/pages/BuildingPages/DolanScience" component={DolanScience}></Route>
            <Route path="/pages/BuildingPages/OmalleyCenter" component={OmalleyCenter}></Route>
            <Route path="/pages/BuildingPages/Boler" component={Boler}></Route>
            <Route path="/pages/BuildingPages/LSC" component={LSC}></Route>
            <Route path="/pages/BuildingPages/SIH" component={SIH}></Route>
            <Route path="/pages/EventCreation" component={EventCreation}></Route>

          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};
export default App;
