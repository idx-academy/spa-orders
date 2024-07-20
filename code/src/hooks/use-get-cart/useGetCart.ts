import { useEffect } from "react";

import { useLazyGetCartItemsQuery } from "@/store/api/cartApi";
import { useLocalCartSelector } from "@/store/slices/localCart";
import {
  useIsAuthLoadingSelector,
  useUserDetailsSelector
} from "@/store/slices/userSlice";

const useGetCart = () => {
  const user = useUserDetailsSelector();
  const isAuthLoading = useIsAuthLoadingSelector();
  const localCart = useLocalCartSelector();

  const [fetchCart, requestState] = useLazyGetCartItemsQuery();

  const userId = user?.id;

  useEffect(() => {
    if (userId) fetchCart({ userId });
  }, [userId]);

  const isLoading =
    isAuthLoading ||
    requestState.isLoading ||
    (Boolean(user?.id) && requestState.isUninitialized);

  return {
    ...requestState,
    isLoading,
    data: localCart
  };
};

export default useGetCart;
