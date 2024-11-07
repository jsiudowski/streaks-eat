import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonListHeader,
  IonMenu,
  IonMenuToggle
} from '@ionic/react';

import { alertCircleOutline, calendarOutline, mapOutline, personOutline } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import JCULogo from '../pages/Photos/JCULogo.png';
import StreaksEatLogo from '../pages/Photos/StreaksEatLogo.png';
import './Menu.css';

// Structure for the side bar navigations
interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

/* 
This is for creating a new page/tab for the menu. We start with a:

Title: Name of the page itself.
URL: Creates the URL for the page which is gathered from App.tsx,
    In the first constant, we pull the dashboard from the pages folder, as that is where the file is stashed in the structure. 
iosIcon: Gives Icon for the page/navmenu.
mdIcon: Displays the Icon in the nav menu,
    These Icons can be automatically imported from Visual Studio Code's detection with Ionic Framework.
    These Icons can be found at: 
    https://ionic.io/ionicons?_gl=1*fg72an*_gcl_au*NjU5NTk5ODk0LjE3MjUzNzcyNzg.*_ga*MTYxNDQ5MzI0Ni4xNzI1Mzc3Mjc4*_ga_REH9TJF6KF*MTcyNzE4NzQ1OS4yLjAuMTcyNzE4NzQ2MS4wLjAuMA.
*/
const appPages: AppPage[] = [
  {
    title: 'Event List',
    url: '/pages/EventList',
    iosIcon: calendarOutline,
    mdIcon: calendarOutline
  },
  {
    title: 'Map',
    url: '/pages/Map',
    iosIcon: mapOutline,
    mdIcon: mapOutline
  },
  {
    title: 'My Profile',
    url: '/pages/MyProfile',
    iosIcon: personOutline,
    mdIcon: personOutline
  },
  {
    title: 'About Us',
    url: '/pages/AboutUs',
    iosIcon: alertCircleOutline,
    mdIcon: alertCircleOutline
  }
];

// This is the rendering of the side menu with all of the tabs. 
const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
          <IonListHeader>Streaks Eat - Welcome!</IonListHeader>
          <img src={StreaksEatLogo} alt="App Logo" style={{ width: '40%', height: 'auto%', verticalAlign: 'end'}} />
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
            
          })}

              {
              <img 
                src={JCULogo} 
                alt="App Logo" 
                style={{ 
                  width: '50%', 
                  height: 'auto', 
                  position: 'absolute', 
                  bottom: '10px', 
                  left: '10px' 
                }} 
                    />
              }
              </IonContent>
            </IonMenu>
          );
          };

export default Menu;

