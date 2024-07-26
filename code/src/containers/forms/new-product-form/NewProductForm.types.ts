import { UseFormRegisterReturn } from "react-hook-form";

import { AppInputProps } from "@/components/app-input/AppInput.types";

import { Locale } from "@/context/i18n/I18nProvider";

export type NewProductFormValues = {
  status: boolean;
  image: string;
  quantity: number | undefined;
  price: number | undefined;
  tagIds: number[];
  productTranslations: ProductTranslation[];
};

export type ProductTranslation = {
  name: string;
  description: string;
  languageCode: Locale;
};

export type ImagePreviewProps = {
  imageInputProps: UseFormRegisterReturn<"image"> & AppInputProps;
};
