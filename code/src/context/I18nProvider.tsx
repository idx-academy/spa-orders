import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useLayoutEffect,
  useState
} from "react";
import { IntlProvider } from "react-intl";

import { LOCAL_STORAGE_KEYS } from "@/constants/common";
import messages from "@/messages";

type I18nProviderProps = Required<PropsWithChildren>;

export type Locale = "en" | "uk";

type LocaleContextType = {
  locale: Locale;
  setLocale: Dispatch<SetStateAction<Locale>>;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

const I18nProvider = ({ children }: I18nProviderProps) => {
  const [locale, setLocale] = useState<Locale>("en");

  useLayoutEffect(() => {
    let initialLanguage = window.localStorage.getItem(
      LOCAL_STORAGE_KEYS.locale
    );

    if (!initialLanguage) {
      initialLanguage = window.navigator.language.split("-")[0];
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.locale, initialLanguage);
    }

    if (initialLanguage === "uk" || initialLanguage === "en") {
      setLocale(initialLanguage);
    }
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <IntlProvider
        locale={locale}
        defaultLocale={locale}
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
    throw new Error("useLocaleContext must be used within a LocaleProvider");
  }

  return context;
};

export { I18nProvider, useLocaleContext, LocaleContext };
