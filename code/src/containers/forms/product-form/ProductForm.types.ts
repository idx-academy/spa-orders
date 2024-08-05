import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormRegisterReturn
} from "react-hook-form";

import { AppInputProps } from "@/components/app-input/AppInput.types";

import { Locale } from "@/context/i18n/I18nProvider";
import { FullManagerProduct } from "@/types/product.types";

export type ProductFormValues = {
  status: boolean;
  image: string;
  quantity?: number;
  price?: number;
  category: number | "";
  productTranslations: ProductTranslation[];
};

export type ProductTranslation = {
  name: string;
  description: string;
  languageCode: Locale;
};

export type ImagePreviewProps = {
  imageInputProps: UseFormRegisterReturn<"image"> & AppInputProps;
  defaultValue?: string;
};

export type UpdateProductFormProps = {
  product: FullManagerProduct;
};

export type ProductFormRegisterFunction = UseFormRegister<ProductFormValues>;
export type ProductFormFieldErrors = FieldErrors<ProductFormValues>;
export type ProductFormControl = Control<ProductFormValues>;

export type ProductFormSectionProps = {
  register: ProductFormRegisterFunction;
  errors: ProductFormFieldErrors;
};

export type ProductFormSectionExtendedProps = ProductFormSectionProps & {
  control: ProductFormControl;
};

export type ProductFormImageSectionProps = ProductFormSectionExtendedProps;

export type ProductFormMainInfoSectionProps = ProductFormSectionProps;

export type ProductFormAdditionalInfoSectionProps =
  ProductFormSectionExtendedProps;
