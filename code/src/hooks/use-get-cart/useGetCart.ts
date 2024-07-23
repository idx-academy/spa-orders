import { useEffect } from "react";

import { useLocaleContext } from "@/context/i18n/I18nProvider";
import { useLazyGetCartItemsQuery } from "@/store/api/cartApi";
import { useLocalCartSelector } from "@/store/slices/localCart";
import {
  useIsAuthLoadingSelector,
  useUserDetailsSelector
} from "@/store/slices/userSlice";

const useGetCart = () => {
  const { locale } = useLocaleContext();
  const user = useUserDetailsSelector();
  const isAuthLoading = useIsAuthLoadingSelector();
  const localCart = useLocalCartSelector();

  const [fetchCart, requestState] = useLazyGetCartItemsQuery();

  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      fetchCart({ userId, lang: locale });
    }
  }, [userId, locale]);

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
