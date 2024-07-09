import { useState } from "react";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import { items } from "@/pages/cart/CartPage.constants";
import CartItem from "@/pages/cart/components/CartItem";
import formatPrice from "@/utils/format-price/formatPrice";

import "@/pages/cart/CartPage.scss";

type CartItemsType = {
  image: string;
  name: string;
  productPrice: number;
  quantity: number;
  calculatedPrice: number;
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItemsType[]>(items);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedCartItems = cartItems.map((item, i) =>
      i === index
        ? {
            ...item,
            quantity: newQuantity,
            calculatedPrice: item.productPrice * newQuantity
          }
        : item
    );
    setCartItems(updatedCartItems);
  };

  const handleDeleteItem = (index: number) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
  };

  const subtotalItems = cartItems.reduce(
    (acc, item) => acc + item.calculatedPrice,
    0
  );

  const handleQuantityChangeWrapper =
    (index: number) => (newQuantity: number) => {
      handleQuantityChange(index, newQuantity);
    };

  const handleOnDeleteWrapper = (index: number) => () => {
    handleDeleteItem(index);
  };

  const cartItemsBlock = cartItems.map((item, index) => (
    <CartItem
      key={item.name}
      item={item}
      onQuantityChange={handleQuantityChangeWrapper(index)}
      onDelete={handleOnDeleteWrapper(index)}
    />
  ));

  return (
    <AppBox className="spa-cart-page">
      <AppBox className="spa-cart-page__content">
        <AppBox className="spa-cart-page__items">
          <AppTypography
            className="spa-cart-page__items--label"
            variant="h3"
            component="h1"
            translationKey="myCart.label"
          />
          {cartItemsBlock}
        </AppBox>
        <AppBox className="spa-cart-page__order-summary">
          <AppTypography
            className="spa-cart-page__order-summary--label"
            variant="h1"
            component="h2"
            translationKey="orderSummary.label"
          />
          <AppBox className="spa-order-summary__details">
            <AppBox className="spa-order-summary__row">
              <AppTypography
                component="p"
                className="spa-order-summary__text"
                translationKey="subtotal.label"
              />
              <AppTypography
                component="p"
                className="spa-order-summary__text"
                variant="subtitle2"
              >
                {formatPrice(subtotalItems)}
              </AppTypography>
            </AppBox>
            <AppBox className="spa-order-summary__row">
              <AppTypography component="p" translationKey="delivery.label" />
              <AppTypography component="p" translationKey="free.label" />
            </AppBox>
            <AppTypography
              component="p"
              className="spa-order-summary__underline-text"
              translationKey="country.label"
            />
            <AppBox className="spa-order-summary__row spa-order-summary__total-line">
              <AppTypography
                className="spa-order-summary__total"
                variant="subtitle2"
                component="p"
                translationKey="total.label"
              />
              <AppTypography
                component="p"
                variant="subtitle2"
                className="spa-order-summary__total"
              >
                {formatPrice(subtotalItems)}
              </AppTypography>
            </AppBox>
          </AppBox>
          <AppButton
            className="spa-order-summary__button"
            variant="contained"
            size="medium"
          >
            <AppTypography translationKey="createOrder.label" />
          </AppButton>
        </AppBox>
      </AppBox>
    </AppBox>
  );
};

export default CartPage;
