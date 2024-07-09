import { useEffect, useState } from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import formatPrice from "@/utils/format-price/formatPrice";

import "@/pages/cart/components/CartItem.scss";

type ProductCartType = {
  image: string;
  name: string;
  productPrice: number;
  quantity: number;
  calculatedPrice: number;
};

type CartItemProps = {
  item: ProductCartType;
  onQuantityChange: (quantity: number) => void;
  onDelete: () => void;
};

const CartItem = ({ item, onQuantityChange, onDelete }: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity.toString());

  useEffect(() => {
    setQuantity(item.quantity.toString());
  }, [item.quantity]);

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.quantity - 1);
    }
  };

  const handleIncrement = () => {
    onQuantityChange(item.quantity + 1);
  };

  const handleInputBlur = () => {
    if (quantity === "") {
      setQuantity(item.quantity.toString());
    } else {
      onQuantityChange(parseInt(quantity, 10));
    }
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
        <AppTypography component="p">
          {formatPrice(item.productPrice)}
        </AppTypography>
      </AppBox>
      <AppBox className="spa-cart-item__quantity-selector">
        <AppBox
          onClick={handleDecrement}
          className="spa-cart-item__quantity-block"
        >
          <RemoveCircleOutlineIcon />
        </AppBox>
        <input
          type="text"
          value={quantity}
          onBlur={handleInputBlur}
          className="spa-cart-item__quantity-input"
        />
        <AppBox
          onClick={handleIncrement}
          className="spa-cart-item__quantity-block"
        >
          <AddCircleOutlineIcon />
        </AppBox>
      </AppBox>
      <AppTypography component="p" className="spa-cart-item__price">
        {formatPrice(item.calculatedPrice)}
      </AppTypography>
      <AppBox onClick={onDelete} className="spa-cart-item__delete-block">
        <DeleteIcon />
      </AppBox>
    </AppBox>
  );
};

export default CartItem;
