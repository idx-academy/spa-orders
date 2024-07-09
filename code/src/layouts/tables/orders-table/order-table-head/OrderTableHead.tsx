import { AppTableCell } from "@/components/app-table/components";

import "@/layouts/tables/orders-table/order-table-head/OrderTableHead.scss";

type OrderTableHeadProps = {
  head: string;
};
const OrderTableHead = ({ head }: OrderTableHeadProps) => {
  return <AppTableCell className="spa-order-table__head">{head}</AppTableCell>;
};

export default OrderTableHead;
