import { ChangeEvent, useState } from "react";
import { Controller, ControllerRenderProps } from "react-hook-form";

import {
  ProductFormImageSectionProps,
  ProductFormValues
} from "@/containers/forms/product-form/ProductForm.types";

import AppBox from "@/components/app-box/AppBox";
import AppInput from "@/components/app-input/AppInput";
import AppTypography from "@/components/app-typography/AppTypography";

type ControllerRenderFunctionProps = {
  field: ControllerRenderProps<ProductFormValues, "image">;
};

const Image = ({ errors, control }: ProductFormImageSectionProps) => {
  const [isError, setIsError] = useState(false);

  const handleImgError = () => {
    setIsError(true);
  };

  const imageLabelTranslationKey = isError
    ? "productForm.image.previewError"
    : "productForm.image.preview";

  const controllerRenderFunction = ({
    field: { onChange, ...handlers }
  }: ControllerRenderFunctionProps) => {
    const handleChange = (event: ChangeEvent) => {
      onChange(event);
      setIsError(false);
    };

    const imageElement =
      handlers.value && !isError ? (
        <AppBox
          component="img"
          className="product-form__image"
          alt="Product image preview"
          data-testid="product-form-image-preview"
          src={handlers.value}
          onError={handleImgError}
        />
      ) : (
        <AppTypography
          translationKey={imageLabelTranslationKey}
          className="product-form__image-preview-text"
          variant="caption"
        />
      );

    return (
      <AppBox className="product-form__container product-form__image-section">
        <AppBox className="product-form__header">
          <AppTypography
            component="h1"
            variant="h3"
            translationKey="dashboardProduct.section.image.title"
            className="product-form__header-title"
          />
        </AppBox>
        <AppBox className="product-form__body">
          <AppBox className="product-form__image-preview">
            {imageElement}
          </AppBox>
          <AppInput
            fullWidth
            labelTranslationKey="productForm.inputLabel.image"
            data-testid="product-form-image-input"
            error={Boolean(errors.image)}
            helperText={errors.image ? errors.image.message : undefined}
            onChange={handleChange}
            {...handlers}
          />
        </AppBox>
      </AppBox>
    );
  };

  return (
    <Controller
      name="image"
      control={control}
      render={controllerRenderFunction}
    />
  );
};

export default Image;
