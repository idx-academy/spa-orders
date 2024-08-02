import { ProductFormValues } from "@/containers/forms/product-form/ProductForm.types";

import { supportedLocales } from "@/constants/locales";
import { FullManagerProduct } from "@/types/product.types";

const getDefaultValues = (product: FullManagerProduct): ProductFormValues => {
  const translations = supportedLocales.map((locale) => {
    const productTranslation = product.productTranslations.find(
      (item) => item.languageCode === locale
    );

    const defaultTranslation = {
      name: "",
      description: "",
      languageCode: locale
    };

    return productTranslation || defaultTranslation;
  });

  return {
    quantity: product.quantity,
    price: product.price,
    image: product.image,
    status: product.status === "VISIBLE",
    category: product.tags[0].id,
    productTranslations: translations
  } as const;
};

export default getDefaultValues;
