import { FC, ReactNode } from "react";
import { IntlProvider } from "react-intl";

import messages from "@/messages";

type I18nProividerProps = {
  children: ReactNode;
};

const I18nProivider: FC<I18nProividerProps> = ({ children }) => {
  return (
    <IntlProvider locale="en" defaultLocale="en" messages={messages.en}>
      {children}
    </IntlProvider>
  );
};

export default I18nProivider;
