import AppBox from "@/components/app-box/AppBox";
import AppLink from "@/components/app-link/AppLink";
import AppTypography from "@/components/app-typography/AppTypography";

import routes from "@/constants/routes";
import { Product } from "@/types/product.types";
import formatPrice from "@/utils/format-price/formatPrice";

import "@/containers/order-item/components/order-product-item/OrderProductItem.scss";

type OrderProductItemProps = {
  product: Product;
  quantity: number;
  totalPrice: number;
};

const OrderProductItem = ({
  product,
  quantity,
  totalPrice
}: OrderProductItemProps) => {
  const { price, id, image, name, description } = product;

  const priceQuantityLabel = `${formatPrice(price)} x ${quantity}`;


  return (
    <AppLink
      to={routes.productDetails.path(id)}
      className="spa-order-product__container"
    >
      <AppBox className="spa-order-product__info">
        <AppBox
          className="spa-order-product__image"
          component="img"
          src={image}
          alt={name}
        />
        <AppBox className="spa-order-product__description">
          <AppTypography
            className="spa-order-product__description-title"
            variant="body"
            fontWeight="extra-bold"
            component="p"
          >
            {name}
          </AppTypography>
          <AppTypography
            variant="caption-small"
            component="p"
            className="spa-order-product__description-caption"
          >
            {description}
          </AppTypography>
        </AppBox>
        <AppTypography
          className="spa-order-product__price"
          variant="body"
          component="p"
          fontWeight="extra-bold"
        >
          {priceQuantityLabel}
        </AppTypography>
      </AppBox>
      <AppTypography variant="body" component="p" fontWeight="extra-bold">
        {formatPrice(totalPrice)}
      </AppTypography>
    </AppLink>
  );
};

export default OrderProductItem;
