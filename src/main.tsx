import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {defineCustomElements} from '@ionic/pwa-elements/loader';

import { isPlatform } from '@ionic/react';
import { Capacitor } from '@capacitor/core';

// Check for iOS platform and execute iOS-specific logic
if (isPlatform('ios')) {
  console.log('Running on iOS');
  // You can also use iOS-specific features here if necessary
} else if (isPlatform('android')) {
  console.log('Running on Android');
  // Android-specific logic
} 
// Web-specific logic using Capacitor's getPlatform()
if (Capacitor.getPlatform() === 'web') {
  console.log('Running on Web');
  if ('serviceWorker' in navigator) {
    // Web-specific service worker logic
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
}

defineCustomElements(window);
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);