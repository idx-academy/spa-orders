import getDefaultValues from "@/containers/forms/product-form/utils/get-default-values/getDefaultValues";

import { FullManagerProduct } from "@/types/product.types";

const product: FullManagerProduct = {
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  status: "VISIBLE",
  image:
    "https://j65jb0fdkxuua0go.public.blob.vercel-storage.com/phone_1-QodrkqNjm6MWrKqg9ixBBMMfFU40X7.jpg",
  createdAt: "2024-07-29T20:20:02.404Z",
  quantity: 10,
  price: 999.99,
  tags: [
    {
      id: 1,
      name: "category:mobile"
    }
  ],
  productTranslations: [
    {
      name: "APPLE Айфон",
      description: "Дисплей 6.1 Super Retina XDR, 2532x1170 / A16 Bionic chip",
      languageCode: "uk"
    }
  ]
};

const outputProduct = {
  quantity: product.quantity,
  price: product.price,
  image: product.image,
  status: product.status === "VISIBLE",
  category: product.tags[0].id,
  productTranslations: [
    {
      name: "",
      description: "",
      languageCode: "en"
    }
  ].concat(product.productTranslations)
};

describe("Test getDefaultValues", () => {
  test("Should return default values for product form", () => {
    const result = getDefaultValues(product);

    expect(result).toEqual(outputProduct);
  });

  test("Should return default value with different status", () => {
    const newProduct: FullManagerProduct = { ...product, status: "HIDDEN" };
    const result = getDefaultValues(newProduct);

    expect(result).toEqual({ ...outputProduct, status: false });
  });
});
