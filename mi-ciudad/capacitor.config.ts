import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'mi-ciudad',
  webDir: 'www',
//};
// overrideUserAgent: ‘mi-ciudad’,
appendUserAgent: 'mi-ciudad',
  android: {
    // overrideUserAgent: ‘mi-ciudad’,
    appendUserAgent: 'mi-ciudad'
  },
};
export default config;
