import { useMemo } from "react";
import { useIntl } from "react-intl";

import { useLocaleContext } from "@/context/i18n/I18nProvider";

const useLongestTranslationLength = <T>(
  translationList: T[],
  extractTranslationKey: (value: T) => string
) => {
  const { locale } = useLocaleContext();
  const { formatMessage } = useIntl();

  const longestTranslationLength = useMemo(() => {
    return translationList.reduce((max, value) => {
      const translated = formatMessage({ id: extractTranslationKey(value) });
      const translatedLength = translated.length;
      return Math.max(max, translatedLength);
    }, 0);
  }, [locale]);

  return longestTranslationLength;
};

export default useLongestTranslationLength;
