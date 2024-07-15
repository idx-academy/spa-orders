import useGetUserDetails from "@/hooks/use-get-user-details/useGetUserDetails";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import {
  useGetCartItemsQuery,
  useRemoveFromCartMutation
} from "@/store/api/cartApi";
import { CartItem } from "@/types/cart.types";

const useCartItems = () => {
  const { id } = useGetUserDetails();
  const { openSnackbarWithTimeout } = useSnackbar();

  const {
    data: cartItems,
    error,
    isLoading: cartItemsLoading
  } = useGetCartItemsQuery({ userId: id });

  const [removeItem] = useRemoveFromCartMutation();

  const handleRemoveItem = async (product: CartItem) => {
    try {
      if (id) {
        await removeItem({
          userId: id,
          productId: product.productId
        }).unwrap();
      }
    } catch {
      openSnackbarWithTimeout({
        variant: "error",
        messageTranslationKey: "cart.itemDeletion.fail"
      });
    }
  };

  return {
    id,
    cartItems,
    cartItemsLoading,
    error,
    handleRemoveItem
  };
};

export default useCartItems;
