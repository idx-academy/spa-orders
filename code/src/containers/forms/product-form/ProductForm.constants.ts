import { Locale } from "@/context/i18n/I18nProvider";

type ProductLocale = {
  key: Locale;
  translationKey: string;
};

export const productLocales: ProductLocale[] = [
  { key: "en", translationKey: "language.full.english" },
  { key: "uk", translationKey: "language.full.ukrainian" }
];

export type ProductCategory = {
  label: string;
  id: number;
};

export const productCategories: ProductCategory[] = [
  { label: "productsAll.mobile", id: 1 },
  { label: "productsAll.tablet", id: 2 },
  { label: "productsAll.computer", id: 3 }
];
