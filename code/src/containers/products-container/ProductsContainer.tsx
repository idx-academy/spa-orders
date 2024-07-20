import { useMemo } from "react";

import CartDrawer from "@/containers/cart-drawer/CartDrawer";
import {
  HandleCartIconClickParam,
  ProductsContainerProps
} from "@/containers/products-container/ProductsContainer.types";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";
import ProductCard from "@/components/product-card/ProductCard";
import ProductSkeleton from "@/components/product-skeleton/ProductSkeleton";

import { useDrawerContext } from "@/context/drawer/DrawerContext";
import useAddToCart from "@/hooks/use-add-to-cart/useAddToCart";
import useGetCart from "@/hooks/use-get-cart/useGetCart";
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
  const [addToCart] = useAddToCart();

  const user = useUserDetailsSelector();
  const isAuthLoading = useIsAuthLoadingSelector();

  const {
    data: cartData,
    isLoading: isCartLoading,
    isFetching: isCartFetching
  } = useGetCart();

  const { openDrawer } = useDrawerContext();

  const cartLength = cartData.items.length;

  // For now isInCart calculating is implemented on a client side
  const cartProductsIds = useMemo(() => {
    const cartProductsIds = cartData.items.map((item) => item.productId);
    return new Set(cartProductsIds);
  }, [isCartFetching, cartLength]);

  if (isError) {
    return (
      <AppBox
        className={cn("products-container_error", className)}
        data-cy="products-error"
      >
        <AppTypography
          translationKey={errorMessage}
          className="products-container__error-label"
          data-cy="products-error-label"
        />
      </AppBox>
    );
  }

  const handleCartIconClick = (product: HandleCartIconClickParam) => {
    if (product.isInCart) {
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
    <AppBox
      className={cn("products-container", className)}
      data-cy="products-container"
    >
      {gridItems}
    </AppBox>
  );
};

export default ProductsContainer;
