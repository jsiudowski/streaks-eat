import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonProgressBar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { useParams } from 'react-router';
import './AboutUs.css'

const AboutUs: React.FC = () => {

    const { name } = useParams<{ name: string; }>();

    return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>About Us</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">About Us</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonCard>
            <IonCardHeader>
                <IonCardTitle>Welcome to Cut-Back Crumbs!</IonCardTitle>
                <IonCardSubtitle>Developed by Abedelhadi Tawil, Jon Siudowski, Alyssa Augustein, and Gavin Weiser.</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>This app will strive to reduce food waste and decrease food insecurity, through the use of a mobile event calendar with real-time notifications.</IonCardContent>
            <IonCardContent>
              Abedelhadi Tawil: Is a senior Computer Science Major with minors in  Data Science and Biology. He currently works as a Computer Hardware Technician at John Carroll University in the Information Technology department. He has been working in this position for two years and has worked on many different issues across campus. He also has prior work experience as an automation development intern at the Cleveland Clinic. During this internship, He developed automations that allowed for prescription refills to be processed automatically with only needing one final approval from a healthcare provider.
            </IonCardContent>
            <IonCardContent>
              Jon Siudowski: Is a senior Computer Science Major with a minor in History. He currently works as a software development intern in the Imaging Informatics Department at the Cleveland Clinic. He has been in that position for the last two years, working on multiple projects spanning from building a singular website for a ton of company data (in order to have all the managed data in one place instead of spread all over random company spreadsheets), to upgrading the frameworks of old and frequently used applications by both the Imaging Department and the Laboratory Medicine Department.
            </IonCardContent>
            <IonCardContent>
              Alyssa Augustein: Is a senior with a Computer Science major. She currently works for a Real Estate Investment company as a tech intern. Her work background consists of mostly front-end website development. Over the past two years she has been working with this company, She has helped develop three websites, mostly working on UI and UX design. Additionally, she also helps out with marketing software and Google Analytics. 
            </IonCardContent>
            <IonCardContent>
              Gavin Weiser: Is a senior Computer Science Major with a Minor in Data Science. He has experience in software development as an intern for the Imaging Informatics Department at the Cleveland Clinic. During this internship, He worked on updating a pre-existing framework used by the Imaging Department, to a more modern look. He interned in this position for 5 months in the spring of 2024 and is currently set to intern again in spring 2025.
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
};

export default AboutUs;