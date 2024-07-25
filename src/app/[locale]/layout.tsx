import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { ClientLayout } from "./ClientLayout";
import config from "@@config/config";
import { Metadata } from "next";

export function generateStaticParams() {
  return config.i18n.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
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
