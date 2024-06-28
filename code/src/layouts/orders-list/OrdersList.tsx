import AppBox from "@/components/app-box/AppBox";
import OrderItem from "@/layouts/order-item/OrderItem";

//@TODO: Replace with mock backend
import { item } from "@/layouts/order-item/constants";

import "@/layouts/orders-list/OrdersList.scss";

const OrdersList = () => {
  const orders = item.content;

  return (
    <AppBox className="spa-order-list">
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </AppBox>
  );
};

export default OrdersList;
