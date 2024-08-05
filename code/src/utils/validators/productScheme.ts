import { z } from "zod";

import { ProductTranslation } from "@/containers/forms/product-form/ProductForm.types";

const validateProductLanguageFields = (data: ProductTranslation) => {
  const isDescriptionEmpty = !data.description?.trim();
  const isNameEmpty = !data.name?.trim();

  return isNameEmpty === isDescriptionEmpty;
};

const getProductLanguageFieldsError = (
  data: ProductTranslation,
  index: number
) => {
  const isDescriptionEmpty = !data.description?.trim();
  const isNameEmpty = !data.name?.trim();

  if (!isNameEmpty && isDescriptionEmpty) {
    return {
      message:
        "Either both name and description must be filled, either none of them",
      path: [index, "description"]
    };
  }

  return {
    message:
      "Either both name and description must be filled, either none of them",
    path: [index, "name"]
  };
};

const productTranslationSchema = z.object({
  name: z
    .string({ message: "Name cannot be empty" })
    .min(3, { message: "Name is too short" })
    .max(200, { message: "Name is too long" })
    .optional()
    .or(z.literal("")),
  description: z
    .string({ message: "Description cannot be empty" })
    .min(10, { message: "Description is too short" })
    .max(1000, { message: "Description is too long" })
    .optional()
    .or(z.literal("")),
  languageCode: z.string({ message: "Language code cannot be empty" })
});

const productScheme = z.object({
  image: z.string().url({ message: "Please provide a valid URL" }),
  price: z
    .number({ message: "Invalid price" })
    .min(0, { message: "Must be bigger than 0" })
    .max(100000000, { message: "Must be less than 100 mln" }),
  status: z.boolean(),
  quantity: z
    .number({ message: "Invalid quantity" })
    .min(0, { message: "Must be bigger than 0" })
    .max(100000000, { message: "Must be less than 100 mln" }),
  category: z.number({ message: "Please, select a category" }),
  productTranslations: z
    .array(productTranslationSchema)
    .refine(
      ([data]) => validateProductLanguageFields(data as ProductTranslation),
      ([data]) => getProductLanguageFieldsError(data as ProductTranslation, 0)
    )
    .refine(
      ([, data]) => validateProductLanguageFields(data as ProductTranslation),
      ([, data]) => getProductLanguageFieldsError(data as ProductTranslation, 1)
    )
    .refine(
      (translations) => {
        const isAllUnfilled = translations.every(
          (item) => !item.name?.trim() && !item.description?.trim()
        );

        return !isAllUnfilled;
      },
      {
        message:
          "At least one translation must have non-empty name and description"
      }
    )
});

export default productScheme;
