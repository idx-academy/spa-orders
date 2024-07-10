import CartDrawer from "@/layouts/cart-drawer/CartDrawer";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";
import ProductCard from "@/components/product-card/ProductCard";
import ProductSkeleton from "@/components/product-skeleton/ProductSkeleton";
import { ProductsContainerProps } from "@/components/products-container/ProductsContainer.types";

import { useDrawerContext } from "@/context/DrawerContext";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { useAddToCartMutation } from "@/store/api/cartApi";
import { useUserDetailsSelector } from "@/store/slices/userSlice";
import { Product } from "@/types/product.types";
import cn from "@/utils/cn/cn";
import repeatComponent from "@/utils/repeat-component/repeatComponent";

import "@/components/products-container/ProductsContainer.scss";

const ProductsContainer = ({
  products,
  className,
  isLoading = false,
  isError = false,
  loadingItemsCount = 5,
  errorMessage = "errors.somethingWentWrong"
}: ProductsContainerProps) => {
  const user = useUserDetailsSelector();

  const [addToCart] = useAddToCartMutation();

  const { openDrawer } = useDrawerContext();

  const { openSnackbarWithTimeout } = useSnackbar();

  if (isError) {
    return (
      <AppBox className={cn("products-container_error", className)}>
        <AppTypography
          translationKey={errorMessage}
          className="products-container__error-label"
        />
      </AppBox>
    );
  }

  const skeletonCards = repeatComponent(<ProductSkeleton />, loadingItemsCount);

  const handleAddToCart = async (product: Product) => {
    try {
      if (user?.id) {
        await addToCart({ productId: product.id, userId: user.id }).unwrap();
        openDrawer(<CartDrawer />);
      }
    } catch {
      openSnackbarWithTimeout({
        variant: "error",
        messageTranslationKey: "cart.itemAddition.fail"
      });
    }
  };

  const productCards = products.map((product: Product) => (
    <ProductCard
      key={product.id}
      product={product}
      onAddToCart={handleAddToCart}
    />
  ));

  const gridItems = isLoading ? skeletonCards : productCards;

  return (
    <AppBox className={cn("products-container", className)}>{gridItems}</AppBox>
  );
};

export default ProductsContainer;
