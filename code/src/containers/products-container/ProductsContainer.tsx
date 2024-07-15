import { useEffect, useMemo } from "react";

import CartDrawer from "@/containers/cart-drawer/CartDrawer";
import AuthModal from "@/containers/modals/auth/AuthModal";
import {
  HandleCartIconClickParam,
  ProductsContainerProps
} from "@/containers/products-container/ProductsContainer.types";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";
import ProductCard from "@/components/product-card/ProductCard";
import ProductSkeleton from "@/components/product-skeleton/ProductSkeleton";

import { useDrawerContext } from "@/context/drawer/DrawerContext";
import { useModalContext } from "@/context/modal/ModalContext";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import {
  useAddToCartMutation,
  useLazyGetCartItemsQuery
} from "@/store/api/cartApi";
import {
  useIsAuthLoadingSelector,
  useUserDetailsSelector
} from "@/store/slices/userSlice";
import { Product } from "@/types/product.types";
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

  const userId = user?.id;

  const [
    fetchCart,
    { data: cartData, isLoading: isCartLoading, isFetching: isCartFetching }
  ] = useLazyGetCartItemsQuery();

  useEffect(() => {
    if (userId) {
      fetchCart({ userId });
    }
  }, [userId]);

  const { openDrawer } = useDrawerContext();
  const { openModal } = useModalContext();
  const { openSnackbarWithTimeout } = useSnackbar();

  const [addToCart] = useAddToCartMutation();

  // For now isInCart calculating is implemented on a client side
  const cartProductsIds = useMemo(() => {
    const cartProductsIds =
      userId && cartData ? cartData?.items.map((item) => item.productId) : [];
    return new Set(cartProductsIds);
  }, [isCartFetching, userId]);

  if (isError) {
    return (
      <AppBox
        className={cn("products-container_error", className)}
        data-cy="best-sellers-products-error"
      >
        <AppTypography
          translationKey={errorMessage}
          className="products-container__error-label"
          data-cy="best-sellers-products-error-label"
        />
      </AppBox>
    );
  }

  const handleCartIconClick = async (product: HandleCartIconClickParam) => {
    if (!userId) {
      openModal(<AuthModal />);
      return;
    }

    try {
      if (product.isInCart) {
        openDrawer(<CartDrawer />);
        return;
      }

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
  };

  const productCards = products.map((product: Product) => {
    const isInCart = cartProductsIds.has(product.id);

    return (
      <ProductCard
        key={product.id}
        product={product}
        isInCart={isInCart}
        isUserAuthorized={Boolean(user)}
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
