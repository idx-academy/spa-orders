import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import OrderSummary from "@/containers/order-summary/OrderSummary";

import AppBox from "@/components/app-box/AppBox";
import AppLoader from "@/components/app-loader/AppLoader";
import AppTypography from "@/components/app-typography/AppTypography";

import useCartItems from "@/hooks/use-cart-items/useUserCartItems";
import useCreateOrder from "@/hooks/use-create-order/useCreateOrder";
import CartItem from "@/pages/cart/components/CartItem";
import { CartItem as CartItemType } from "@/types/cart.types";

import "@/pages/cart/CartPage.scss";

const CartPage = () => {
  const { user, cartItems, cartItemsLoading, error, handleRemoveItem } =
    useCartItems();
  const [createOrder, { isLoading }] = useCreateOrder();
  //@TODO Create interaction with unauthorization user
  if (!user) {
    return null;
  }

  //@TODO Implement Skeleton for loading items
  if (cartItemsLoading) return <AppLoader />;

  if (error) return <AppTypography translationKey="error.label" />;

  if (!cartItems?.items?.length) {
    return (
      <PageWrapper>
        <AppBox className="spa-cart-page">
          <AppTypography
            className="spa-cart-page__empty"
            variant="h3"
            translationKey="cartEmpty.label"
          />
        </AppBox>
      </PageWrapper>
    );
  }
  const handleCreateOrder = () => {
    createOrder({
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      deliveryMethod: "NOVA", //For now it's just hardcoded data
      city: "Lviv",
      department: "№1 Franka street, 7"
    });
  };

  const cartItemsBlock = cartItems.items.map((item: CartItemType) => (
    <CartItem key={item.productId} item={item} onRemove={handleRemoveItem} />
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
          <OrderSummary
            isLoading={isLoading}
            handleCreateOrder={handleCreateOrder}
            totalPrice={totalPrice}
          />
        </AppBox>
      </AppBox>
    </PageWrapper>
  );
};

export default CartPage;
