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

            <IonCardContent>Meet the Developers!</IonCardContent>
            <IonCardContent>
              Abedelhadi Tawil is a senior Computer Science Major with minors in  Data Science and Biology. He currently works as a Computer Hardware Technician at John Carroll University in the Information Technology department. He has been working in this position for two years and has worked on many different issues across campus. He also has prior work experience as an automation development intern at the Cleveland Clinic. During this internship, He developed automations that allowed for prescription refills to be processed automatically with only needing one final approval from a healthcare provider.
            </IonCardContent>
            <IonCardContent>
              Jon Siudowski is a senior Computer Science Major with a minor in History. He currently works as a software development intern in the Imaging Informatics Department at the Cleveland Clinic. He has been in that position for the last two years, working on multiple projects spanning from building a singular website for a ton of company data (in order to have all the managed data in one place instead of spread all over random company spreadsheets), to upgrading the frameworks of old and frequently used applications by both the Imaging Department and the Laboratory Medicine Department.
            </IonCardContent>
            <IonCardContent>
              Alyssa Augustein is a senior with a Computer Science major. She currently works for a Real Estate Investment company as a tech intern. Her work background consists of mostly front-end website development. Over the past two years she has been working with this company, She has helped develop three websites, mostly working on UI and UX design. Additionally, she also helps out with marketing software and Google Analytics. 
            </IonCardContent>
            <IonCardContent>
              Gavin Weiser is a senior Computer Science Major with a Minor in Data Science. He has experience in software development as an intern for the Imaging Informatics Department at the Cleveland Clinic. During this internship, He worked on updating a pre-existing framework used by the Imaging Department, to a more modern look. He interned in this position for 5 months in the spring of 2024 and is currently set to intern again in spring 2025.
            </IonCardContent>

            <IonCardContent>This project was developed to satisfy the requirements of CS-4700 which is the Computer Science Major Capstone course. During this course, students are split into groups and are given a client which designates a project for them to work on over the course of the semester. For this project, our client was the Center for Student Diversity and Inclusion at John Carroll University. Specifically, we met with Ayşe Selen Zarrelli, the director of the Center of Student Diversity and Inclusion at John Carroll University. The initial request Selen had was to reduce food insecurity and food waste across campus. This app is the result of our semester-long endeavor to make her idea a reality.</IonCardContent>
          </IonCard>
          <div></div>
          <IonImg src={StreaksEatLogo} alt="Streaks Eat Logo" ></IonImg>   
        </IonContent>
      </IonPage>
      
    );
};


export default AboutUs;