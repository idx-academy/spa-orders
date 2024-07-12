import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import AppBox from "@/components/app-box/AppBox";
import AppLoader from "@/components/app-loader/AppLoader";
import AppTypography from "@/components/app-typography/AppTypography";
import OrderSummary from "@/components/order-summary/OrderSummary";

import useGetUserDetails from "@/hooks/use-get-user-details/useGetUserDetails";
import CartItem from "@/pages/cart/components/CartItem";
import { useGetCartItemsQuery } from "@/store/api/cartApi";

import "@/pages/cart/CartPage.scss";

type CartItem = {
  productId: string;
  image: string;
  name: string;
  productPrice: number;
  quantity: number;
  calculatedPrice: number;
};

const CartPage = () => {
  const { id } = useGetUserDetails();
  const {
    data: cartItems,
    error,
    isLoading: cartItemsLoading
  } = useGetCartItemsQuery({ userId: id });

  //@TODO Implement Skeleton for loading items
  if (cartItemsLoading) {
    return <AppLoader />;
  }

  if (error) {
    return <AppTypography translationKey="error.label" />;
  }

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

  const cartItemsBlock = cartItems.items.map((item: CartItem) => (
    <CartItem key={item.productId} item={item} />
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
          <OrderSummary totalPrice={totalPrice} />
        </AppBox>
      </AppBox>
    </PageWrapper>
  );
};

export default CartPage;
