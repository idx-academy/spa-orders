import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppLoader from "@/components/app-loader/AppLoader";
import AppTypography from "@/components/app-typography/AppTypography";

import CartItem from "@/pages/cart/components/CartItem";
import { useGetCartItemsQuery } from "@/store/api/cartApi";
import { useUserDetailsSelector } from "@/store/slices/userSlice";
import formatPrice from "@/utils/format-price/formatPrice";

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
  const { id: userId } = useUserDetailsSelector() || {};
  const {
    data: cartItems,
    error,
    isLoading: cartItemsLoading
  } = useGetCartItemsQuery(userId!);

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

  const totalPrice = formatPrice(cartItems.totalPrice ?? 0);

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
          <AppBox className="spa-cart-page__order-summary">
            <AppTypography
              className="spa-cart-page__order-summary--label"
              variant="h1"
              component="h1"
              translationKey="orderSummary.label"
              data-testid="orderSummaryLabel"
            />
            <AppBox className="spa-order-summary__details">
              <AppBox className="spa-order-summary__row">
                <AppTypography
                  component="p"
                  className="spa-order-summary__text"
                  translationKey="subtotal.label"
                  data-testid="subtotalLabel"
                />
                <AppTypography
                  component="p"
                  className="spa-order-summary__text"
                  variant="subtitle2"
                >
                  {totalPrice}
                </AppTypography>
              </AppBox>
              <AppBox className="spa-order-summary__row">
                <AppTypography
                  component="p"
                  translationKey="delivery.label"
                  data-testid="deliveryLabel"
                />
                <AppTypography
                  component="p"
                  translationKey="free.label"
                  data-testid="freeLabel"
                />
              </AppBox>
              <AppTypography
                component="p"
                className="spa-order-summary__underline-text"
                translationKey="country.label"
                data-testid="countryLabel"
              />
              <AppBox className="spa-order-summary__row spa-order-summary__total-line">
                <AppTypography
                  className="spa-order-summary__total"
                  variant="subtitle2"
                  component="p"
                  translationKey="total.label"
                  data-testid="totalLabel"
                />
                <AppTypography
                  component="p"
                  variant="subtitle2"
                  className="spa-order-summary__total"
                >
                  {totalPrice}
                </AppTypography>
              </AppBox>
            </AppBox>
            <AppButton
              className="spa-order-summary__button"
              variant="contained"
              size="medium"
              data-testid="createOrderButton"
            >
              <AppTypography translationKey="createOrder.label" />
            </AppButton>
          </AppBox>
        </AppBox>
      </AppBox>
    </PageWrapper>
  );
};

export default CartPage;
