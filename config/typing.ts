import { ProLayoutProps } from '@ant-design/pro-components';
import { IntlConfig } from 'react-intl';

export type ConfigType = {
  i18n: IntlConfig;
  layout: ProLayoutProps & {
    pwa?: boolean;
    logo?: string;
  };
};
