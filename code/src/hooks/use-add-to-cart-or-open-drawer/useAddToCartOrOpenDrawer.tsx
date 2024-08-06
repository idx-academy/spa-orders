import { useMemo } from "react";

import CartDrawer from "@/containers/cart-drawer/CartDrawer";

import { useDrawerContext } from "@/context/drawer/DrawerContext";
import useAddToCart from "@/hooks/use-add-to-cart/useAddToCart";
import useGetCart from "@/hooks/use-get-cart/useGetCart";
import { Product } from "@/types/product.types";

type MinimalRequiredProduct = Omit<Product, "status">;

const useAddToCartOrOpenDrawer = <T extends MinimalRequiredProduct>(
  product: T
) => {
  const {
    data: cartData,
    isFetching: isCartFetching,
    isLoading: isCartLoading
  } = useGetCart();

  const cartLength = cartData.items.length;

  const isProductInCart = useMemo(() => {
    return cartData.items.some((item) => item.productId === product.id);
  }, [cartLength, product.id]);

  const [addToCart, { isLoading: isAddingToCart }] = useAddToCart();
  const { openDrawer } = useDrawerContext();

  const addToCartOrOpenDrawer = () => {
    if (isProductInCart) {
      openDrawer(<CartDrawer />);
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      productPrice: product.price,
      quantity: 1,
      calculatedPrice: product.price
    });
  };

  const isLoading = isCartFetching || isCartLoading;

  return {
    isProductInCart,
    addToCartOrOpenDrawer,
    isAddingToCart,
    isCartLoading: isLoading
  } as const;
};

export default useAddToCartOrOpenDrawer;
