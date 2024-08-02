import { tableColumns } from "@/containers/tables/orders-table/OrdersTable.constants";
import OrdersTableBody from "@/containers/tables/orders-table/components/orders-table-body/OrdersTableBody";
import OrdersTableHead from "@/containers/tables/orders-table/components/orders-table-head/OrdersTableHead";

import AppTable from "@/components/app-table/AppTable";
import AppTypography from "@/components/app-typography/AppTypography";

import { useChangeOrderStatusMutation } from "@/store/api/ordersApi";
import { AdminOrder, OrderIsPaid, OrderStatus } from "@/types/order.types";

import "@/containers/tables/orders-table/OrdersTable.scss";

type OrdersTableProps = {
  ordersData: AdminOrder[];
};

const OrdersTable = ({ ordersData }: OrdersTableProps) => {
  const [changeOrderStatus] = useChangeOrderStatusMutation();

  const OrderTableBodyItem = (order: AdminOrder) => {
    const handleChangeOrderStatus = (orderStatus: OrderStatus) => {
      changeOrderStatus({
        orderId: order.id,
        orderStatus
      });
    };

    const handleChangeOrderIsPaid = (isPaid: OrderIsPaid) => {
      changeOrderStatus({
        orderId: order.id,
        orderStatus: order.orderStatus,
        isPaid
      });
    };

    return (
      <OrdersTableBody
        key={order.id}
        order={order}
        onStatusChange={handleChangeOrderStatus}
        onIsPaidChange={handleChangeOrderIsPaid}
      />
    );
  };

  const OrderTableHeadItem = (head: string) => (
    <OrdersTableHead key={head} head={head} />
  );

  const ordersTableFallback = (
    <AppTypography
      textAlign="center"
      variant="subtitle1"
      translationKey="ordersTable.fallback"
    />
  );

  return (
    <AppTable
      classNames={{
        container: "spa-order-table",
        body: "spa-order-table__body",
        fallback: "spa-order-table__fallback"
      }}
      headItems={tableColumns}
      renderHeadItem={OrderTableHeadItem}
      bodyItems={ordersData}
      renderBodyItem={OrderTableBodyItem}
      fallback={ordersTableFallback}
    />
  );
};

export default OrdersTable;
