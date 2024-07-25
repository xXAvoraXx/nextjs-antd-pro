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
  // 可以合并
  const mergeMessages = localeInfo[name]?.messages
    ? Object.assign({}, localeInfo[name].messages, messages)
    : messages;

  // 用户只是追加 messages 时，extraLocales 可选
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
  // 如果这是的 name 和当前的locale 相同需要重新设置一下，不然更新不了
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
  // 如果全局的 g_intl 存在，且不是 setIntl 调用
  if (g_intl && !changeIntl && !locale) {
    return g_intl;
  }
  // 获取当前 locale
  if (!locale) locale = getLocale();
  // 如果存在于 localeInfo 中
  if (locale && localeInfo[locale]) {
    return _createIntl(locale);
  }
  // 不存在需要一个报错提醒
  warning(
    !locale || !!localeInfo[locale],
    `The current popular language does not exist, please check the locales folder!`
  );
  // 使用 zh-CN
  if (localeInfo["tr-TR"]) {
    return _createIntl("tr-TR");
  }

  // 如果还没有，返回一个空的
  return createIntl({
    locale: "tr-TR",
    messages: {},
  });
};

/**
 * 切换全局的 intl 的设置
 * @param locale 语言的key
 */
export const setIntl = (locale: string) => {
  g_intl = getIntl(locale, true);
};

/**
 * 获取当前选择的语言
 * @returns string
 */
export const getLocale = () => {
  const runtimeLocale = applyRuntimeLocalePlugin({});

  // Runtime getLocale for user define
  if (typeof runtimeLocale?.getLocale === "function") {
    return runtimeLocale.getLocale();
  }

  // İstemci tarafında çalışıyor mu kontrol et
  if (typeof window !== "undefined") {
    // Tarayıcı nesnelerine güvenli erişim
    const useLocalStorage = true; // Bu değer uygulamanızın diğer kısımlarından alınabilir veya dinamik olabilir

    const lang =
      navigator.cookieEnabled && useLocalStorage
        ? window.localStorage.getItem("NEXT_LOCALE")
        : "";

    const isNavigatorLanguageValid = typeof navigator.language === "string";
    const browserLang = isNavigatorLanguageValid
      ? navigator.language.split("-").join("-")
      : "";

    return lang || browserLang || "tr-TR";
  }

  // İstemci tarafında değilse varsayılan bir dil döndür
  return "tr-TR";
};

/**
 * 获取当前选择的方向
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
 * 切换语言
 * @param lang 语言的 key
 * @param realReload 是否刷新页面，默认刷新
 * @returns string
 */
export const setLocale = (lang: string, realReload: boolean = true) => {
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
        // chrome 不支持这个事件。所以人肉触发一下
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
