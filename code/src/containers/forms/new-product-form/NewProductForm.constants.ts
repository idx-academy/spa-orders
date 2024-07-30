import { NewProductFormValues } from "@/containers/forms/new-product-form/NewProductForm.types";

import { supportedLocales } from "@/constants/locales";

export const defaultValues: NewProductFormValues = {
  status: false,
  image: "",
  quantity: undefined,
  price: undefined,
  tagIds: [],
  productTranslations: supportedLocales.map((item) => ({
    name: "",
    description: "",
    languageCode: item
  }))
};

export const categories = [
  { label: "productsAll.mobile", id: "mobile", value: 1 },
  { label: "productsAll.tablet", id: "tablet", value: 2 },
  { label: "productsAll.computer", id: "computer", value: 3 }
];
