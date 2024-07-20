import useGetCart from "@/hooks/use-get-cart/useGetCart";
import useRemoveFromCart from "@/hooks/use-remove-from-cart/useRemoveFromCart";
import { useUserDetailsSelector } from "@/store/slices/userSlice";
import { CartItem } from "@/types/cart.types";

const useUserCartItems = () => {
  const user = useUserDetailsSelector();

  const { data: cartItems, isError, isLoading: cartItemsLoading } = useGetCart();

  const [removeItem] = useRemoveFromCart();

  const handleRemoveItem = async (product: CartItem) => {
    removeItem(product);
  };

  return {
    user: user,
    cartItems,
    cartItemsLoading,
    isError,
    handleRemoveItem
  };
};

export default useUserCartItems;
