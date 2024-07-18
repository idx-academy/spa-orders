import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import OrderSummary from "@/containers/order-summary/OrderSummary";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import useCartItems from "@/hooks/use-cart-items/useUserCartItems";
import useCreateOrder from "@/hooks/use-create-order/useCreateOrder";
import useGetUserDetails from "@/hooks/use-get-user-details/useGetUserDetails";
import CartItem from "@/pages/cart/components/cart-item/CartItem";
import EmptyCart from "@/pages/cart/components/empty-cart/EmptyCart";
import { CartItem as CartItemType } from "@/types/cart.types";

import "@/pages/cart/CartPage.scss";

const CartPage = () => {
  const user = useGetUserDetails();
  const { cartItems, isError, handleRemoveItem } = useCartItems();

  const [createOrder, { isLoading }] = useCreateOrder();

  if (isError) return <AppTypography translationKey="error.label" />;

  if (!cartItems?.items?.length) {
    return <EmptyCart />;
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
