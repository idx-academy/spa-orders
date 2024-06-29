import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";
import { Product } from "@/types/product.types";

import "@/layouts/order-item/components/order-product-item/OrderProductItem.scss";

type OrderProductItem = {
  product: Product;
  quantity: number;
  price: number;
};

const OrderProductItem = ({ product, quantity, price }: OrderProductItem) => {
  return (
    <AppBox className="spa-order-product__container">
      <AppBox className="spa-order-product__info">
        <AppBox
          className="spa-order-product__image"
          component="img"
          src={product.image}
          alt={product.name}
        />
        <AppBox className="spa-order-product__description">
          <AppTypography
            className="spa-order-product__title"
            variant="body"
            component="p"
          >
            {product.name}
          </AppTypography>
          <AppTypography variant="caption-small" component="p">
            {product.description}
          </AppTypography>
        </AppBox>
        <AppTypography
          className="spa-order-product__price"
          variant="body"
          component="p"
          fontWeight="extra-bold"
        >
          {/*This $ will be replaced by the utility function*/}
          {product.price}$ x {quantity}
        </AppTypography>
      </AppBox>

      <AppTypography variant="body" component="p" fontWeight="extra-bold">
        {/*This $ will be replaced by the utility function*/}
        {price}$
      </AppTypography>
    </AppBox>
  );
};

export default OrderProductItem;
