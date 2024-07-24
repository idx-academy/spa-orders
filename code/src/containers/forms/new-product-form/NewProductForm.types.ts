import { Locale } from "@/context/i18n/I18nProvider";

export type NewProductFormValues = {
  status: boolean;
  image: string;
  quantity: number;
  price: number;
  tagIds: number[];
  productTranslations: ProductTranslation[];
};

export type ProductTranslation = {
  name: string;
  description: string;
  languageCode: Locale;
};
