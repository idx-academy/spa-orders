import { useEffect, useState } from "react";

import CartDrawer from "@/containers/cart-drawer/CartDrawer";

import { useDrawerContext } from "@/context/drawer/DrawerContext";
import useAddToCart from "@/hooks/use-add-to-cart/useAddToCart";
import useCheckItemInCartExistance from "@/hooks/use-item-in-cart-existance/useItemInCartExistance";
import { Product } from "@/types/product.types";

type MinimalRequiredProduct = Omit<Product, "status">;

const useAddToCartOrOpenDrawer = <T extends MinimalRequiredProduct>(
  product: T
) => {
  const checkItemInCartExistance = useCheckItemInCartExistance();

  const isInCart = checkItemInCartExistance(product.id);

  const [addToCart] = useAddToCart();
  const { openDrawer } = useDrawerContext();
  const [isProductInCart, setIsProductInCart] = useState(isInCart);

  useEffect(() => {
    setIsProductInCart(isInCart);
  }, [isInCart]);

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
    setIsProductInCart(true);
  };

  return { isProductInCart, addToCartOrOpenDrawer } as const;
};

export default useAddToCartOrOpenDrawer;
