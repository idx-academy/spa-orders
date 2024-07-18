import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState
} from "react";
import { IntlProvider } from "react-intl";

import { LOCAL_STORAGE_KEYS } from "@/constants/common";
import messages from "@/messages";

type I18nProviderProps = Required<PropsWithChildren>;

const SUPPORTED_LOCALES = ["en", "uk"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

type LocaleContextType = {
  locale: Locale;
  setLocale: Dispatch<SetStateAction<Locale>>;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

const getInitialLocale = (): Locale => {
  const storedLocale = window.localStorage.getItem(
    LOCAL_STORAGE_KEYS.locale
  ) as Locale;

  if (SUPPORTED_LOCALES.includes(storedLocale)) {
    return storedLocale;
  }

  const browserLocale = window.navigator.language.split("-")[0] as Locale;

  if (SUPPORTED_LOCALES.includes(browserLocale)) {
    return browserLocale;
  }

  return "en";
};

const I18nProvider = ({ children }: I18nProviderProps) => {
  const [locale, setLocale] = useState<Locale>(getInitialLocale());

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider
        locale={locale}
        defaultLocale="en"
        messages={messages[locale]}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

const useLocaleContext = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error(
      "useLocaleContext must be used within I18nProvider. Ensure you have wrapped your app with <I18nProvider>."
    );
  }
  return context;
};

export { I18nProvider, useLocaleContext, LocaleContext };
