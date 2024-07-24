import { NewProductFormValues } from "@/containers/forms/new-product-form/NewProductForm.types";

import { supportedLocales } from "@/constants/locales";

export const defaultValues: NewProductFormValues = {
  status: false,
  image: "",
  quantity: 0,
  price: 0,
  tagIds: [],
  productTranslations: supportedLocales.map((item) => ({
    name: "",
    description: "",
    languageCode: item
  }))
};

export const categories = [
  { label: "category.computer", id: 1 },
  { label: "category.tablet", id: 2 },
  { label: "category.mobile", id: 3 }
];
