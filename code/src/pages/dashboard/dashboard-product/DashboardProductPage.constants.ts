import { Locale } from "@/context/i18n/I18nProvider";

export const dashboardProductPageNotFoundErrorConfig = {
  errorType: "notFound",
  errorMessageTranslationKey: "product.productNotFound"
} as const;

type ProductLocale = {
  key: Locale;
  translationKey: string;
};

export const productLocales: ProductLocale[] = [
  { key: "en", translationKey: "language.full.en" },
  { key: "uk", translationKey: "language.full.uk" }
];
