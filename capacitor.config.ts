import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.ricescope',
  appName: 'Ricescope',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
