import { z } from "zod";

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

const productCreationScheme = z.object({
  image: z.string().url({ message: "Please provide a valid URL" }),
  price: z
    .number({ message: "Invalid price" })
    .min(0, { message: "Invalid price" })
    .max(100000000, { message: "Must be less than 100 mln" }),
  status: z.boolean(),
  quantity: z
    .number({ message: "Invalid quantity" })
    .min(0, { message: "Invalid quantity" })
    .max(100000000, { message: "Must be less than 100 mln" }),
  tagIds: z.array(z.number()).min(1, { message: "Select at least one tag" }),
  productTranslations: z.array(productTranslationSchema).refine(
    // To check if at least one translation has non-empty name and description
    (translations) => {
      return translations.some(
        (translation) =>
          translation.name?.trim() && translation.description?.trim()
      );
    },
    {
      message:
        "At least one translation must have non-empty name and description"
    }
  )
});

export default productCreationScheme;
