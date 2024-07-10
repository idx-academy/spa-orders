import CloseIcon from "@mui/icons-material/Close";

import AppBox from "@/components/app-box/AppBox";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppTypography from "@/components/app-typography/AppTypography";

import { CartItem } from "@/types/Cart.types";
import formatPrice from "@/utils/format-price/formatPrice";

import "@/layouts/cart-drawer/cart-drawer-item/CartDrawerItem.scss";

const CartDrawerItem = ({ name, image, calculatedPrice }: CartItem) => {
  return (
    <AppBox className="cart-item">
      <AppBox
        component="img"
        alt={name}
        src={image}
        className="cart-item__img"
      />
      <AppBox className="cart-item__content">
        <AppTypography className="cart-item__title">{name}</AppTypography>
        <AppTypography className="cart-item__price" variant="concept">
          {formatPrice(calculatedPrice)}
        </AppTypography>
      </AppBox>
      <AppIconButton color="default" className="cart-item__remove-button">
        <CloseIcon />
      </AppIconButton>
    </AppBox>
  );
};

export default CartDrawerItem;
