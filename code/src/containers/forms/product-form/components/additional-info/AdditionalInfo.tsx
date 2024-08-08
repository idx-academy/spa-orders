import { SyntheticEvent } from "react";
import { Controller } from "react-hook-form";

import { productCategories } from "@/containers/forms/product-form/ProductForm.constants";
import {
  ProductFormAdditionalInfoSectionProps,
  ProductFormControllerRenderFunctionProps
} from "@/containers/forms/product-form/ProductForm.types";

import AppBox from "@/components/app-box/AppBox";
import AppCheckbox from "@/components/app-checkbox/AppCheckbox";
import AppFormHelperText from "@/components/app-form-helper-text/AppFormHelperText";
import AppInput from "@/components/app-input/AppInput";
import AppMenuItem from "@/components/app-menu-item/AppMenuItem";
import AppSelect from "@/components/app-select/AppSelect";
import AppTypography from "@/components/app-typography/AppTypography";

const AdditionalInfo = ({
  register,
  errors,
  control
}: ProductFormAdditionalInfoSectionProps) => {
  const categoryErrorElement = errors.category && (
    <AppFormHelperText className="product-form__category-select-helper" error>
      {errors.category.message}
    </AppFormHelperText>
  );

  const categoryItems = productCategories.map(({ id, label }) => (
    <AppMenuItem value={id} key={id}>
      <AppTypography
        className="product-form__category-select-label"
        translationKey={label}
      />
    </AppMenuItem>
  ));

  const selectControllerRenderFunction = ({
    field: handlers
  }: ProductFormControllerRenderFunctionProps) => (
    <>
      <AppSelect
        fullWidth
        label="product.category"
        inputProps={{
          className: "product-form__category-select"
        }}
        error={Boolean(errors.category)}
        data-testid="product-form-category-select"
        {...handlers}
      >
        {categoryItems}
      </AppSelect>
      {categoryErrorElement}
    </>
  );

  const checkboxControllerRenderFunction = ({
    field: { onChange, ...props }
  }: ProductFormControllerRenderFunctionProps) => {
    const handelChange = (_: SyntheticEvent, checked: boolean) => {
      onChange(checked);
    };

    return (
      <AppCheckbox
        className="product-form__visibility-checkbox"
        variant="dark"
        labelTranslationKey="productForm.inputLabel.status"
        labelClassName="product-form__visibility-checkbox-label"
        data-testid="product-form-status-checkbox"
        checked={Boolean(props.value)}
        onChange={handelChange}
        {...props}
      />
    );
  };

  return (
    <AppBox className="product-form__container product-form__additional-info-section">
      <AppBox className="product-form__header">
        <AppTypography
          component="h1"
          variant="h3"
          translationKey="dashboardProduct.section.additionalInformation.title"
          className="product-form__header-title"
        />
      </AppBox>
      <AppBox className="product-form__body">
        <AppBox className="product-form__quantity-price-container">
          <AppInput
            fullWidth
            labelTranslationKey="product.price"
            inputProps={{ min: 0, step: "any" }}
            type="number"
            error={Boolean(errors.price)}
            helperText={errors.price ? errors.price.message : undefined}
            data-testid="product-form-price-input"
            {...register("price", { valueAsNumber: true })}
          />
          <AppInput
            fullWidth
            labelTranslationKey="product.quantity"
            inputProps={{ min: 0 }}
            type="number"
            error={Boolean(errors.quantity)}
            helperText={errors.quantity ? errors.quantity.message : undefined}
            data-testid="product-form-quantity-input"
            {...register("quantity", { valueAsNumber: true })}
          />
        </AppBox>
        <AppBox className="product-form__category-select-container">
          <Controller
            name="category"
            control={control}
            render={selectControllerRenderFunction}
          />
        </AppBox>
        <Controller
          name="status"
          control={control}
          render={checkboxControllerRenderFunction}
        />
      </AppBox>
    </AppBox>
  );
};

export default AdditionalInfo;
