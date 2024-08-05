import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { defaultValues } from "@/containers/forms/product-form/ProductForm.constants";
import { ProductFormValues } from "@/containers/forms/product-form/ProductForm.types";
import AdditionalInfo from "@/containers/forms/product-form/components/additional-info/AdditionalInfo";
import ImagePreview from "@/containers/forms/product-form/components/image/Image";
import MainInfo from "@/containers/forms/product-form/components/main-info/MainInfo";
import useCreateProduct from "@/containers/forms/product-form/hooks/use-create-product/useCreateProduct";
import getRequestBodyFromValues from "@/containers/forms/product-form/utils/get-request-body-from-values/getRequestBodyFromValues";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import productScheme from "@/utils/validators/productScheme";

import "@/containers/forms/product-form/ProductForm.scss";

const CreateProductForm = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm<ProductFormValues>({
    defaultValues: defaultValues,
    resolver: zodResolver(productScheme)
  });

  const [createProduct, { isLoading }] = useCreateProduct();

  const onSubmit = async (values: ProductFormValues) => {
    const body = getRequestBodyFromValues(values);
    await createProduct(body);
  };

  return (
    <AppBox component="form" onSubmit={handleSubmit(onSubmit)}>
      <AppBox className="product-form">
        <ImagePreview control={control} register={register} errors={errors} />
        <AdditionalInfo control={control} register={register} errors={errors} />
        <AppBox className="product-form__main-info-section">
          <MainInfo register={register} errors={errors} />
          <AppButton
            className="product-form__footer-button"
            type="submit"
            isLoading={isLoading}
            fullWidth
          >
            <AppTypography translationKey="productForm.create.submit" />
          </AppButton>
        </AppBox>
      </AppBox>
    </AppBox>
  );
};

export default CreateProductForm;
