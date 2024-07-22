import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { useUpdateCartItemQuantityMutation } from "@/store/api/cartApi";
import { CartManagementPatchParams } from "@/types/cart.types";

const useUpdateCartItemQuantity = () => {
  const { openSnackbarWithTimeout } = useSnackbar();
  const [updateCartItemQuantity, { isLoading, isError, data, error }] =
    useUpdateCartItemQuantityMutation();

  const updateQuantity = async (params: CartManagementPatchParams) => {
    try {
      await updateCartItemQuantity(params).unwrap();
    } catch {
      openSnackbarWithTimeout({
        messageTranslationKey: "cart.itemQuantityUpdate.fail",
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
