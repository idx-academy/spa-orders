import { FormState } from "react-hook-form";

import { ProductFormValues } from "@/containers/forms/product-form/ProductForm.types";

const filterDirtyFields = (
  values: ProductFormValues,
  dirtyFields: FormState<ProductFormValues>["dirtyFields"]
) => {
  const dirtyFieldsKeys = Object.keys(
    dirtyFields
  ) as (keyof ProductFormValues)[];

  const result: Partial<ProductFormValues> = dirtyFieldsKeys.reduce(
    (acc, key) => {
      if (Array.isArray(values[key]) && dirtyFields.productTranslations) {
        const translations = values.productTranslations.map(
          (item, index) =>
            dirtyFields.productTranslations &&
            dirtyFields.productTranslations[index] &&
            item
        );
        const changedTranslations = translations.filter((item) => item);

        return { ...acc, [key]: changedTranslations };
      }

      const value = values[key];

      return { ...acc, [key]: value };
    },
    {}
  );

  return result;
};

export default filterDirtyFields;
