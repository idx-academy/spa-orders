import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { useUpdateCartItemQuantityMutation } from "@/store/api/cartApi";
import { CartManagementPatchParams } from "@/types/cart.types";

type ApiErrorQuantity = {
  data?: {
    detail: string;
  };
};

const useUpdateCartItemQuantity = () => {
  const { openSnackbarWithTimeout } = useSnackbar();
  const [updateCartItemQuantity, { isLoading, isError, data, error }] =
    useUpdateCartItemQuantityMutation();

  const updateQuantity = async (params: CartManagementPatchParams) => {
    try {
      await updateCartItemQuantity(params).unwrap();
    } catch (err) {
      const apiError = err as ApiErrorQuantity;

      //@TODO Change logic handle products items from the stock for quantity
      const errorMessage =
        apiError.data?.detail || "cart.itemQuantityUpdate.fail";

      openSnackbarWithTimeout({
        messageTranslationKey: errorMessage,
        variant: "error"
      });
    }
  };

  return {
    updateQuantity,
    isLoading,
    isError,
    data,
    error
  };
};

export default useUpdateCartItemQuantity;
