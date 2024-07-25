import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';
import { ClientLayout } from './components/ClientLayout';
import { Metadata } from 'next';
import { getDirection } from '@/providers/LocaleProvider/localeExports';
import { LocaleProvider } from '@/providers/LocaleProvider/locale';

type LayoutProps = {
  params: { locale: string };
  children: React.ReactNode;
};

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children, params }: Readonly<LayoutProps>) {
  const { locale } = params;
  //const dir = getDirection();

  return (
    <html lang={locale}>
      <body>
        <AntdRegistry>
          <LocaleProvider>
            <ClientLayout>{children}</ClientLayout>
          </LocaleProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
