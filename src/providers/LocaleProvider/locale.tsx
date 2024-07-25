"use client";

import { ConfigProvider } from "antd";
import {
  RawIntlProvider,
  getLocale,
  getDirection,
  setIntl,
  getIntl,
  localeInfo,
  event,
  LANG_CHANGE_EVENT,
} from "./localeExports";
import React from "react";
import dayjs from "dayjs";

export function _onCreate() {
  const locale = getLocale();
  if (dayjs?.locale) {
    dayjs.locale(localeInfo[locale]?.momentLocale || "");
  }
  setIntl(locale);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined"
    ? React.useLayoutEffect
    : React.useEffect;

export const LocaleProvider = (props: any) => {
  const initLocale = getLocale();
  const [locale, setLocale] = React.useState(initLocale);
  const [intl, setContainerIntl] = React.useState(() => getIntl(locale, true));

  const handleLangChange = (locale: string) => {
    if (dayjs?.locale) {
      dayjs.locale(localeInfo[locale]?.momentLocale || "en");
    }
    setLocale(locale);
    setContainerIntl(getIntl(locale));
  };

  useIsomorphicLayoutEffect(() => {
    debugger;
    event.on(LANG_CHANGE_EVENT.toString(), handleLangChange);
    return () => {
      event.off(LANG_CHANGE_EVENT.toString(), handleLangChange);
    };
  }, []);

  const defaultAntdLocale = {};
  const direction = getDirection();

  return (
    <ConfigProvider
      direction={direction}
      locale={localeInfo[locale]?.antd || defaultAntdLocale}
    >
      <RawIntlProvider value={intl}>{props.children}</RawIntlProvider>
    </ConfigProvider>
  );
};
