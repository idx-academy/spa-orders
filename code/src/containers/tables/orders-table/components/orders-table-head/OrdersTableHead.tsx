import { AppTableCell } from "@/components/app-table/components";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/containers/tables/orders-table/components/orders-table-head/OrdersTableHead.scss";

type OrderTableHeadProps = {
  head: string;
  // sortable?: boolean;
  // onSortChange: (newSort: string) => void;
};
const OrdersTableHead = ({
  head
  // sortable = false,
  // onSortChange
}: OrderTableHeadProps) => {
  // const handleSort = () => {
  //   if (sortable) {
  //     const newSort = "createdAt,asc";
  //     onSortChange(newSort);
  //   }
  // };
  return (
    <AppTableCell className="spa-order-table__head">
      <AppTypography translationKey={head} variant="caption" />
    </AppTableCell>
  );
};

export default OrdersTableHead;
