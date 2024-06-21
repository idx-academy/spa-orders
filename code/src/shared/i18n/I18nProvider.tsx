import { FC, ReactNode } from "react";
import { IntlProvider } from "react-intl";
import messages from "@/messages";

type I18nProividerProps = {
  children: ReactNode;
};

const I18nProivider: FC<I18nProividerProps> = ({ children }) => {
  return (
    <IntlProvider locale="uk" defaultLocale="uk" messages={messages.uk}>
      {children}
    </IntlProvider>
  );
};

export default I18nProivider;
