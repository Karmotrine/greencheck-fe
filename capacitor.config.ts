import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.greencheck',
  appName: 'greencheck',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
