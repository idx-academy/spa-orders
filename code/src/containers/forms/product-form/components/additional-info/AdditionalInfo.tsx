import { Controller, ControllerRenderProps } from "react-hook-form";

import { productCategories } from "@/containers/forms/product-form/ProductForm.constants";
import {
  ProductFormAdditionalInfoSectionProps,
  ProductFormValues
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
  }: {
    field: ControllerRenderProps<ProductFormValues>;
  }) => (
    <>
      <AppSelect
        fullWidth
        label="productForm.inputLabel.category"
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

  return (
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
            inputProps={{ min: 0, step: "any" }}
            type="number"
            error={Boolean(errors.price)}
            helperText={errors.price ? errors.price.message : undefined}
            data-testid="product-form-price-input"
            {...register("price", { valueAsNumber: true })}
          />
          <AppInput
            fullWidth
            labelTranslationKey="productForm.inputLabel.quantity"
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
        <AppCheckbox
          className="product-form__visibility-checkbox"
          variant="dark"
          labelTranslationKey="productForm.inputLabel.status"
          labelClassName="product-form__visibility-checkbox-label"
          data-testid="product-form-status-checkbox"
          {...register("status")}
        />
      </AppBox>
    </AppBox>
  );
};

export default AdditionalInfo;
