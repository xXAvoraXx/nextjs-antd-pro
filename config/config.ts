import { ConfigType } from './typing';
import defaultSettings from './defaultSettings';

const appConfig: ConfigType = {
  i18n: {
    locale: 'en-US',
    defaultLocale: 'en-US',
  },
  layout: defaultSettings,
};

export default appConfig;
