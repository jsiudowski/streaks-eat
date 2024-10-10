
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { alertCircleOutline, archiveOutline, archiveSharp, bookmarkOutline, calendarOutline, heartOutline, heartSharp, homeOutline, mailOutline, mailSharp, mapOutline, navigate, paperPlaneOutline, paperPlaneSharp, personOutline, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';

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
    title: 'Dashboard',
    url: '/pages/dashboard',
    iosIcon: homeOutline,
    mdIcon: homeOutline
  },
  {
    title: 'Event List',
    url: '/pages/EventList',
    iosIcon: calendarOutline,
    mdIcon: calendarOutline
  },
  {
    title: 'Locations',
    url: '/pages/Locations',
    iosIcon: navigate,
    mdIcon: navigate
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


//const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];


// This is the rendering of the side menu with all of the tabs. 
const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Cut-Back Crumbs</IonListHeader>
          <IonNote>Welcome!</IonNote>
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
        </IonList>

        {/* <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList> */}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
