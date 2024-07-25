"use client";

import { createIntl, IntlShape, MessageDescriptor } from "react-intl";
import warning from "antd/es/_util/warning";
import ee from "event-emitter";
import enUS0 from "antd/es/locale/en_US";
import trTR0 from "antd/es/locale/tr_TR";
import lang_enUS0 from "@/locales/en-US";
import lang_trTR0 from "@/locales/tr-TR";

export { createIntl };
export {
  FormattedDate,
  FormattedDateParts,
  FormattedDateTimeRange,
  FormattedListParts,
  FormattedDisplayName,
  FormattedList,
  FormattedMessage,
  FormattedNumber,
  FormattedNumberParts,
  FormattedPlural,
  FormattedRelativeTime,
  FormattedTime,
  FormattedTimeParts,
  IntlContext,
  IntlProvider,
  RawIntlProvider,
  createIntlCache,
  defineMessages,
  injectIntl,
  useIntl,
} from "react-intl";

let g_intl: IntlShape;
const useLocalStorage = true;

export const event = ee();

export const LANG_CHANGE_EVENT = Symbol("LANG_CHANGE");

const flattenMessages = (nestedMessages: Record<string, any>, prefix = "") => {
  return Object.keys(nestedMessages).reduce(
    (messages: Record<string, any>, key) => {
      const value = nestedMessages[key];
      const prefixedKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "string") {
        messages[prefixedKey] = value;
      } else {
        Object.assign(messages, flattenMessages(value, prefixedKey));
      }
      return messages;
    },
    {}
  );
};

export const localeInfo: { [key: string]: any } = {
  "en-US": {
    messages: {
      ...flattenMessages(lang_enUS0),
    },
    locale: "en-US",
    antd: {
      ...enUS0,
    },
    momentLocale: "en",
  },
  "tr-TR": {
    messages: {
      ...flattenMessages(lang_trTR0),
    },
    locale: "tr-TR",
    antd: {
      ...trTR0,
    },
    momentLocale: "tr",
  },
};

/**
 * Yeni bir yerelleştirme dilini ekler
 * @param name Dilin anahtarı
 * @param messages Karşılık gelen mesaj nesnesi
 * @param extraLocales momentLocale, antd yerelleştirmesi
 */
export const addLocale = (
  name: string,
  messages: Object,
  extraLocales: {
    momentLocale: string;
    antd: import("antd/es/locale").Locale;
  }
) => {
  if (!name) {
    return;
  }
  // Mevcut dilin mesajlarını birleştirir
  const mergeMessages = localeInfo[name]?.messages
    ? Object.assign({}, localeInfo[name].messages, messages)
    : messages;

  // Kullanıcı sadece mesajları eklerken, extraLocales isteğe bağlıdır
  const {
    momentLocale = localeInfo[name]?.momentLocale,
    antd = localeInfo[name]?.antd,
  } = extraLocales || {};
  const locale = name.split("-")?.join("-");
  localeInfo[name] = {
    messages: mergeMessages,
    locale,
    momentLocale: momentLocale,
    antd,
  };
  // Eğer bu isim ve mevcut dil aynıysa, yeniden ayarlanması gerekiyor, aksi takdirde güncellenmez
  if (locale === getLocale()) {
    event.emit(LANG_CHANGE_EVENT.toString(), locale);
  }
};

// const applyRuntimeLocalePlugin = (initialValue: any) => {
//     return getPluginManager().applyPlugins({
//       key: 'locale',
//       type: 'modify',
//       initialValue
//     });
//   }

const applyRuntimeLocalePlugin = (initialValue: any) => {
  return { ...initialValue }; // Update with actual plugin manager logic if available
};

const _createIntl = (locale: string) => {
  const runtimeLocale = applyRuntimeLocalePlugin(localeInfo[locale]);
  const { cache, ...config } = runtimeLocale;
  return createIntl(config, cache);
};

/**
 * Bu fonksiyon, mevcut intl nesnesini alır ve dil değiştirme işlemleri için kullanılır.
 * @param locale Değiştirilmek istenen dil türü
 * @param changeIntl g_intl kullanılmaması durumunda true olarak ayarlanır
 * @returns IntlShape
 */
export const getIntl = (locale?: string, changeIntl?: boolean) => {
  // Eğer global g_intl varsa ve changeIntl ve locale parametreleri belirtilmemişse
  if (g_intl && !changeIntl && !locale) {
    return g_intl;
  }
  // Eğer locale belirtilmemişse, mevcut locale'i al
  if (!locale) locale = getLocale();
  // Eğer localeInfo içinde varsa
  if (locale && localeInfo[locale]) {
    return _createIntl(locale);
  }
  // Eğer yoksa, bir uyarı mesajı göster
  warning(
    !locale || !!localeInfo[locale],
    `Mevcut dil bulunamadı, lütfen locales klasörünü kontrol edin!`
  );
  // en-US kullan
  if (localeInfo["en-US"]) {
    return _createIntl("en-US");
  }

  // Eğer hala yoksa, boş bir intl nesnesi döndür
  return createIntl({
    locale: "en-US",
    messages: {},
  });
};

/**
 * Küresel intl ayarını değiştir
 * @param locale dil anahtarı
 */
export const setIntl = (locale: string) => {
  g_intl = getIntl(locale, true);
};

/**
 * Şu anda seçili olan dili alın
 * @returns string
 */
export const getLocale = () => {
  const runtimeLocale = applyRuntimeLocalePlugin({});
  // runtime getLocale for user define
  if (typeof runtimeLocale?.getLocale === 'function') {
   return runtimeLocale.getLocale();
  }
  // please clear localStorage if you change the baseSeparator config
  // because changing will break the app
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined' && useLocalStorage) {
    const lang = window.localStorage.getItem('NEXT_LOCALE');
    if (lang) {
      return lang;
    }
  }
  // support baseNavigator, default true
  let browserLang;
  const isNavigatorLanguageValid =
    typeof navigator !== 'undefined' && typeof navigator.language === 'string';
  browserLang = isNavigatorLanguageValid
    ? navigator.language.split('-').join('-')
    : '';
  return browserLang || "en-US";
};

/**
 * Şu anda seçili olan yönü alın
 * @returns string
 */
export const getDirection = () => {
  const lang = getLocale();
  // array with all prefixs for rtl langueges ex: ar-EG , he-IL
  const rtlLangs = ["he", "ar", "fa", "ku"];
  const direction = rtlLangs.filter((lng) => lang.startsWith(lng)).length
    ? "rtl"
    : "ltr";
  return direction;
};

/**
 * Dil değiştir
 * @param lang Dilin anahtarı
 * @param realReload sayfanın yenilenip yenilenmeyeceği, varsayılan değer refresh
 * @returns string
 */
export const setLocale = (lang: string, realReload: boolean = false) => {
  //const { pluginManager } = useAppContext();
  //const runtimeLocale = pluginManagerapplyPlugins({
  //  key: 'locale',
  //  workaround: 不使用 ApplyPluginsType.modify 是为了避免循环依赖，与 fast-refresh 一起用时会有问题
  //  type: 'modify',
  //  initialValue: {},
  //});

  const updater = () => {
    if (getLocale() !== lang) {
      if (
        navigator.cookieEnabled &&
        typeof window.localStorage !== "undefined" &&
        useLocalStorage
      ) {
        window.localStorage.setItem("NEXT_LOCALE", lang || "");
      }
      setIntl(lang);
      if (realReload) {
        window.location.reload();
      } else {
        event.emit(LANG_CHANGE_EVENT.toString(), lang);
        // chrome bu olayı desteklemiyor. Bu yüzden manuel olarak tetikleyin
        if (window.dispatchEvent) {
          const event = new Event("languagechange");
          window.dispatchEvent(event);
        }
      }
    }
  };

  //if (typeof runtimeLocale?.setLocale === 'function') {
  //  runtimeLocale.setLocale({
  //    lang,
  //    realReload,
  //    updater: updater,
  //  });
  //  return;
  //}

  updater();
};

/**
 * 获取语言列表
 * @returns string[]
 */
export const getAllLocales = () => Object.keys(localeInfo);
