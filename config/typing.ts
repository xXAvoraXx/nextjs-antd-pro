import { ProLayoutProps } from '@ant-design/pro-components';
import { Config } from 'next-i18n-router/dist/types';

export type ConfigType = {
  i18n: Config;
  layout: ProLayoutProps & {
    pwa?: boolean;
    logo?: string;
  };
};
