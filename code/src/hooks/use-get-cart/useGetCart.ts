import { useEffect } from "react";

import { ROLES } from "@/constants/common";
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
  const shouldFetchCart = userId && user.role === ROLES.USER;

  useEffect(() => {
    if (shouldFetchCart) {
      fetchCart({ userId, lang: locale }, true);
    }
  }, [shouldFetchCart, locale]);

  const isLoading = isAuthLoading || requestState.isLoading;

  return {
    ...requestState,
    isLoading,
    data: localCart
  };
};

export default useGetCart;
