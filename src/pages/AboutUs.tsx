import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import StreaksEatLogo from '../pages/Photos/StreaksEatLogo.png';
import './AboutUs.css';

// Sets up the About Us page which describes the Developers who created this app
const AboutUs: React.FC = () => {

    const { name } = useParams<{ name: string; }>();

    return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>About The Developers</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">About The Developers</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonCard>
            <IonCardHeader>
                <IonCardTitle>Welcome to Streaks Eat!</IonCardTitle>
                <IonCardSubtitle>A John Carroll University App Developed by Abedelhadi Tawil, Jon Siudowski, Alyssa Augustein, and Gavin Weiser.</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
  <p>
    <b>Abedelhadi Tawil</b> is a senior Computer Science major with minors in Data Science and Biology. He currently works as a Computer Hardware Technician in the Information Technology department at John Carroll University, a role he has held for two years. Abedelhadi has tackled various IT issues across campus. He also has prior experience as an Automation Development Intern at the Cleveland Clinic, where he developed automations to streamline prescription refill processes, requiring only final approval from a healthcare provider.
  </p>
</IonCardContent>

<IonCardContent>
  <p>
    <b>Jon Siudowski</b> is a senior Computer Science major with a minor in History. He has been a Software Development Intern in the Imaging Informatics Department at the Cleveland Clinic for the past two years. His projects include consolidating company data into a centralized website, eliminating scattered spreadsheets, and upgrading legacy frameworks for applications used by both the Imaging and Laboratory Medicine departments.
  </p>
</IonCardContent>

<IonCardContent>
  <p>
    <b>Alyssa Augustein</b> is a senior Computer Science major. She currently works as a Tech Intern for a real estate investment company. Over the past two years, she has focused primarily on front-end website development, contributing to the UI and UX design of three company websites. Additionally, she assists with marketing software and Google Analytics.
  </p>
</IonCardContent>

<IonCardContent>
  <p>
    <b>Gavin Weiser</b> is a senior Computer Science major with a minor in Data Science. He has interned as a Software Developer in the Imaging Informatics Department at the Cleveland Clinic. During his five-month internship in the spring of 2024, he modernized a legacy framework for the Imaging Department. He is set to return for another internship in the spring of 2025.
  </p>
</IonCardContent>

<IonCardContent>This project is designed as a capstone course to fulfill one of the Computer Science (CS) major requirements named Software Engineering Project, CS 4700. In this capstone course, students are grouped into small groups of 3-5 students. Each group works on a large software project for a real client or for an open-source community, where development teams will make widespread use of previously learned tools/techniques, their skills, ingenuity, and research abilities to address various issues and deliver a working, useful system. 
</IonCardContent>

<IonCardContent>
In this capstone project, a mobile app has been developed to resolve the food waste issue across John Carroll University (JCU) campus. The idea has been started when Ayşe Selen Zarrelli, the director of Center for Student Diversity and Inclusion at JCU met with Dr. Almabrok Essa, CS professor and intructor for CS 4700, and discussed the possibility of developing an app to encourage community-centric redistribution of surplus food after events on JCU campus, which is aligned with the campus mission and sustainability goals. Finally, after a semester-long endeavor of the above mentioned developers team this idea has become a reality.</IonCardContent>
          </IonCard>
          <div></div>
          <IonImg src={StreaksEatLogo} alt="Streaks Eat Logo" ></IonImg>   
        </IonContent>
      </IonPage>
      
    );
};


export default AboutUs;