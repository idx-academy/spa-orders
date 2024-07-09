import {
  ordersContent,
  tableHeadings
} from "@/layouts/tables/orders-table/OrdersTable.constants";
import OrderTableBody from "@/layouts/tables/orders-table/order-table-body/OrderTableBody";
import OrderTableHead from "@/layouts/tables/orders-table/order-table-head/OrderTableHead";
import "@/layouts/tables/orders-table/order-table-head/OrderTableHead";

import AppTable from "@/components/app-table/AppTable";

import { Order } from "@/types/order.types";

import "@/layouts/tables/orders-table/OrdersTable.scss";

const OrdersTable = () => {
  const OrderTableBodyItem = (order: Order) => (
    <OrderTableBody key={order.id} order={order} />
  );
  const OrderTableHeadItem = (head: string) => (
    <OrderTableHead key={head} head={head} />
  );

  return (
    <>
      <AppTable
        classNames={{
          container: "spa-order-table",
          body: "spa-order-table__body"
        }}
        headItems={tableHeadings}
        renderHeadItem={OrderTableHeadItem}
        bodyItems={ordersContent}
        renderBodyItem={OrderTableBodyItem}
      />
    </>
  );
};

export default OrdersTable;
