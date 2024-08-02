import { useMemo } from "react";

import useGetCart from "@/hooks/use-get-cart/useGetCart";

const useItemInCartExistance = () => {
  const { data: cartData, isFetching: isCartFetching } = useGetCart();

  const cartLength = cartData.items.length;

  const cartProductsIds = useMemo(() => {
    const ids = cartData.items.map((item) => item.productId);
    return new Set(ids);
  }, [isCartFetching, cartLength]);

  const checkItemInCartExistance = (productId: string) => {
    return cartProductsIds.has(productId);
  };

  return checkItemInCartExistance;
};

export default useItemInCartExistance;
