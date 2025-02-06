import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Streaks Eat',
  webDir: 'dist',
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    Keyboard: {
      resize: 'none', // or 'ionic', depending on your preference
      style: 'dark',   // change keyboard style if necessary
      inputStyle: 'default', // or 'none'
    },
  }
};


export default config;

