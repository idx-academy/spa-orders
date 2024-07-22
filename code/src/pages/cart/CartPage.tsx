import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import DeliveryForm from "@/containers/forms/delivery-form/DeliveryForm";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import useUserCartItems from "@/hooks/use-user-cart-items/useUserCartItems";
import CartItem from "@/pages/cart/components/cart-item/CartItem";
import EmptyCart from "@/pages/cart/components/empty-cart/EmptyCart";
import { CartItem as CartItemType } from "@/types/cart.types";

import "@/pages/cart/CartPage.scss";

const CartPage = () => {
  const { cartItems, isError, handleRemoveItem, handleQuantityChange } =
    useUserCartItems();
  if (isError) return <AppTypography translationKey="error.label" />;
  if (!cartItems?.items?.length) {
    return <EmptyCart />;
  }

  const cartItemsBlock = cartItems.items.map((item: CartItemType) => (
    <CartItem
      key={item.productId}
      item={item}
      onRemove={handleRemoveItem}
      onQuantityChange={handleQuantityChange}
    />
  ));

  const totalPrice = cartItems.totalPrice ?? 0;

  return (
    <PageWrapper>
      <AppBox className="spa-cart-page">
        <AppBox className="spa-cart-page__content">
          <AppBox className="spa-cart-page__items">
            <AppTypography
              className="spa-cart-page__items--label"
              variant="h3"
              component="h1"
              translationKey="myCart.label"
              data-testid="myCartLabel"
            />
            {cartItemsBlock}
          </AppBox>

          <DeliveryForm totalPrice={totalPrice} />
        </AppBox>
      </AppBox>
    </PageWrapper>
  );
};

export default CartPage;
