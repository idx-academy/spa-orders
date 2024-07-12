import useGetCart from "@/hooks/use-get-cart/useGetCart";
import useRemoveFromCart from "@/hooks/use-remove-from-cart/useRemoveFromCart";
import { useUserDetailsSelector } from "@/store/slices/userSlice";
import { CartItem } from "@/types/cart.types";

const useCartItems = () => {
  const user = useUserDetailsSelector();

  const { data: cartItems, error, isLoading: cartItemsLoading } = useGetCart();

  const [removeItem] = useRemoveFromCart();

  const handleRemoveItem = async (product: CartItem) => {
    removeItem(product);
  };

  return {
    user: user,
    cartItems,
    cartItemsLoading,
    error,
    handleRemoveItem
  };
};

export default useCartItems;
