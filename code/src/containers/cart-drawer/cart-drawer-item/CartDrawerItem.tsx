import CloseIcon from "@mui/icons-material/Close";

import AppBox from "@/components/app-box/AppBox";
import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppTypography from "@/components/app-typography/AppTypography";

import { CartDrawerItemProps } from "@/types/cart.types";
import formatPrice from "@/utils/format-price/formatPrice";

import "@/containers/cart-drawer/cart-drawer-item/CartDrawerItem.scss";

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
        data-testid="remove-item-from-cart-button"
        onClick={handleRemove}
      >
        <CloseIcon />
      </AppIconButton>
    </AppBox>
  );
};

export default CartDrawerItem;
