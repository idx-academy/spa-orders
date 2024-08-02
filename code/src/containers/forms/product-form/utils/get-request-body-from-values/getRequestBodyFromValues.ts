import { ProductFormValues } from "@/containers/forms/product-form/ProductForm.types";

import { ProductBody } from "@/types/product.types";

const getRequestBodyFromValues = (
  values: Partial<ProductFormValues>
): ProductBody => {
  const valuesKeys = Object.keys(values) as (keyof ProductFormValues)[];

  const result = valuesKeys.reduce((acc, key) => {
    if (key === "productTranslations" && values.productTranslations) {
      const translations = values.productTranslations.filter(
        (item) => item.name || item.description
      );

      return {
        ...acc,
        productTranslations: translations
      };
    } else if (key === "status") {
      return { ...acc, status: values.status ? "VISIBLE" : "HIDDEN" };
    } else if (key === "category") {
      return { ...acc, tagIds: [values.category] };
    }

    return { ...acc, [key]: values[key] };
  }, {}) as ProductBody;

  return result;
};

export default getRequestBodyFromValues;
