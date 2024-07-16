import useGetUserDetails from "@/hooks/use-get-user-details/useGetUserDetails";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import {
  useGetCartItemsQuery,
  useRemoveFromCartMutation
} from "@/store/api/cartApi";
import { CartItem } from "@/types/cart.types";

const useCartItems = () => {
  const user = useGetUserDetails();
  const { openSnackbarWithTimeout } = useSnackbar();

  const {
    data: cartItems,
    error,
    isLoading: cartItemsLoading
  } = useGetCartItemsQuery({ userId: user.id });

  const [removeItem] = useRemoveFromCartMutation();

  const handleRemoveItem = async (product: CartItem) => {
    try {
      if (user) {
        await removeItem({
          userId: user.id,
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
    user,
    cartItems,
    cartItemsLoading,
    error,
    handleRemoveItem
  };
};

export default useCartItems;
