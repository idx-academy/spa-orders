import { ProductsContainerProps } from "@/containers/products-container/ProductsContainer.types";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";
import ProductCard from "@/components/product-card/ProductCard";
import ProductSkeleton from "@/components/product-skeleton/ProductSkeleton";

import useGetCart from "@/hooks/use-get-cart/useGetCart";
import { useIsAuthLoadingSelector } from "@/store/slices/userSlice";
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
  const { isLoading: isCartLoading } = useGetCart();
  const isAuthLoading = useIsAuthLoadingSelector();

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

  const productCards = products.map((product: Product) => {
    return <ProductCard key={product.id} product={product} />;
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
