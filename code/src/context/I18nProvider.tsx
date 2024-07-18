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

export type Locale = "en" | "uk";

const SUPPORTED_LOCALES: Locale[] = ["en", "uk"];

type LocaleContextType = {
  locale: Locale;
  setLocale: Dispatch<SetStateAction<Locale>>;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

const getInitialLocale = (): Locale => {
  const storedLocale = window.localStorage.getItem(LOCAL_STORAGE_KEYS.locale);
  const browserLocale = window.navigator.language.split("-")[0] as Locale;

  if (SUPPORTED_LOCALES.includes(storedLocale as Locale)) {
    return storedLocale as Locale;
  }
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
