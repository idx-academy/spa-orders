import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
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
import AppFormHelperText from "@/components/app-form-helper-text/AppFormHelperText";
import AppInput from "@/components/app-input/AppInput";
import AppMenuItem from "@/components/app-menu-item/AppMenuItem";
import AppSelect from "@/components/app-select/AppSelect";
import AppTypography from "@/components/app-typography/AppTypography";

import { supportedLocales } from "@/constants/locales";
import routes from "@/constants/routes";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { useCreateProductMutation } from "@/store/api/productsApi";
import isErrorWithStatus from "@/utils/is-error-with-status/isErrorWithStatus";
import productCreationScheme from "@/utils/validators/productCreationScheme";

import "@/containers/forms/new-product-form/NewProductForm.scss";

const NewProductForm = () => {
  const {
    setValue,
    handleSubmit,
    register,
    clearErrors,
    formState: { errors }
  } = useForm<NewProductFormValues>({
    defaultValues,
    resolver: zodResolver(productCreationScheme)
  });

  const { openSnackbarWithTimeout } = useSnackbar();
  const navigate = useNavigate();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (errors.productTranslations?.root) {
      openSnackbarWithTimeout({
        variant: "error",
        messageTranslationKey: "productForm.creation.translationError"
      });
    }
  }, [errors.productTranslations?.root]);

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value;
    setSelectedCategory(value as string);
    setValue("tagIds", [Number(value)]);
    clearErrors("tagIds");
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
      navigate(routes.dashboard.products.path);
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

  const mainInfo = supportedLocales.map((locale, index) => {
    const isNameError = Boolean(errors.productTranslations?.[index]?.name);

    const nameHelperText =
      isNameError && errors.productTranslations?.[index]?.name?.message;

    const isDescriptionError = Boolean(
      errors.productTranslations?.[index]?.description
    );

    const descriptionHelperText =
      isDescriptionError &&
      errors.productTranslations?.[index]?.description?.message;

    return (
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
            error={isNameError}
            helperText={nameHelperText}
            data-testid={`new-product-name-input-${locale}`}
            data-cy={`new-product-name-input-${locale}`}
            {...register(`productTranslations.${index}.name`)}
          />
          <AppInput
            className="product-form__text-input"
            fullWidth
            multiline
            labelTranslationKey="productForm.inputLabel.description"
            data-testid={`new-product-description-input-${locale}`}
            data-cy={`new-product-description-input-${locale}`}
            inputProps={{
              className: "product-form__description-input"
            }}
            rows={5}
            error={isDescriptionError}
            helperText={descriptionHelperText}
            {...register(`productTranslations.${index}.description`)}
          />
        </AppBox>
      </AppBox>
    );
  });

  const categorySelect = (
    <>
      <AppSelect
        fullWidth
        label="productForm.inputLabel.category"
        inputProps={{
          className: "product-form__category-select"
        }}
        error={Boolean(errors.tagIds)}
        value={selectedCategory}
        onChange={handleSelectChange}
        data-testid="new-product-category-select"
        data-cy="new-product-category-select"
      >
        {categories.map(({ label, id, value }) => (
          <AppMenuItem value={value} key={id} data-cy={`category-${id}`}>
            <AppTypography
              className="product-form__category-select-label"
              translationKey={label}
            />
          </AppMenuItem>
        ))}
      </AppSelect>
      {errors.tagIds && (
        <AppFormHelperText
          className="product-form__category-select-helper"
          error
        >
          {errors.tagIds.message}
        </AppFormHelperText>
      )}
    </>
  );

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
            <ImagePreview
              imageInputProps={{
                ...register("image"),
                error: Boolean(errors.image),
                helperText: errors.image ? errors.image.message : undefined
              }}
            />
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
                inputProps={{ min: 0, step: "0.5" }}
                type="number"
                error={Boolean(errors.price)}
                helperText={errors.price ? errors.price.message : undefined}
                data-testid="new-product-price-input"
                data-cy="new-product-price-input"
                {...register("price", { valueAsNumber: true })}
              />
              <AppInput
                fullWidth
                labelTranslationKey="productForm.inputLabel.quantity"
                inputProps={{ min: 0 }}
                type="number"
                error={Boolean(errors.quantity)}
                helperText={
                  errors.quantity ? errors.quantity.message : undefined
                }
                data-testid="new-product-quantity-input"
                data-cy="new-product-quantity-input"
                {...register("quantity", { valueAsNumber: true })}
              />
            </AppBox>
            <AppBox className="product-form__category-select-container">
              {categorySelect}
            </AppBox>
            <AppCheckbox
              className="product-form__visibility-checkbox"
              variant="dark"
              labelTranslationKey="productForm.inputLabel.status"
              labelClassName="product-form__visibility-checkbox-label"
              data-testid="new-product-status-checkbox"
              data-cy="new-product-visible-status-checkbox"
              {...register("status")}
            />
          </AppBox>
        </AppBox>
        <AppBox className="product-form__main-info-section">
          {mainInfo}
          <AppButton
            className="product-form__footer-button"
            type="submit"
            size="extra-large"
            isLoading={isLoading}
            fullWidth
            data-cy="create-product-button"
          >
            <AppTypography translationKey="productForm.submit" />
          </AppButton>
        </AppBox>
      </AppBox>
    </AppBox>
  );
};

export default NewProductForm;
