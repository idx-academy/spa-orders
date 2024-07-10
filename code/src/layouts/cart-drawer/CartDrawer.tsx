import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import CartDrawerItem from "@/layouts/cart-drawer/cart-drawer-item/CartDrawerItem";
import { mockCartItems } from "@/layouts/cart-drawer/constants";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppTypography from "@/components/app-typography/AppTypography";

import { useDrawerContext } from "@/context/DrawerContext";
import useSnackbar from "@/hooks/use-snackbar/useSnackbar";
import { useRemoveFromCartMutation } from "@/store/api/cartApi";
import { useUserDetailsSelector } from "@/store/slices/userSlice";
import { CartItem } from "@/types/cart.types";
import formatPrice from "@/utils/format-price/formatPrice";

import "@/layouts/cart-drawer/CartDrawer.scss";

const CartDrawer = () => {
  const user = useUserDetailsSelector();

  const [removeItem] = useRemoveFromCartMutation();

  const { closeDrawer } = useDrawerContext();

  const { openSnackbarWithTimeout } = useSnackbar();

  const handleRemoveItem = async (product: CartItem) => {
    try {
      if (user?.id) {
        await removeItem({
          userId: user.id,
          productId: product.productId
        }).unwrap();
      }
    } catch {
      openSnackbarWithTimeout({
        variant: "error",
        messageTranslationKey: "cart.itemDeletion.fail"
      });
    }
  };

  const cartItems = mockCartItems.map((item) => (
    <CartDrawerItem
      key={item.productId}
      onRemove={handleRemoveItem}
      {...item}
    />
  ));

  return (
    <AppBox className="cart-drawer">
      <AppBox className="cart-drawer__header">
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
      <AppBox className="cart-drawer__items">{cartItems}</AppBox>
      <AppBox className="cart-drawer__footer">
        <AppTypography
          className="cart-drawer__price"
          variant="subtitle2"
          translationKey="cart.subtotal"
          translationProps={{ values: { price: formatPrice(50) } }}
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
