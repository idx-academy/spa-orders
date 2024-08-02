import { ProductFormValues } from "@/containers/forms/product-form/ProductForm.types";
import getRequestBodyFromValues from "@/containers/forms/product-form/utils/get-request-body-from-values/getRequestBodyFromValues";

const testValues: ProductFormValues = {
  status: true,
  price: 15,
  quantity: 10,
  category: 1,
  image: "http://example-image.com",
  productTranslations: [
    { name: "test", description: "test", languageCode: "en" },
    { name: "", description: "", languageCode: "uk" }
  ]
};

const expectedBody = {
  status: "VISIBLE",
  price: 15,
  quantity: 10,
  tagIds: [1],
  image: "http://example-image.com",
  productTranslations: [
    { name: "test", description: "test", languageCode: "en" }
  ]
};

const bodyWithEmptyDescription: Pick<ProductFormValues, "productTranslations"> =
  {
    productTranslations: [{ name: "test", description: "", languageCode: "en" }]
  };

describe("Test getRequestBodyFromValues", () => {
  test("Should return request body from values", () => {
    const result = getRequestBodyFromValues(testValues);
    expect(result).toEqual(expectedBody);
  });

  test("Should return request body from values with different status", () => {
    const result = getRequestBodyFromValues({ ...testValues, status: false });

    expect(result).toEqual({ ...expectedBody, status: "HIDDEN" });
  });

  test("Should work correctly if only name in translations is filled", () => {
    const result = getRequestBodyFromValues(bodyWithEmptyDescription);

    expect(result).toEqual(bodyWithEmptyDescription);
  });
});
