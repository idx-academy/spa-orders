import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import useAddToCartOrOpenDrawer from "@/hooks/use-add-to-cart-or-open-drawer/useAddToCartOrOpenDrawer";
import { Product } from "@/types/product.types";

type BuyNowButtonProps = {
  productWithId: Omit<Product, "status">;
};

const BuyNowButton = ({ productWithId }: BuyNowButtonProps) => {
  const {
    isProductInCart,
    addToCartOrOpenDrawer,
    isCartLoading,
    isAddingToCart
  } = useAddToCartOrOpenDrawer(productWithId);

  let translationKey: string;

  if (isAddingToCart) {
    translationKey = "productDetailsPage.addingToCartButton";
  } else if (isProductInCart) {
    translationKey = "productDetailsPage.buyNowButton";
  } else {
    translationKey = "productDetailsPage.addToCartButton";
  }

  const isDisabled = isAddingToCart || isCartLoading;

  return (
    <AppButton
      onClick={addToCartOrOpenDrawer}
      disabled={isDisabled}
      isLoading={isDisabled}
    >
      <AppTypography translationKey={translationKey} />
    </AppButton>
  );
};

export default BuyNowButton;
