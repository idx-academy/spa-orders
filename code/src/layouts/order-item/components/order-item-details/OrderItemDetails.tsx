import OrderProductItem from "@/layouts/order-item/components/order-product-item/OrderProductItem";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import { PostAddress } from "@/types/delivery.types";
import { Order } from "@/types/order.types";

import "@/layouts/order-item/components/order-item-details/OrderItemDetails.scss";

type OrderItemDetailsProps = {
  order: Order;
};

const postAddressFields: Record<keyof PostAddress, string> = {
  city: "orderProductItem.details.city",
  department: "orderProductItem.details.department",
  deliveryMethod: "orderProductItem.details.deliveryMethod"
};

const OrderItemDetails = ({ order }: OrderItemDetailsProps) => {
  const orderReciever = `${order.receiver.firstName} ${order.receiver.lastName}`;

  const postAddressFieldsList = Object.entries(postAddressFields).map(
    ([key, label]) => (
      <AppBox key={key} className="spa-order-details__address-fields">
        <AppTypography variant="caption" translationKey={label} />
        <AppTypography variant="caption" fontWeight="extra-bold">
          {order.postAddress[key as keyof typeof order.postAddress]}
        </AppTypography>
      </AppBox>
    )
  );

  const orderProductItems = order.orderItems.map(
    ({ product, quantity, price }) => (
      <OrderProductItem
        key={product.id}
        product={product}
        quantity={quantity}
        price={price}
      />
    )
  );

  return (
    <AppBox className="spa-order-details">
      <AppBox className="spa-order-details__delivery">
        <AppBox>
          <AppTypography
            variant="caption-small"
            component="p"
            translationKey="orderProductItem.details.orderReciever"
          />
          <AppTypography
            variant="caption"
            component="p"
            fontWeight="extra-bold"
          >
            {orderReciever}
            <br />
            {order.receiver.email}
          </AppTypography>
        </AppBox>
        <AppBox className="spa-order-details__address">
          <AppTypography
            variant="caption-small"
            component="p"
            className="spa-order-details__address-label"
            translationKey="orderProductItem.details.recieverAddress"
          />
          {postAddressFieldsList}
        </AppBox>
      </AppBox>
      <AppBox className="spa-order-product">{orderProductItems}</AppBox>
    </AppBox>
  );
};

export default OrderItemDetails;
