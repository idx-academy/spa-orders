import { tableColumns } from "@/layouts/tables/orders-table/OrdersTable.constants";
import OrdersTableBody from "@/layouts/tables/orders-table/components/orders-table-body/OrdersTableBody";
import OrdersTableHead from "@/layouts/tables/orders-table/components/orders-table-head/OrdersTableHead";

import AppTable from "@/components/app-table/AppTable";

import { Order } from "@/types/order.types";

import "@/layouts/tables/orders-table/OrdersTable.scss";

type OrdersTableProps = {
  orders: Order[];
};

const OrdersTable = ({ orders }: OrdersTableProps) => {
  const OrderTableBodyItem = (order: Order) => (
    <OrdersTableBody key={order.id} order={order} />
  );
  const OrderTableHeadItem = (head: string) => (
    <OrdersTableHead key={head} head={head} />
  );

  return (
    <AppTable
      classNames={{
        container: "spa-order-table",
        body: "spa-order-table__body"
      }}
      headItems={tableColumns}
      renderHeadItem={OrderTableHeadItem}
      bodyItems={orders}
      renderBodyItem={OrderTableBodyItem}
    />
  );
};

export default OrdersTable;
