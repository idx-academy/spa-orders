import { orderBadgeVariants } from "@/layouts/order-item/OrderItem.constants";

import AppBadge from "@/components/app-badge/AppBadge";
import { AppTableCell } from "@/components/app-table/components";
import AppTypography from "@/components/app-typography/AppTypography";

import { orderStatuses } from "@/constants/orderStatuses";
import { Order } from "@/types/order.types";
import formatDate from "@/utils/format-date/formatDate";
import formatPrice from "@/utils/format-price/formatPrice";

import "@/layouts/tables/orders-table/order-table-body/OrderTableBody.scss";

type OrderTableBodyProps = {
  order: Order;
};

const OrderTableBody = ({ order }: OrderTableBodyProps) => {
  const orderItemStatus = orderStatuses[order.orderStatus];
  const orderReciever = `${order.receiver.firstName} ${order.receiver.lastName}`;

  const ordersTotalPrice = order.orderItems.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );

  const orderBadgeItemStatus = (
    <AppTypography className="spa-order-table__body-status" variant="caption">
      {orderItemStatus}
    </AppTypography>
  );

  return (
    <>
      <AppTableCell>{order.id}</AppTableCell>
      <AppTableCell>
        <AppBadge
          variant={orderBadgeVariants[orderItemStatus]}
          badgeContent={orderBadgeItemStatus}
        />
      </AppTableCell>
      <AppTableCell>{formatDate(order.createdAt)}</AppTableCell>
      <AppTableCell>{orderReciever}</AppTableCell>
      <AppTableCell>{order.postAddress.deliveryMethod}</AppTableCell>
      <AppTableCell>{formatPrice(ordersTotalPrice)}</AppTableCell>
    </>
  );
};

export default OrderTableBody;
