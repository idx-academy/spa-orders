import useGetCart from "@/hooks/use-get-cart/useGetCart";
import useRemoveFromCart from "@/hooks/use-remove-from-cart/useRemoveFromCart";
import useUpdateCartItemQuantity from "@/hooks/use-update-cart-item-quantity/useUpdateCartItemQuantity";
import { useUserDetailsSelector } from "@/store/slices/userSlice";
import { CartItem } from "@/types/cart.types";

const useUserCartItems = () => {
  const user = useUserDetailsSelector();

  const {
    data: cartItems,
    isError,
    isLoading: cartItemsLoading
  } = useGetCart();

  const [removeItem] = useRemoveFromCart();
  const {
    updateQuantity,
    isLoading: updating,
    isError: updateError
  } = useUpdateCartItemQuantity();

  const handleRemoveItem = async (product: CartItem) => {
    removeItem(product);
  };

  const handleQuantityChange = async (
    product: CartItem,
    newQuantity: number
  ) => {
    if (user) {
      try {
        await updateQuantity({
          userId: user.id,
          productId: product.productId,
          quantity: newQuantity
        });
      } catch (error) {
        console.error("Failed to update cart item quantity:", error);
      }
    }
  };

  return {
    user,
    cartItems,
    cartItemsLoading,
    isError,
    handleRemoveItem,
    handleQuantityChange,
    updating,
    updateError
  };
};

export default useUserCartItems;
