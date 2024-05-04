import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'relevaminto-visual',
  appName: 'relevaminto-visual',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
   //   launchAutoHide: true,
      launchFadeOutDuration: 3000,
      backgroundColor: "#ffffffff",
    //  androidSplashResourceName: "splash",
     // androidScaleType: "CENTER_CROP",
      splashFullScreen: true,
      splashImmersive: true,
    },
  },

};

export default config;
