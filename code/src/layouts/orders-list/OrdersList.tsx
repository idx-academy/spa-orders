import AppBox from "@/components/app-box/AppBox";
import OrderItem from "@/layouts/order-item/OrderItem";
import { Order } from "@/types/order.types";

import "@/layouts/orders-list/OrdersList.scss";

type OrderListProps = {
  orders: Order[];
};

const OrdersList = ({ orders }: OrderListProps) => {
  return (
    <AppBox className="spa-order-list">
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </AppBox>
  );
};

export default OrdersList;
