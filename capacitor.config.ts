import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'relevamiento-visual',
  appName: 'Relevamiento visual',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
    launchAutoHide: true,
      launchFadeOutDuration: 2000,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      splashFullScreen: true,
      splashImmersive: true,
    },
  },

};

export default config;
