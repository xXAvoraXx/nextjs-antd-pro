import { ConfigType } from './typing';
import defaultSettings from './defaultSettings';

const appConfig: ConfigType = {
  i18n: {
    locales: ['en', 'tr'],
    defaultLocale: 'en',
  },
  layout: defaultSettings,
};

export default appConfig;
