import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { useRemoveFromCartMutation } from "@/store/api/cartApi";
import { removeFromLocalCart } from "@/store/slices/localCart";
import { useUserDetailsSelector } from "@/store/slices/userSlice";
import { CartItem } from "@/types/cart.types";

const useRemoveFromCart = () => {
  const user = useUserDetailsSelector();

  const { openSnackbarWithTimeout } = useSnackbar();

  const [removeFromCart, requestState] = useRemoveFromCartMutation();

  const dispatch = useAppDispatch();

  const handleRemoveFromCart = async (data: CartItem) => {
    try {
      if (!user?.id) {
        await dispatch(removeFromLocalCart(data)).unwrap();
      } else {
        await removeFromCart({
          userId: user.id,
          productId: data.productId
        }).unwrap();
      }

      openSnackbarWithTimeout({
        messageTranslationKey: "cart.itemDeletion.success",
        variant: "success"
      });
    } catch {
      openSnackbarWithTimeout({
        messageTranslationKey: "cart.itemDeletion.fail",
        variant: "error"
      });
    }
  };

  return [handleRemoveFromCart, requestState] as const;
};

export default useRemoveFromCart;
