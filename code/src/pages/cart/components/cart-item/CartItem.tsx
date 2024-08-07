import { ChangeEvent, useEffect, useRef, useState } from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import AppBox from "@/components/app-box/AppBox";
import AppTooltip from "@/components/app-tooltip/AppTooltip";
import AppTypography from "@/components/app-typography/AppTypography";

import useDebouncedValue from "@/hooks/use-debounced-value/useDebouncedValue";
import { CartItemProps } from "@/types/cart.types";
import cn from "@/utils/cn/cn";
import formatPrice from "@/utils/format-price/formatPrice";

import "@/pages/cart/components/cart-item/CartItem.scss";

const CartItem = ({ item, onRemove, onQuantityChange }: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const debouncedQuantity = useDebouncedValue(quantity, 500);

  const lastDebouncedQuantityRef = useRef(debouncedQuantity);

  const shouldUpdateQuantity = (
    debouncedQuantity: number,
    lastDebouncedQuantity: number
  ) => {
    return debouncedQuantity !== lastDebouncedQuantity && debouncedQuantity > 0;
  };

  useEffect(() => {
    if (
      shouldUpdateQuantity(debouncedQuantity, lastDebouncedQuantityRef.current)
    ) {
      onQuantityChange(item, debouncedQuantity);
      lastDebouncedQuantityRef.current = debouncedQuantity;
    }
  }, [debouncedQuantity, item, onQuantityChange]);

  const handleRemoveCartItem = () => {
    onRemove(item);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevState) => (prevState > 1 ? prevState - 1 : prevState));
  };

  const handleQuantityInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setQuantity(0);
    } else {
      const numberValue = parseInt(value, 10);
      if (!isNaN(numberValue) && numberValue >= 1) {
        setQuantity(numberValue);
      }
    }
  };

  const handleBlur = () => {
    if (quantity === 0) {
      setQuantity(item.quantity);
    }
  };

  const disableMinusQuantity = quantity === 1 && "disabled";

  const totalPrice = formatPrice(quantity * item.productPrice);

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
          maxLength={6}
        />
        <AppBox
          className="spa-cart-item__quantity-block"
          onClick={handleIncreaseQuantity}
          data-cy="increase-quantity-button"
        >
          <AddCircleOutlineIcon />
        </AppBox>
      </AppBox>
      <AppBox className="spa-cart-item__price">
        <AppTooltip titleTranslationKey={totalPrice}>
          <AppTypography
            component="span"
            className="spa-cart-item__price-value"
          >
            {totalPrice}
          </AppTypography>
        </AppTooltip>
      </AppBox>
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
