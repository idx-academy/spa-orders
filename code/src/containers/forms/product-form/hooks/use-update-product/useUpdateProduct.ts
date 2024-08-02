import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { useUpdateProductMutation } from "@/store/api/productsApi";
import { UpdateProductBody } from "@/types/product.types";

const useUpdateProduct = () => {
  const [updateProduct, requestState] = useUpdateProductMutation();

  const { openSnackbarWithTimeout } = useSnackbar();

  const onSubmit = async (body: UpdateProductBody) => {
    try {
      await updateProduct(body).unwrap();

      openSnackbarWithTimeout({
        variant: "success",
        messageTranslationKey: "productForm.updation.success"
      });
    } catch (e: unknown) {
      openSnackbarWithTimeout({
        variant: "error",
        messageTranslationKey: "productForm.updation.fail"
      });
    }
  };

  return [onSubmit, requestState] as const;
};

export default useUpdateProduct;
