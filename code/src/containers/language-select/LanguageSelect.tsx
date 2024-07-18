import AppMenuItem from "@/components/app-menu-item/AppMenuItem";
import AppSelect from "@/components/app-select/AppSelect";
import AppTypography from "@/components/app-typography/AppTypography";

import { LOCAL_STORAGE_KEYS } from "@/constants/common";
import locales from "@/constants/locales";
import { useLocaleContext } from "@/context/I18nProvider";

import "@/containers/language-select/LanguageSelect.scss";

const LanguageSelect = () => {
  const { locale, setLocale } = useLocaleContext();

  const localesItems = locales.map(({ translationKey, key, icon }) => {
    const handleLocaleChange = () => {
      setLocale(key);
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.locale, key);
    };
    return (
      <AppMenuItem
        key={key}
        value={key}
        onClick={handleLocaleChange}
        className="language-select__item"
      >
        <svg className="language-select__item-icon">
          <use href={icon} />
        </svg>
        <AppTypography translationKey={translationKey} />
      </AppMenuItem>
    );
  });

  return (
    <AppSelect
      className="language-select__container"
      labelId="language-select"
      inputProps={{
        className: "language-select"
      }}
      defaultValue={locale}
      value={locale}
      color="dark"
    >
      {localesItems}
    </AppSelect>
  );
};

export default LanguageSelect;
