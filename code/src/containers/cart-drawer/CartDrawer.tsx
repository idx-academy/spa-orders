import { useNavigate } from "react-router-dom";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import CartDrawerItem from "@/containers/cart-drawer/cart-drawer-item/CartDrawerItem";
import AuthModal from "@/containers/modals/auth/AuthModal";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppTypography from "@/components/app-typography/AppTypography";

import routes from "@/constants/routes";
import { useDrawerContext } from "@/context/drawer/DrawerContext";
import { useModalContext } from "@/context/modal/ModalContext";
import useCartItems from "@/hooks/use-cart-items/useUserCartItems";
import { CartItem } from "@/types/cart.types";
import formatPrice from "@/utils/format-price/formatPrice";

import "@/containers/cart-drawer/CartDrawer.scss";

const CartDrawer = () => {
  const { openModal } = useModalContext();
  const navigate = useNavigate();
  const { closeDrawer } = useDrawerContext();
  const { user, cartItems, isError, handleRemoveItem } = useCartItems();

  if (isError) return <AppTypography translationKey="error.label" />;

  const cartItemsList = cartItems?.items.map((item: CartItem) => (
    <CartDrawerItem
      key={item.productId}
      onRemove={handleRemoveItem}
      {...item}
    />
  ));

  const handleOpenCartPage = () => {
    if (user) {
      navigate(routes.cart.path);
      closeDrawer();
    } else {
      openModal(<AuthModal />);
    }
  };

  const cartItemsContent =
    cartItemsList?.length > 0 ? (
      cartItemsList
    ) : (
      <AppBox className="cart-drawer__empty-label">
        <AppTypography variant="subtitle2" translationKey="cart.emptyItem" />
      </AppBox>
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
          <KeyboardArrowRightIcon fontSize="large" />
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
          onClick={handleOpenCartPage}
          fullWidth
        >
          <AppTypography translationKey="cart.viewCart" />
        </AppButton>
      </AppBox>
    </AppBox>
  );
};

export default CartDrawer;
