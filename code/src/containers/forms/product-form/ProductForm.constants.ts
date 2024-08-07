import { ProductFormValues } from "@/containers/forms/product-form/ProductForm.types";

import { supportedLocales } from "@/constants/locales";
import { Locale } from "@/context/i18n/I18nProvider";

type ProductLocale = {
  key: Locale;
  translationKey: string;
};

export const productLocales: ProductLocale[] = [
  { key: "en", translationKey: "language.full.en" },
  { key: "uk", translationKey: "language.full.uk" }
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

export const defaultValues: ProductFormValues = {
  status: false,
  image: "",
  quantity: undefined,
  price: undefined,
  category: "",
  productTranslations: supportedLocales.map((item) => ({
    name: "",
    description: "",
    languageCode: item
  }))
};
