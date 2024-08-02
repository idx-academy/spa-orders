import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import useAddToCartOrOpenDrawer from "@/hooks/use-add-to-cart-or-open-drawer/useAddToCartOrOpenDrawer";
import { Product } from "@/types/product.types";

type BuyNowButtonProps = {
  productWithId: Omit<Product, "status">;
};

const BuyNowButton = ({ productWithId }: BuyNowButtonProps) => {
  const { isProductInCart, addToCartOrOpenDrawer } =
    useAddToCartOrOpenDrawer(productWithId);

  const translationKey = isProductInCart
    ? "productDetailsPage.buyNowButton"
    : "productDetailsPage.addToCartButton";

  return (
    <AppButton onClick={addToCartOrOpenDrawer}>
      <AppTypography translationKey={translationKey} />
    </AppButton>
  );
};

export default BuyNowButton;
