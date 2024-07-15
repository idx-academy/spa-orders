import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import CartDrawerItem from "@/containers/cart-drawer/cart-drawer-item/CartDrawerItem";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppLoader from "@/components/app-loader/AppLoader";
import AppTypography from "@/components/app-typography/AppTypography";

import { useDrawerContext } from "@/context/drawer/DrawerContext";
import useCartItems from "@/hooks/use-cart-items/useUserCartItems";
import { CartItem } from "@/types/cart.types";
import formatPrice from "@/utils/format-price/formatPrice";

import "@/containers/cart-drawer/CartDrawer.scss";

const CartDrawer = () => {
  const { closeDrawer } = useDrawerContext();
  const { id, cartItems, cartItemsLoading, error, handleRemoveItem } =
    useCartItems();

  //@TODO Create interaction with unauthorization user
  if (!id) {
    return null;
  }

  // @TODO Implement Skeleton for loading items
  if (cartItemsLoading) return <AppLoader />;

  if (error) return <AppTypography translationKey="error.label" />;

  const cartItemsList =
    cartItems?.items.map((item: CartItem) => (
      <CartDrawerItem
        key={item.productId}
        onRemove={handleRemoveItem}
        {...item}
      />
    )) ?? [];

  const cartItemsContent =
    cartItemsList.length > 0 ? (
      cartItemsList
    ) : (
      <AppTypography variant="subtitle2" translationKey="cart.emptyItem" />
    );

  const translationCartDrawerProps = {
    values: { price: formatPrice(cartItems?.totalPrice ?? 0) }
  };

  return (
    <AppBox className="cart-drawer">
      <AppBox className="cart-drawer__header" data-cy="cart-drawer">
        <AppIconButton
          className="cart-drawer__close-button"
          onClick={closeDrawer}
        >
          <KeyboardArrowLeftIcon fontSize="large" />
        </AppIconButton>
        <AppTypography
          className="cart-drawer__title"
          variant="subtitle2"
          translationKey="cart.tooltip"
          component="h2"
          fontWeight="extra-bold"
        />
      </AppBox>
      <AppBox className="cart-drawer__items">{cartItemsContent}</AppBox>
      <AppBox className="cart-drawer__footer">
        <AppTypography
          className="cart-drawer__price"
          variant="subtitle2"
          translationKey="cart.subtotal"
          translationProps={translationCartDrawerProps}
        />
        <AppButton
          className="cart-drawer__button"
          onClick={closeDrawer}
          to="/cart"
          fullWidth
        >
          <AppTypography translationKey="cart.viewCart" />
        </AppButton>
      </AppBox>
    </AppBox>
  );
};

export default CartDrawer;
