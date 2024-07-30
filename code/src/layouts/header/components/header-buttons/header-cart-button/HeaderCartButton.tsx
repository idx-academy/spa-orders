import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import CartDrawer from "@/containers/cart-drawer/CartDrawer";

import AppBadge from "@/components/app-badge/AppBadge";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppTooltip from "@/components/app-tooltip/AppTooltip";
import AppTypography from "@/components/app-typography/AppTypography";

import { useDrawerContext } from "@/context/drawer/DrawerContext";
import useGetCart from "@/hooks/use-get-cart/useGetCart";
import calculateCartItemsCounter from "@/utils/calculate-cart-items-counter/calculateCartItemsCounter";

const HeaderCartButton = () => {
  const { openDrawer } = useDrawerContext();

  const { data } = useGetCart();

  const handleOpenCart = () => {
    openDrawer(<CartDrawer />);
  };

  const cartItemsCount = calculateCartItemsCounter(data.items);

  const badgeContent = (
    <AppTypography variant="caption-small" data-testid="cart-items-count">
      {cartItemsCount}
    </AppTypography>
  );

  const shoppingCartIcon = (
    <ShoppingCartIcon className="header__toolbar-icon" fontSize="medium" />
  );

  const cartIcon = cartItemsCount ? (
    <AppBadge
      badgeContent={badgeContent}
      variant="contained"
      size="small"
      className="header__toolbar-cart-badge"
      data-testid="header-cart-badge"
    >
      {shoppingCartIcon}
    </AppBadge>
  ) : (
    shoppingCartIcon
  );

  return (
    <AppTooltip titleTranslationKey="cart.tooltip">
      <AppIconButton
        data-cy="header-cart-button"
        data-testid="header-cart-button"
        onClick={handleOpenCart}
      >
        {cartIcon}
      </AppIconButton>
    </AppTooltip>
  );
};

export default HeaderCartButton;
