import enIcon from "@/assets/icons/en.svg";
import ukIcon from "@/assets/icons/uk.svg";
import { Locale } from "@/context/i18n/I18nProvider";

type LocalesType = {
  key: Locale;
  translationKey: string;
  icon?: string;
};

const locales: LocalesType[] = [
  {
    key: "en",
    translationKey: "language.english",
    icon: `${enIcon}#en-icon-id`
  },
  {
    key: "uk",
    translationKey: "language.ukrainian",
    icon: `${ukIcon}#uk-icon-id`

  }
];

export default locales;
