'use client';

import Footer from '@/components/Footer';
import { ProLayout } from '@ant-design/pro-components';
import React from 'react';
import config from '@@config/config';
import { useAppStore } from '@/stores/app';
import { useShallow } from 'zustand/react/shallow';
import { omit } from 'lodash';
import { SelectLang } from '@/providers/LocaleProvider/SelectLang';

export const ClientLayout = (props: React.PropsWithChildren) => {
  const { children } = props;

  const { fixedHeader, contentWidth } = useAppStore(useShallow((state) => state.layoutSettings));

  const initialSettings = omit(config.layout, ['contentWidth', 'fixedHeader']);

  return (
    <ProLayout
      siderWidth={256}
      footerRender={() => <Footer />}
      actionsRender={() => [
        <SelectLang
          key="SelectLang"
          style={{
            padding: 4,
          }}
        />,
      ]}
      bgLayoutImgList={[
        {
          src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
          left: 85,
          bottom: 100,
          height: '303px',
        },
        {
          src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
          bottom: -68,
          right: -45,
          height: '303px',
        },
        {
          src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
          bottom: 0,
          left: 0,
          width: '331px',
        },
      ]}
      menuHeaderRender={undefined}
      {...initialSettings}
      fixedHeader={fixedHeader}
      contentWidth={contentWidth}
    >
      {children}
    </ProLayout>
  );
};
