import { ChangeEvent, useState } from "react";

import { ImagePreviewProps } from "@/containers/forms/new-product-form/NewProductForm.types";

import AppBox from "@/components/app-box/AppBox";
import AppInput from "@/components/app-input/AppInput";
import AppTypography from "@/components/app-typography/AppTypography";

const ImagePreview = ({ imageInputProps }: ImagePreviewProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isError, setIsError] = useState(false);

  const handleImgError = () => {
    setIsError(true);
  };

  const imageLabelTranslationKey = isError
    ? "productForm.image.previewError"
    : "productForm.image.preview";

  const imageContent =
    imageUrl && !isError ? (
      <AppBox
        component="img"
        className="product-form__image"
        src={imageUrl}
        onError={handleImgError}
      />
    ) : (
      <AppTypography
        translationKey={imageLabelTranslationKey}
        className="product-form__image-preview-text"
        variant="caption"
      />
    );

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setIsError(false);
    setImageUrl(value);

    imageInputProps.onChange(event);
  };

  return (
    <>
      <AppBox className="product-form__image-preview">{imageContent}</AppBox>
      <AppInput
        fullWidth
        data-cy="image-url-input"
        labelTranslationKey="productForm.inputLabel.image"
        data-testid="new-product-image-input"
        {...imageInputProps}
        onChange={onChange}
      />
    </>
  );
};

export default ImagePreview;
