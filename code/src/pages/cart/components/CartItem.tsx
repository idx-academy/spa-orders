import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import { CartItemProps } from "@/types/cart.types";
import formatPrice from "@/utils/format-price/formatPrice";

import "@/pages/cart/components/CartItem.scss";

const CartItem = ({ item, onRemove }: CartItemProps) => {
  const handleRemoveCartItem = () => {
    onRemove(item);
  };

  return (
    <AppBox className="spa-cart-item">
      <AppBox
        component="img"
        src={item.image}
        className="spa-cart-item__image"
      />
      <AppBox className="spa-cart-item__details">
        <AppTypography className="spa-cart-item__title" variant="h3">
          {item.name}
        </AppTypography>
        <AppTypography>{formatPrice(item.productPrice)}</AppTypography>
      </AppBox>
      <AppBox className="spa-cart-item__quantity-selector">
        <AppBox className="spa-cart-item__quantity-block">
          <RemoveCircleOutlineIcon />
        </AppBox>
        <input
          type="text"
          value={item.quantity}
          className="spa-cart-item__quantity-input"
          onChange={() => {}}
        />
        <AppBox className="spa-cart-item__quantity-block">
          <AddCircleOutlineIcon />
        </AppBox>
      </AppBox>
      <AppTypography className="spa-cart-item__price">
        {formatPrice(item.calculatedPrice)}
      </AppTypography>
      <AppBox
        className="spa-cart-item__delete-block"
        onClick={handleRemoveCartItem}
      >
        <DeleteIcon />
      </AppBox>
    </AppBox>
  );
};

export default CartItem;
