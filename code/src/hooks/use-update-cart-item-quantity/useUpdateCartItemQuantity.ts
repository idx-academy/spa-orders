import { useUpdateCartItemQuantityMutation } from "@/store/api/cartApi";
import { CartManagementPatchParams } from "@/types/cart.types";

const useUpdateCartItemQuantity = () => {
  const [updateCartItemQuantity, { isLoading, isError, data, error }] =
    useUpdateCartItemQuantityMutation();

  const updateQuantity = async (params: CartManagementPatchParams) => {
    try {
      await updateCartItemQuantity(params).unwrap();
    } catch (err) {
      console.error("Failed to update cart item quantity:", err);
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
