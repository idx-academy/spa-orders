import { useState } from "react";

import { productLocales } from "@/containers/forms/product-form/ProductForm.constants";
import { ProductFormMainInfoSectionProps } from "@/containers/forms/product-form/ProductForm.types";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppInput from "@/components/app-input/AppInput";
import AppTypography from "@/components/app-typography/AppTypography";

import cn from "@/utils/cn/cn";

const MainInfo = ({ register, errors }: ProductFormMainInfoSectionProps) => {
  const [selectedLocaleIndex, setSelectedLocaleIndex] = useState(0);

  const translationsErrors = errors.productTranslations;
  const selectedTranslationErrors = translationsErrors?.[selectedLocaleIndex];

  const languageButtons = productLocales.map((item, index) => {
    const buttonClassNames = cn(
      "product-form__language-button",
      index === selectedLocaleIndex && "product-form__language-button--active",
      translationsErrors?.[index] && "product-form__language-button--error"
    );

    const handleClick = () => setSelectedLocaleIndex(index);

    return (
      <AppButton
        variant="contained"
        size="small"
        key={item.key}
        className={buttonClassNames}
        data-testid="product-form-language-button"
        onClick={handleClick}
      >
        <AppTypography translationKey={item.translationKey} />
      </AppButton>
    );
  });

  const rootErrorMessage = translationsErrors?.root?.message;

  const nameErrorMessage =
    selectedTranslationErrors?.name?.message || rootErrorMessage;
  const descriptionErrorMessage =
    selectedTranslationErrors?.description?.message || rootErrorMessage;

  return (
    <AppBox
      className="product-form__container product-form__main-info-container"
      data-testid={`main-info-${productLocales[selectedLocaleIndex].key}`}
    >
      <AppBox
        className={cn("product-form__header", "product-form__header-main")}
      >
        <AppTypography
          component="h1"
          variant="h3"
          translationKey="dashboardProduct.section.mainInformation.title"
          className="product-form__header-title"
        />
        <AppBox className="product-form__language-buttons">
          {languageButtons}
        </AppBox>
      </AppBox>
      <AppBox className="product-form__body" key={selectedLocaleIndex}>
        <AppInput
          className="product-form__text-input"
          fullWidth
          labelTranslationKey="product.name"
          data-testid={"product-form-name-input"}
          error={Boolean(nameErrorMessage)}
          helperText={nameErrorMessage}
          {...register(`productTranslations.${selectedLocaleIndex}.name`)}
        />
        <AppInput
          className="product-form__text-input"
          fullWidth
          multiline
          labelTranslationKey="product.description"
          inputProps={{
            className: "product-form__description-input"
          }}
          rows={18}
          data-testid={"product-form-description-input"}
          error={Boolean(descriptionErrorMessage)}
          helperText={descriptionErrorMessage}
          {...register(
            `productTranslations.${selectedLocaleIndex}.description`
          )}
        />
      </AppBox>
    </AppBox>
  );
};

export default MainInfo;
