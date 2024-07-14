import { useEffect, useMemo } from "react";

import { ProductsContainerProps } from "@/containers/products-container/ProductsContainer.types";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";
import ProductCard from "@/components/product-card/ProductCard";
import ProductSkeleton from "@/components/product-skeleton/ProductSkeleton";

import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import {
  useAddToCartMutation,
  useLazyGetCartItemsQuery,
  useRemoveFromCartMutation
} from "@/store/api/cartApi";
import {
  useIsAuthLoadingSelector,
  useUserDetailsSelector
} from "@/store/slices/userSlice";
import { Product, ProductWithIsInCart } from "@/types/product.types";
import cn from "@/utils/cn/cn";
import repeatComponent from "@/utils/repeat-component/repeatComponent";

import "@/containers/products-container/ProductsContainer.scss";

const ProductsContainer = ({
  products,
  className,
  isLoading = false,
  isError = false,
  loadingItemsCount = 5,
  errorMessage = "errors.somethingWentWrong"
}: ProductsContainerProps) => {
  const user = useUserDetailsSelector();
  const isAuthLoading = useIsAuthLoadingSelector();

  const [fetchCart, { data: cartData, isLoading: isCartLoading, isFetching }] =
    useLazyGetCartItemsQuery();

  useEffect(() => {
    if (user?.id) {
      fetchCart({ userId: user.id });
    }
  }, [user?.id]);

  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const { openSnackbarWithTimeout } = useSnackbar();

  if (isError) {
    return (
      <AppBox className={cn("products-container_error", className)} data-cy="best-sellers-products-error">
        <AppTypography
          translationKey={errorMessage}
          className="products-container__error-label"
          data-cy="best-sellers-products-error-label"
        />
      </AppBox>
    );
  }

  const handleCartIconClick = async (product: ProductWithIsInCart) => {
    if (user?.id) {
      if (!product.isInCart) {
        try {
          await addToCart({
            productId: product.id,
            userId: user.id
          }).unwrap();
        } catch {
          openSnackbarWithTimeout({
            variant: "error",
            messageTranslationKey: "cart.itemAddition.fail"
          });
        }
      } else {
        try {
          await removeFromCart({
            productId: product.id,
            userId: user.id
          }).unwrap();
        } catch {
          openSnackbarWithTimeout({
            variant: "error",
            messageTranslationKey: "cart.itemDeleletion.fail"
          });
        }
      }
    }
  };

  // For now this is implemented on a client side
  const cartProductsIds = useMemo(
    () => new Set(cartData?.items.map((item) => item.productId) || []),
    [isFetching]
  );

  const productCards = products.map((product: Product) => {
    const isInCart = cartProductsIds.has(product.id);

    return (
      <ProductCard
        key={product.id}
        product={{ isInCart, ...product }}
        onCartIconClick={handleCartIconClick}
      />
    );
  });

  const skeletonCards = repeatComponent(<ProductSkeleton />, loadingItemsCount);

  const isLoadingInProgress = isLoading || isAuthLoading || isCartLoading;

  const gridItems = isLoadingInProgress ? skeletonCards : productCards;

  return (
    <AppBox className={cn("products-container", className)}>{gridItems}</AppBox>
  );
};

export default ProductsContainer;
