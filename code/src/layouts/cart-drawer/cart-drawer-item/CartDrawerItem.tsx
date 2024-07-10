import CloseIcon from "@mui/icons-material/Close";

import { CartDrawerItemProps } from "@/layouts/cart-drawer/cart-drawer-item/CartDrawerItem.types";

import AppBox from "@/components/app-box/AppBox";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppTypography from "@/components/app-typography/AppTypography";

import formatPrice from "@/utils/format-price/formatPrice";

import "@/layouts/cart-drawer/cart-drawer-item/CartDrawerItem.scss";

const CartDrawerItem = ({ onRemove, ...props }: CartDrawerItemProps) => {
  const handleRemove = () => {
    onRemove(props);
  };

  return (
    <AppBox className="cart-item">
      <AppBox
        component="img"
        alt={props.name}
        src={props.image}
        className="cart-item__img"
      />
      <AppBox className="cart-item__content">
        <AppTypography className="cart-item__title">{props.name}</AppTypography>
        <AppTypography className="cart-item__price" variant="concept">
          {formatPrice(props.calculatedPrice)}
        </AppTypography>
      </AppBox>
      <AppIconButton
        color="default"
        className="cart-item__remove-button"
        onClick={handleRemove}
      >
        <CloseIcon />
      </AppIconButton>
    </AppBox>
  );
};

export default CartDrawerItem;
