import { useState } from "react";
import { useForm } from "react-hook-form";

import { SelectChangeEvent } from "@mui/material/Select/SelectInput";

import {
  categories,
  defaultValues
} from "@/containers/forms/new-product-form/NewProductForm.constants";
import { NewProductFormValues } from "@/containers/forms/new-product-form/NewProductForm.types";
import ImagePreview from "@/containers/forms/new-product-form/components/image-preview/ImagePreview";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppCheckbox from "@/components/app-checkbox/AppCheckbox";
import AppInput from "@/components/app-input/AppInput";
import AppMenuItem from "@/components/app-menu-item/AppMenuItem";
import AppSelect from "@/components/app-select/AppSelect";
import AppTypography from "@/components/app-typography/AppTypography";

import { supportedLocales } from "@/constants/locales";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { useCreateProductMutation } from "@/store/api/productsApi";
import isErrorWithStatus from "@/utils/is-error-with-status/isErrorWithStatus";

import "@/containers/forms/new-product-form/NewProductForm.scss";

const NewProductForm = () => {
  const { setValue, handleSubmit, register } = useForm<NewProductFormValues>({
    defaultValues
  });

  const { openSnackbarWithTimeout } = useSnackbar();

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value;
    setSelectedCategory(value as string);
    setValue("tagIds", [Number(value)]);
  };

  const onSubmit = async (values: NewProductFormValues) => {
    const product = {
      price: Number(values.price),
      quantity: Number(values.quantity),
      productTranslations: values.productTranslations.filter(
        (item) => item.name && item.description
      ),
      image: values.image,
      tagIds: values.tagIds,
      status: values.status ? "VISIBLE" : "HIDDEN"
    } as const;

    try {
      await createProduct(product).unwrap();

      openSnackbarWithTimeout({
        variant: "success",
        messageTranslationKey: "productForm.creation.success"
      });
    } catch (e: unknown) {
      const messageTranslationKey =
        isErrorWithStatus(e) && e.status === 400
          ? "productForm.creation.validationError"
          : "productForm.creation.fail";

      openSnackbarWithTimeout({
        variant: "error",
        messageTranslationKey: messageTranslationKey
      });
    }
  };

  return (
    <AppBox component="form" onSubmit={handleSubmit(onSubmit)}>
      <AppBox className="product-form">
        <AppBox className="product-form__container product-form__image-section">
          <AppBox className="product-form__header">
            <AppTypography
              component="h1"
              variant="h3"
              translationKey="productForm.section.image.title"
              className="product-form__header-title"
            />
          </AppBox>
          <AppBox className="product-form__body">
            <ImagePreview imageInputProps={register("image")} />
          </AppBox>
        </AppBox>
        <AppBox className="product-form__container product-form__additional-info-section">
          <AppBox className="product-form__header">
            <AppTypography
              component="h1"
              variant="h3"
              translationKey="productForm.section.additionalInformation.title"
              className="product-form__header-title"
            />
          </AppBox>
          <AppBox className="product-form__body">
            <AppBox className="product-form__quantity-price-container">
              <AppInput
                fullWidth
                labelTranslationKey="productForm.inputLabel.price"
                inputProps={{ min: 0 }}
                type="number"
                {...register("price")}
              />
              <AppInput
                fullWidth
                labelTranslationKey="productForm.inputLabel.quantity"
                inputProps={{ min: 0 }}
                type="number"
                {...register("quantity")}
              />
            </AppBox>
            <AppBox className="product-form__category-select-container">
              <AppSelect
                fullWidth
                label="productForm.inputLabel.category"
                inputProps={{
                  className: "product-form__category-select"
                }}
                value={selectedCategory}
                onChange={handleSelectChange}
              >
                {categories.map((item) => (
                  <AppMenuItem value={item.id} key={item.id}>
                    <AppTypography
                      className="product-form__category-select-label"
                      translationKey={item.label}
                    />
                  </AppMenuItem>
                ))}
              </AppSelect>
            </AppBox>
            <AppCheckbox
              className="product-form__visibility-checkbox"
              variant="dark"
              labelTranslationKey="productForm.inputLabel.status"
              labelClassName="product-form__visibility-checkbox-label"
              {...register("status")}
            />
          </AppBox>
        </AppBox>
        <AppBox className="product-form__main-info-section">
          {supportedLocales.map((locale, index) => (
            <AppBox className="product-form__container" key={locale}>
              <AppBox className="product-form__header">
                <AppTypography
                  component="h1"
                  variant="h3"
                  translationKey={`productForm.section.mainInformation.title.${locale}`}
                  className="product-form__header-title"
                />
              </AppBox>
              <AppBox className="product-form__body">
                <AppInput
                  className="product-form__text-input"
                  fullWidth
                  labelTranslationKey="productForm.inputLabel.name"
                  {...register(`productTranslations.${index}.name`)}
                />
                <AppInput
                  className="product-form__text-input"
                  fullWidth
                  multiline
                  labelTranslationKey="productForm.inputLabel.description"
                  inputProps={{
                    className: "product-form__description-input"
                  }}
                  rows={5}
                  {...register(`productTranslations.${index}.description`)}
                />
              </AppBox>
            </AppBox>
          ))}
          <AppButton
            className="product-form__footer-button"
            type="submit"
            size="extra-large"
            isLoading={isLoading}
            fullWidth
          >
            <AppTypography translationKey="productForm.submit" />
          </AppButton>
        </AppBox>
      </AppBox>
    </AppBox>
  );
};

export default NewProductForm;
