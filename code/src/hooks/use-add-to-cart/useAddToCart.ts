import { useAppDispatch } from "@/hooks/use-redux/useRedux";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { useAddToCartMutation } from "@/store/api/cartApi";
import { addToLocalCart } from "@/store/slices/localCart";
import { useUserDetailsSelector } from "@/store/slices/userSlice";
import { CartItem } from "@/types/cart.types";

const useAddToCart = () => {
  const user = useUserDetailsSelector();

  const { openSnackbarWithTimeout } = useSnackbar();

  const [addToCartMutation, requestState] = useAddToCartMutation();

  const dispatch = useAppDispatch();

  const handleAddToCart = async (data: CartItem) => {
    try {
      if (!user?.id) {
        await dispatch(addToLocalCart(data)).unwrap();
      } else {
        await addToCartMutation({
          userId: user.id,
          productId: data.productId
        }).unwrap();
      }

      openSnackbarWithTimeout({
        variant: "success",
        messageTranslationKey: "cart.itemAddition.success"
      });
    } catch {
      openSnackbarWithTimeout({
        variant: "error",
        messageTranslationKey: "cart.itemAddition.fail"
      });
    }
  };

  return [handleAddToCart, requestState] as const;
};

export default useAddToCart;
