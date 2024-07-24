import { ChangeEvent, useState } from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import { CartItemProps } from "@/types/cart.types";
import cn from "@/utils/cn/cn";
import formatPrice from "@/utils/format-price/formatPrice";

import "@/pages/cart/components/cart-item/CartItem.scss";

const CartItem = ({ item, onRemove, onQuantityChange }: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleRemoveCartItem = () => {
    onRemove(item);
  };

  const handleIncreaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(item, newQuantity);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(item, newQuantity);
    }
  };

  const handleQuantityInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setQuantity(0);
    } else {
      const numberValue = parseInt(value, 10);
      if (!isNaN(numberValue) && numberValue >= 1) {
        setQuantity(numberValue);
        onQuantityChange(item, numberValue);
      }
    }
  };

  const handleBlur = () => {
    if (quantity === 0) {
      setQuantity(item.quantity);
    }
  };

  const disableMinusQuantity = quantity === 1 && "disabled";

  return (
    <AppBox className="spa-cart-item" data-cy="cart-item">
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
        <AppBox
          className={cn("spa-cart-item__quantity-block", disableMinusQuantity)}
          onClick={handleDecreaseQuantity}
          data-cy="decrease-quantity-button"
        >
          <RemoveCircleOutlineIcon />
        </AppBox>
        <input
          value={quantity || ""}
          className="spa-cart-item__quantity-input"
          onChange={handleQuantityInputChange}
          onBlur={handleBlur}
          data-cy="cart-item-quantity"
        />
        <AppBox
          className="spa-cart-item__quantity-block"
          onClick={handleIncreaseQuantity}
          data-cy="increase-quantity-button"
        >
          <AddCircleOutlineIcon />
        </AppBox>
      </AppBox>
      <AppTypography className="spa-cart-item__price">
        {formatPrice(item.calculatedPrice)}
      </AppTypography>
      <AppBox
        className="spa-cart-item__delete-block"
        onClick={handleRemoveCartItem}
        data-cy="remove-cart-item-button"
      >
        <DeleteIcon />
      </AppBox>
    </AppBox>
  );
};

export default CartItem;
