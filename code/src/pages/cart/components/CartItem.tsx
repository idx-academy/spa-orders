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
};

const CartItem = ({ item }: CartItemProps) => {
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
      <AppBox className="spa-cart-item__delete-block">
        <DeleteIcon />
      </AppBox>
    </AppBox>
  );
};

export default CartItem;
