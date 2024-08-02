import { FormState } from "react-hook-form";

import { ProductFormValues } from "@/containers/forms/product-form/ProductForm.types";
import filterDirtyFields from "@/containers/forms/product-form/utils/filter-dirty-fields/filterDirtyFields";

const testValues: ProductFormValues = {
  status: true,
  price: 15,
  quantity: 10,
  category: 1,
  image: "http://example-image.com",
  productTranslations: [
    { name: "test", description: "test", languageCode: "en" },
    { name: "тест", description: "тест", languageCode: "uk" }
  ]
};

const dirtyFields = {
  quantity: true,
  category: true
};

const arrayDirtyFields = {
  productTranslations: [undefined, { name: true }]
} as FormState<ProductFormValues>["dirtyFields"];

describe("Test filterDirtyFields", () => {
  test("Should return only changed fields for simple value fields", () => {
    const result = filterDirtyFields(testValues, dirtyFields);

    expect(result).toEqual({
      quantity: 10,
      category: 1
    });
  });

  test("Should return only changed array elements for array fields", () => {
    const result = filterDirtyFields(testValues, arrayDirtyFields);

    expect(result).toEqual({
      productTranslations: testValues.productTranslations.slice(1)
    });
  });
});
