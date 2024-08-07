import { useNavigate } from "react-router-dom";

import routes from "@/constants/routes";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { useCreateProductMutation } from "@/store/api/productsApi";
import { CreateProductBody } from "@/types/product.types";

const useCreateProduct = () => {
  const [createProduct, requestState] = useCreateProductMutation();

  const { openSnackbarWithTimeout } = useSnackbar();

  const navigate = useNavigate();

  const onSubmit = async (values: CreateProductBody) => {
    try {
      const data = await createProduct(values).unwrap();

      openSnackbarWithTimeout({
        variant: "success",
        messageTranslationKey: "productForm.creation.success"
      });

      navigate(routes.dashboard.products.productDetails.path(data.id));
    } catch (e: unknown) {
      openSnackbarWithTimeout({
        variant: "error",
        messageTranslationKey: "productForm.creation.fail"
      });
    }
  };

  return [onSubmit, requestState] as const;
};

export default useCreateProduct;
