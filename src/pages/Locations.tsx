import React from 'react';
import { IonButtons, IonContent,IonRouterLink, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonProgressBar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { useParams } from 'react-router';
import './Locations.css'
import DSC from './Photos/Dolan_Center.jpg' ;
import LSC from './Photos/LSC.webp' ;
import SIH from './Photos/SIH.jpg' ;
import OMC from './Photos/OMalley.png' ;
import BCB from './Photos/Boler.webp' ;



const Locations: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Locations</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className = "ion-padding">
          
        <IonRouterLink href='/pages/BuildingPages/DolanScience' routerLink="/pages/BuildingPages/DolanScience">
           <IonCard className="ion-card-responsive">
                 <img  src={DSC} />
              <IonCardHeader>
                <IonCardTitle>Dolan Science Center</IonCardTitle>
                  <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            </IonCard> 
           </IonRouterLink>

           <IonRouterLink href='/pages/BuildingPages/OmalleyCenter' routerLink="/pages/BuildingPages/OmalleyCenter">
            <IonCard className="ion-card-responsive">
                 <img  src={OMC} />
              <IonCardHeader>
                <IonCardTitle>O'Malley Center</IonCardTitle>
                  <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            </IonCard> 
            </IonRouterLink>

            <IonRouterLink href='/pages/BuildingPages/Boler' routerLink="/pages/BuildingPages/Boler">
            <IonCard className="ion-card-responsive">
                 <img  src={BCB} />
              <IonCardHeader>
                <IonCardTitle>Boler School of Business</IonCardTitle>
                  <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            </IonCard> 
            </IonRouterLink>

            <IonRouterLink href='/pages/BuildingPages/LSC' routerLink="/pages/BuildingPages/LSC">
            <IonCard className="ion-card-responsive">
                 <img  src={LSC} />
              <IonCardHeader>
                <IonCardTitle>Lombardo Student Center</IonCardTitle>
                  <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            </IonCard> 

            </IonRouterLink><IonRouterLink href='/pages/BuildingPages/SIH' routerLink="/pages/BuildingPages/SIH">
            <IonCard className="ion-card-responsive">
                 <img  src={SIH} />
              <IonCardHeader>
                <IonCardTitle>Saint Ignatius Hall</IonCardTitle>
                  <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
            </IonCard> 
            </IonRouterLink>
            </IonContent>                  
        </IonPage>
    );
}

export default Locations;